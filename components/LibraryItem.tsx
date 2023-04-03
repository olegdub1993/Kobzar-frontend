import { Card, Grid } from '@mui/material';
import React from 'react'
import { IPlaylist } from '../types/playlist';
import { useRouter } from 'next/router';
import Image from 'next/image'
import albomPicture from './../public/kobza.jpg'

interface LibraryItemProps {
    playlist: IPlaylist
}
const LibraryItem: React.FC<LibraryItemProps> = ({ playlist }) => {
    const router = useRouter()
    return (
        <div
            className={`flex flex-col items-center m-[10px] p-[10px] bg-green-dark pr-6 pl-6 w-[330px]  h-[300px] min-w-[230px] cursor-pointer hover:opacity-90 rounded hover:!scale-105 hover:!shadow-lg !transition-all !duration-500`}
            onClick={() => router.push("/playlist/" + playlist._id)}
        >
            <div className='m-auto w-[280px] h-[200px] mb-4 mt-2 '>
                <Image className='w-[100%] h-[100%] object-cover rounded' height={250} width={250} src={playlist.picture ? process.env.NEXT_PUBLIC_S3_BUCKET_URL + playlist.picture : albomPicture} alt="Albom picture" />

                {/* <img className='w-[100%] h-[100%] object-cover rounded' src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + playlist.picture} /> */}
            </div>
            <div className=' mb-2'>
                {/* {isTrackPlaying?  <IconButton className='bg-black' onClick={playOrPause}>{!pause ? <Pause color='error'  /> : <PlayArrow color='error' />}</IconButton>:
            <IconButton className='bg-black' onClick={pushAndPlay}><PlayArrow color='error' /></IconButton>
            } */}
            </div>
            <Grid container className="max-w-full" direction={"column"}>
                <div className="font-bold text-center text-white text-xl truncate max-w-full">{playlist.name}</div>
                {/* <div className="font-semibold truncate max-w-full">{track.artist}</div> */}
            </Grid>
        </div >
    )

}

export default LibraryItem