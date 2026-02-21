import { queryOptions } from "@tanstack/react-query";
import { getProducts } from "../../lib/api";

export const productsKey = "products";
export const productsQuery = queryOptions({
  queryKey: [productsKey],
  queryFn: getProducts,
});
