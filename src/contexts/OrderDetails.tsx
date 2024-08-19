import React, { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

interface ItemCounts {
  scoops: Record<string, number>;
  toppings: Record<string, number>;
}

interface OrderDetailsContextType {
  itemCounts: ItemCounts;
  totals: {
    scoops: number;
    toppings: number;
  };
  updateItemCount: (itemName: string, itemCount: number, itemType: 'scoops' | 'toppings') => void;
  resetOrder: () => void;
}

const OrderDetailsContext = createContext<OrderDetailsContextType | undefined>(undefined);

export function useOrderDetails() {
  const context = useContext(OrderDetailsContext);

  if (!context) {
    throw new Error("useOrderDetails must be used within an OrderDetailsProvider");
  }

  return context;
}

export function OrderDetailsProvider({ children }: { children: React.ReactNode }) {
  const [itemCounts, setItemCounts] = useState<ItemCounts>({
    scoops: {},
    toppings: {},
  });

  const updateItemCount = (itemName: string, itemCount: number, itemType: 'scoops' | 'toppings') => {
    setItemCounts(prevCounts => ({
      ...prevCounts,
      [itemType]: {
        ...prevCounts[itemType],
        [itemName]: itemCount,
      },
    }));
  };

  const resetOrder = () => {
    setItemCounts({ scoops: {}, toppings: {} });
  };

  const calculateTotal = (itemType: 'scoops' | 'toppings'): number => {
    const itemCountArray = Object.values(itemCounts[itemType]);
    const totalItems = itemCountArray.reduce((total, count) => total + count, 0);
    return totalItems * pricePerItem[itemType];
  };

  const totals = {
    scoops: calculateTotal('scoops'),
    toppings: calculateTotal('toppings'),
  };

  const value = { itemCounts, totals, updateItemCount, resetOrder };

  return (
    <OrderDetailsContext.Provider value={value}>
      {children}
    </OrderDetailsContext.Provider>
  );
}
