import React from 'react';
import Image from "next/image";
import { useProducts } from "@/hooks/useProducts";
import { formatPrice } from '@/utils/format-price';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const ProductsList = ({ isOpen, setOpen }) => {
	const { data } = useProducts();

	return (
		<React.Fragment>
			<div className="container">
				{
					data?.map(item =>
						<React.Fragment key={item.id}>
							<a className="card-list cursor-pointer" href={"/product/" + item.id}>
								<Image
									src={"/teams/" + item.directory + "/1.jpg"} alt=""
									width={256}
									height={300}
									quality={100}
								/>

								<div className="card-content">
									<h3>{item.team}</h3>
									<hr className="spacer" />
									<p>{formatPrice(item.price)}</p>
								</div>
							</a>
						</React.Fragment>
					)
				}
			</div>
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
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</TransitionChild>

					<div className="fixed inset-0 overflow-hidden">
						<div className="absolute inset-0 overflow-hidden">
							<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
								<TransitionChild
									enter="transform transition ease-in-out duration-500 sm:duration-700"
									enterFrom="translate-x-full"
									enterTo="translate-x-0"
									leave="transform transition ease-in-out duration-500 sm:duration-700"
									leaveFrom="translate-x-0"
									leaveTo="translate-x-full"
								>
									<DialogPanel className="pointer-events-auto relative w-screen max-w-md">
										<TransitionChild
											enter="ease-in-out duration-500"
											enterFrom="opacity-0"
											enterTo="opacity-100"
											leave="ease-in-out duration-500"
											leaveFrom="opacity-100"
											leaveTo="opacity-0"
										>
											<div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
												<button
													type="button"
													className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
													onClick={() => setOpen(false)}
												>
													<XMarkIcon className="h-6 w-6" aria-hidden="true" />
												</button>
											</div>
										</TransitionChild>
										<div className="bg-gray-200 flex h-full flex-col overflow-y-scroll py-6 shadow-xl">
											<div className="px-4 sm:px-6 mb-2">
												<DialogTitle className="text-lg leading-6 text-gray-900">
													Filtros
												</DialogTitle>
											</div>

											<hr className="spacer mb-2"/> 

											<div className="relative mt-6 flex-1 px-4 sm:px-6">

											</div>
										</div>
									</DialogPanel>
								</TransitionChild>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition>
		</React.Fragment>

	);
}

export default ProductsList;