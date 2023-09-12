import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const gameId = searchParams.get("gameId");
  const user_id = searchParams.get("user_id");

  try {
    if (!gameId) {
      throw new Error("Game ID is required");
    }

    const allPlayers = await sql`
    SELECT players.started, players.role, players.user_id,players.game_id, players.is_alive,players.is_host, users.username
    FROM players
    INNER JOIN users ON players.user_id = users.user_id
    WHERE players.game_id = ${gameId} AND players.user_id = ${user_id};
    `;
    const allMafia = await sql`
    SELECT users.username, players.user_id
    FROM players
    INNER JOIN users ON players.user_id = users.user_id
    WHERE players.game_id = ${gameId} AND players.role = 'mafia' ;
  `;

    const players = allPlayers.rows;
    const mafia = allMafia.rows;
    return NextResponse.json({ players, mafia }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
