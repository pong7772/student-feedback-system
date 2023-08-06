"use client"
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import UserGrid from "@/components/partials/app/user-service/UserGrid";
import AcademicList from "@/components/partials/app/academic-service-all/AcademicList";
import ListLoading from "@/components/skeleton/ListLoading";
import TableLoading from "@/components/skeleton/Table";
import AddAcademic from "@/components/partials/app/academic-service-all/AddAcademic";
import { setDep, toggleAddModalDep } from '@/components/partials/app/department-service/store';
// import EditAcademic from "@/components/partials/app/academic-service-all/EditAcademic";
import { ToastContainer, toast } from "react-toastify";
import { batchToggleAddModal, courseToggleAddModal, semesterToggleAddModal } from "@/components/partials/app/academic-service-all/store";
import { fetchData } from "@/components/partials/app/service";
import { useRouter, usePathname } from "next/navigation";
import Card from "@/components/ui/Card";
import Step from "@/components/partials/step";
import DepartmentList from "@/components/partials/app/department-service/DepartmentList";
import AddDepartment from '@/components/partials/app/department-service/AddDepartment';
import EditDepartment from "../../../../components/partials/app/department-service/EditDepartment"
const AcademicPostPage = () => {
    const router = useRouter()
    const pathname = usePathname()

    const [filler, setFiller] = useState("department");
    // use width is necessary for the repsonsive layout
    const { width, breakpoints } = useWidth();
    const [isLoaded, setIsLoaded] = useState(false);
    const [allCourses, setAllCourses] = useState([]);
    const [allBatches, setAllBatches] = useState([]);
    const [allSemesters, setAllSemesters] = useState([]);
    const [allLecturer, setAllLecturer] = useState([])
    const [allDepartment, setAllDepartment] = useState([]);
    const { courses } = useSelector((state) => state.course);
    const { batches } = useSelector((state) => state.batch);
    const { semesters } = useSelector((state) => state.semester)
    const { users } = useSelector((state) => state.auth)
    const { deps } = useSelector((state) => state.department);


    const dispatch = useDispatch();
    useEffect(() => {
        // this is the loading animation need to implemnent with backend 
        setIsLoaded(true);
        fetchDepartments();
        fetchAllBatch();
        fetchAllCourse();
        fetchAllSemester();
        fetchAllLecturer();
    }, [filler, courses, batches, semesters, deps]);
    const fetchAllBatch = async () => {
        try {
            await fetchData(
                "/batch/get-all?page=0&size=1000", {},
                "GET"
            ).then(batch => {
                if (batch) {
                    setAllBatches(batch.content)
                    setIsLoaded(false)
                }
            }
            )

        } catch (error) {
            setIsLoaded(false)
            toast.error(
                error,
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            )
        }
    }

    const fetchAllCourse = async () => {
        try {
            await fetchData(
                "/course/get-all?page=0&size=1000", {}, "GET"
            ).then(course => {
                if (course) {
                    setAllCourses(course.content)
                    setIsLoaded(false)
                }
            }
            )

        } catch (error) {
            setIsLoaded(false)
            toast.error(
                error,
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            )
        }
    }
    const fetchAllSemester = async () => {
        try {
            await fetchData(
                "/semester/get-all?page=0&size=1000", {}, "GET"
            ).then(semester => {
                if (semester) {
                    setAllSemesters(semester.content)
                    setIsLoaded(false)
                }
            }
            )

        } catch (error) {
            setIsLoaded(false)
            toast.error(
                error,
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            )
        }
    }
    const fetchAllLecturer = async () => {
        try {
            await fetchData(
                "/lecturer/get-all-lecturer?page=0&size=100", {}, "GET"
            ).then(lecturer => {
                if (lecturer) {
                    setAllLecturer(lecturer.contents)
                    setIsLoaded(false)
                }
            }
            )

        } catch (error) {
            setIsLoaded(false)
            toast.error(
                error,
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            )
        }
    }
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
            <div className="mb-4 flex flex-wrap items-center justify-between">


                <h4 className="inline-block text-xl font-medium capitalize text-slate-900 ltr:pr-4 rtl:pl-4 lg:text-2xl">
                    Academic - {filler}
                </h4>
                <div
                    className={`${width < breakpoints.md ? "space-x-rb" : ""
                        } items-center rtl:space-x-reverse md:flex md:justify-end md:space-x-4`}
                >
                    <Button
                        icon="heroicons-outline:clipboard-check"
                        text="Department view"
                        disabled={isLoaded}
                        className={`${filler === "department"
                            ? "bg-slate-900 text-white  dark:bg-slate-700"
                            : " bg-white dark:bg-slate-800 dark:text-slate-300"
                            }   h-min text-sm font-normal`}
                        iconClass=" text-lg"
                        onClick={() => setFiller("department")}
                    />
                    <div
                        className=" bg-slate-400 text-white ring-primary-500 ring-offset-2 h-12 w-12 rounded-full flex flex-col items-center justify-center relative z-[66] ring-1 text-lg font-medium"
                    >
                        {filler == "department" ? (
                            <span className="text-sm font-medium"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><g fill="#1565C0"><path d="M46.1 24L33 35V13zM10 20h4v8h-4zm-6 0h4v8H4zm12 0h4v8h-4z" /><path d="M22 20h14v8H22z" /></g></svg></span>
                        ) : (
                            <span className="text-3xl">
                                <Icon icon="bx:check-double" />
                            </span>
                        )}
                    </div>
                    <Button
                        icon="heroicons-outline:clipboard-check"
                        text="Batch view"
                        disabled={isLoaded}
                        className={`${filler === "batch"
                            ? "bg-slate-900 text-white  dark:bg-slate-700"
                            : " bg-white dark:bg-slate-800 dark:text-slate-300"
                            }   h-min text-sm font-normal`}
                        iconClass=" text-lg"
                        onClick={() => setFiller("batch")}
                    />
                    <div
                        className=" bg-slate-400 text-white ring-primary-500 ring-offset-2 h-12 w-12 rounded-full flex flex-col items-center justify-center relative z-[66] ring-1 text-lg font-medium"
                    >
                        {filler == "batch" && (
                            <span className="text-sm font-medium"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><g fill="#1565C0"><path d="M46.1 24L33 35V13zM10 20h4v8h-4zm-6 0h4v8H4zm12 0h4v8h-4z" /><path d="M22 20h14v8H22z" /></g></svg></span>
                        )}
                        {
                            filler !== 'batch' && filler !== 'department' && (
                                <span className="text-3xl">
                                    <Icon icon="bx:check-double" />
                                </span>
                            )
                        }
                    </div>
                    <Button
                        icon="heroicons-outline:view-grid"
                        text="Semester view"
                        disabled={isLoaded}
                        className={`${filler === "semester"
                            ? "bg-slate-900 text-white dark:bg-slate-700"
                            : " bg-white dark:bg-slate-800 dark:text-slate-300"
                            }   h-min text-sm font-normal`}
                        iconClass=" text-lg"
                        onClick={() => setFiller("semester")}
                    />
                    <div
                        className=" bg-slate-400 text-white ring-primary-500 ring-offset-2 h-12 w-12 rounded-full flex flex-col items-center justify-center relative z-[66] ring-1 text-lg font-medium"
                    >
                        {filler == "semester" && (
                            <span className="text-sm font-medium"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><g fill="#1565C0"><path d="M46.1 24L33 35V13zM10 20h4v8h-4zm-6 0h4v8H4zm12 0h4v8h-4z" /><path d="M22 20h14v8H22z" /></g></svg></span>
                        )}
                        {
                            filler !== 'batch' && filler !== 'department' && filler !== "semester" && (
                                <span className="text-3xl">
                                    <Icon icon="bx:check-double" />
                                </span>
                            )
                        }

                    </div>
                    <Button
                        icon="heroicons-outline:academic-cap"
                        text="Course view"
                        disabled={isLoaded}
                        className={`${filler === "course"
                            ? "bg-slate-900 text-white  dark:bg-slate-700"
                            : " bg-white dark:bg-slate-800 dark:text-slate-300"
                            }   h-min text-sm font-normal`}
                        iconClass=" text-lg"
                        onClick={() => setFiller("course")}
                    />

                    <Button
                        icon="heroicons-outline:plus"
                        text={`Add new ${filler}`}
                        className="btn-dark h-min  text-sm font-normal dark:bg-slate-800"
                        iconClass=" text-lg"
                        onClick={() => filler == 'course' ? dispatch(courseToggleAddModal(true)) : filler == 'batch' ? dispatch(batchToggleAddModal(true)) : filler == 'semester' ? dispatch(semesterToggleAddModal(true)) : dispatch(toggleAddModalDep(true))}
                    />
                </div>
            </div>
            {
                isLoaded && filler === "course" && (
                    <TableLoading count={courses?.length} items={courses} />
                )
            }
            {
                isLoaded && filler === "batch" && (
                    <TableLoading count={courses?.length} items={courses} />
                )
            }
            {
                isLoaded && filler === "semester" && (
                    <TableLoading count={courses?.length} items={courses} />
                )
            }
            {
                isLoaded && filler === "department" && (
                    <TableLoading count={courses?.length} items={courses} />
                )
            }


            {
                filler === "batch" && !isLoaded && (
                    <div>
                        <AcademicList projects={allBatches} filler={filler} />
                    </div>
                )
            }

            {
                filler === "semester" && !isLoaded && (
                    <div>
                        <AcademicList projects={allSemesters} filler={filler} />
                    </div>
                )
            }
            {
                filler === "course" && !isLoaded && (
                    <div>
                        <AcademicList projects={allCourses} filler={filler} />
                    </div>
                )
            }
            {
                filler === "department" && !isLoaded && (
                    <div>
                        <DepartmentList departments={allDepartment} />
                    </div>
                )
            }

            <AddAcademic filler={filler} lecturerOption={allLecturer} semesterOption={allSemesters} batchOption={allBatches} />
            {/* <EditAcademic filler={filler} /> */}
            <AddDepartment />
            <EditDepartment />
        </div >

    );
};

export default AcademicPostPage;
