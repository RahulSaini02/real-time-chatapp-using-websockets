import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const BACKEND_API =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8080";

    const response = await fetch(`${BACKEND_API}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error },
        { status: response.status }
      );
    }

    return NextResponse.json({ message: data.message }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error || "Internal server error" },
      { status: 500 }
    );
  }
}
