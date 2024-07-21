import { Switch } from '@mui/material'
import React from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import MainLayout from '../../layouts/MainLayout'
import { useDispatch } from 'react-redux';
import { setDarkMode } from '../../store/userSlice'

const Settings = () => {
    const {darkMode} = useTypedSelector((state) => state.user)
    const dispatch=useDispatch()

    return (
        <MainLayout red>
           <div className='pt-6'> 
               <div className='mb-4 flex gap-3 items-center'>
               <div className='text-white dark:text-black text-2xl font-bold mb-4'>Темний режим
               <Switch checked={darkMode} onClick={()=>dispatch(setDarkMode(!darkMode))}></Switch>
               </div>
             </div>
          </div>
        </MainLayout>
    )
}
export default Settings
