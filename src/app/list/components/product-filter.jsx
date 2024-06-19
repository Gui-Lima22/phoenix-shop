"use client"

import React, {useEffect, useState} from 'react';
import {Checkbox, Dialog, DialogPanel, DialogTitle, Menu, MenuButton, MenuItem, MenuItems, Transition, TransitionChild} from "@headlessui/react";
import {ChevronDownIcon, FunnelIcon, XMarkIcon} from "@heroicons/react/24/outline";
import useProductFilters from "@/hooks/useProductFilters";

const ProductsFilter = ({onSortChange, onFiltersChange}) => {
    const [isOpen, setOpen] = useState(false);
    const { options, teams, setTeams, colors, setColors, sizes, setSizes, filters } = useProductFilters();

    const handleCheckbox = (target, checked, set, id) => {
        let newTarget = [...target];
        if (!checked) newTarget = target.filter(item => item !== id);
        else newTarget.push(id);

        set(newTarget);
    }

    useEffect(() => onFiltersChange(filters), [filters, onFiltersChange]);

    return (
        <div className="flex w-full justify-end items-center gap-2 mb-2">
            <Menu>
                <MenuButton className="flex gap-1 text-gray-600 float-end">
                    Organizar por
                    <ChevronDownIcon className="h-6 w-6" aria-hidden="true"/>
                </MenuButton>
                <Transition
                    enter="transition ease-out duration-75"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <MenuItems
                        anchor="bottom end"
                        className="w-52 origin-top-right rounded-xl border border-white/5 bg-white p-1 text-sm/6 text-gray-600 [--anchor-gap:var(--spacing-1)] focus:outline-none"
                    >
                        <MenuItem>
                            <button type="button" onClick={() => onSortChange({field: "p.id", dir: "asc"})}
                                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-200"
                            >
                                Relevância
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button type="button" onClick={() => onSortChange({field: "team", dir: "asc"})}
                                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-200"
                            >
                                Nome
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button type="button" onClick={() => onSortChange({field: "price", dir: "asc"})}
                                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-200"
                            >
                                Menor preço
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button type="button" onClick={() => onSortChange({field: "price", dir: "desc"})}
                                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-200"
                            >
                                Maior preço
                            </button>
                        </MenuItem>
                    </MenuItems>
                </Transition>
            </Menu>
            <button
                type="button" onClick={() => setOpen(!isOpen)} title="Filtros"
                className="relative rounded-full p-1 text-gray-900 hover:text-gray-600 focus:outline-none"
            >
                <FunnelIcon className="h-6 w-6" aria-hidden="true"/>
            </button>

            <Transition show={isOpen}>
                <Dialog className="relative z-10" onClose={setOpen}>
                    <TransitionChild
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <TransitionChild
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <DialogPanel className="relative w-screen max-w-md">
                                        <TransitionChild
                                            enter="ease-in-out duration-500"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in-out duration-500"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div
                                                className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                                <button
                                                    type="button"
                                                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                                </button>
                                            </div>
                                        </TransitionChild>
                                        <div
                                            className="bg-gray-200 flex h-full flex-col overflow-y-scroll py-6 shadow-xl">
                                            <div className="px-4 sm:px-6 mb-2">
                                                <DialogTitle className="text-lg leading-6 text-gray-600">
                                                    Filtros
                                                </DialogTitle>
                                            </div>

                                            <hr className="spacer mb-2"/>

                                            <div className="relative flex-1 px-4 sm:px-6 overflow-auto">
                                                <div className="border-b border-gray-300 py-6">
                                                    <span
                                                        className="font-medium text-gray-600 group-data-[hover]:text-gray-500">Times</span>

                                                    <div className="space-y-6 mt-4 max-h-60 overflow-auto">
                                                        {
                                                            options?.teams?.map(team => {
                                                                const checked = teams.includes(team)
                                                                return (
                                                                    <div key={team} className="flex items-center">
                                                                        <input
                                                                            id={team}
                                                                            name={`1`}
                                                                            checked={checked}
                                                                            type="checkbox"
                                                                            onChange={(e) => handleCheckbox(teams, e.target.checked, setTeams, team)}
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label htmlFor={team}
                                                                               className="ml-3 min-w-0 flex-1 text-gray-600 select-none"
                                                                        >
                                                                            {team}
                                                                        </label>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                <div className="border-b border-gray-300 py-6">
                                                    <span
                                                        className="font-medium text-gray-700 group-data-[hover]:text-gray-500">Cores</span>

                                                    <div className="space-y-6 mt-4">
                                                        <div
                                                            className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                                            {
                                                                options?.colors?.map(color => {
                                                                    const checked = colors.includes(color);
                                                                    return (
                                                                        <Checkbox
                                                                            key={color}
                                                                            id={color}
                                                                            checked={checked}
                                                                            onChange={(e) => handleCheckbox(colors, e, setColors, color)}
                                                                            className={"cursor-pointer bg-" + color + " shadow-sm group rounded-full border py-4 sm:py-6 focus:outline-none sm:flex-1 data-[checked]:border-2 data-[checked]:border-indigo-500"}
                                                                        >
                                                                        </Checkbox>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="border-b border-gray-300 py-6">
                                                    <span
                                                        className="font-medium text-gray-600 group-data-[hover]:text-gray-500">Tamanhos</span>

                                                    <div className="space-y-6 mt-4">
                                                        <div className="flex items-center">

                                                            <div
                                                                className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                                                {
                                                                    options?.sizes?.map(size => {
                                                                        const checked = sizes.includes(size);
                                                                        return (
                                                                            <Checkbox
                                                                                key={size}
                                                                                id={size}
                                                                                checked={checked}
                                                                                onChange={(e) => handleCheckbox(sizes, e, setSizes, size)}
                                                                                className="cursor-pointer bg-white text-gray-700 shadow-sm group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 data-[checked]:border-2 data-[checked]:border-indigo-500"
                                                                            >
                                                                                {size}
                                                                            </Checkbox>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default ProductsFilter;