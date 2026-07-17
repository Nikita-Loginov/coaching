import { useState, useCallback } from "react";

interface ListItem {
  id: string;
  [key: string]: any;
}

interface UseListOptions<T extends ListItem> {
  initialItems?: T[];
  createNewItem: () => T;
}

export const useList = <T extends ListItem>({
  initialItems = [],
  createNewItem,
}: UseListOptions<T>) => {
  const [items, setItems] = useState<T[]>(initialItems);

  const addItem = useCallback(() => {
    setItems((prev) => [...prev, createNewItem()]);
  }, [createNewItem]);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateItem = useCallback((id: string, updates: Partial<T>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  }, []);

  const updateItemField = useCallback(
    <K extends keyof T>(id: string, field: K, value: T[K]) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        )
      );
    },
    []
  );

  const resetItems = useCallback((newItems: T[]) => {
    setItems(newItems);
  }, []);

  return {
    items,
    setItems,
    addItem,
    removeItem,
    updateItem,
    updateItemField,
    resetItems,
  };
};
