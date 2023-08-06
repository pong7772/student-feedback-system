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
import React from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import TotalTable from "@/components/partials/table/TotalTable";
import userDarkMode from "@/hooks/useDarkMode";

const FeedbackResponseDetail = ({ params }) => {
    const { width, breakpoints } = useWidth();
    const [isLoaded, setIsLoaded] = useState(false);
    // const { deps } = useSelector((state) => state.department);
    const { feed } = useSelector((state) => state.feedback);
    const [feedback, setFeedback] = useState([]);
    const id = params?.responseId;
    const printPage = () => {
        window?.print();
    };
    const [isDark] = userDarkMode();
    useEffect(() => {
        setIsLoaded(true);
        fetchFeedback();
    }, []);
    const fetchFeedback = async () => {
        try {
            await fetchData(`/feedback-form/get-specific-response?id=${id}`, {}, "GET").then((res) => {
                if (res) {
                    console.log(res)
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
        <div>
            <ToastContainer />
            {
                isLoaded ? <Loading /> :
                    <div>
                        <div className="lg:flex justify-between flex-wrap items-center mb-6">
                            <h4>Preview Form Response</h4>
                            <div className="flex lg:justify-end items-center flex-wrap space-xy-5">
                                <button
                                    type="button"
                                    onClick={printPage}
                                    className="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900 rtl:space-x-reverse"
                                >
                                    <span className="text-lg">
                                        <Icon icon="heroicons:printer" />
                                    </span>
                                    <span>Print</span>
                                </button>
                            </div>
                        </div>
                        <Card bodyClass="p-0">
                            <div className="flex justify-between flex-wrap space-y-4 px-6 pt-6 bg-slate-50 dark:bg-slate-800 pb-6 rounded-t-md">
                                <div>
                                    <span className="block text-slate-900 dark:text-slate-300 font-medium leading-5 text-xl">
                                        Student Feedback System
                                    </span>
                                </div>
                            </div>
                            {feedback.length > 0 ? <div className="max-w-[980px] mx-auto shadow-base dark:shadow-none my-8 rounded-md overflow-x-auto">
                                <TotalTable allFeedback={feedback} />
                            </div> : <div className="py-10 text-center md:text-2xl text-xl font-normal text-slate-600 dark:text-slate-300">
                                NO Data
                            </div>}
                            <div className="py-10 text-center md:text-2xl text-xl font-normal text-slate-600 dark:text-slate-300">
                                Thank you for your using our system!
                            </div>
                        </Card>
                    </div>

            }
        </div>
    );
};

export default FeedbackResponseDetail;
