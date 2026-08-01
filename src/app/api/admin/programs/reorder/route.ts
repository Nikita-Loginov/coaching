import { NextRequest, NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import { prisma } from "@/shared/lib/prisma";

import { programReorderSchema } from "@/entities/program/model/program.schema";

export const PUT = async (request: NextRequest) => {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const body = await request.json();

  const parsed = programReorderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: parsed.error.flatten(),
      },
      {
        status: 400,
      }
    );
  }

  await prisma.$transaction(
    parsed.data.items.map(({ id, order }) =>
      prisma.program.update({
        where: {
          id,
        },
        data: {
          order,
        },
      })
    )
  );

  return NextResponse.json({
    success: true,
  });
};
