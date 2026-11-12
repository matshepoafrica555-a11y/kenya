import { cookies } from "next/headers";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "matshepo-secret-salt-2026";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "matshepo";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "matshepo777";

export function getAdminUsername(): string {
  return ADMIN_USERNAME;
}

export function getAdminPassword(): string {
  return ADMIN_PASSWORD;
}

export function generateAuthToken(): string {
  const payload = {
    role: "admin",
    username: ADMIN_USERNAME,
    timestamp: Date.now(),
  };
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

export function verifyAuthToken(token: string | null | undefined): boolean {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const parsed = JSON.parse(decoded);
    if (parsed.role === "admin" && typeof parsed.timestamp === "number") {
      // Valid for 30 days
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      if (Date.now() - parsed.timestamp < thirtyDays) {
        return true;
      }
    }
  } catch {
    return false;
  }
  return false;
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("matshepo_admin_token")?.value;
  return verifyAuthToken(token);
}

