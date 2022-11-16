import React, { useState, useEffect } from 'react'
import { Button, Card, Grid, IconButton } from '@mui/material';
import Pause from '@mui/icons-material/Pause'
import PlayArrow from '@mui/icons-material/PlayArrow';
import VolumeUp from '@mui/icons-material/VolumeUp';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import TrackProgress from './TrackProgress';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { setPlay, setPause, setVolume, setCurrentTime, setDuration, setActiveTrack, setTaken } from '../store/playerSlice';

let audio: HTMLAudioElement;

const Player = () => {
  const { active, volume, duration, taken, currentTime, pause } = useTypedSelector((state) => state.player)
  // const {tracks, error}=useTypedSelector((state)=>state.track)
  const [i, setI] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!audio) {
      audio = new Audio()
    }
    // console.log(active, "taken", taken)
    if (active && taken) {
      audio.src = process.env.NEXT_PUBLIC_BASIC_URL + active.audio
      audio.volume = volume / 100
      audio.onloadedmetadata = () => {
        console.log("onloadedmetadata", audio.duration)
        dispatch(setDuration(Math.ceil(audio.duration)))
      }
      audio.ontimeupdate = () => {
        dispatch(setCurrentTime(Math.ceil(audio.currentTime)))
      }
      play()
    }
  }, [active, taken])


  const play = () => {
    console.log("in play")
    if (pause) {
      dispatch(setPlay())
      audio.play()
    } else {
      dispatch(setPause())
      audio.pause()
    }
  }

  const playNext = () => {
    // dispatch(setPause()) 
    // console.log(tracks[i+1])
    // dispatch(setActiveTrack(tracks[i+1]))
    // setI((i)=>i+1)
    // setAudio(tracks[i+1],dispatch,volume,true)
  }
  const playPrev = () => {
    // dispatch(setPause()) 
    // dispatch(setActiveTrack(tracks[i-1]))
    // setI((i)=>i-1)
    // setAudio(tracks[i-1],dispatch,volume,true)
  }
  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100
    dispatch(setVolume(Number(e.target.value)))
  }
  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value)
    dispatch(setCurrentTime(Number(e.target.value)))
  }


  if (!active) return <div></div>

  return (
    <div style={{
      width: "100%", paddingRight: "40px", paddingTop: "10px",
      paddingBottom: "10px", paddingLeft: "40px", display: "flex", alignItems: "center", position: "fixed", bottom: "0", height: "100px", background: "black", color: "white"
    }}>
      <Grid container direction={"column"} width={"200px"}>
        <img src={process.env.NEXT_PUBLIC_BASIC_URL + active.picture} width={100} />
      </Grid>
      <IconButton style={{ marginRight: "10px" }} onClick={playPrev}><FastRewindIcon fontSize='large' color='error' /></IconButton>
      <IconButton style={{ marginRight: "10px" }} onClick={play}>{!pause ? <Pause fontSize='large' color='error' /> : <PlayArrow color='error' fontSize='large' />}</IconButton>
      <IconButton style={{ marginRight: "10px" }} onClick={playNext}><FastForwardIcon fontSize='large' color='error' /></IconButton>
      <Grid container direction={"column"} width={"200px"}>
        <div>{active.name}</div>
        <div>{active.artist}</div>
      </Grid>
      <TrackProgress audioRow width={"300px"} right={duration} left={currentTime} onChange={changeCurrentTime} />
      <VolumeUp style={{ marginLeft: "auto", marginRight: "10px" }} />
      <TrackProgress width={"150px"} right={100} left={volume} onChange={changeVolume} />
    </div>
  )
}

export default Player