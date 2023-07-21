"use client";

import AddFeedback from "@/components/partials/app/form/feedback-form-service/AddFeedback";
import EditFeedback from "@/components/partials/app/form/feedback-form-service/EditFeedback";
import FeedbackList from "@/components/partials/app/form/feedback-form-service/FeedbackList";
// import SubmitFeedback from "@/components/partials/app/form/feedback-form-service/SubmitFeedback";
import {
  toggleAddModal,
  toggleSubmitModal,
} from "@/components/partials/app/form/feedback-form-service/store";
import { fetchData } from "@/components/partials/app/service";
import GridLoading from "@/components/skeleton/Grid";
import TableLoading from "@/components/skeleton/Table";
import Button from "@/components/ui/Button";
import useWidth from "@/hooks/useWidth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Feedback = () => {
  const { width, breakpoints } = useWidth();
  const [isLoaded, setIsLoaded] = useState(false);
  // const { deps } = useSelector((state) => state.department);
  const { feed } = useSelector((state) => state.feedback);
  const { users } = useSelector((state) => state.auth);
  const [Feedback, setFeedback] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoaded(true);
    fetchDepartments();
  }, [feed]);
  const fetchDepartments = async () => {
    try {
      await fetchData("/feedback-form/get-all?page=0&size=100", {}, "GET").then(
        (res) => {
          if (res) {
            setFeedback(res?.content);
            setIsLoaded(false);
          }
        }
      );
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
    <div>
      <ToastContainer />
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          Feedback
        </h4>

        <div
          className={`${
            width < breakpoints.md ? "space-x-rb" : ""
          } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
        >
   
          {
            (users?.role == "ADMIN" ? (
              <Button
                icon="heroicons-outline:plus"
                text="Add Feedback"
                className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                iconClass=" text-lg"
                onClick={() => dispatch(toggleAddModal(true))}
              />
            ) : (
              <div>{}</div>
            ))
          }

          {/* <Button
            icon="heroicons-outline:plus"
            text="Submit Feedback"
            className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
            iconClass=" text-lg"
            onClick={() => dispatch(toggleSubmitModal(true))}
          /> */}
        </div>
      </div>

      {isLoaded && <TableLoading count={feed?.length} />}

      {!isLoaded && (
        <div>
          <FeedbackList feedback={Feedback} />
        </div>
      )}

      <AddFeedback />
      {/* <SubmitFeedback /> */}
      <EditFeedback />
    </div>
  );
};

export default Feedback;
