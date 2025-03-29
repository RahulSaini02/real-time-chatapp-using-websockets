import { cookies } from "next/headers";

//Creating a post function
export async function POST() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    console.log("No token found, redirecting to login.");
    return false;
  }

  const BACKEND_API =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8080/api";

  const response = await fetch(`${BACKEND_API}/auth/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  if (response.status === 200) {
    console.log("User is authenticated:", data);
    return true;
  } else {
    console.log("Authentication failed:", data.error);
    return false;
  }
}
