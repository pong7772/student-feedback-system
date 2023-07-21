
import React, { useState } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddModal, pushUser, pushBatch, batchToggleAddModal } from "./store";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { fetchData } from "../service";

function BatchForm({ departmentOption }) {
    const dispatch = useDispatch();

    const FormValidationSchema = yup
        .object({
            batchNumber: yup.string().required("Batch is required"),
            departmentId: yup.mixed().required("Department is required"),
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
        const newBatch = {
            departmentId: data.departmentId.value,
            batchNumber: data.batchNumber,
        };
        await fetchData(
            "/batch/create",
            newBatch,
            "POST"
        ).then((res) => {
            dispatch(pushBatch(res));
            dispatch(batchToggleAddModal(false));
        }).catch((err) => {
            console.log(err);
        });
        reset();
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
                <label className="form-label" htmlFor="icon_s">
                    Select Department
                </label>
                <Controller
                    name="departmentId"
                    control={control}
                    render={({ field }) => {
                        return (
                            <Select
                                {...field}
                                options={departmentOption}
                                className="react-select "
                                classNamePrefix="select"
                                id="icon_s"
                            />
                        )
                    }
                    }
                />
                <Textinput
                    name="batchNumber"
                    label="Batch Number"
                    placeholder="Batch Number"
                    register={register}
                    error={errors.batch}
                />


                <div className="ltr:text-right rtl:text-left">
                    <button className="btn btn-dark  text-center">Add</button>
                </div>
            </form>
        </div>
    )
}

export default BatchForm