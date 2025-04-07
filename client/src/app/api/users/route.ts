import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const BACKEND_API =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8080";
    const email = req.nextUrl.searchParams.get("email")

    const response = await fetch(`${BACKEND_API}/api/users?email=${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    console.log(`Route data: ${data}`)
    if (!response.ok) {
      return NextResponse.json(
        { error: data.error },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: data.message, data: data.data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error || "Internal server error" },
      { status: 500 }
    );
  }
}
