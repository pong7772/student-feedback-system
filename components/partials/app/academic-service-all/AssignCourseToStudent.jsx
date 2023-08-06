
import React, { useState } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddModal, pushUser, pushCourse, courseToggleAddModal, assignCourseToggleModal } from "./store";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { fetchData } from "../service";
import { toast } from "react-toastify";

function AssignCourseToStudent({ assignCourseOptions, student }) {
    const studentHaveCourse = student?.courses?.map((course) => {
        return {
            value: course.id,
            label: course.name,
        };
    });

    const filterCourse = assignCourseOptions?.filter((course) => {
        return !studentHaveCourse?.some((course1) => course1.value === course.value);
    });
    const dispatch = useDispatch();

    const FormValidationSchema = yup
        .object({
            courseId: yup.mixed().required("Course is required"),
            studentId: yup.mixed().required("Student is required"),

        })
        .required();

    const {
        register,
        control,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
        mode: "all",
    });

    const onSubmit = async (data) => {
        const params = {
            courseId: data.courseId.value,
            studentId: data.studentId.value,
        }
        await fetchData("/student/assign-course-to-student", params, "POST").then((res) => {
            if (res) {
                toast.success("Course Assigned Successfully");
            }
            if (res.status === 400) {
                toast.error("Course Already Assigned");
            }
            dispatch(assignCourseToggleModal(false));
            reset();
        }
        ).catch((err) => {
            toast.error("Course Already Assigned");
            dispatch(assignCourseToggleModal(false));
            reset();
        }
        )
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
                <label className="form-label" htmlFor="icon_s">
                    Select Course
                </label>
                <Controller
                    name="courseId"
                    control={control}
                    render={({ field }) => {
                        return (
                            <Select
                                {...field}
                                options={filterCourse}
                                className="react-select "
                                classNamePrefix="select"
                                id="icon_s"
                            />
                        )
                    }
                    }
                />
                {
                    errors.courseId && (
                        <div className="text-red-500">
                            {errors.courseId.message}
                        </div>
                    )
                }
                <label className="form-label" htmlFor="icon_s">
                    Select Student
                </label>
                <Controller
                    name="studentId"
                    control={control}
                    render={({ field }) => {
                        return (
                            <Select
                                {...field}
                                options={student}
                                className="react-select "
                                classNamePrefix="select"
                                id="icon_s"
                            />
                        )
                    }
                    }
                />

                {
                    errors.studentId && (
                        <div className="text-red-500">
                            {errors.studentId.message}
                        </div>
                    )
                }


                <div className="ltr:text-right rtl:text-left">
                    <button className="btn btn-dark  text-center">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AssignCourseToStudent