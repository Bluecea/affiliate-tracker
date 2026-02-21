import { mutationOptions } from "@tanstack/react-query";
import { generateAffiliateLink } from "../../lib/api";

export const generateAffiliateLinkKey = "generate-affiliate-link";
export const generateAffiliateLinkMutation = mutationOptions({
  mutationKey: [generateAffiliateLinkKey],
  mutationFn: (productId: string) => generateAffiliateLink(productId),
});
