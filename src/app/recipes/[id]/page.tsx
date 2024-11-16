"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function RecipePage({
  params,
}: {
  params: { id: string };
}) {
  const [recipe, setRecipe] = useState({ name: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/recipes/${params.id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data));
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/recipes/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });

    if (response.ok) {
      setIsEditing(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {isEditing ? "Edit Recipe" : recipe.name}
      </h1>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Recipe Name
            </label>
            <Input
              type="text"
              id="name"
              value={recipe.name}
              onChange={(e) =>
                setRecipe({ ...recipe, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <Textarea
              id="description"
              value={recipe.description}
              onChange={(e) =>
                setRecipe({ ...recipe, description: e.target.value })
              }
              rows={4}
            />
          </div>
          <Button type="submit">Save Changes</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        </form>
      ) : (
        <>
          <p className="text-gray-600 mb-4">{recipe.description}</p>
          <Button onClick={() => setIsEditing(true)}>
            Edit Recipe
          </Button>
        </>
      )}
    </div>
  );
}
