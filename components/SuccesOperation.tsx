import React, { useEffect, useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { setSuccess } from '../store/userSlice'
import { useDispatch } from 'react-redux';

const SuccesOperation = () => {
    const dispatch=useDispatch()
    const {success} = useTypedSelector((state) => state.user)
    const [succesText, setSuccessText]=useState("");
    useEffect(()=>{
      if(success){setSuccessText(success)}
      const timeouId=  setTimeout(()=>dispatch(setSuccess("")),2000)
      const timeouId2= setTimeout(()=>setSuccessText(""),2500)
      return ()=> {clearTimeout(timeouId);clearTimeout(timeouId2)}
    },[success])

    const styles=success?"!opacity-100 ":""
  return (
    <div className={`fixed opacity-0 transition-opacity duration-500 text-white shadow-lg px-6 py-2 font-semibold rounded bg-green-dark bottom-[115px] left-[50%] translate-x-[-50%] ${styles}`} >{succesText}</div>
  )
}

export default SuccesOperation
