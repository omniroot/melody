import { api } from "@/shared/api/api.ts";
import { token } from "@/shared/conts/consts.ts";
import { ISearchGenius } from "@features/genius/types/genius.types.ts";
import { createQuery } from "react-query-kit";

interface IProps {
  query: string;
}

const searchGenius = async ({ query }: IProps) => {
  const response = await api.get(`search?q=${query}&access_token=${token}`);
  return response.data;
};

export const useSearchGenius = createQuery<ISearchGenius, IProps>({
  queryKey: ["search-genius"],
  fetcher: async ({ query }) => {
    const response = await searchGenius({ query });
    return response;
  },
});
