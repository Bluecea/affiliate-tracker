import { queryOptions } from "@tanstack/react-query";
import { getWallet } from "../../lib/api";

export const walletKey = "wallet";
export const walletQuery = queryOptions({
  queryKey: [walletKey],
  queryFn: getWallet,
});
