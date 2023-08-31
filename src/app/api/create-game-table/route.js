import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const result = await sql`CREATE TABLE games (
        game_id SERIAL PRIMARY KEY,
        host_user_id INT REFERENCES users(user_id),
        unique_id VARCHAR(10) NOT NULL UNIQUE,
        status VARCHAR(50) NOT NULL DEFAULT 'pending' -- 'pending', 'active', 'completed'
      );
      `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
