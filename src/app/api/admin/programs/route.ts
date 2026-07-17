import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/shared/lib/prisma";

import { programSchema } from "@/entities/program/model/program.schema";
import { mapFormToDb } from "@/entities/program/model/program.queries";

export const GET = async () => {
  const result = await auth();

  const programs = await prisma.program.findMany();

  return NextResponse.json(programs);
};

export const POST = async (request: NextRequest) => {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = programSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const existing = await prisma.program.findUnique({
    where: { id: parsed.data.id },
  });

  if (existing) {
    return NextResponse.json(
      { error: "Программа с таким id уже существует" },
      { status: 409 }
    );
  }

  const dbPayload = mapFormToDb(parsed.data);

  const program = await prisma.program.create({
    data: dbPayload,
  });

  revalidatePath("/", "layout");

  return NextResponse.json(program, { status: 201 });
};
