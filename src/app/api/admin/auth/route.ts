import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminPassword, generateAuthToken, verifyAuthToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { success: false, message: "Password is required" },
        { status: 400 }
      );
    }

    const expectedPassword = getAdminPassword();
    if (password !== expectedPassword) {
      return NextResponse.json(
        { success: false, message: "Invalid administrator password" },
        { status: 401 }
      );
    }

    const token = generateAuthToken();
    const cookieStore = await cookies();
    cookieStore.set("matshepo_admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    return NextResponse.json({
      success: true,
      token,
      message: "Authentication successful",
    });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("matshepo_admin_token")?.value;
    const authenticated = verifyAuthToken(token);

    return NextResponse.json({
      authenticated,
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("matshepo_admin_token");
    return NextResponse.json({ success: true, message: "Logged out" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to log out" },
      { status: 500 }
    );
  }
}

