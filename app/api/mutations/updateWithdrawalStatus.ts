import { mutationOptions } from "@tanstack/react-query";
import { updateWithdrawalStatus } from "../../lib/api";

export const updateWithdrawalStatusKey = "update-withdrawal-status";
export const updateWithdrawalStatusMutation = mutationOptions({
  mutationKey: [updateWithdrawalStatusKey],
  mutationFn: ({ id, status }: { id: string; status: string }) =>
    updateWithdrawalStatus(id, status),
});
