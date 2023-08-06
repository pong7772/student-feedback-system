"use client";

import Loading from "@/components/Loading";
import useWidth from "@/hooks/useWidth";
import axios from "axios";
import { fetchData } from "components/partials/app/service";
import dayjs from "dayjs";
import moment from "moment";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

const FeedbackDetail = () => {
  const { width, breakpoints } = useWidth();
  const [isLoaded, setIsLoaded] = useState(false);
  // const { deps } = useSelector((state) => state.department);
  const { feed } = useSelector((state) => state.feedback);
  const [Feedback, setFeedback] = useState([]);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const id = pathname?.split("/").pop();
  useEffect(() => {
    setIsLoaded(true);
    fetchFeedback();
  }, []);
  const fetchFeedback = async () => {
    try {
      await fetchData(`/feedback-form/get?id=${id}`, {}, "GET").then((res) => {
        if (res) {
          setFeedback(res);
          setIsLoaded(false);
        }
      });
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


  return (
    <div className="feedback-detail bg-white h-screen rounded-lg px-8 py-3">
      <ToastContainer />
      <div className="flex flex-wrap justify-between items-center mb-4 py-4">
        <h4 className="font-semibold lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          Feedback Detail
        </h4>
      </div>

      {Feedback ? (
        <>
          <h1 className="text-gray-800 mt-2 text-lg font-medium">
            <span className="w-36 inline-block text-gray-600">Title</span>
            {Feedback.title}
          </h1>
          <div>
            <p className="text-gray-800 mt-2">
              <span className="w-36 inline-block text-gray-600">Feedback ID</span>
              {Feedback.id}
            </p>
            <p className="text-gray-800 mt-2">
              <span className="w-36 inline-block text-gray-600">Feedback Title</span>
              {Feedback.title}
            </p>
            <p className="text-gray-800 mt-2">
              <span className="w-36 inline-block text-gray-600"> Description</span>
              {Feedback.description}
            </p>
            <p className="text-gray-800 mt-2">
              <span className="w-36 inline-block text-gray-600"> Created At</span>
              {
                moment(Feedback.createdAt).format("DD-MM-YYYY")}
            </p>
            <p className="text-gray-800 mt-2">
              <span className="w-36 inline-block text-gray-600"> Updated At</span>
              {
                moment(Feedback.updatedAt).format("DD-MM-YYYY")}
            </p>

          </div>

          <div className="mt-4">
            <span className="block text-gray-700  font-semibold mb-2">
              Questions
            </span>
            {Feedback.questions?.map((question, index) => (
              <div key={index} className="mb-4">
                <p className="text-gray-800 mt-2">
                  <span className="w-36 inline-block text-gray-600"> Question {index + 1}</span>{" "}
                  {question}
                </p>

              </div>
            ))}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default FeedbackDetail;
