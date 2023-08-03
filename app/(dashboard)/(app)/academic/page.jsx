"use client"
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";
import UserGrid from "@/components/partials/app/user-service/UserGrid";
import AcademicList from "@/components/partials/app/academic-service-all/AcademicList";
import ListLoading from "@/components/skeleton/ListLoading";
import TableLoading from "@/components/skeleton/Table";
import AddAcademic from "@/components/partials/app/academic-service-all/AddAcademic";
// import EditAcademic from "@/components/partials/app/academic-service-all/EditAcademic";
import { ToastContainer, toast } from "react-toastify";
import { batchToggleAddModal, courseToggleAddModal, semesterToggleAddModal } from "@/components/partials/app/academic-service-all/store";
import { fetchData } from "@/components/partials/app/service";


const AcademicPostPage = () => {
    const [filler, setFiller] = useState("batch");
    // use width is necessary for the repsonsive layout
    const { width, breakpoints } = useWidth();
    const [isLoaded, setIsLoaded] = useState(false);
    const [allCourses, setAllCourses] = useState([]);
    const [allBatches, setAllBatches] = useState([]);
    const [allSemesters, setAllSemesters] = useState([]);
    const [allLecturer, setAllLecturer] = useState([])
    const { courses } = useSelector((state) => state.course);
    const { batches } = useSelector((state) => state.batch);
    const { semesters } = useSelector((state) => state.semester)

    const dispatch = useDispatch();
    useEffect(() => {
        // this is the loading animation need to implemnent with backend  
        setIsLoaded(true);
        fetchAllBatch();
        fetchAllCourse();
        fetchAllSemester();
        fetchAllLecturer();
    }, [filler, courses, batches, semesters]);
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
                        text="Batch view"
                        disabled={isLoaded}
                        className={`${filler === "batch"
                            ? "bg-slate-900 text-white  dark:bg-slate-700"
                            : " bg-white dark:bg-slate-800 dark:text-slate-300"
                            }   h-min text-sm font-normal`}
                        iconClass=" text-lg"
                        onClick={() => setFiller("batch")}
                    />
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
                        onClick={() => filler == 'course' ? dispatch(courseToggleAddModal(true)) : filler == 'batch' ? dispatch(batchToggleAddModal(true)) : dispatch(semesterToggleAddModal(true))}
                    />
                </div>
            </div>
            {isLoaded && filler === "course" && (
                <TableLoading count={courses?.length} items={courses} />
            )}
            {isLoaded && filler === "batch" && (
                <TableLoading count={courses?.length} items={courses} />
            )}
            {isLoaded && filler === "semester" && (
                <TableLoading count={courses?.length} items={courses} />
            )}


            {filler === "batch" && !isLoaded && (
                <div>
                    <AcademicList projects={allBatches} filler={filler} />
                </div>
            )}

            {filler === "semester" && !isLoaded && (
                <div>
                    <AcademicList projects={allSemesters} filler={filler} />
                </div>
            )}
            {filler === "course" && !isLoaded && (
                <div>
                    <AcademicList projects={allCourses} filler={filler} />
                </div>
            )}
            <AddAcademic filler={filler} lecturerOption={allLecturer} semesterOption={allSemesters} batchOption={allBatches} />
            {/* <EditAcademic filler={filler} /> */}
        </div>
    );
};

export default AcademicPostPage;
