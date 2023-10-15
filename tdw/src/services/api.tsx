import { useQuery } from "react-query";
import axios from "axios";
import { DogApiResponse } from "../utils/interfaces";
import { Alert } from "@mui/material";

export function useQueryDog(params: boolean) {
    let enabled: boolean = params
    return useQuery(["queryDog", params], queryDog, {
        retry: 3,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        keepPreviousData: false,
        enabled: false,
        // refetchInterval: 100
    });
}

export const handleRefresh = () => {
    console.log("handle")
    refetch()
}
export const queryDog = async () => {
    let url = "https://dog.ceo/api/breeds/image/random";
    const response = await axios.get<DogApiResponse>(url);
    return response.data;
};
