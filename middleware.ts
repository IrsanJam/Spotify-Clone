import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const suppabase = createMiddlewareClient({
    req,
    res,
  });

  await suppabase.auth.getSession();
  return res;
}
