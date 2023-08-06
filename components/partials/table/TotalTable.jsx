import React from "react";
import { convertArrayToObject } from "../app/service";
// const rows = [
//   {
//     item: "Headphone",
//     qty: 2,
//     price: "$600.25",
//     total: "$1200.50",
//   },
//   {
//     item: "Headphone",
//     qty: 2,
//     price: "$600.25",
//     total: "$1200.50",
//   },
//   {
//     item: "Headphone",
//     qty: 2,
//     price: "$600.25",
//     total: "$1200.50",
//   },
//   {
//     item: "Headphone",
//     qty: 2,
//     price: "$600.25",
//     total: "$1200.50",
//   },
// ];

const TotalTable = ({ allFeedback }) => {
  const rows = allFeedback?.map(feedback => {
    return {
      title: feedback?.question_text,
      count: feedback?.count,
      rating: feedback?.rating,
      total: feedback?.rating,
    }
  })
  return (
    <div>
      <table className="w-full border-collapse table-fixed dark:border-slate-700 dark:border">
        <tr>
          <th
            colSpan={3}
            className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left"
          >
            <span className="block px-6 py-5 font-semibold">Question Title</span>
          </th>
          <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
            <span className="block px-6 py-5 font-semibold"> Vote Amount</span>
          </th>
          <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-green-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
            <span className="block px-6 py-5 font-semibold">Rating Amount</span>
          </th>
          <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
            <span className="block px-6 py-5 font-semibold">Star</span>
          </th>
        </tr>
        {rows.map((data, index) => {
          let arr = []
          for (let i = 0; i < data.rating; i++) {
            arr.push(i)
          }
          return (
            <tr
              key={index}
              className="border-b border-slate-100 dark:border-slate-700 "
            >
              <td
                colSpan={3}
                className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4"
              >
                {data.title}
              </td>
              <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-center ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4">
                {data.count}
              </td>
              <td className="inline-block px-3 min-w-[90px] text-center ml-6 my-2 py-1 rounded-[999px] bg-opacity-25 text-success-700 bg-success-500 rtl:last:text-left">
                {data.rating}
              </td>
              <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4">
                {
                  arr.map((items, index) => {
                    return (
                      <span className="inline-block">
                        <svg key={index} class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      </span>
                    )
                  }
                  )
                }
              </td>
            </tr>
          )
        })}
      </table>

    </div>
  );
};

export default TotalTable;
