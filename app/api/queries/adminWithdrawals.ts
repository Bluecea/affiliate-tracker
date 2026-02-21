import { queryOptions } from "@tanstack/react-query";
import { getAllWithdrawalRequests } from "../../lib/api";

export const adminWithdrawalsKey = "admin-withdrawals";
export const adminWithdrawalsQuery = queryOptions({
  queryKey: [adminWithdrawalsKey],
  queryFn: getAllWithdrawalRequests,
});
