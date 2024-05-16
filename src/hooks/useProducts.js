import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetch = (query) => axios.post(API_URL, {query}).then(data => data);

const mountQuery = () => {

    return `
        query {
              allProducts {
                id,
                team,
                price,
                directory,
                league
              }
            }
    `;
}

export const useProducts = () => {
    const query = mountQuery();
    const { data } = useQuery({
        queryFn: () => fetch(query),
        queryKey: ['products']
    });

    return {
        data: data?.data?.data?.allProducts
    }
};