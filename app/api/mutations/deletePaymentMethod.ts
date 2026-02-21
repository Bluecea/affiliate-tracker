import { mutationOptions } from "@tanstack/react-query";
import { deletePaymentMethod } from "../../lib/api";

export const deletePaymentMethodKey = "delete-payment-method";
export const deletePaymentMethodMutation = mutationOptions({
  mutationKey: [deletePaymentMethodKey],
  mutationFn: (id: string) => deletePaymentMethod(id),
});
