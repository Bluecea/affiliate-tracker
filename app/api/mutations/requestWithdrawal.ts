import { mutationOptions } from "@tanstack/react-query";
import { requestWithdrawal } from "../../lib/api";

export const requestWithdrawalKey = "request-withdrawal";
export const requestWithdrawalMutation = mutationOptions({
  mutationKey: [requestWithdrawalKey],
  mutationFn: (
    { amount, method, details }: {
      amount: number;
      method: string;
      details: any;
    },
  ) => requestWithdrawal(amount, method, details),
});
