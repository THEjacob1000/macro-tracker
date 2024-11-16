// app/api/recipes/[id]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!recipe) {
    return NextResponse.json(
      { error: "Recipe not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(recipe);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { name, description } = body;

  const updatedRecipe = await prisma.recipe.update({
    where: {
      id: params.id,
    },
    data: {
      name,
      description,
    },
  });

  return NextResponse.json(updatedRecipe);
}
