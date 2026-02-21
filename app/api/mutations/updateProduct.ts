import { mutationOptions } from "@tanstack/react-query";
import { updateProduct } from "../../lib/api";
import type { Product } from "../../types";

export const updateProductKey = "update-product";
export const updateProductMutation = mutationOptions({
  mutationKey: [updateProductKey],
  mutationFn: ({ id, updates }: { id: string; updates: Partial<Product> }) =>
    updateProduct(id, updates),
});
