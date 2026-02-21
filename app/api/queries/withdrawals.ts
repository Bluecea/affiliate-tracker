import { queryOptions } from "@tanstack/react-query";
import { getWithdrawalRequests } from "../../lib/api";

export const withdrawalsKey = "withdrawals";
export const withdrawalsQuery = queryOptions({
  queryKey: [withdrawalsKey],
  queryFn: getWithdrawalRequests,
});
