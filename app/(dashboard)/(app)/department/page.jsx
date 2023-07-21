'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { setDep, toggleAddModalDep } from '@/components/partials/app/department-service/store';
import GridLoading from '@/components/skeleton/Grid';
import TableLoading from '@/components/skeleton/Table';
import Button from '@/components/ui/Button';
import useWidth from '@/hooks/useWidth';
import AddDepartment from '@/components/partials/app/department-service/AddDepartment';
import EditDepartment from "../../../../components/partials/app/department-service/EditDepartment"
import DepartmentList from '@/components/partials/app/department-service/DepartmentList';
import { fetchData } from '@/components/partials/app/service';


const DepartmentPostPage = () => {
	const filter = 'list';
	// use width is necessary for the repsonsive layout
	const { width, breakpoints } = useWidth();
	const [isLoaded, setIsLoaded] = useState(false);
	const { deps } = useSelector((state) => state.department);
	const [allDepartment, setAllDepartment] = useState([]);
	const dispatch = useDispatch();
	useEffect(
		() => {
			setIsLoaded(true);
			fetchDepartments();

		}, [deps]);
	const fetchDepartments = async () => {
		try {
			await fetchData("/department/get-all?page=0&size=1000", {}, "GET").then((res) => {
				if (res) {
					setAllDepartment(res?.content);
					dispatch(setDep(res?.content))
					setIsLoaded(false);
				}
			});
		} catch (error) {
			console.log(error);
			toast.error(error, {
				position: "top-right",
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	};


	return (
		<div>
			<ToastContainer />
			<div className="flex flex-wrap justify-between items-center mb-4">
				<h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
					Department
				</h4>
				<div
					className={`${width < breakpoints.md ? 'space-x-rb' : ''
						} md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
				>
					<Button
						icon="heroicons-outline:plus"
						text="Add Department"
						className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
						iconClass=" text-lg"
						onClick={() => dispatch(toggleAddModalDep(true))}
					/>
				</div>
			</div>

			{isLoaded && filter === 'list' && <TableLoading count={deps?.length} />}

			{filter === 'list' && !isLoaded && (
				<div>
					<DepartmentList departments={allDepartment} />
				</div>
			)}

			<AddDepartment />
			<EditDepartment />
		</div>
	);
};

export default DepartmentPostPage;
