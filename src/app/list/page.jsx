"use client"

import React, {useState} from "react";
import ProductsFilter from "@/app/list/components/product-filter";
import ProductsList from "@/app/list/components/product-list";
import "./list.css"

const List = () => {
    const [filters, setFilters] = useState([]);
    const [sort, setSort] = useState({field: "p.id", dir: "asc"});

    return (
        <>
            <hr className="spacer mb-4"/>
            <main className="mx-auto max-w-2xl px-4 pb-16 pt-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24">
                <ProductsFilter onFiltersChange={setFilters} onSortChange={setSort} />
                <ProductsList filters={filters} sort={sort} />
            </main>
        </>
    );
}

export default List;