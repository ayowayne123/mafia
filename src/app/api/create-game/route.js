import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const username = searchParams.get("username");

//   try {
//     if (!username) {
//       throw new Error("Username is required");
//     }

//     // Assuming you have a logic to generate a unique game ID
//     const uniqueGameId = 12345;

//     // Insert game data into the games table
//     await sql`
//         INSERT INTO games (host_user_id, unique_id)
//         VALUES ((SELECT user_id FROM users WHERE username = ${username}), ${uniqueGameId});
//       `;

//     return NextResponse.json(
//       { message: "Game created successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }

//   // Handle invalid methods
//   return NextResponse.json({ error: "Invalid method" }, { status: 405 });
// }

export async function POST(request) {
  const body = await request.json();
  const { username } = body;

  console.log(body);
  console.log(username, "boss");

  try {
    if (!username) {
      throw new Error("Username is required");
    }

    // Assuming you have a logic to generate a unique game ID
    const uniqueGameId = 13456;

    // Insert game data into the games table
    await sql`
        INSERT INTO games (host_user_id, unique_id)
        VALUES ((SELECT user_id FROM users WHERE username = ${username}), ${uniqueGameId});
      `;

    return NextResponse.json(
      { message: "Game created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Handle invalid methods
  return NextResponse.json({ error: "Invalid method" }, { status: 405 });
}
