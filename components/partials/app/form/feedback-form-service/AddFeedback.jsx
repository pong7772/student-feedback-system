"use client";

import { push, toggleAddModal } from "./store";
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

const AddFeedback = () => {
  const addQuestion = () => {
    setQuestions([...questions, { question: "" }]);
  };

  const [questions, setQuestions] = useState([{ question: "" }]);
  const removeQuestion = (index) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_, i) => i !== index)
    );
  };

  const [courseOptions, setCourseOptions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { openProjectModal } = useSelector((state) => state.feedback);

  const dispatch = useDispatch();

  const FormValidationSchema = yup.object({
    // title: yup.string().required("Title is required"),
    // courseId: yup.string().required("Course is required"),
    // description: yup.string().required("Description is required"),
    // questions: yup.array().required("Questions are required"),
  });
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

  const onSubmit = async (data) => {
    try {
      // const filteredQuestions = data.questions.filter(
      //   (question) => question.trim() !== ""
      // );

      // // Create the desired format for the submission data

      const questions = data.questions
        .filter((q) => q.question.trim() !== "")
        .map((q) => q.question);
      const formData = {
        courseId: "32cbb8c5-efad-451c-9408-2118cf2add31",
        title: data?.title ?? "",
        description: data?.description ?? "",
        questions: questions,
      };

      await fetchData("/feedback-form/create", formData, "POST").then((res) => {
        if (res) {
          dispatch(push(res));
          dispatch(toggleAddModal(false));
        }
        // console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  useEffect(() => {
    // Fetch the course data here, e.g., from the API response you provided
    const courseData = [
      {
        content: [
          {
            createdAt: "2023-07-20T14:30:11.932874182",
            createdBy: "f0bffbb3-9c6c-45ff-a190-70ceb8930047",
            updatedAt: "2023-07-20T14:30:11.932973291",
            updatedBy: "f0bffbb3-9c6c-45ff-a190-70ceb8930047",
            id: "32cbb8c5-efad-451c-9408-2118cf2add31",
            name: "Introduction to React",
            credit: 15,
            feedbackForms: [
              {
                createdAt: "2023-07-20T14:30:56.463369726",
                createdBy: "f0bffbb3-9c6c-45ff-a190-70ceb8930047",
                updatedAt: "2023-07-20T14:30:56.463398703",
                updatedBy: "f0bffbb3-9c6c-45ff-a190-70ceb8930047",
                id: 3,
                title: "Testing Form",
                description: "Testing Description",
                questions: [
                  "Why are you so happy?",
                  "Did you enjoy the course",
                  "Are you sure you want to continue??",
                ],
              },
              {
                createdAt: "2023-07-20T14:31:06.400012016",
                createdBy: "f0bffbb3-9c6c-45ff-a190-70ceb8930047",
                updatedAt: "2023-07-20T14:31:06.400042472",
                updatedBy: "f0bffbb3-9c6c-45ff-a190-70ceb8930047",
                id: 4,
                title: "Testing Form 2",
                description: "Testing Description 2",
                questions: [
                  "Why are you so happy?",
                  "Did you enjoy the course",
                  "Are you sure you want to continue??",
                ],
              },
            ],
          },
          {
            createdAt: "2023-07-20T04:26:13.535553161",
            createdBy: "f0bffbb3-9c6c-45ff-a190-70ceb8930047",
            updatedAt: "2023-07-20T04:26:13.535572172",
            updatedBy: "f0bffbb3-9c6c-45ff-a190-70ceb8930047",
            id: "45cb7664-73db-4a06-8bc3-3dac0ca8e5c7",
            name: "Introduction to Kotlin",
            credit: 15,
            feedbackForms: [
              {
                createdAt: "2023-07-20T04:28:42.565524566",
                createdBy: "f0bffbb3-9c6c-45ff-a190-70ceb8930047",
                updatedAt: "2023-07-20T04:28:42.565561211",
                updatedBy: "f0bffbb3-9c6c-45ff-a190-70ceb8930047",
                id: 2,
                title: "Testing Form",
                description: "Testing Description",
                questions: [
                  "Do you like this course?",
                  "Please rate lecturer based on your liking",
                  "How would you rate the course",
                ],
              },
            ],
          },
          {
            createdAt: "2023-07-20T04:26:27.460158797",
            createdBy: "f0bffbb3-9c6c-45ff-a190-70ceb8930047",
            updatedAt: "2023-07-20T04:26:27.460177259",
            updatedBy: "f0bffbb3-9c6c-45ff-a190-70ceb8930047",
            id: "5c1c4793-0295-4bb9-9e18-bac1fbcc23af",
            name: "Database Management Introduction",
            credit: 15,
            feedbackForms: [
              {
                createdAt: "2023-07-20T04:27:10.086706803",
                createdBy: "f0bffbb3-9c6c-45ff-a190-70ceb8930047",
                updatedAt: "2023-07-20T13:35:31.292060564",
                updatedBy: "f0bffbb3-9c6c-45ff-a190-70ceb8930047",
                id: 1,
                title: "Testing Hello Jesus",
                description: "Testing Description",
                questions: [
                  "Why are you so happy?",
                  "Did you enjoy the course",
                  "Are you sure you want to continue??",
                ],
              },
            ],
          },
        ],
        count: 3,
      },
    ];

    const mappedCourseOptions = courseData[0].content.map((course) => ({
      value: course.id,
      label: course.name,
    }));

    setCourseOptions(mappedCourseOptions);
  }, []);
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
            <label className="form-label" htmlFor="icon_s">
              courseId
            </label>
            <Controller
              name="courseId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={courseOptions}
                  onChange={(selectedOption) =>
                    setSelectedCourse(selectedOption)
                  }
                  register={register}
                  value={selectedCourse}
                  placeholder="Select a course"
                  styles={styles}
                />
              )}
            />
            {errors.course && (
              <div className=" mt-2  text-danger-500 block text-sm">
                {errors.course?.message || errors.course?.label.message}
              </div>
            )}
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
          <label className="form-label" htmlFor="icon_s">
            Questions
          </label>
          {questions.map((q, index) => (
            <div key={index} className="">
              <div className="flex items-center space-x-2">
                <div className="w-[90%]">
                  <Textinput
                    name={`questions[${index}].question`}
                    // label={`Question ${index + 1}`}
                    placeholder={`Enter question ${index + 1}`}
                    register={register}
                    error={errors.questions?.[index]?.question}
                  />
                </div>
                <div className="w-[10%]">
                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(index)}
                      className="btn btn-sm btn-danger"
                    >
                      <TrashIcon />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="ltr:text-right rtl:text-left">
            <button
              type="button"
              onClick={addQuestion}
              className="btn btn-sm btn-dark"
            >
              Add Question
            </button>
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
