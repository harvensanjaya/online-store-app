import { signUp } from "@/lib/firebase/service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await signUp(body);

    return NextResponse.json(result, {
      status: result.status ? 200 : 400,
    });
  } catch {
    return NextResponse.json(
      {
        status: false,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
