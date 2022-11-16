import React from 'react'
import { ITrack } from '../types/track'
import { Button, Card, Grid, IconButton } from '@mui/material';
import Pause from '@mui/icons-material/Pause'
import PlayArrow from '@mui/icons-material/PlayArrow';
import Delete from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setActiveTrack, setPlay, setAudio, setPause, setTaken, setFree } from '../store/playerSlice';
import { useTypedSelector } from './../hooks/useTypedSelector';
import axios from 'axios';
interface TrackItemProps {
    track: ITrack
    active?: boolean
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
    const { volume, pause } = useTypedSelector((state) => state.player)
    const dispatch = useDispatch();
    const router = useRouter()
    const play = (e) => {
        e.stopPropagation()
        dispatch(setPause())
        dispatch(setTaken())
        dispatch(setActiveTrack(track))
        setTimeout(() => { dispatch(setFree()) }, 500)
        // dispatch(setAudio(track))
        // setAudio(track,dispatch,volume,true,)
    }

    const deleteItem = (e) => {
        e.stopPropagation()
        axios.delete(process.env.NEXT_PUBLIC_BASIC_URL + "tracks/" + track._id).then((r) => console.log("track deleted good"))
    }
    return (
        <Card sx={{
            display: 'flex',
            marginBottom: "20px",
            padding: "10px"
        }}
            onClick={() => router.push("/tracks/" + track._id)}
        >
            <IconButton onClick={play}>{active ? <Pause /> : <PlayArrow />}</IconButton>
            <div> <img src={process.env.NEXT_PUBLIC_BASIC_URL + track.picture} width={100} height={80} /></div>
            <Grid container direction={"column"}>
                <div>{track.name}</div>
                <div>{track.artist}</div>
            </Grid>
            {active && <div>12:23/23:12</div>}
            <IconButton onClick={deleteItem}><Delete /></IconButton>
        </Card >
    )
}

export default TrackItem