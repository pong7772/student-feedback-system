import React from "react";
import dynamic from "next/dynamic";
import { fetchData } from "../../app/service";
import { useState, useEffect } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const shapeLine1 = {
  series: [
    {
      data: [800, 600, 1000, 800, 600, 1000, 800, 900],
    },
  ],
  options: {
    chart: {
      toolbar: {
        autoSelected: "pan",
        show: false,
      },
      offsetX: 0,
      offsetY: 0,
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#00EBFF"],
    tooltip: {
      theme: "light",
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      type: "solid",
      opacity: [0.1],
    },
    legend: {
      show: false,
    },
    xaxis: {
      low: 0,
      offsetX: 0,
      offsetY: 0,
      show: false,
      labels: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      axisBorder: {
        low: 0,
        offsetX: 0,
        show: false,
      },
    },
  },
};
const shapeLine2 = {
  series: [
    {
      data: [800, 600, 1000, 800, 600, 1000, 800, 900],
    },
  ],
  options: {
    chart: {
      toolbar: {
        autoSelected: "pan",
        show: false,
      },
      offsetX: 0,
      offsetY: 0,
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#FB8F65"],
    tooltip: {
      theme: "light",
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      type: "solid",
      opacity: [0.1],
    },
    legend: {
      show: false,
    },
    xaxis: {
      low: 0,
      offsetX: 0,
      offsetY: 0,
      show: false,
      labels: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      axisBorder: {
        low: 0,
        offsetX: 0,
        show: false,
      },
    },
  },
};
const shapeLine3 = {
  series: [
    {
      data: [800, 600, 1000, 800, 600, 1000, 800, 900],
    },
  ],
  options: {
    chart: {
      toolbar: {
        autoSelected: "pan",
        show: false,
      },
      offsetX: 0,
      offsetY: 0,
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#5743BE"],
    tooltip: {
      theme: "light",
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      type: "solid",
      opacity: [0.1],
    },
    legend: {
      show: false,
    },
    xaxis: {
      low: 0,
      offsetX: 0,
      offsetY: 0,
      show: false,
      labels: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      axisBorder: {
        low: 0,
        offsetX: 0,
        show: false,
      },
    },
  },
};

const GroupChart1 = ({ userCount, allDepartment }) => {

  const statistics = [
    {
      name: shapeLine1,
      title: "Totel User",
      count: userCount,
      bg: "bg-[#E5F9FF] dark:bg-slate-900	",
    },
    {
      name: shapeLine2,
      title: "Total Feedback Responses",
      count: "10",
      bg: "bg-[#FFEDE5] dark:bg-slate-900	",
    },
    {
      name: shapeLine3,
      title: "Total Department",
      count: allDepartment?.length + 1,
      bg: "bg-[#EAE5FF] dark:bg-slate-900	",
    },
  ];
  return (
    <>
      {statistics.map((item, i) => (
        <div className={`py-[18px] px-4 rounded-[6px] ${item.bg}`} key={i}>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <div className="flex-none">
              <Chart
                options={item.name.options}
                series={item.name.series}
                type="area"
                height={48}
                width={48}
              />
            </div>
            <div className="flex-1">
              <div className="text-slate-800 dark:text-slate-300 text-sm mb-1 font-medium">
                {item.title}
              </div>
              <div className="text-slate-900 dark:text-white text-lg font-medium">
                {item.count}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default GroupChart1;
