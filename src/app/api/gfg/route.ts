import { NextResponse } from "next/server";

export const revalidate = 3600;

const FALLBACK = {
  codingScore: 348,
  problemsSolved: 130,
  instituteRank: 142,
};

export async function GET() {
  const username = process.env.GFG_USERNAME || "saurav0vrf1";
  const profileUrl = `https://www.geeksforgeeks.org/profile/${username}`;

  let codingScore: number | null = null;
  let problemsSolved: number | null = null;
  let instituteRank: number | null = null;

  try {
    const res = await fetch(`https://gfg-stats.tashif.codes/${username}`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      const data = await res.json();
      problemsSolved =
        data?.totalProblemsSolved ??
        data?.data?.totalSolved ??
        data?.data?.totalProblemsSolved ??
        null;
    }
  } catch {
    /* fall through */
  }

  try {
    const profileRes = await fetch(
      `https://gfg-stats.tashif.codes/${username}/profile`,
      {
        next: { revalidate: 3600 },
        headers: { Accept: "application/json" },
      }
    );

    if (profileRes.ok) {
      const profile = await profileRes.json();
      const info = profile?.data ?? profile;
      codingScore =
        info?.codingScore ?? info?.overallScore ?? info?.score ?? null;
      instituteRank =
        info?.instituteRank != null
          ? Number(info.instituteRank)
          : info?.rank != null
            ? Number(info.rank)
            : null;
    }
  } catch {
    /* fall through */
  }

  const resolved = {
    username,
    codingScore: codingScore ?? FALLBACK.codingScore,
    problemsSolved: problemsSolved ?? FALLBACK.problemsSolved,
    instituteRank: instituteRank ?? FALLBACK.instituteRank,
    profileUrl,
    fallback:
      codingScore == null ||
      problemsSolved == null ||
      instituteRank == null,
  };

  return NextResponse.json(resolved);
}
