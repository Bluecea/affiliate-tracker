import { queryOptions } from "@tanstack/react-query";
import { getPaymentMethods } from "../../lib/api";

export const paymentMethodsKey = "paymentMethods";
export const paymentMethodsQuery = queryOptions({
  queryKey: [paymentMethodsKey],
  queryFn: getPaymentMethods,
});
