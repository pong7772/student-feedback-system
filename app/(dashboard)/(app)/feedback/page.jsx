"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TableLoading from "@/components/skeleton/Table";
import { ToastContainer } from "react-toastify";
import FeedbackResult from "@/components/partials/app/form/feedback-result";
import { fetchData } from "@/components/partials/app/service";
import { toast } from "react-toastify";
const FeedbackPostPage = () => {
    const dispatch = useDispatch();
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchAllResponse();
    }, [])
    const fetchAllResponse = async () => {
        try {
            await fetchData("/feedback-form/get-response", {}, "GET").then((res) => {
                if (res) {
                    console.log(res)
                    setDataSource(res);
                    setLoading(false);
                }
            });
        } catch (error) {
            console.log(error);
            setLoading(false);
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
    }
    return (
        <div>
            <ToastContainer />
            {!loading && <FeedbackResult projects={dataSource} />}
            {loading && <TableLoading count={6} />}
        </div>
    );
};

export default FeedbackPostPage;
