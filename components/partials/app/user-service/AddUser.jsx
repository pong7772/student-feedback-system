'use client'
import React, { useState } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddModal, pushUser } from "./store";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import FormGroup from "@/components/ui/FormGroup";
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

const roleOptions = [
  {
    value: "ADMIN",
    label: "ADMIN",
    image: "/assets/images/avatar/av-1.svg",
  },
  {
    value: "STUDENT",
    label: "STUDENT",
    image: "/assets/images/avatar/av-2.svg",
  },
  {
    value: "LECTURER",
    label: "LECTURER",
    image: "/assets/images/avatar/av-3.svg",
  },

];
const d = [
  {
    value: "software engineering",
    label: " Software Engineer",
  },
  {
    value: "data-science",
    label: "Data Science",
  },
  {
    value: "tourist",
    label: "Tourist",
  },
  {
    value: "hospitality-and-management",
    label: " TM Management",
  },
];

const OptionComponent = ({ data, ...props }) => {
  //const Icon = data.icon;

  return (
    <components.Option {...props}>
      <span className="flex items-center space-x-4">
        <div className="flex-none">
          <div className="h-7 w-7 rounded-full">
            <img
              src={data.image}
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
        </div>
        <span className="flex-1">{data.label}</span>
      </span>
    </components.Option>
  );
};

const AddUser = () => {
  const { openProjectModal } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [updateDate, setUpdateDate] = useState(new Date());

  const FormValidationSchema = yup
    .object({
      firstname: yup.string().required("Name is required"),
      lastname: yup.string().required("Name is required"),
      role: yup.mixed().required("role is required"),
      email: yup.string().required("Email is required"),
      password: yup
        .string()
        .min(3, "Password must be at least 3 characters")
        .max(10, "Password shouldn't be more than 20 characters")
        .required("Please enter password"),
      // confirm password
      confirmpassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
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
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const params = {
      username: data.username,
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      role: data.role.value,
      password: data.password
    }

    const { data: newUser } = await axios.post(`${backendUrl}/auth/register`, params
    );
    if (newUser) {
      dispatch(pushUser(newUser));
      dispatch(toggleAddModal(false));
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
      toast.error("Edit Failed", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      dispatch(toggleAddModal(false));
    }
    reset();
  };


  return (
    <div>
      <Modal
        title="Create User"
        labelclassName="btn-outline-dark"
        activeModal={openProjectModal}
        onClose={() => dispatch(toggleAddModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <Textinput
            placeholder="Enter your username"
            name="username"
            // defaultValue={editItem.firstname}
            register={register}
            error={errors.firstname}
            label="Username for login"
          />
          <Textinput
            placeholder="Enter your username"
            name="firstname"
            // defaultValue={editItem.firstname}
            register={register}
            error={errors.firstname}
            label="Firstname"
          />
          {/* firstname */}
          {/* lastname */}
          <Textinput
            placeholder="Enter your lastname"
            name="lastname"
            // defaultValue={editItem.lastname}
            register={register}
            error={errors.lastname}
            label="Lastname"
          />
          {/* role */}
          <div className={errors.role ? "has-error" : ""}>
            <label className="form-label" htmlFor="icon_s">
              role
            </label>
            <Controller
              name="role"
              control={control}
              // defaultValue={editItem.role}
              render={({ field }) => (
                <Select
                  {...field}
                  options={roleOptions}
                  styles={styles}
                  className="react-select"
                  classNamePrefix="select"
                  isSearchable={false}
                  // defaultValue={editItem.role}
                  // isMulti
                  components={{
                    Option: OptionComponent,
                  }}
                  id="icon_s"
                />
              )}
            />
            {errors.role && (
              <div className=" mt-2  text-danger-500 block text-sm">
                {errors.role?.message || errors.role?.label.message}
              </div>
            )}
          </div>

          {/* email  */}
          <Textinput
            placeholder="Enter your email"
            name="email"
            // defaultValue={editItem.email}
            register={register}
            error={errors.email}
            label="Email" />
          <Textinput
            name="password"
            label="Change Passwrod"
            type="password"
            // defaultValue={editItem.password}
            placeholder=" Enter your password"
            register={register}
            error={errors.password}
          />
          <Textinput
            name="confirmpassword"
            label="confirmpassword"
            // defaultValue={editItem.password}
            type="password"
            register={register}
            error={errors.confirmpassword}
          />

          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Add</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddUser;
