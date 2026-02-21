import { queryOptions } from "@tanstack/react-query";
import { getAffiliateProducts } from "../../lib/api";

export const affiliateProductsKey = "affiliate-products";
export const affiliateProductsQuery = queryOptions({
  queryKey: [affiliateProductsKey],
  queryFn: getAffiliateProducts,
});
