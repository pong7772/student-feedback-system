import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import { Menu } from "@headlessui/react";
import { assignCourseToggleModal, removeUser, updateUser } from "./store";
import { useRouter } from "next/navigation";
import { removeBatch, removeCourse, removeSemester } from "./store";
import Moment from "moment";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import Button from "@/components/ui/Button";
import { fetchData } from "@/components/partials/app/service";
import { toast } from "react-toastify";
import Textinput from "@/components/ui/Textinput";
import Modal from "@/components/ui/Modal";
const AcademicList = ({ projects, filler }) => {
  const dispatch = useDispatch();
  const { assignCourseModal } = useSelector((state) => state.course)
  const removeBatches = async (item) => {
    await fetchData(
      "/batch/delete?id=" + item,
      {},
      "GET"
    ).then((res) => {
      if (res) {
        dispatch(removeBatch(item));
      }
    }).catch(error => {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      })
    })
  };
  const removeCoursess = async (item) => {
    await fetchData(
      "/course/delete?id=" + item,
      {},
      "GET"
    ).then((res) => {
      if (res) {
        dispatch(removeCourse(item));
      }
    }).catch(error => {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      })
    })
  }
  const removeSemesters = async (item) => {
    await fetchData(
      "/semester/delete?id=" + item,
      {},
      "GET"
    ).then((res) => {
      if (res) {
        dispatch(removeSemester(item));
      }
    }).catch(error => {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      })
    })
  }
  const assignCourseToStudent = async (item) => {
    dispatch(assignCourseToggleModal(true))
  }


  const COLUMNS = (filler == "course") ? [
    {
      Header: "Course",
      accessor: "name",
      Cell: (row) => {
        return (
          <div className="flex space-x-3 items-center text-left rtl:space-x-reverse">
            <div className="flex-none">
              <div className="h-10 w-10 rounded-full text-sm bg-[#E0EAFF] dark:bg-slate-700 flex flex-col items-center justify-center font-medium -tracking-[1px]">
                {row?.cell?.value && row?.cell?.value?.charAt(0)}
              </div>
            </div>
            <div className="flex-1 font-medium text-sm leading-4 whitespace-nowrap">
              {row?.cell?.value?.length > 40
                ? row?.cell?.value?.substring(0, 40) + "..."
                : row?.cell?.value}
            </div>
          </div>
        );
      },
    },
    {
      Header: "Credits",
      accessor: "credit",
      Cell: (row) => {
        return <div
          className="h-6 w-24 flex-nowrap rounded justify-center flex text-xs text-white-600 font-medium mx-2 bg-green-300 items-center mb-2 dark:bg-green-500 dark:text-white "
        >
          {row?.cell?.value} Credits
        </div>;
      },
    },
    {
      Header: "FeedbackForm",
      accessor: "feedbackForms",
      Cell: (row) => {
        return (
          <div>
            <div className=" flex-col object-contain p-2 rounded-sm bg-green-100  " >
              {row?.cell?.value !== null ? row?.cell?.value?.map((form, index) => (

                <div key={index} className=" flex items-center justify-start text-gray-600 mx-1">
                  <div className="text-xs text-white-600 font-medium mx-1">
                    {index + 1} / {form?.title} have {form?.questions?.length} Question
                  </div>
                </div>

              )) : <div className="text-red-500">No FeedbackForm</div>
              }

            </div>
          </div>
        );
      },
    },

    {
      Header: "action",
      accessor: "id",
      Cell: (row) => {
        return (
          <span className="flex space-x-2">
            <Button onClick={() => removeCoursess(row?.cell?.value)} className="bg-danger-500 text-danger-500 bg-opacity-30 hover:bg-opacity-100 hover:text-white " >Delete</Button>
          </span>
        );
      },
    },
  ] : filler == "batch" ? [
    {
      Header: "Batch Number",
      accessor: "batchNumber",
      Cell: (row) => {
        return (
          <div className="flex space-x-3 items-center text-left rtl:space-x-reverse">
            <div className="flex-none">
              <div className="h-10 w-10 rounded-full text-sm bg-[#E0EAFF] dark:bg-slate-700 flex flex-col items-center justify-center font-medium -tracking-[1px]">
                {row?.cell?.value}
              </div>
            </div>
            <div className="flex-1 font-medium text-sm leading-4 whitespace-nowrap">
              {filler}-{row?.cell?.value?.length > 20
                ? row?.cell?.value?.substring(0, 20) + "..."
                : row?.cell?.value}
            </div>
          </div>
        );
      },
    },
    {
      Header: "Create At",
      accessor: "createdAt",
      Cell: (row) => {
        return <span>{Moment(row?.cell?.value).format("DD-MM-YYYY")}</span>;
      },
    },
    {
      Header: "Update Date",
      accessor: "updatedAt",
      Cell: (row) => {
        return <div>{Moment(row?.cell?.value).format("DD-MM-YYYY")}</div>;
      },
    },
    {
      Header: "Department",
      accessor: "departmentName",
      Cell: (row) => {
        return <div>{row?.cell?.value}</div>;
      },
    },
    {
      Header: "Semester",
      accessor: "semesters",
      Cell: (row) => {

        return (
          <div>
            <div className=" flex-col object-contain p-2 rounded-sm bg-green-100  " >
              {row?.cell?.value !== null ? row?.cell?.value?.map((semester, index) => (

                <div key={index} >
                  <div
                    className=" flex-col flex-nowrap rounded justify-start text-xs text-green-500 text-white-600 font-medium mx-2  items-center mb-2 dark:text-gray-900 "
                  >
                    On Semester {semester?.semesterNumber} have {semester?.courses?.length} Course :
                    {
                      semester?.courses?.length !== 0 ? semester?.courses?.map((course, index) => (
                        <div key={index} className=" flex items-center justify-start text-gray-600 mx-1">
                          <div className="text-xs text-white-600 font-medium mx-1">
                            {index + 1} / {course?.name} have {course?.credit} credits
                          </div>
                        </div>
                      )) :
                        <div className="text-xs text-red-600 font-medium mx-1">
                          No Semester
                        </div>

                    }
                  </div>

                </div>

              )) : <div className="text-red-500">No Semester</div>
              }

            </div>
          </div>
        );
      },
    },

    {
      Header: "action",
      accessor: "id",
      Cell: (row) => {
        return (
          <Button onClick={() => removeBatches(row?.cell?.value)} className="bg-danger-500 text-danger-500 bg-opacity-30 hover:bg-opacity-100 hover:text-white " >Delete</Button>
        );
      },
    },
  ] : [{
    Header: "Semester",
    accessor: "semesterNumber",
    Cell: (row) => {
      return (
        <div className="flex space-x-3 items-center text-left rtl:space-x-reverse">
          <div className="flex-none">
            <div className="h-10 w-10 rounded-full text-sm bg-[#E0EAFF] dark:bg-slate-700 flex flex-col items-center justify-center font-medium -tracking-[1px]">
              {row?.cell?.value}
            </div>
          </div>
          <div className="flex-1 font-medium text-sm leading-4 whitespace-nowrap">
            {filler}-{row?.cell?.value?.length > 20
              ? row?.cell?.value?.substring(0, 20) + "..."
              : row?.cell?.value}
          </div>
        </div>
      );
    },
  },
  {
    Header: "Create At",
    accessor: "startDate",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "End Date",
    accessor: "endDate",
    Cell: (row) => {
      return <div>{row?.cell?.value}</div>;
    },
  },
  {
    Header: "Credits",
    accessor: "credit",
    Cell: (row) => {
      return <div>{row?.cell?.value}</div>;
    },
  },
  {
    Header: "Courses",
    accessor: "courses",
    Cell: (row) => {
      return (
        <div>
          <div className=" flex-col object-contain p-2 rounded-sm bg-green-100  " >
            {row?.cell?.value !== null ? row?.cell?.value?.map((course, index) => (

              <div key={index} >
                <div
                  className=" flex-col flex-nowrap rounded justify-start text-xs text-green-500 text-white-600 font-medium mx-2  items-center mb-2 dark:text-gray-900 "
                >
                  {index + 1} / On Course {course?.name} have {course?.feedbackForms?.length} FeedbackForm
                </div>
              </div>

            )) : <div className="text-red-500">No Course</div>
            }

          </div>
        </div>
      );
    },
  },

  {
    Header: "action",
    accessor: "id",
    Cell: (row) => {
      return (
        <Button onClick={() => removeSemesters(row?.cell?.value)} className="bg-danger-500 text-danger-500 bg-opacity-30 hover:bg-opacity-100 hover:text-white " >Delete</Button>
      );
    },
  },]


  const actions = [

    // {
    //   name: "edit",
    //   icon: "heroicons:pencil-square",
    //   doit: (item) => dispatch(updateUser(item)),
    // },
    {
      name: "delete",
      icon: "heroicons-outline:trash",
      doit: (item) => removeItem(item),
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => projects && projects, [projects && projects]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <>
      <Card noborder>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">{filler} List </h4>
          <div className="flex items-center space-x-2">
            {filler == "course" && <Button onClick={() => { assignCourseToStudent() }} className="bg-green-500 text-green-500 bg-opacity-30 hover:bg-opacity-100 hover:text-white " >Assign Course To Student</Button>}
          </div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="mb-20">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700 my-4"
                {...getTableProps}
              >
                <thead className="  bg-slate-100 dark:bg-slate-700 ">
                  {headerGroups.map((headerGroup) => (
                    <tr
                      {...headerGroup.getHeaderGroupProps()}
                      key={`ex-tr-${headerGroup.id}`}
                    >
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          key={`ex-th-${column.id}`}
                          scope="col"
                          className=" table-th "
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  className="bg-white divide-y mb-10  divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                  {...getTableBodyProps}
                >
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr
                        key={`ex-tr2-${row.id}`}
                        {...row.getRowProps()}
                        className=" dark:even:bg-slate-700"
                      >
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="table-td"
                              key={`ex-td-${cell.column.id}`}
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center ">
          <div className=" flex items-center space-x-3 rtl:space-x-reverse">
            <span className=" flex space-x-2  rtl:space-x-reverse items-center">
              <span className=" text-sm font-medium text-slate-600 dark:text-slate-300">
                Go
              </span>
              <span>
                <input
                  type="number"
                  className=" form-control py-2"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                  style={{ width: "50px" }}
                />
              </span>
            </span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Page{" "}
              <span>
                {pageIndex + 1} of {pageOptions.length}
              </span>
            </span>
          </div>
          <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <Icon icon="heroicons-outline:chevron-left" />
              </button>
            </li>
            {pageOptions.map((page, pageIdx) => (
              <li key={pageIdx}>
                <button
                  href="#"
                  aria-current="page"
                  className={` ${pageIdx === pageIndex
                    ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                    : "bg-slate-100  dark:text-slate-400 text-slate-900  font-normal "
                    }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                  onClick={() => gotoPage(pageIdx)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <Icon icon="heroicons-outline:chevron-right" />
              </button>
            </li>
          </ul>
        </div>
      </Card >
    </>
  );
};

export default AcademicList;
