import { useState, useCallback } from "react";
import { fetchMenu, addDish, updateDish, deleteDish } from "../api/menuApi";

export function useMenu(showToast) {
  const [menu, setMenu] = useState([]);

  const load = useCallback(async () => {
    try {
      const data = await fetchMenu();
      setMenu(data);
    } catch {
      showToast("Failed to load menu", "error");
    }
  }, [showToast]);

  const add = useCallback(async (dish) => {
    await addDish(dish);
    showToast("Dish added!", "success");
    await load();
  }, [load, showToast]);

  const update = useCallback(async (dish) => {
    await updateDish(dish);
    showToast("Dish updated!", "success");
    await load();
  }, [load, showToast]);

  const remove = useCallback(async (id) => {
    await deleteDish(id);
    setMenu((prev) => prev.filter((d) => d.id !== id));
    showToast("Dish deleted", "success");
  }, [showToast]);

  return { menu, load, add, update, remove };
}
