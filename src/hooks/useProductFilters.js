import { useEffect, useState } from 'react';
import productService from '@/service/product-service';
import {useQuery} from "@tanstack/react-query";

const useProductFilters = () => {
    const [teams, setTeams] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [filters, setFilters] = useState([]);

    const {data} = useQuery({
        queryFn: () => productService.options().then(({ data }) => (
            {colors: data.color, teams: data.teams, sizes: ['PP', 'P', 'M', 'G', 'GG', 'XGG']}
        )),
        queryKey: ["options"]
    });

    useEffect(() => {
        const preparedFilters = [];

        if (teams.length) preparedFilters.push({ field: "team", value: teams });
        if (colors.length) preparedFilters.push({ field: "colors", value: colors });
        if (sizes.length) preparedFilters.push({ field: "size", value: sizes });

        const handler = setTimeout(() => setFilters(preparedFilters), 300);

        return () => clearTimeout(handler);
    }, [teams, colors, sizes]);

    return {
        options: data,
        teams, setTeams,
        colors, setColors,
        sizes, setSizes,
        filters
    };
};

export default useProductFilters;
