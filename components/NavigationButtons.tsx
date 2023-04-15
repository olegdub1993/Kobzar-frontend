import { useRouter } from "next/router";
import { useState,useEffect } from 'react';

const NavigationButtons = () => {
  const router = useRouter();
  const [allowedPrev,setAllowedPrev]=useState<any>("");
  const [allowedNext,setAllowedNext]=useState<any>("")
 
  // Go to previous page
  const goToPreviousPage = () => {
    // router.back();
    const canGoBack = window.history.back();
    setAllowedPrev(canGoBack)
  };

  // Go to next page
  const goToNextPage = () => {
    const canGoForward= window.history.forward();
    setAllowedNext(canGoForward)
  };

  return (
    <div className="flex gap-1">
      <button  className={`${!allowedPrev?"cursor-not-allowed":"" } text-white`} onClick={goToPreviousPage}>Previous</button>
      <button className={`${!allowedNext?"cursor-not-allowed":"" } text-white`} onClick={goToNextPage}>Next</button>
    </div>
  );
};

export default NavigationButtons;
