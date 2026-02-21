import { mutationOptions } from "@tanstack/react-query";
import { createProduct } from "../../lib/api";
import type { Product } from "../../types";

export const createProductKey = "create-product";
export const createProductMutation = mutationOptions({
  mutationKey: [createProductKey],
  mutationFn: (data: Omit<Product, "id" | "created_at" | "updated_at">) =>
    createProduct(data),
});
