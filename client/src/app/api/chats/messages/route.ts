import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const BACKEND_API =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8080";

    const { searchParams } = new URL(req.url);
    const chat_id = searchParams.get("chat_id");

    if (!chat_id) {
      return NextResponse.json(
        { error: "Chat ID is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${BACKEND_API}/api/chats/messages?chat_id=${chat_id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();

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
