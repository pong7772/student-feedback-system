// pages/feedback-form/[id].js
"use client";

import Loading from "@/components/Loading";
// pages/feedback-form/[id].js
import { fetchData } from "@/components/partials/app/service";
import Textinput from "@/components/ui/Textinput";
import useWidth from "@/hooks/useWidth";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

// pages/feedback-form/[id].js

// pages/feedback-form/[id].js

// pages/feedback-form/[id].js

// pages/feedback-form/[id].js

const CreateFeedbackForm = () => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleModalClose = () => {
    // Function to close the modal
    setShowModal(false);
  };

  const { width, breakpoints } = useWidth();
  const [isLoaded, setIsLoaded] = useState(false);
  const { feed } = useSelector((state) => state.feedback);
  const [Feedback, setFeedback] = useState([]);
  const [formData, setFormData] = useState([]);

  const dispatch = useDispatch();
  const pathname = usePathname();
  const id = pathname?.split("/").pop();

  useEffect(() => {
    setIsLoaded(true);
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await fetchData(`/feedback-form/get?id=${id}`, {}, "GET");
      if (res) {
        setFeedback(res);
        setIsLoaded(false);
        initializeFormData(res.questions); // Initialize form data for questions
      }
    } catch (error) {
      console.log(error);
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const initializeFormData = (questions) => {
    const initialData = questions.map((question) => ({
      questionText: question,
      rating: 5, // Set initial rating as 5, you can change this as per your requirement
      questionNumber: questions.indexOf(question) + 1,
    }));
    setFormData(initialData);
  };

  const handleRatingChange = (index, rating) => {
    setFormData((prevFormData) => {
      const updatedData = [...prevFormData];
      updatedData[index].rating = rating;
      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchData(
        `/feedback-form/submit`,
        {
          feedbackFormId: id,
          questions: formData,
        },
        "POST"
      );

      if (response) {
        // Handle successful form submission
        toast.success("Feedback submitted successfully!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit feedback. Please try again!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="feedback-form bg-white radius-2xl px-8 py-6">
      <ToastContainer />
      <div className="flex flex-wrap justify-between items-center mb-4 py-4">
        <h4 className="font-semibold lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          Feedback Submission
        </h4>
      </div>
      {/* {isLoaded ? ( */}
      <div>
        <h5>Title: {Feedback?.title}</h5>
        <p>Description : {Feedback?.description}</p>
        <form onSubmit={handleSubmit}>
          {formData.map((data, index) => (
            <div key={index} className="mb-4 ">
              <label className="inline-block text-gray-600">
                {data.questionText}
              </label>
              {/* <input
                className=""
                type="number"
                min="1"
                max="5"
                value={data.rating}
                onChange={(e) => handleRatingChange(index, e.target.value)}
              /> */}
              <div className="w-1/4">
                <input
                  className="w-full 
                  px-3 py-2
                  border border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent
                  rounded-md
                  sm:text-sm
                  bg-gradient
                   "
                  type="number"
                  min="1"
                  max="5"
                  value={data.rating}
                  onChange={(e) => handleRatingChange(index, e.target.value)}
                  // label="Department"
                  placeholder="Enter Rating"
                // register={register}
                // error={errors.title}
                />
              </div>

            </div>
          ))}

          <div className="">
            <button type="submit" className="btn btn-dark  text-center">
              Submit
            </button>
          </div>
        </form>
      </div>
      {/* ) : (
          // <Loading />
        )} */}
    </div>
  );
};

export default CreateFeedbackForm;
