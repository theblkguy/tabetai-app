import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomRecipeCard from "./CustomRecipeCard";

function CreateRecipePage() {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: "",
    image: "",
    ingredients: [{ name: "", quantity: "", unit: "" }],
    instructions: [""],
    readyInMinutes: "",
    servings: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setRecipe({ ...recipe, [field]: value });
  };

  const handleIngredientChange = (idx, field, value) => {
    const newIngredients = recipe.ingredients.map((ing, i) =>
      i === idx ? { ...ing, [field]: value } : ing
    );
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const addIngredient = () =>
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { name: "", quantity: "", unit: "" }],
    });

  const removeIngredient = (idx) =>
    setRecipe({
      ...recipe,
      ingredients: recipe.ingredients.filter((_, i) => i !== idx),
    });

  const handleInstructionChange = (idx, value) => {
    const newInstructions = recipe.instructions.map((step, i) =>
      i === idx ? value : step
    );
    setRecipe({ ...recipe, instructions: newInstructions });
  };

  const addInstruction = () =>
    setRecipe({ ...recipe, instructions: [...recipe.instructions, ""] });

  const removeInstruction = (idx) =>
    setRecipe({
      ...recipe,
      instructions: recipe.instructions.filter((_, i) => i !== idx),
    });

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Filter out blank ingredients
    const filteredIngredients = recipe.ingredients.filter(ing => ing.name && ing.name.trim() !== "");
    // Filter out blank instructions
    const filteredInstructions = recipe.instructions.filter(step => step && step.trim() !== "");
    // Basic validation
    if (!recipe.title.trim()) {
      alert("Title is required.");
      setLoading(false);
      return;
    }
    if (filteredIngredients.length === 0) {
      alert("At least one ingredient with a name is required.");
      setLoading(false);
      return;
    }
    if (filteredInstructions.length === 0) {
      alert("At least one instruction is required.");
      setLoading(false);
      return;
    }
    const recipeToSend = {
      ...recipe,
      ingredients: filteredIngredients,
      instructions: filteredInstructions
    };
    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeToSend),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create recipe");
      }
      alert("Recipe created!");
      navigate("/your-recipes");
    } catch (err) {
      alert("Error creating recipe: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Create Recipe</h2>
      <input
        className="w-full mb-2 p-2 border rounded"
        placeholder="Title"
        value={recipe.title}
        onChange={e => handleChange("title", e.target.value)}
      />
      <input
        className="w-full mb-2 p-2 border rounded"
        placeholder="Image URL"
        value={recipe.image}
        onChange={e => handleChange("image", e.target.value)}
      />
      <div className="mb-4">
        <label className="font-semibold">Ingredients</label>
        <table className="w-full mb-2">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {recipe.ingredients.map((ing, idx) => (
              <tr key={idx}>
                <td>
                  <input
                    className="p-1 border rounded"
                    value={ing.name}
                    onChange={e => handleIngredientChange(idx, "name", e.target.value)}
                    placeholder="e.g. Flour"
                  />
                </td>
                <td>
                  <input
                    className="p-1 border rounded"
                    value={ing.quantity}
                    onChange={e => handleIngredientChange(idx, "quantity", e.target.value)}
                    placeholder="e.g. 2"
                  />
                </td>
                <td>
                  <input
                    className="p-1 border rounded"
                    value={ing.unit}
                    onChange={e => handleIngredientChange(idx, "unit", e.target.value)}
                    placeholder="e.g. cups"
                  />
                </td>
                <td>
                  <button type="button" onClick={() => removeIngredient(idx)} className="text-red-500">✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={addIngredient} className="text-blue-500 mb-2">+ Add Ingredient</button>
      </div>
      <div className="mb-4">
        <label className="font-semibold">Instructions</label>
        {recipe.instructions.map((step, idx) => (
          <div key={idx} className="flex mb-1">
            <textarea
              className="w-full p-1 border rounded"
              value={step}
              onChange={e => handleInstructionChange(idx, e.target.value)}
              placeholder={`Step ${idx + 1}`}
            />
            <button type="button" onClick={() => removeInstruction(idx)} className="text-red-500 ml-2">✕</button>
          </div>
        ))}
        <button type="button" onClick={addInstruction} className="text-blue-500">+ Add Step</button>
      </div>
      <div className="flex gap-2 mb-4">
        <input
          className="p-2 border rounded"
          type="number"
          placeholder="Ready in minutes"
          value={recipe.readyInMinutes}
          onChange={e => handleChange("readyInMinutes", e.target.value)}
        />
        <input
          className="p-2 border rounded"
          type="number"
          placeholder="Servings"
          value={recipe.servings}
          onChange={e => handleChange("servings", e.target.value)}
        />
      </div>
      <button
        className="bg-yellow-300 hover:bg-yellow-400 px-4 py-2 rounded font-semibold"
        type="submit"
        disabled={loading}
      >
        {loading ? "Saving..." : "Create Recipe"}
      </button>
      <CustomRecipeCard recipe={recipe} />
    </form>
  );
}

export default CreateRecipePage;
