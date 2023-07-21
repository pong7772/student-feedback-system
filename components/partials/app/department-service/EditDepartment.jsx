import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleEditModal, toggleEditModalDep, updateDep, updateUser } from "./store";
import Icon from "@/components/ui/Icon";
import Textarea from "@/components/ui/Textarea";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import FormGroup from "@/components/ui/FormGroup";
import Textinput from "@/components/ui/Textinput";
import { fetchData } from "../service";
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



const EditDepartment = () => {
  const { editModal, editItem } = useSelector((state) => state.department);
  const { openProjectModal } = useSelector((state) => state.department);
  const dispatch = useDispatch();

  const FormValidationSchema = yup
    .object({
      name: yup.string().required("Title is required"),

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

  useEffect(() => {
    reset(editItem);
  }, [editItem]);

  const onSubmit = async (data) => {

    try {
      await fetchData("/department/edit",
        {
          id: data.id,
          name: data.name,
        },
        "POST"
      ).then(
        (res) => {
          if (res) {
            dispatch(
              updateDep({
                id: data.id,
                name: data.name,
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
          } else {
            dispatch(toggleEditModal(false));
            toast.error("Something went wrong", {
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
      )

    } catch (error) {
      console.log(error)
      toast.error(error
        , {
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
  };

  return (
    <Modal
      title="Create User"
      labelclassName="btn-outline-dark"
      activeModal={editModal}
      onClose={() => dispatch(toggleEditModalDep(false))}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <Textinput
          name="name"
          label="Department"
          placeholder="Enter Department Name"
          register={register}
          error={errors.title}
        />

        <div className="ltr:text-right rtl:text-left">
          <button className="btn btn-dark  text-center">Add</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditDepartment;
