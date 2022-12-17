import { Button } from '@mui/material'
import React from 'react'
import {removePlaylist} from '../../../store/userSlice';
import { useDispatch } from 'react-redux';

const DeletePlaylistPopup = ({setPopup, playlist}:any) => {
  const dispatch=useDispatch<any>()
  const deleteHandler=()=>{
    setPopup(false)
    dispatch(removePlaylist(playlist?._id))
  }    

  return (
    <div className=' p-8 shadow-[0px_0px_23px_2px_rgba(0,0,0,0.96)] rounded w-[400px] bg-green-dark text-white fixed top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] z-[1500]'>
        {/* Увійдіть, щоб переглянути збережені пісні, подкасти, виконавців і плейлісти в розділі "Моя бібліотека". */}
         <div className="text-2xl mb-8 pl-4 pr-4 text-center"> Цей плейлист буде видалено </div>
        <div className="flex justify-between center ">
        <Button onClick={(e) =>{setPopup(false)}} className='bg-white w-[150px] capitalize hover:!bg-light-red text-black font-semibold'>Відмінити</Button>
        <Button onClick={() => deleteHandler()} className='bg-white w-[150px] hover:!bg-light-red capitalize text-black font-semibold'>Видалити</Button>
  </div>
    </div>
  )
}

export default DeletePlaylistPopup