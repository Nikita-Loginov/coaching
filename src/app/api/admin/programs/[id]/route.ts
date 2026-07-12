import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/shared/lib/prisma";

import { programUpdateSchema } from "@/entities/program/model/program.schema";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export const GET = async (_request: NextRequest, { params }: RouteParams) => {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const program = await prisma.program.findUnique({ where: { id } });

  if (!program) {
    return NextResponse.json({ error: "Не найдено" }, { status: 404 });
  }

  return NextResponse.json(program);
};

export const PATCH = async (request: NextRequest, { params }: RouteParams) => {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const body = await request.json();
  const parsed = programUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const program = await prisma.program.update({
    where: { id },
    data: parsed.data,
  });

  revalidatePath("/", "layout");

  return NextResponse.json(program);
};

export const DELETE = async (
  _request: NextRequest,
  { params }: RouteParams
) => {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  await prisma.program.delete({ where: { id } });

  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true });
};
