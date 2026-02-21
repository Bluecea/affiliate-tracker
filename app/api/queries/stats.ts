import { queryOptions } from "@tanstack/react-query";
import { getStats } from "../../lib/api";

export const statsKey = "stats";
export const statsQuery = queryOptions({
  queryKey: [statsKey],
  queryFn: getStats,
});
