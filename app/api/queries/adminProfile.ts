import { queryOptions } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";

export const adminProfileKey = "profile";
export const adminProfileQuery = queryOptions({
  queryKey: [adminProfileKey],
  queryFn: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    return data;
  },
});
