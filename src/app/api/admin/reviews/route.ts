import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/shared/lib/prisma";

import { reviewSchema } from "@/entities/review/model/review.schema";
import type { TargetType } from "@/shared/types";

export async function GET(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  const targetType = searchParams.get("targetType") as TargetType | null;
  const targetId = searchParams.get("targetId");

  const reviews = await prisma.review.findMany({
    where:
      targetType && targetId
        ? {
            targetType,
            targetId,
          }
        : undefined,
    orderBy: {
      createdAt: "asc",
    },
  });

  return NextResponse.json(reviews);
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = reviewSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        id: crypto.randomUUID(),
        ...parsed.data,
      },
    });

    revalidatePath("/", "layout");

    return NextResponse.json(review, { status: 201 });
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        error: e instanceof Error ? e.message : String(e),
      },
      { status: 500 }
    );
  }
}