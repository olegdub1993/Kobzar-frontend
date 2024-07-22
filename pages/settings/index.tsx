import { MenuItem, Select, Switch } from '@mui/material'
import React from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import MainLayout from '../../layouts/MainLayout'
import { useDispatch } from 'react-redux';
import { setDarkMode } from '../../store/userSlice'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useIntl } from 'react-intl';

const Settings = () => {
    const {darkMode} = useTypedSelector((state) => state.user)
    const dispatch=useDispatch()
    const {locales,locale}=useRouter()
    const intl=useIntl()
    
    return (
        <MainLayout red>
           <div className='pt-6'> 
               <div className='mb-4 flex gap-3 items-center'>
               <div className='text-white dark:text-black text-2xl font-bold mb-4'>{intl.formatMessage({id:"search.mode"})}
               <Switch checked={darkMode} onClick={()=>dispatch(setDarkMode(!darkMode))}></Switch>
               </div>
             </div>
             <div className='mb-4 flex items-center gap-5'>
               <div className='text-white dark:text-black text-2xl font-bold '>
               {intl.formatMessage({id:"search.language"})}
                </div>
                <Select size="small" value={locale}>
                        { [...locales as string[]]?.sort().map((locale)=>
                        <MenuItem value={locale} key={locale}> 
                            <Link  href='/' locale={locale}>
                                    {locale}
                            </Link>
                        </MenuItem>)}
               </Select>
             </div>
          </div>
        </MainLayout>
    )
}
export default Settings
