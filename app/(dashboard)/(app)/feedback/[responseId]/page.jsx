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
import Card from "@/components/ui/Card";
const FeedbackResponseDetail = ({ params }) => {
    const { width, breakpoints } = useWidth();
    const [isLoaded, setIsLoaded] = useState(false);
    // const { deps } = useSelector((state) => state.department);
    const { feed } = useSelector((state) => state.feedback);
    const [feedback, setFeedback] = useState([]);
    const id = params?.responseId;
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
                    feedback?.map((item, index) => {
                        var arrayRating = []
                        for (let i = 0; i < item.rating; i++) {
                            arrayRating.push(i)
                        }
                        return (
                            <Card
                                className="
                                    dark:bg-slate-800
                                    text-slate-900
                                    dark:text-slate-100
                                    bg-white
                                    shadow-sm
                                    dark:shadow
                                    rounded-md
                                    overflow-hidden
                                    hover:shadow-lg
                                    dark:hover:shadow-xl
                                    transition
                                    duration-200
                                    ease-in-out
                                    mb-2
                                    "
                                title={item?.question_text}
                            >
                                {/* display item.rating in star view tailwind */}
                                <div className="flex items-center space-x-2">
                                    {/* title */}
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                        Rating:
                                    </span>
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                        {item?.rating}
                                    </span>
                                    {
                                        arrayRating?.map((items, index) => {
                                            return (
                                                <svg key={index} class="w-8 h-8 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                            )
                                        }
                                        )
                                    }

                                </div>


                            </Card>

                        )
                    })
            }
        </div>
    );
};

export default FeedbackResponseDetail;
