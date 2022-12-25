import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

interface RestrictPopupProps {
  className:string
  setPopup:(arg:string)=> void
}

const RestrictPopup:React.FC<RestrictPopupProps> = ({setPopup,className}) => {
    const router = useRouter()
  return (
    <div className={`${className} shadow-[0px_0px_23px_2px_rgba(0,0,0,0.96) p-6 absolute h-[160px] rounded w-[270px] bg-green-dark text-center text-white text-lg z-[1500]`}>
        {/* Увійдіть, щоб переглянути збережені пісні, подкасти, виконавців і плейлісти в розділі "Моя бібліотека". */}
        Увійдіть,  щоб отримати доступ до цієї можливості
        <div className="flex justify-between center mt-6">
        <Button onClick={(e) =>{e.stopPropagation(); setPopup("")}} className='bg-white capitalize w-[100px] hover:!bg-light-red text-black font-semibold'>Не зараз</Button>
        <Button onClick={() => router.push("/signup")} className='bg-white hover:!bg-light-red capitalize w-[100px] text-black font-semibold'>Увійти</Button>
  </div>
    </div>
  )
}

export default RestrictPopup