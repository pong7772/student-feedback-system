'use client'
import React, { useState } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { courseToggleAddModal, semesterToggleAddModal, batchToggleAddModal } from "./store";
import CourseForm from "./CourseForm";
import BatchForm from "./BatchForm";
import SemesterForm from "./SemesterForm";


const assigneeOptions = [
  {
    value: "Pong",
    label: "Pong",
    image: "/assets/images/avatar/av-1.svg",
  },
  {
    value: "Leakhena",
    label: "Leakhena",
    image: "/assets/images/avatar/av-2.svg",
  },
  {
    value: "Pitou",
    label: "Pitou",
    image: "/assets/images/avatar/av-3.svg",
  },

];
const options = [
  {
    value: "semester 1",
    label: " Semester 1",
  },
  {
    value: "semester 2",
    label: "Semester 2",
  },
  {
    value: "semester 3",
    label: "Semester 3",
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

const AddAcademic = ({ filler, lecturerOption, semesterOption, batchOption }) => {
  const { openProjectModal } = useSelector(filler == "course" ? (state) => state.course : filler == 'batch' ? (state) => state.batch : (state) => state.semester);
  const dispatch = useDispatch();
  const { storeDepartment } = useSelector((state) => state.department)
  const optionDepartment = storeDepartment.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  const optionLecturer = lecturerOption?.map((item, id) => {
    return {
      value: item.id,
      label: item.name,
      image: `/assets/images/avatar/av-${id + 1}.svg`,
    }
  })
  const optionSemester = semesterOption?.map((item) => {
    return {
      value: item.id,
      label: `Semester - ${item.semesterNumber}`,
    }
  })
  const optionBatch = batchOption?.map((item) => {
    return {
      value: item.id,
      label: `Batch - ${item.batchNumber}`,
    }
  })


  return (
    <div>
      <Modal
        title={`Create a new ${filler.toUpperCase()}`}
        labelclassName="btn-outline-dark"
        activeModal={openProjectModal}
        onClose={() => dispatch(filler == 'course' ? dispatch(courseToggleAddModal(false)) : filler == 'batch' ? dispatch(batchToggleAddModal(false)) : dispatch(semesterToggleAddModal(false)))}
      >
        {
          filler == 'course' ? <CourseForm assigneeOptions={optionLecturer} option={optionSemester} OptionComponent={OptionComponent} /> : filler == "batch" ? <BatchForm departmentOption={optionDepartment} /> : <SemesterForm batchOption={optionBatch} />
        }

      </Modal>
    </div>
  );
};

export default AddAcademic;
