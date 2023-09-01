import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { username, email, password } = body;

  try {
    if (!username || !email || !password)
      throw new Error("Username, Email and password names required");
    await sql`
      INSERT INTO users (username, email, password)
      VALUES (${username}, ${email}, ${password});
    `;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const users = await sql`SELECT * FROM users;`;
  return NextResponse.json({ users }, { status: 200 });
}
