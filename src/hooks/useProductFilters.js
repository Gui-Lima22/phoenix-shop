import { useEffect, useState } from 'react';
import productService from '@/service/product-service';

const useProductFilters = () => {
    const [options, setOptions] = useState({});
    const [teams, setTeams] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        productService.options().then(({ data }) => {
            setOptions({
                colors: data.color,
                teams: data.teams,
                sizes: ['PP', 'P', 'M', 'G', 'GG', 'XGG']
            });
        });
    }, []);

    useEffect(() => {
        const preparedFilters = [];

        if (teams.length) preparedFilters.push({ field: "team", value: teams });
        if (colors.length) preparedFilters.push({ field: "colors", value: colors });
        if (sizes.length) preparedFilters.push({ field: "size", value: sizes });

        const handler = setTimeout(() => setFilters(preparedFilters), 300);

        return () => clearTimeout(handler);
    }, [teams, colors, sizes]);

    return {
        options,
        teams, setTeams,
        colors, setColors,
        sizes, setSizes,
        filters
    };
};

export default useProductFilters;
