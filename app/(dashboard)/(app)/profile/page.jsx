/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import Link from "next/link";
import Image from "@/components/ui/Image";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import BasicArea from "@/components/partials/chart/appex-chart/BasicArea";
import Button from "@/components/ui/Button";
import useWidth from "@/hooks/useWidth";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import EditProfile from "../../../../components/partials/app/profile-service/Editprofile";
import { updateUserProfile } from "@/components/partials/app/profile-service/store";
import { ToastContainer, toast } from "react-toastify";
import Loading from "@/components/Loading";
import { fetchData } from "@/components/partials/app/service";
const profile = () => {
  const [profile, setProfile] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const { profiles } = useSelector((state) => state.profile);
  const { users, isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const { width, breakpoints } = useWidth();
  const fetchProfile = async () => {
    await fetchData(
      "/user/get-user?id=" + users?.accountId, {}, "GET"
    ).then((res) => {
      setProfile({
        ...res,
        image: profiles.image,
        name: res.firstname + " " + res.lastname,
        skill: "Developer"
      })
    }
    ).catch((err) => {
      toast.error(err, {
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
    )
  }
  useEffect(() => {
    setIsLoaded(true);
    fetchProfile()
    setIsLoaded(false);
  }, [profiles]);

  return (
    <div>
      <ToastContainer />
      {isLoaded ?
        <div className="flex justify-center items-center h-screen">

          <Loading />
        </div> :
        <div className="space-y-5 profile-page">
          {/* <Breadcrumbs /> */}
          <div className="flex flex-wrap justify-between items-center mb-4">
            <div
              className={`${width < breakpoints.md ? "space-x-rb " : ""
                } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse `}
            >
              <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
                Profile
              </h4>
            </div>
            <Button
              icon="heroicons:edit"
              text="Edit User Profile"
              className={"bg-slate-900 dark:bg-slate-700 text-white  text-whiteh-min text-sm font-normal"}
              iconClass=" text-lg"
              onClick={() => dispatch(updateUserProfile(profile ? profile : profiles))}
            />
          </div>
          <div className="profiel-wrap px-[35px] pb-10 md:pt-[84px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]">
            <div className="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg"></div>
            <div className="profile-box flex-none md:text-start text-center">
              <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
                <div className="flex-none">
                  <div className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
                    <Image src={profile?.image} className="w-full h-full object-cover rounded-full" />
                    <Link
                      href="#"
                      className="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"
                    >
                      <Icon icon="heroicons:camera" className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]">
                    {profile?.name}
                  </div>
                  <div className="text-sm font-light text-slate-600 dark:text-slate-400">
                    {profile?.skill}
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4">
              <div className="flex-1">
                <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                  Role
                </div>
                <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                  {profile?.role}
                </div>
              </div>

            </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="lg:col-span-4 col-span-12">
              <Card title="Info">
                <ul className="list space-y-8">
                  <li className="flex space-x-3 rtl:space-x-reverse">
                    <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                      <Icon icon="heroicons:envelope" />
                    </div>
                    <div className="flex-1">
                      <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                        EMAIL
                      </div>
                      <a
                        href={`mailto:${profiles?.email}`}
                        className="text-base text-slate-600 dark:text-slate-50"
                      >
                        {profile?.email}
                      </a>
                    </div>
                  </li>

                </ul>
              </Card>
            </div>
            <div className="lg:col-span-8 col-span-12">
              <Card title="User Overview">
                <BasicArea height={190} />
              </Card>
            </div>
          </div>
        </div>
      }
      {
        isAuth &&
        <EditProfile />
      }
    </div >
  )
};

export default profile;
