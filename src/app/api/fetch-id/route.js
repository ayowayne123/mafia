import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const Ids = await sql`
    SELECT unique_id FROM games
    `;

    const allIds = Ids.rows;

    return NextResponse.json({ allIds }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
