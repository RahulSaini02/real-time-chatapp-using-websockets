import { NextRequest, NextResponse } from "next/server";

//Creating a post function
export async function POST(req: NextRequest) {
  try {
    //Getting form data from fronted login page in JSON format
    const body = await req.json();
    //Sending the data to flask API(/api/login)
    const response = await fetch("http://127.0.0.1:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    // Getting data from the backend
    const data = await response.json();
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
