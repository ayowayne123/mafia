import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { username } = body;

  try {
    if (!username) {
      throw new Error("Username is required");
    }

    // Assuming you have a logic to generate a unique game ID
    const uniqueGameId = 15885;

    // Insert game data into the games table
    await sql`
        INSERT INTO games (host_user_id, unique_id)
        VALUES ((SELECT user_id FROM users WHERE username = ${username}), ${uniqueGameId});
      `;
    await sql`
        INSERT INTO players (game_id, user_id, role, is_alive, is_host)
        VALUES (${uniqueGameId}, (SELECT user_id FROM users WHERE username = ${username}), 'civillian', TRUE, TRUE);
      `;

    return NextResponse.json(
      { message: "Game created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
