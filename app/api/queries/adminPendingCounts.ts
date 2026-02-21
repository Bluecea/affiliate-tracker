import { queryOptions } from "@tanstack/react-query";
import { getAdminPendingCounts } from "../../lib/api";

export const adminPendingCountsKey = "adminPendingCounts";
export const adminPendingCountsQuery = queryOptions({
  queryKey: [adminPendingCountsKey],
  queryFn: getAdminPendingCounts,
  refetchInterval: 60000,
});
