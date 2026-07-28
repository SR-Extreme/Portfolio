import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  const username = process.env.LEETCODE_USERNAME || "Saurav_Kumar_Roy";

  try {
    const query = `
      query userPublicProfile($username: String!) {
        matchedUser(username: $username) {
          username
          profile {
            ranking
            reputation
          }
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
          submissionCalendar
        }
        userContestRanking(username: $username) {
          rating
          globalRanking
          topPercentage
        }
      }
    `;

    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`LeetCode API ${res.status}`);
    }

    const json = await res.json();
    const user = json?.data?.matchedUser;
    const contest = json?.data?.userContestRanking;

    if (!user) {
      return NextResponse.json(
        { error: "User not found", fallback: true },
        { status: 200 }
      );
    }

    const stats = user.submitStatsGlobal?.acSubmissionNum || [];
    const getCount = (diff: string) =>
      stats.find((s: { difficulty: string; count: number }) => s.difficulty === diff)
        ?.count ?? 0;

    const total = getCount("All");
    const easy = getCount("Easy");
    const medium = getCount("Medium");
    const hard = getCount("Hard");

    let heatmap: Record<string, number> = {};
    try {
      heatmap = JSON.parse(user.submissionCalendar || "{}");
    } catch {
      heatmap = {};
    }

    return NextResponse.json({
      username,
      totalSolved: total,
      easy,
      medium,
      hard,
      ranking: user.profile?.ranking ?? null,
      contestRating: contest?.rating ? Math.round(contest.rating) : null,
      contestRanking: contest?.globalRanking ?? null,
      topPercentage: contest?.topPercentage ?? null,
      heatmap,
      acceptanceRate: null,
    });
  } catch {
    // Fallback public stats API
    try {
      const fallback = await fetch(
        `https://leetcode-stats-api.herokuapp.com/${username}`,
        { next: { revalidate: 3600 } }
      );
      if (fallback.ok) {
        const data = await fallback.json();
        return NextResponse.json({
          username,
          totalSolved: data.totalSolved ?? 0,
          easy: data.easySolved ?? 0,
          medium: data.mediumSolved ?? 0,
          hard: data.hardSolved ?? 0,
          ranking: data.ranking ?? null,
          contestRating: data.contributionPoints ?? null,
          contestRanking: null,
          topPercentage: null,
          heatmap: data.submissionCalendar ?? {},
          acceptanceRate: data.acceptanceRate ?? null,
        });
      }
    } catch {
      /* ignore */
    }

    return NextResponse.json({
      username,
      totalSolved: 600,
      easy: 0,
      medium: 0,
      hard: 0,
      ranking: null,
      contestRating: 1795,
      contestRanking: null,
      topPercentage: null,
      heatmap: {},
      acceptanceRate: null,
      fallback: true,
    });
  }
}
