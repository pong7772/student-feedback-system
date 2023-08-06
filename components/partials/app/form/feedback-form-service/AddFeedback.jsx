"use client";

import { push, toggleAddModal, } from "./store";
import { fetchData } from "@/components/partials/app/service";
import FormGroup from "@/components/ui/FormGroup";
import Modal from "@/components/ui/Modal";
import Textarea from "@/components/ui/Textarea";
import Textinput from "@/components/ui/Textinput";
import { yupResolver } from "@hookform/resolvers/yup";
import { TrashIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import Select, { components } from "react-select";
import { v4 as uuidv4 } from "uuid";
import { useFieldArray } from "react-hook-form";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import * as yup from "yup";
import { toast } from "react-toastify";

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

const AddFeedback = ({ courseOptions }) => {
  const { openProjectModal } = useSelector((state) => state.feedback);

  const mappedCourseOptions = courseOptions?.map((courseData) => {
    return {
      value: courseData?.id,
      label: courseData?.name,
    }
  })

  const dispatch = useDispatch();

  const {
    register,
    control,
    reset,
    trigger, setError,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      courseId: "",
      title: "",
      description: "",
      question: [{ question: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "question",
  });


  const onSubmit = async (data) => {
    const formData = {
      courseId: data?.courseId?.value,
      title: data?.title,
      description: data?.description,
      questions: data?.question?.map((question) => question?.question)
    };
    console.log(formData)

    await fetchData("/feedback-form/create", formData, "POST").then((res) => {
      if (res) {
        dispatch(push(res));
      }
    }).catch((err) => {
      toast.error(err, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
      );
    });
    reset();
    dispatch(toggleAddModal(false))
  };

  return (
    <div>
      <Modal
        title="Create Feedback"
        labelclassName="btn-outline-dark"
        activeModal={openProjectModal}
        onClose={() => dispatch(toggleAddModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <div className={errors.courseId ? "has-error" : ""}>
            <label className="form-label">
              Course Name
            </label>
            <Controller
              name="courseId"
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    options={mappedCourseOptions}
                    className="react-select "
                    classNamePrefix="select"
                    id="icon_s"
                  />
                )
              }
              }
            />
          </div>
          <Textinput
            name="title"
            label="Feedback title"
            placeholder="Enter Feedback Title"
            register={register}
            error={errors.title}
          />
          <Textinput
            name="description"
            label="Feedback description"
            placeholder="Enter Feedback description"
            register={register}
            error={errors.description}
          />
          {fields.map((item, index = 1) => (
            <div
              className=" grid gap-5 mb-5 last:mb-0"
              key={index}
            >
              <div className="flex justify-between items-end space-x-5">
                <div className="flex-1">
                  <Textinput
                    label="Question"
                    type="text"
                    id={`name${index}`}
                    placeholder="Enter Question"
                    register={register}
                    name={`question[${index}].question`}
                  />
                </div>
                {index > 0 && (
                  <div className="flex-none relative">
                    <button
                      onClick={() => remove(index)}
                      type="button"
                      className="inline-flex items-center justify-center h-10 w-10 bg-danger-500 text-lg border rounded border-danger-500 text-white"
                    >
                      <Icon icon="heroicons-outline:trash" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}


          <div className="mt-4">
            <Button
              text="Add new Question"
              icon="heroicons-outline:plus"
              className="text-slate-600 p-0 dark:text-slate-300 "
              onClick={() => append()}
            />
          </div>

          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Add</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddFeedback;