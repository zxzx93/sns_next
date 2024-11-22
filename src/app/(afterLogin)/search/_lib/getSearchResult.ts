import { log } from "console";
import { Post } from "@/model/Post";
import { QueryFunction } from "@tanstack/react-query";

type SearchParams = {
  q: string;
  f?: string;
  pf?: string;
};

type QueryFunctionParams = [_1: string, _2: string, searchParams: SearchParams];

export const getSearchResult: QueryFunction<
  Post[],
  QueryFunctionParams
> = async ({ queryKey }) => {
  const [_1, _2, searchParams] = queryKey;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${
      searchParams.q
    }?${searchParams.toString()}`,
    {
      next: {
        tags: ["posts", "search", searchParams.q],
      },
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("failed to fetch");
  return res.json();
};
