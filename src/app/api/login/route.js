import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { username, password } = body;

  try {
    if (!username || !password) {
      throw new Error("Username and password are required");
    }

    const result = await sql`
      SELECT * FROM users WHERE username = ${username} AND password = ${password};
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
