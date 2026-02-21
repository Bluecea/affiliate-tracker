import { mutationOptions } from "@tanstack/react-query";
import { updateAffiliateStatus } from "../../lib/api";
import type { Profile } from "../../types";

export const updateAffiliateStatusKey = "update-affiliate-status";
export const updateAffiliateStatusMutation = mutationOptions({
  mutationKey: [updateAffiliateStatusKey],
  mutationFn: ({ id, status }: { id: string; status: Profile["status"] }) =>
    updateAffiliateStatus(id, status),
});
