import type { InventoryForm } from "@/hooks/use-inventory";
export async function getInventory() {
  try {
    const response = await fetch("/api/inventory");
    return response.json();
  }
  catch (error) {
    throw new Error("Failed to fetch inventory");
  }


}

export async function updateInventory(data: InventoryForm) {
  try {
    const response = await fetch("/api/inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update inventory");
    }

    return response.json();
  } catch (error) {
    throw new Error("Failed to update inventory");
  }
}

