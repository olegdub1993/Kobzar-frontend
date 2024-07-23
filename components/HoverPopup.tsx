import React from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { logout } from "../store/authSlice";
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useIntl } from "react-intl";

export const HoverPopup = () => {
  const {user} = useTypedSelector((state) => state.user)
  const intl=useIntl()

  console.log("hgfd",user)
  const dispatch = useDispatch<any>();
  return (
    <div
      className={`group-hover:block  bg-green text-white  rounded w-[175px] font-semibold hidden p-[15px] top-[63px] right-[0px]   absolute `} >
      <div className='text-center pb-[10px]  transition-all hover:scale-105'>
        {/* <Link href="/manageAccount">Профіль</Link> */}
        <Link href={`/users/${user?.id}`}>{intl.formatMessage({id:"navbar.profile"})}</Link>
      </div>
      <div className='text-center pb-[10px]  transition-all hover:scale-105'>
        <Link href='/settings'>{intl.formatMessage({id:"navbar.settings"})}</Link>
      </div>
      <div className='border-b border-white'></div>
      <div
        className=' text-center transitiontransition-all cursor-pointer pt-[10px] hover:scale-105'
        onClick={() => dispatch(logout())}
      >
        {intl.formatMessage({id:"navbar.logout"})}
      </div>
    </div>
  );
};