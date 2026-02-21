import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getAffiliates } from "../../lib/api";

export const adminAffiliatesKey = "admin-affiliates";
export const adminAffiliatesQuery = (page: number) =>
  queryOptions({
    queryKey: [adminAffiliatesKey, page],
    queryFn: () => getAffiliates(page, 15),
    placeholderData: keepPreviousData,
  });
