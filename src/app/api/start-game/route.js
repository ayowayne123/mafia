// server/api/start-game.js
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { gameId, playerWithRoles } = body;

  try {
    if (!gameId) {
      throw new Error("Game ID is required");
    }

    // Update the 'started' column for all players in the game who were 'ready'
    const updatePlayersQuery = await sql`
      UPDATE players SET started = 'started'
      WHERE game_id = ${gameId} AND started = 'ready';
    `;

    // Update the 'status' column in the 'games' table to 'started'
    const updateGameStatusQuery = await sql`
      UPDATE games SET status = 'started' WHERE unique_id = ${gameId};
    `;

    // Update player roles and set role_is_set to true
    for (const player of playerWithRoles) {
      const { user_id, role } = player;
      await sql`
          UPDATE players
          SET role = ${role}, role_is_set = true
          WHERE game_id = ${gameId} AND user_id = ${user_id} AND started = 'started';
        `;
    }

    // Check if any rows were affected by the updates
    if (
      updatePlayersQuery.rowCount === 0 ||
      updateGameStatusQuery.rowCount === 0
    ) {
      throw new Error("Failed to start the game.");
    }

    return NextResponse.json(
      { message: "Game started successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
