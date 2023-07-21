import React, { useState } from 'react'
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddModal, pushUser, pushCourse, courseToggleAddModal } from "./store";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormGroup from "@/components/ui/FormGroup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { fetchData } from '../service';
const styles = {
    multiValue: (base, state) => {
        return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
    },
    multiValueLabel: (base, state) => {
        return state.data.isFixed
            ? { ...base, color: "#626262", paddingRight: 6 }
            : base;
    },
    multiValueRemove: (base, state) => {
        return state.data.isFixed ? { ...base, display: "none" } : base;
    },
    option: (provided, state) => ({
        ...provided,
        fontSize: "14px",
    }),
};
function CourseForm({ option, OptionComponent, assigneeOptions }) {

    const dispatch = useDispatch();

    const FormValidationSchema = yup
        .object({
            name: yup.string().required("Course Name is required"),
            credit: yup.string().required("Credit Amount is required"),
            semester: yup.mixed().required("Semester is required"),
            lecturer: yup.mixed().required("Lecturer is required"),
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
        // alert(data)
        console.log(data)
        const params = {
            name: data.name,
            credit: data.credit,
            semesterId: data.semester.value,
            lecturerId: data.lecturer.value,
        }
        // console.log(params)
        await fetchData(
            "/course/create",
            params,
            "POST"
        ).then((res) => {
            dispatch(pushCourse(res));
            dispatch(courseToggleAddModal(false));
        }
        ).catch((err) => {
            console.log(err);
        }
        );
        dispatch(courseToggleAddModal(false));
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            <Textinput
                name="name"
                label="Course Name"
                placeholder="Enter your course name"
                register={register}

            />
            <Textinput
                name="credit"
                label="Credit Amount"
                placeholder="Enter Credit Amount"
                register={register}

            />
            <label className="form-label" htmlFor="icon_s">
                Assign To Semester
            </label>
            <Controller
                name="semester"
                control={control}
                render={({ field }) => {
                    return (
                        <Select
                            {...field}
                            options={option}
                            className="react-select "
                            classNamePrefix="select"
                            id="icon_s"
                        />
                    )
                }
                }
            />
            {errors.takeIn && (
                <div className=" mt-2  text-danger-500 block text-sm">
                    {errors.assign?.message || errors.assign?.label.message}
                </div>
            )}
            <div className={errors.assign ? "has-error" : ""}>
                <label className="form-label" htmlFor="icon_s">
                    Lecturer
                </label>
                <Controller
                    name="lecturer"
                    control={control}
                    render={({ field }) => {
                        return (
                            <Select
                                {...field}
                                options={assigneeOptions}
                                styles={styles}
                                className="react-select"
                                classNamePrefix="select"
                                components={{
                                    Option: OptionComponent,
                                }}
                                id="icon_s"
                            />
                        )
                    }
                    }
                />

            </div>


            <div className="ltr:text-right rtl:text-left ">
                <button className="btn btn-dark  text-center">Add</button>
            </div>
        </form>
    )
}

export default CourseForm