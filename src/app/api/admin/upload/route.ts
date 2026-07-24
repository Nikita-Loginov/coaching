import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { put } from "@vercel/blob";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();

  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "Файл обязателен" }, { status: 400 });
  }

  const ext = file.name.split(".").pop();

  const filename = `team/${randomUUID()}.${ext}`;

  const blob = await put(filename, file, {
    access: "public",
  });

  return NextResponse.json({
    url: blob.url,
  });
}
