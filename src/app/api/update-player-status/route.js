import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { playerId, newStatus, gameId } = body;

  try {
    if (!playerId || !newStatus) {
      throw new Error("PlayerId and newStatus are required");
    }

    const updateResult = await sql`
      UPDATE players SET started = ${newStatus} WHERE user_id = ${playerId} AND game_id = ${gameId};
    `;

    if (updateResult.rowCount > 0) {
      const allPlayers = await sql`
          SELECT * FROM players WHERE game_id = ${gameId} AND user_id = ${playerId};
        `;

      const updatedPlayers = allPlayers.rows;
      return NextResponse.json({ updatedPlayers }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Player update failed or no matching players found" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
