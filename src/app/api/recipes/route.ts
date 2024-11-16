import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();
  const { name, description } = body;

  const recipe = await prisma.recipe.create({
    data: {
      name,
      description,
    },
  });

  return NextResponse.json(recipe);
}
