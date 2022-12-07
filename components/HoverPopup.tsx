import React from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { logout } from "../store/authSlice";

export const HoverPopup = () => {
  const dispatch = useDispatch<any>();
  return (
    <div
      className={`group-hover:block  rounded w-[175px] font-semibold hidden bg-red p-[15px] top-[63px] right-[0px]  text-black absolute `} >
      <div className='text-center pb-[10px]  transition-all hover:scale-105'>
        <Link href="/manageAccount">Account Settings</Link>
      </div>
      <div className='border-b border-white'></div>
      <div
        className=' text-center transitiontransition-all cursor-pointer pt-[10px] hover:scale-105'
        onClick={() => dispatch(logout())}
      >
        Log out
      </div>
    </div>
  );
};