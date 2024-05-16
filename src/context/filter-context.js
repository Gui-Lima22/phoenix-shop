"use client"

import { createContext, useState } from "react";

export const FilterContext = createContext(undefined)

export const FilterProvider = ({ children }) => {
	const [priority, setPriority] = useState("Relevance");

	return (
		<FilterContext.Provider value={{ priority, setPriority }}>
			{children}
		</FilterContext.Provider>
	);
}