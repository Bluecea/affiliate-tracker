import { mutationOptions } from "@tanstack/react-query";
import { createPaymentMethod } from "../../lib/api";
import type { PaymentMethod } from "../../types";

export const createPaymentMethodKey = "create-payment-method";
export const createPaymentMethodMutation = mutationOptions({
  mutationKey: [createPaymentMethodKey],
  mutationFn: (
    data: Omit<
      PaymentMethod,
      "id" | "affiliate_id" | "created_at" | "updated_at"
    >,
  ) => createPaymentMethod(data),
});
