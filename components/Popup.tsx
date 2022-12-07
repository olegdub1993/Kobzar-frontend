import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

const Popup = ({setPopup}:any) => {
    const router = useRouter()
  return (
    <div className=' p-6 absolute h-[170px] rounded w-[250px] bg-red left-[200px]  top-[0px] z-[1500]'>
        {/* Увійдіть, щоб переглянути збережені пісні, подкасти, виконавців і плейлісти в розділі "Моя бібліотека". */}
        Увійдіть,  щоб отримати доступ до цієї можливості
        <div className="flex justify-between center mt-8">
        <Button onClick={(e) =>{e.stopPropagation(); setPopup("")}} className='bg-white capitalize hover:!bg-light-red text-black font-semibold'>Не зараз</Button>
        <Button onClick={() => router.push("/signup")} className='bg-white hover:!bg-light-red capitalize text-black font-semibold'>Увійти</Button>
  </div>
    </div>
  )
}

export default Popup