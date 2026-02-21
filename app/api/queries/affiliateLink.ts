import { queryOptions } from "@tanstack/react-query";
import { getAffiliateLink } from "../../lib/api";

export const affiliateLinkKey = "affiliate-link";
export const affiliateLinkQuery = (productId: string) =>
  queryOptions({
    queryKey: [affiliateLinkKey, productId],
    queryFn: () => getAffiliateLink(productId),
  });
