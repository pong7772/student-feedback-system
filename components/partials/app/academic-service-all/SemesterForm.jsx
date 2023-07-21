
import React, { useState } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { semesterToggleAddModal, pushSemester } from "./store";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import Moment from "moment";
import FormGroup from "@/components/ui/FormGroup";
import { fetchData } from "../service";

function SemesterForm({ batchOption }) {
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const FormValidationSchema = yup
        .object({
            semesterNumber: yup.mixed().required("Semester is required"),
            credit: yup.string().required("Credit Amount is required"),
            startDate: yup.date().required("Start Date is required"),
            endDate: yup.date().required("End Date is required"),
            batch: yup.mixed().required("Batch is required"),
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
        const semester = {
            id: data.batch.value,
            semesterNumber: data.semesterNumber,
            credit: data.credit,
            // startDate: data.startDate?.toISOString().split("T")[0],
            startDate: Moment(data.startDate).format("DD-MM-YYYY"),
            endDate: Moment(data.endDate).format("DD-MM-YYYY"),
        };
        await fetchData(
            "/semester/create",
            semester,
            "POST"
        ).then((res) => {
            dispatch(semesterToggleAddModal(false));
            dispatch(pushSemester(res));
        }).catch((err) => {
            console.log(err);
        });
        dispatch(semesterToggleAddModal(false));
        reset();
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
                <Textinput
                    name="semesterNumber"
                    label="semester Number"
                    placeholder="semester Number"
                    register={register}

                />
                <Textinput
                    name="credit"
                    label="Credits"
                    placeholder="Credits"
                    register={register}

                />
                <label className="form-label" htmlFor="icon_s">
                    Assign To Batch
                </label>
                <Controller
                    name="batch"
                    control={control}
                    render={({ field }) => {
                        return (
                            <Select
                                {...field}
                                options={batchOption}
                                className="react-select "
                                classNamePrefix="select"
                                id="icon_s"
                            />
                        )
                    }
                    }
                />
                <div className="grid lg:grid-cols-2 gap-4 grid-cols-1">
                    <FormGroup
                        label="Start Date"
                        id="default-picker"
                        error={errors.startDate}
                    >
                        <Controller
                            name="startDate"
                            control={control}
                            render={({ field }) => (
                                <Flatpickr
                                    className="form-control py-2"
                                    id="default-picker"
                                    placeholder="yyyy, dd M"
                                    value={startDate}
                                    onChange={(date) => {
                                        field.onChange(date);
                                    }}
                                    options={{
                                        altInput: true,
                                        altFormat: "F j, Y",
                                        dateFormat: "Y-m-d",
                                    }}
                                />
                            )}
                        />
                    </FormGroup>
                    <FormGroup
                        label="End Date"
                        id="default-picker2"
                        error={errors.endDate}
                    >
                        <Controller
                            name="endDate"
                            control={control}
                            render={({ field }) => (
                                <Flatpickr
                                    className="form-control py-2"
                                    id="default-picker2"
                                    placeholder="yyyy, dd M"
                                    value={endDate}
                                    onChange={(date) => {
                                        field.onChange(date);
                                    }}
                                    options={{
                                        altInput: true,
                                        altFormat: "F j, Y",
                                        dateFormat: "Y-m-d",
                                    }}
                                />
                            )}
                        />
                    </FormGroup>
                </div>

                <div className="ltr:text-right rtl:text-left">
                    <button className="btn btn-dark  text-center">Add</button>
                </div>
            </form>
        </div>
    )
}

export default SemesterForm