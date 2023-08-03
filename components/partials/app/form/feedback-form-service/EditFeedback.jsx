import { toggleEditModal, update } from "./store";
import FormGroup from "@/components/ui/FormGroup";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";
import Textarea from "@/components/ui/Textarea";
import Textinput from "@/components/ui/Textinput";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchData } from "components/partials/app/service";
import React, { useState, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import Select, { components } from "react-select";
import { toast } from "react-toastify";
import * as yup from "yup";

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

const EditFeedback = () => {
  const { editModal, editItem } = useSelector((state) => state.feedback);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [updateDate, setUpdateDate] = useState(new Date());

  const FormValidationSchema = yup
    .object({
      feedbackFormId: yup.string().required(),
      title: yup.string().required(),
      description: yup.string().required(),
      questions: yup.string().required(),

    })
  // .required();

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

  useEffect(() => {
    reset(editItem);
  }, [editItem]);

  const onSubmit = async (data) => {
    // alert(data);
    console.log(data);
    try {
      console.log(params);
      const params = {
        feedbackFormId: editItem.id,
        description: data.description,
        title: data.title,
        questions: data.questions
      };
      console.log(params)
      await fetchData(`/feedback-form/edit?id=${editItem.id}`, params, "POST").then(
        (res) => {
          if (res) {
            dispatch(
              update({
                feedbackFormId: editItem.id,
                description: data.description,
                title: data.title,
                questions: data.questions
              })
            );
            dispatch(toggleEditModal(false));
            toast.info("Edit Successfully", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        }
      );
    } catch (error) {
      console.log(error);
      toast.error("Edit Failed", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      dispatch(toggleEditModal(false));
    }
  };

  return (
    <Modal
      title="Edit Feedback"
      activeModal={editModal}
      onClose={() => dispatch(toggleEditModal(false))}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <Textinput
          name="feedbackFormId"
          label="Feedback ID"
          placeholder="Enter Feedback Name"
          defaultValue={editItem.id}
          register={register}
          error={errors.title}
        />
        <Textinput
          name="title"
          label="Feedback title"
          placeholder="Enter Feedback title"
          defaultValue={editItem.title}
          register={register}
          error={errors.title}
        />
        <Textinput
          name="description"
          label="Feedback description"
          placeholder="Enter Feedback description"
          defaultValue={editItem.description}
          register={register}
          error={errors.description}
        />
        <Textinput
          name="questions"
          label="Feedback questions"
          placeholder="Enter Feedback questions"
          defaultValue={editItem.questions}
          register={register}
          error={errors.questions}
        />

        <div className="ltr:text-right rtl:text-left">
          <button className="btn btn-dark  text-center">Update</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditFeedback;
