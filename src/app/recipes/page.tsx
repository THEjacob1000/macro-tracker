// app/recipes/page.tsx
import Link from "next/link";
import { PrismaClient, type Recipe } from "@prisma/client";
import { Button } from "@/components/ui/button";

const prisma = new PrismaClient();

async function getRecipes(): Promise<Recipe[]> {
  return await prisma.recipe.findMany();
}

export default async function RecipesPage() {
  const recipes = await getRecipes();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recipes</h1>
      <Link href="/recipes/new">
        <Button>Add New Recipe</Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="border p-4 rounded-lg shadow"
          >
            <h2 className="text-xl font-semibold">{recipe.name}</h2>
            <p className="text-gray-600">{recipe.description}</p>
            <Link href={`/recipes/${recipe.id}`}>
              <Button variant="outline" className="mt-2">
                View Recipe
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
