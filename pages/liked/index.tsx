import React, { useEffect } from 'react'
import MainLayout from '../../layouts/MainLayout'
import { useDispatch } from 'react-redux';
import { getLiked } from '../../store/userSlice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import SearchTrackList from '../../components/SearchTrackList';

const Playlist = () => {  
const {liked,user} = useTypedSelector((state) => state.user)
const likedWithIndex = liked.map((t,index)=>({...t,index}))
const dispatch=useDispatch()
const router = useRouter()
useEffect(()=>{
dispatch(getLiked())
},[user])
    return (
        <MainLayout red>
            <div className='pt-6'> 
               <div className='mb-4'>
            {liked?.length?
             <> <div className='text-white text-2xl font-bold mb-4'>Пісні, що сподобались:</div><SearchTrackList tracks={likedWithIndex} /></>:

             <>  <div className='text-white text-center text-2xl font-bold mt-6 mb-10'>Поки що немає пісень, які Вам сподобались</div>
           <div className='flex justify-center mt-8'> <Button onClick={()=>router.push('search')} className='text-white hover:bg-green-dark hover:opacity-75  bg-green-dark capitalize text-xl py-2 px-4 font-bold mb-2'>Знайти пісні</Button></div> 
             </>}
          </div></div>
        </MainLayout>
    )
}
export default Playlist
