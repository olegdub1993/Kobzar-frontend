import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import LibraryItem from '../../components/LibraryItem'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import MainLayout from '../../layouts/MainLayout'

const Alboms = () => {
    const {alboms} = useTypedSelector((state) => state.user)
    const router = useRouter()
    return (
        <MainLayout red>
           <div className='pt-6'> 
               <div className='mb-4'>
                    {alboms?.length?
                    <> 
                      <div className='text-white text-2xl font-bold mb-4'>Ваші плейлисти:</div>
                        <div className='grid grid-cols-4'  >
                        {alboms?.map((albom)=><LibraryItem key={albom._id} playlist={albom} />)}
                        </div>
                    </>:
                    <>  <div className='text-white text-center text-2xl font-bold mt-6 mb-10'>У вас поки що немає плейлистів</div>
                  <div className='flex justify-center mt-8'> <Button onClick={()=>router.push('createPlaylist')} className='text-white hover:bg-green-dark hover:opacity-75  bg-green-dark capitalize text-xl py-2 px-4 font-bold mb-2'>Створити плейлист</Button></div> 
                    </>}
             </div>
          </div>
        </MainLayout>
    )
}
export default Alboms
