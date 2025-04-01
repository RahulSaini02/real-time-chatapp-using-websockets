import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

//Creating a post function
export async function POST(req: NextRequest) {
  try {
    //Getting form data from fronted login page in JSON format
    const body = await req.json();

    // Fetching backend API URL from .env
    const BACKEND_API =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8080";

    //Sending the data to flask API(/auth/login)
    const response = await fetch(`${BACKEND_API}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    // Getting data from the backend
    const data = await response.json();
    console.log(data);

    const cookieStore = await cookies();
    cookieStore.set("accessToken", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    // Validating the response
    if (!response.ok) {
      return NextResponse.json(
        { error: data.error },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: data.message },
      { status: response.status }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error || "Internal server error" },
      { status: 500 }
    );
  }
}
