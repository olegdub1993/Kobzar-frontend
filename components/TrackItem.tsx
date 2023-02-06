import React from 'react'
import { ITrack } from '../types/track'
import { Card, Grid, IconButton } from '@mui/material';
import Pause from '@mui/icons-material/Pause'
import PlayArrow from '@mui/icons-material/PlayArrow';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Image from 'next/image'
import { setActiveTrack, setPlay, setActivePlaylist, setActiveTrackIndex, setPause, setTaken, setFree } from '../store/playerSlice';
import { useTypedSelector } from './../hooks/useTypedSelector';

interface TrackItemProps {
    track: ITrack
    tracklist: ITrack[]
    active?: boolean
    index: number
    red?: boolean
}

const TrackItem: React.FC<TrackItemProps> = ({ red, track, index, tracklist, }) => {
    const { active, pause } = useTypedSelector((state) => state.player)
    const isTrackPlaying = active?._id === track._id
    const dispatch = useDispatch();
    const router = useRouter()
    const pushAndPlay = (e: React.MouseEvent<HTMLElement>) => {
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
    const playOrPause = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        if (pause) {
            dispatch(setPlay())
        } else {
            dispatch(setPause())
        }
    }
    return (
        <div
            className={`${red ? '!bg-red' : ''} relative group flex flex-col items-center m-[10px] p-[16px] rounded !bg-[#2B2B2BA6] hover:!scale-105 hover:!shadow-lg transition-all  duration-500  max-w-[195px] w-full shadow-sm cursor-pointer`}
            onClick={() => router.push("/tracks/" + track._id)}
        >
            <div className='m-auto w-full h-[156px] mb-4 '> <Image alt="Track`s image"  className='w-[100%] h-[100%]  object-cover rounded' height={250} width={250} src={process.env.NEXT_PUBLIC_BASIC_URL + track.picture} /></div>
            <div className={`${isTrackPlaying?"!opacity-100":""} mb-2 absolute top-[120px] opacity-0 group-hover:!opacity-100 !transition-all  !duration-300`}>
                {isTrackPlaying ? <IconButton className='!bg-green-dark hover:!bg-green-dark  hover:!scale-125 !transition-all  !duration-300' onClick={playOrPause}>{!pause ? <Pause color='error' /> : <PlayArrow color='error' />}</IconButton> :
                    <IconButton className='!bg-green-dark  hover:!scale-125   hover:!bg-green-dark   !transition-all  !duration-300' onClick={pushAndPlay}><PlayArrow color='error' /></IconButton>
                }
            </div>
            <Grid container className="max-w-full text-white" direction={"column"}>
                <div className="font-bold truncate max-w-full mb-[4px]">{track.name}</div>
                <div className="text-[14px] truncate max-w-full">{track.artist}</div>
            </Grid>
        </div >
    )
}

export default TrackItem