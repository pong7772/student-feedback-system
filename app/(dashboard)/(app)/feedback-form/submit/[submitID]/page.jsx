"use client";
import { fetchData } from "@/components/partials/app/service";
import useWidth from "@/hooks/useWidth";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Card from "@/components/ui/Card";
import Radio from "@/components/ui/Radio";
const CreateFeedbackForm = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { feedback } = useSelector((state) => state.feedback);
  const [Feedback, setFeedback] = useState([]);
  const [formData, setFormData] = useState([]);
  const [selectData, setSelectData] = useState();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname?.split("/").pop();
  const colors = [
    {
      value: 1,
      label: "1",
      activeClass: "ring-primary-500 border-primary-500",
    },
    {
      value: 2,
      label: "2",
      activeClass: "ring-secondary-500 border-secondary-500",
    },
    {
      value: 3,
      label: "3",
      activeClass: "ring-success-500 border-success-500",
    },
    {
      value: 4,
      label: "4",
      activeClass: "ring-danger-500 border-danger-500",
    },
    {
      value: 5,
      label: "5",
      activeClass: "ring-warning-500 border-warning-500",
    },
  ];

  useEffect(() => {
    setIsLoaded(true);
    fetchFeedback();
  }, [id]);

  const fetchFeedback = async () => {
    try {
      const res = await fetchData(`/feedback-form/get?id=${id}`, {}, "GET");
      if (res) {
        setFeedback(res);
        console.log(res)
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
      rating: 1, // Set initial rating as 5, you can change this as per your requirement
      questionNumber: questions.indexOf(question) + 1,
    }));
    setFormData(initialData);
  };

  const handleRatingChange = (index, rating) => {
    setSelectData(rating);
    console.log(index, rating);
    setFormData((prevFormData) => {
      const updatedData = [...prevFormData];
      updatedData[index].rating = rating;
      return updatedData;
    });
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetchData(
      `/feedback-form/submit`,
      {
        feedbackFormId: id,
        questions: formData,
      },
      "POST"
    ).then((data) => {
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
      router.push(`/feedback-form/submit/${id}/thankyou`);
    }).catch((error) => {
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
    );
  };
  return (
    <div className=" space-y-5 flex-col items-center text-center px-6 pt-6 bg-slate-50 dark:bg-slate-800 pb-6 rounded-t-md">
      {/* <div className="flex-col items-center text-center space-y-4 px-6 pt-6 bg-slate-50 dark:bg-slate-800 pb-6 rounded-t-md "> */}
      <ToastContainer />
      <h4>Feedback Submission</h4>
      <h5 className="text-lg text-gray-500">
        {Feedback?.title}
      </h5>
      <h5 className="text-lg text-gray-500">
        {Feedback?.description}
      </h5>
      <p className="text-sm text-gray-500">
        Please fill out the form below to submit your feedback.
      </p>
      <p className="text-sm text-gray-500">
        <span className="font-semibold">Note:</span> All fields are required.
      </p>
      <div>
        <form onSubmit={handleSubmit} >
          <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 items-center w-full mb-4">
            {formData.map((data, index) => (

              <Card title={data.questionText}
                // className={`${item.bg} dark:${item.bg} `}
                key={index}
                bodyClass="p-4"
                className="
              bg-white dark:bg-slate-800
              border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent
              rounded-md
              sm:text-sm
              bg-gradient
              items-center

              "

              >
                <div className="flex space-xy-5 items-center">
                  {colors.map((data, i) => (
                    <Radio
                      key={i}
                      label={data.label}
                      name="rating"
                      value={data.value}
                      checked={
                        data.value == formData[index].rating
                      }
                      onChange={(e) => handleRatingChange(index, e.target.value)}
                      activeClass={data.activeClass}

                    />
                  ))}
                </div>
              </Card>
            ))}
          </div>
          <button type="submit" className="btn btn-dark  text-center bg-white dark:bg-slate-800
          text-slate-900 dark:text-slate-300
              border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent
              rounded-md
              sm:text-sm
              bg-gradient
              items-center">
            Submit
          </button>

        </form>
      </div>
      {/* </div> */}
    </div>
  );


};

export default CreateFeedbackForm;
