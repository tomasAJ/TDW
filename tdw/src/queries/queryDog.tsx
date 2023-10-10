import { useQuery } from "react-query";
import axios from "axios";

export function useQueryDog(params) {
    let enabled = params.value != "";
    return useQuery(["queryDog", params], queryDog, {
        retry: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        keepPreviousData: false,
        enabled: enabled,
    });
}

export const queryDog = async (params) => {
    const [queryName, paramsFilter] = params.queryKey;
    let url = "https://dog.ceo/api/breeds/image/random";
    const { data } = await axios.get(url);
    //console.log(data);
    return data;
};
