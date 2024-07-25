import React, { useEffect } from 'react'
import { Card, Grid, IconButton } from '@mui/material';
import Pause from '@mui/icons-material/Pause'
import PlayArrow from '@mui/icons-material/PlayArrow';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setActiveTrack, setActiveTrackIndex, setPlay, setActivePlaylist, setActivePlaylistId, setPause, setTaken, setFree } from '../store/playerSlice';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IPlaylist } from './../types/playlist';
import Image from 'next/image'
import albomPicture from './../public/kobza.jpg'
import { AppState } from '../store/store';

interface PlaylistItemProps {
    playlist: IPlaylist
    index: number
    red?: boolean
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ playlist }) => {
    const { active, pause, activePlaylist, activePlaylistId } = useTypedSelector((state:AppState) => state.player)
    const tracksWithIndex = playlist.tracks?.map((t, index) => ({ ...t, index }))
    // const isPlaylistPlaying=playlist.tracks.find((t)=>t._id===active?._id)
    const isPlaylistPlaying = activePlaylistId === playlist._id
    const dispatch = useDispatch();
    const router = useRouter()
    const pushAndPlay = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        dispatch(setPause())
        dispatch(setFree())
        dispatch(setActiveTrack(tracksWithIndex[0]))
        dispatch(setActiveTrackIndex(0))
        dispatch(setActivePlaylist(tracksWithIndex))
        dispatch(setActivePlaylistId(playlist._id))
        setTimeout(() => { dispatch(setTaken()) }, 500)
        // dispatch(setAudio(track))
        // setAudio(track,dispatch,volume,true,)
    }

    // useEffect(() => {
    //     dispatch(setAllPlaylists(playlist))
    // },
    //     [])

    const playOrPause = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        if (pause) {
            dispatch(setPlay())
        } else {
            dispatch(setPause())
        }
    }
    // const deleteItem = (e) => {
    //     e.stopPropagation()
    //     axios.delete(process.env.NEXT_PUBLIC_S3_BUCKET_URL + "tracks/" + track._id).then((r) => console.log("track deleted good"))
    // }
    return (
        <div
            className={`flex flex-col items-center m-[10px] p-[10px] bg-black dark:bg-blue pr-6 pl-6 hover:!scale-105 hover:!shadow-lg transition-all  duration-500 rounded w-[230px] min-w-[230px] shadow-sm cursor-pointer`}
            onClick={() => router.push("/playlist/" + playlist._id)}
        >
            <div className='m-auto w-[180px] h-[150px] mb-4 mt-2 '>
                <Image className='w-[100%] h-[100%] object-cover rounded' height={250} width={250} src={playlist.picture ? process.env.NEXT_PUBLIC_S3_BUCKET_URL + playlist.picture : albomPicture} alt="Albom picture" />
            </div>
            <div className=' mb-2'>
                {isPlaylistPlaying ? <IconButton className='!bg-green-dark hover:!bg-green-dark  hover:!scale-125 !transition-all  !duration-500' onClick={playOrPause}>{!pause ? <Pause color='error' /> : <PlayArrow color='error' />}</IconButton> :
                    <IconButton className='!bg-green-dark  hover:!scale-125   hover:!bg-green-dark   !transition-all  !duration-500' onClick={pushAndPlay}><PlayArrow color='error' /></IconButton>
                }
            </div>
            <Grid container className="max-w-full text-red" direction={"column"}>
                <div className="!font-bold truncate max-w-full">{playlist.name}</div>
                <div className="!font-semibold truncate max-w-full">{playlist.username}</div>
            </Grid>
        </div >
    )
}

export default PlaylistItem