import { mutationOptions } from "@tanstack/react-query";
import { updatePaymentMethod } from "../../lib/api";
import type { PaymentMethod } from "../../types";

export const updatePaymentMethodKey = "update-payment-method";
export const updatePaymentMethodMutation = mutationOptions({
  mutationKey: [updatePaymentMethodKey],
  mutationFn: (
    { id, updates }: { id: string; updates: Partial<PaymentMethod> },
  ) => updatePaymentMethod(id, updates),
});
