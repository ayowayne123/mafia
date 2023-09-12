import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { username, unique_code, started } = body;

  try {
    if (!username) {
      throw new Error("Username is required");
    }

    await sql`
        INSERT INTO games (host_user_id, unique_id)
        VALUES ((SELECT user_id FROM users WHERE username = ${username}), ${unique_code});
      `;
    await sql`
        INSERT INTO players (game_id, user_id, role, is_alive, is_host,started)
        VALUES (${unique_code}, (SELECT user_id FROM users WHERE username = ${username}), 'civillian', TRUE, TRUE,${started});
      `;

    return NextResponse.json(
      { message: "Game created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
