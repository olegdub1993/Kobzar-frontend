import React, { useState } from 'react'
import { useRouter } from 'next/router';
import MainLayout from './../../layouts/MainLayout';
import { Button, Grid, TextField } from '@mui/material';
import { IComment, ITrack } from './../../types/track';
import axios from 'axios';
import { useInput } from '../../hooks/useInput';
import { IAlbom } from '../../types/playlist';
import SearchTrackList from './../../components/SearchTrackList';

interface AlbomPageProps {
    serverAlbom: IAlbom
}
const AlbomPage = ({ serverAlbom }: AlbomPageProps) => {
    // const [albom, setAlbom] = useState<IAlbom>(serverAlbom)
   const router= useRouter()
   const tracksWithIndex = serverAlbom.tracks.map((t,index)=>({...t,index}))
    return (
        <MainLayout title={'Kobzar ' + serverAlbom.name }
            keywords={"Music, tracks, " + serverAlbom.name} >
            <Grid container className="flex mb-8">
            <div className='w-[500px] h-[350px] mb-4 mt-2 '> <img className='w-[100%] h-[100%] object-cover rounded' src={process.env.NEXT_PUBLIC_BASIC_URL + serverAlbom.picture} /></div>
                <div className="ml-8 mt-2">
                    <div className="font-bold mb-4 text-xl truncate max-w-full">Назва альбому: {serverAlbom.name}</div>
                    <div className="font-semibold  text-lg truncate max-w-full">Автор:{serverAlbom.username}</div>
                </div>
             </Grid>
                <div> 
                  {serverAlbom.tracks.length?    <SearchTrackList  tracks={tracksWithIndex} />:
                    <> <div className='text-red text-center text-2xl font-bold mb-2'>У цьому альбомі поки що немає пісень</div>
                     <div className='flex justify-center mt-8'> <Button onClick={()=>router.push('search')} className='text-white bg-red capitalize text-2xl font-bold mb-2'>Знайти та додати пісні</Button></div> 
                       </>}  
                </div>
         
        </MainLayout>
    )
}

export default AlbomPage
export async function getServerSideProps(context) {
    const { id } = context.params
    const response = await axios.get(process.env.NEXT_PUBLIC_BASIC_URL + "alboms/" + id)
    const serverAlbom = response.data
    return {
        props: { serverAlbom },
    }
}