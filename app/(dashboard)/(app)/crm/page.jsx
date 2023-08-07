"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import Card from "@/components/ui/Card";
import ImageBlock2 from "@/components/partials/widget/block/image-block-2";
import GroupChart1 from "@/components/partials/widget/chart/group-chart-1";
import RevenueBarChart from "@/components/partials/widget/chart/revenue-bar-chart";
import RadialsChart from "@/components/partials/widget/chart/radials";
import SelectMonth from "@/components/partials/SelectMonth";
import CompanyTable from "@/components/partials/table/company-table";
import RecentActivity from "@/components/partials/widget/recent-activity";
import RadarChart from "@/components/partials/widget/chart/radar-chart";
import HomeBredCurbs from "@/components/partials/HomeBredCurbs";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { fetchData } from "@/components/partials/app/service";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setDep, toggleAddModalDep } from '@/components/partials/app/department-service/store';

const MostSales = dynamic(
  () => import("@/components/partials/widget/most-sales"),
  {
    ssr: false,
  }
);
const Dashboard = () => {
  const { users } = useSelector((state) => state.auth);
  const [page, setPage] = useState(0)
  const [allUser, setAllUser] = useState([])
  const [count, setCount] = useState(0)
  const [semester, setAllSemester] = useState([])
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackRes, setFeedbackRes] = useState([]);
  const [allDepartment, setAllDepartment] = useState([])

  // console.log(users)
  useEffect(() => {
    // this is the loading animation need to implemnent with backend  
    fetchAllUsers()
    fetchDepartmentsAndSemester()
    fetchAllResponse();
    fetchFeedbackForm();
  }, [users]);

  // fetch all user from backend 

  const fetchAllResponse = async () => {
    try {
      await fetchData("/feedback-form/get-response", {}, "GET").then((res) => {
        if (res) {
          setFeedbackRes(res?.content);
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
  }

  const fetchAllUsers = async () => {
    await fetchData(
      `/user/get-all-user?page=${page}&size=1000&role=ALL`, {},
      "GET"
    ).then((res) => {
      if (res) {
        const data = res?.content
        const count = res?.count
        setCount(count)
        setAllUser(data)
      } else {
        console.log("error")
      }
    }).catch((err) => {
      console.log(err)
    });
  }
  const fetchDepartmentsAndSemester = async () => {
    try {
      await fetchData("/department/get-all?page=0&size=1000", {}, "GET").then((res) => {
        if (res) {
          // dispatch(setDep(res?.content))
          setAllDepartment(res?.content);
        }
      });
      await fetchData("/api/v1/semester/get-all?page=0&size=10", {}, "GET").then((res) => {
        if (res) {
          setAllSemester(res)
        }
      })
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
  const fetchFeedbackForm = async () => {
    await fetchData("/feedback-form/get-all?page=0&size=100", {}, "GET").then(
      (res) => {
        if (res) {
          setFeedbacks(res?.content);
          // dispatch(setForm(res?.content));
        }
      }
    ).catch((err) => {
      console.log(err)
      toast.error("fail to get data", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });

  };
  return (
    <div>

      <div className="grid grid-cols-12 gap-5 mb-5">
        <div className="2xl:col-span-3 lg:col-span-4 col-span-12">
          <ImageBlock2 users={users} />
        </div>
        <div className="2xl:col-span-9 lg:col-span-8 col-span-12">
          <Card bodyClass="p-4">
            <div className="grid md:grid-cols-3 col-span-1 gap-4">
              <GroupChart1 userCount={count} allDepartment={allDepartment} feedbackRes={feedbackRes} />
            </div>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="lg:col-span-8 col-span-12">
          <Card>
            <div className="legend-ring">
              <RevenueBarChart />
            </div>
          </Card>
        </div>


        <div className="lg:col-span-4 col-span-12">
          <Card title="Overview" headerslot={<SelectMonth />}>
            <RadarChart total={semester?.length} />
            <div className="bg-slate-50 dark:bg-slate-900 rounded p-4 mt-8 flex justify-between flex-wrap">
              <div className="space-y-1">
                <h4 className="text-slate-600 dark:text-slate-200 text-xs font-normal">
                  Total User
                </h4>
                <div className="text-sm font-medium text-slate-900 dark:text-white">
                  {count}
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-slate-600 dark:text-slate-200 text-xs font-normal">
                  Total Feedback Form
                </h4>
                <div className="text-sm font-medium text-slate-900 dark:text-white">
                  {feedbacks?.length}
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-slate-600 dark:text-slate-200 text-xs font-normal">
                  Total Department
                </h4>
                <div className="text-sm font-medium text-slate-900 dark:text-white">
                  {allDepartment?.length}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
