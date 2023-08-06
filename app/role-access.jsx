import Link from "next/link";
import React from "react";

const PageNotAllow = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center py-20 bg-slate-900">
      <img src="/assets/images/all-img/404.svg" alt="" />
      <div className="max-w-[546px] mx-auto w-full mt-12">
        <h4 className="text-white text-[40px] leading-[50px] mb-4">
          This Page Not Allowed
        </h4>
        <div className="text-white text-base font-normal mb-10">
          You don't have permission to access this page.
          Please Go to homepage
        </div>
      </div>
      <div className="max-w-[300px] mx-auto w-full">
        <Link
          href="/crm"
          className="btn bg-white hover:bg-opacity-75 transition-all duration-150 block text-center"
        >
          Go to homepage
        </Link>
      </div>
    </div>
  );
};

export default PageNotAllow;
