"use client"
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";
import UserGrid from "@/components/partials/app/user-service/UserGrid";
import UserList from "@/components/partials/app/user-service/UserList";
import GridLoading from "@/components/skeleton/Grid";
import TableLoading from "@/components/skeleton/Table";
import { toggleAddModal } from "@/components/partials/app/user-service/store";
import AddUser from "@/components/partials/app/user-service/AddUser";
import { ToastContainer } from "react-toastify";
// import EditUser from "@/components/partials/app/user-service/EditUser";
import { fetchData } from "@/components/partials/app/service";
import { setUser } from "@/components/partials/app/user-service/store";
const UserPostPage = () => {
  const [filler, setFiller] = useState("list");
  // use width is necessary for the repsonsive layout
  const { width, breakpoints } = useWidth();
  const [isLoaded, setIsLoaded] = useState(false);
  const { users } = useSelector((state) => state.user);
  const [page, setPage] = useState(0)
  const [allUser, setAllUser] = useState(users)
  const [count, setCount] = useState(0)
  const dispatch = useDispatch();

  // console.log(users)
  useEffect(() => {
    // this is the loading animation need to implemnent with backend  
    setIsLoaded(true);
    fetchAllUsers()
  }, [users]);

  // fetch all user from backend 

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
        setIsLoaded(false);
      } else {
        console.log("error")
        setIsLoaded(false);
      }
    }).catch((err) => {
      console.log(err)
      setIsLoaded(false);
    });
  }

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          User List
        </h4>
        {/* total user */}
        <div
          className={`${width < breakpoints.md ? "space-x-rb" : ""
            } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
        >
          <Button
            icon="heroicons:list-bullet"
            text="List view"
            disabled={isLoaded}
            className={`${filler === "list"
              ? "bg-slate-900 dark:bg-slate-700  text-white"
              : " bg-white dark:bg-slate-800 dark:text-slate-300"
              }   h-min text-sm font-normal`}
            iconClass=" text-lg"
            onClick={() => setFiller("list")}
          />
          {/* <Button
            icon="heroicons-outline:view-grid"
            text="Grid view"
            disabled={isLoaded}
            className={`${filler === "grid"
              ? "bg-slate-900 dark:bg-slate-700 text-white"
              : " bg-white dark:bg-slate-800 dark:text-slate-300"
              }   h-min text-sm font-normal`}
            iconClass=" text-lg"
            onClick={() => setFiller("grid")}
          /> */}

          <Button
            icon="heroicons-outline:plus"
            text="Add User"
            className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
            iconClass=" text-lg"
            onClick={() => dispatch(toggleAddModal(true))}
          />
        </div>
      </div>
      {/* {isLoaded && filler === "grid" && (
        <GridLoading count={users?.length} />
      )} */}
      {isLoaded && (
        <TableLoading count={allUser?.length} />
      )}

      {/* {filler === "grid" && !isLoaded && (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {users.map((user, projectIndex) => (
            <UserGrid user={user} key={projectIndex} />
          ))}
        </div>
      )} */}
      {filler === "list" && !isLoaded && (
        <div>
          <UserList users={allUser} count={count} />
        </div>
      )}
      <AddUser />
      {/* <EditUser /> */}
    </div>
  );
};

export default UserPostPage;
