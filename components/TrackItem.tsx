import React from 'react'
import { ITrack } from '../types/track'
import { Card, Grid, IconButton } from '@mui/material';
import Pause from '@mui/icons-material/Pause'
import PlayArrow from '@mui/icons-material/PlayArrow';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setActiveTrack, setPlay, setActivePlaylist,setActiveTrackIndex, setPause, setTaken, setFree } from '../store/playerSlice';
import { useTypedSelector } from './../hooks/useTypedSelector';

interface TrackItemProps {
    track: ITrack
    tracklist:ITrack[]
    active?: boolean
    index:number
    red?:boolean
}

const TrackItem: React.FC<TrackItemProps> = ({red, track, index, tracklist,}) => {
    const { active, pause } = useTypedSelector((state) => state.player)
    const isTrackPlaying=active?._id===track._id
    const dispatch = useDispatch();
    const router = useRouter()
    const  pushAndPlay = (e:React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        dispatch(setPause())
        dispatch(setFree())
        dispatch(setActiveTrack(track))
        dispatch(setActiveTrackIndex(index))
        dispatch(setActivePlaylist(tracklist))
        setTimeout(() => { dispatch(setTaken()) }, 500)
        // dispatch(setAudio(track))
        // setAudio(track,dispatch,volume,true,)
    }
     const playOrPause=(e:React.MouseEvent<HTMLElement>)=>{
        e.stopPropagation()
            if (pause) {
              dispatch(setPlay())
            } else {
              dispatch(setPause())
            }
    }
    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center",
            margin: "10px",
            padding: "10px",
            width: "230px",
        }}
            className={`${red?'!bg-red':'' } bg-black pr-6 pl-6 hover:!scale-105 hover:!shadow-lg transition-all  duration-500  w-[230px] min-w-[230px] shadow-sm cursor-pointer`}
            onClick={() => router.push("/tracks/" + track._id)}
        >
            <div className='m-auto w-[180px] h-[150px] mb-4 mt-2 '> <img className='w-[100%] h-[100%] object-cover rounded' src={process.env.NEXT_PUBLIC_BASIC_URL + track.picture} /></div>
            <div className=' mb-2'>
            {isTrackPlaying?  <IconButton className='bg-green-dark hover:!bg-green-dark  hover:scale-125 transition-all  duration-500' onClick={playOrPause}>{!pause ? <Pause color='error'  /> : <PlayArrow color='error' />}</IconButton>:
            <IconButton className='bg-green-dark  hover:scale-125   hover:!bg-green-dark   transition-all  duration-500' onClick={pushAndPlay}><PlayArrow color='error' /></IconButton>
            }
                </div>
            <Grid container className="max-w-full text-red" direction={"column"}>
                <div className="font-bold truncate max-w-full">{track.name}</div>
                <div className="font-semibold truncate max-w-full">{track.artist}</div>
            </Grid>
        </Card >
    )
}

export default TrackItem