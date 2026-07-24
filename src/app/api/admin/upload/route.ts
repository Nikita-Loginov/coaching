import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();

  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "Файл обязателен" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);

  const ext = file.name.split(".").pop();

  const filename = `${randomUUID()}.${ext}`;

  const uploadDir = path.join(process.cwd(), "public/uploads/team");

  await fs.mkdir(uploadDir, {
    recursive: true,
  });

  await fs.writeFile(path.join(uploadDir, filename), buffer);

  return NextResponse.json({
    url: `/uploads/team/${filename}`,
  });
}
