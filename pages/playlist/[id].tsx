import React, { useState } from 'react'
import { useRouter } from 'next/router';
import MainLayout from '../../layouts/MainLayout';
import { Button, Grid, TextField } from '@mui/material';
import { IComment, ITrack } from '../../types/track';
import axios from 'axios';
import { useInput } from '../../hooks/useInput';
import { IPlaylist } from '../../types/playlist';
import SearchTrackList from '../../components/SearchTrackList';
import TrackItem from '../../components/TrackItemLiniar';
import Image from 'next/image'
import albomPicture from './../../public/kobza.jpg'

interface PlaylistPageProps {
    serverPlaylist: IPlaylist
}

const PlaylistPage = ({ serverPlaylist }: PlaylistPageProps) => {
    // const [albom, setAlbom] = useState<IAlbom>(serverAlbom)
   const router= useRouter()
   const tracksWithIndex = serverPlaylist.tracks.map((t,index)=>({...t,index}))
    return (
        <MainLayout title={'Kobzar ' + serverPlaylist.name }
            keywords={"Music, tracks, " + serverPlaylist.name} red >
            <Grid container className="flex mb-8">
            <div className='w-[500px] h-[350px] mb-4 mt-2 '>  <Image alt="Albom picture" className='w-[100%] h-[100%] object-cover rounded' src={serverPlaylist.picture ? process.env.NEXT_PUBLIC_BASIC_URL + serverPlaylist.picture : albomPicture} /></div>
                <div className="ml-8 mt-2">
                    <div className="font-semibold mb-4 mt-8 text-4xl max-w-full">Назва плейлиста: {serverPlaylist.name}</div>
                    <div className="font-bold mb-24 text-7xl  max-w-full">Автор:{serverPlaylist.username}</div>
                </div>
             </Grid>
                <div> 
                  {serverPlaylist.tracks.length?    
                  <div >
                   {tracksWithIndex.map((track)=>  <TrackItem key={track._id} track={track} tracklist={tracksWithIndex} />)}
                  </div>:
                    <> <div className='text-white text-center text-2xl font-bold mb-2'>У цьому альбомі поки що немає пісень</div>
                     <div className='flex justify-center mt-8'> <Button onClick={()=>router.push('/search')} className='text-white bg-green-dark hover:bg-green-dark hover:opacity-90 capitalize text-2xl px-4 py-2 font-bold mb-2'>Знайти та додати пісні</Button></div> 
                       </>}  
                </div>
         
        </MainLayout>
    )
}

export default PlaylistPage

export async function getServerSideProps(context:any) {
    const { id } = context.params
    const response = await axios.get(process.env.NEXT_PUBLIC_BASIC_URL + "alboms/" + id)
    const serverPlaylist = response.data
    return {
        props: { serverPlaylist },
    }
}