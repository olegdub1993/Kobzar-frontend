import { Card, Grid} from '@mui/material';
import React from 'react'
import { IAlbom } from '../types/playlist';
import { useRouter } from 'next/router';

interface LibraryItemProps {
 playlist:IAlbom
}
const LibraryItem:React.FC<LibraryItemProps> = ({playlist}) => {
    const router=useRouter()
    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center",
            margin: "10px",
            padding: "10px",
            width: "230px",

            // width: "100%"

        }}
            className={` bg-green-dark pr-6 pl-6 w-[330px] min-w-[230px] cursor-pointer hover:opacity-90`}
            onClick={() => router.push("/playlist/" + playlist._id)}
        >
            <div className='m-auto w-[280px] h-[150px] mb-4 mt-2 '> <img className='w-[100%] h-[100%] object-cover rounded' src={process.env.NEXT_PUBLIC_BASIC_URL + playlist.picture} /></div>
            <div className=' mb-2'>
            {/* {isTrackPlaying?  <IconButton className='bg-black' onClick={playOrPause}>{!pause ? <Pause color='error'  /> : <PlayArrow color='error' />}</IconButton>:
            <IconButton className='bg-black' onClick={pushAndPlay}><PlayArrow color='error' /></IconButton>
            } */}
                </div>
            <Grid container className="max-w-full" direction={"column"}>
                <div className="font-bold text-center text-lg truncate max-w-full">{playlist.name}</div>
                {/* <div className="font-semibold truncate max-w-full">{track.artist}</div> */}
            </Grid>
        </Card >
    )

}

export default LibraryItem