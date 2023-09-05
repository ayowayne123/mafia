import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const user_id = parseInt(searchParams.get("userId"), 10);

  try {
    if (!user_id) {
      throw new Error("user_id is required");
    }

    const activegames = await sql`
    SELECT games.*
    FROM games
    INNER JOIN (
      SELECT DISTINCT game_id
      FROM players
      WHERE user_id = ${user_id} 
    ) AS user_games
    ON games.unique_id = user_games.game_id
    WHERE games.status IN ('active', 'pending');
    `;

    const games = activegames.rows[0];

    return NextResponse.json({ games }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
