import React, { useEffect } from 'react'
import { Grid, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Pause from '@mui/icons-material/Pause'
import PlayArrow from '@mui/icons-material/PlayArrow';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import TrackProgress from './TrackProgress';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import {setActivePlaylistId,setPrevActiveTrackIndex, setActiveTrackIndex, setPlay, setPrevVolume, setPause, setVolume, setCurrentTime, setDuration, setActiveTrack, setTaken, setFree, setActivePlaylist, setRepeat, setPrevPlaylist, setIsShuffle } from '../store/playerSlice';
import { addToLiked ,removeFromLiked} from '../store/userSlice';
import RepeatOneOnOutlinedIcon from '@mui/icons-material/RepeatOneOnOutlined';
import RepeatOneOutlinedIcon from '@mui/icons-material/RepeatOneOutlined';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router'
import {shuffle} from './../hooks/helpers'
import Popup from './Popup';
let audio: HTMLAudioElement;

const Player = ({setRestrictPopup, restrictPopup}:any) => {
  const {disabled,prevActiveTrackIndex, allPlaylists, activePlaylistId, prevVolume, activeTrackIndex, active, repeat, isShuffle, prevPlaylist, activePlaylist, volume, duration, taken, currentTime, pause } = useTypedSelector((state) => state.player)
  // const { tracks, error } = useTypedSelector((state) => state.track)
  const {user} = useTypedSelector((state) => state.user)
  const dispatch = useDispatch<any>()
  const router = useRouter()
  const isLiked=user?.liked?.find((id:string)=>id===active?._id)
  useEffect(() => {
    if (!audio) {
      audio = new Audio()
    }
    audio.onended = function() {
      //let nextSong= activePlaylist.length-1 > activeTrackIndex ? activePlaylist[activeTrackIndex+1]: activePlaylist[0]
      let nextSong; 
      if(activePlaylist.length-1 > activeTrackIndex) { 
       nextSong = activePlaylist[activeTrackIndex+1]
       dispatch(setActiveTrackIndex(activeTrackIndex+1))
     }else{ 
      nextSong=activePlaylist[0]
      dispatch(setActiveTrackIndex(0))
     }
      // dispatch(setPause())
      dispatch(setFree())
      dispatch(setActiveTrack(nextSong))
      setTimeout(() => { dispatch(setTaken()) }, 500)
  };
    // console.log(active, "taken", taken)
    if (active && !taken) {
      // console.log(active)
      audio.src = process.env.NEXT_PUBLIC_BASIC_URL + active.audio
      audio.volume = volume / 100
      audio.onloadedmetadata = () => {
        // console.log("onloadedmetadata", audio.duration)
        dispatch(setDuration(Math.ceil(audio.duration)))
      }
      audio.ontimeupdate = () => {
        dispatch(setCurrentTime(Math.ceil(audio.currentTime)))
      }
    dispatch(setPlay())
    audio.play()
    }
  }, [active, taken, activePlaylist])


  useEffect(()=>{
    if (pause) {
      audio.pause()
    } else {
      audio.play()
    }
  },[pause])

  const play = () => {
    if (pause) {
      dispatch(setPlay())
      // audio.play()
    } else {
      dispatch(setPause())
      // audio.pause()
    }
  }
  const playNext = () => {
    // console.log(activePlaylist)
    // console.log(allPlaylists)
    // console.log(activeTrackIndex)
    // const  indexOfActivePlaylist =allPlaylists.findIndex((playlist)=>playlist._id===activePlaylistId)
    // let nextSong; 
    // if(activePlaylist.length-1 > activeTrackIndex) { 
    //   nextSong = activePlaylist[activeTrackIndex+1]
    // }else{ 
    //  nextSong=allPlaylists[indexOfActivePlaylist+1].tracks[0]
    //  dispatch(setActivePlaylistId(allPlaylists[indexOfActivePlaylist+1]._id))
    //  //no activeIndex
    //  dispatch(setActivePlaylist(allPlaylists[indexOfActivePlaylist+1].tracks))
    // }
    let nextSong; 
     if(activePlaylist.length-1 > activeTrackIndex) { 
      nextSong = activePlaylist[activeTrackIndex+1]
      dispatch(setActiveTrackIndex(activeTrackIndex+1))
    }else{ 
     nextSong=activePlaylist[0]
     dispatch(setActiveTrackIndex(0))
    }
    //console.log("activePlaylist",activePlaylist)
     //let nextSong= isShuffle? activePlaylist[Math.floor(Math.random() * activePlaylist.length)]:activePlaylist.length-1 > activeTrackIndex ? activePlaylist[activeTrackIndex+1]: activePlaylist[0]
    // let nextSong= activePlaylist.length-1 > activeTrackIndex ? activePlaylist[activeTrackIndex+1]: activePlaylist[0]
     
     // dispatch(setPause())
    dispatch(setFree())
    dispatch(setActiveTrack(nextSong))
    setTimeout(() => { dispatch(setTaken()) }, 500)
  }
  const playPrev = () => {
    console.log(activeTrackIndex)
     let prevSong;
     if( activePlaylist.length > activeTrackIndex && activeTrackIndex !==0){
      prevSong=activePlaylist[activeTrackIndex-1]
      dispatch(setActiveTrackIndex(activeTrackIndex-1))
     }else{
        prevSong=activePlaylist[activePlaylist.length-1]
        dispatch(setActiveTrackIndex(activePlaylist.length-1))
      }

    // let prevSong= activeTrackIndex> 0 ? activePlaylist[activeTrackIndex-1]: activePlaylist[activePlaylist.length-1]
    // dispatch(setPause())
    dispatch(setFree())
    dispatch(setActiveTrack(prevSong))
    setTimeout(() => { dispatch(setTaken()) }, 500)
  }
  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100
    dispatch(setVolume(Number(e.target.value)))
  }
  const turnOffVolume = () => {
    if(volume){
      dispatch(setPrevVolume(volume))
      audio.volume = 0
      dispatch(setVolume(0))
    } else{
      audio.volume = prevVolume / 100
      dispatch(setVolume(prevVolume))
    }
  }
  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value)
    dispatch(setCurrentTime(Number(e.target.value)))
  }

  const addOrRemoveFromLiked=(e:any)=>{
      if(!user){
        e.stopPropagation()
        setRestrictPopup("like")
        return
      }
      if(!isLiked){
        dispatch(addToLiked({id:active?._id, type:"track"}))
      }
      else{
        dispatch(removeFromLiked({id:active?._id, type:"track"}))
      }
    }

   const repeatHandler=()=>{
    if(repeat){
      dispatch(setRepeat(false))
      dispatch(setActivePlaylist(prevPlaylist))
      dispatch(setActiveTrackIndex(prevActiveTrackIndex))
    } else {
      const playlist=[active]
      dispatch(setRepeat(true))
      dispatch(setActivePlaylist(playlist))
      dispatch(setPrevPlaylist(activePlaylist))
      dispatch(setPrevActiveTrackIndex(activeTrackIndex))
    }
   } 
   const shuffleHandler=()=>{
    if(isShuffle){ 
      dispatch(setActivePlaylist(prevPlaylist))
      dispatch(setIsShuffle(false))
      const activeTrackIndex=prevPlaylist?.findIndex((track)=>track._id===active?._id)
      dispatch(setActiveTrackIndex(activeTrackIndex))
    } else {
      const playlist= [...activePlaylist]
      shuffle(playlist)
      dispatch(setIsShuffle(true))
      dispatch(setActivePlaylist(playlist))
      dispatch(setPrevPlaylist(activePlaylist))
      // dispatch(setPrevActiveTrackIndex(activeTrackIndex))
    }
   }
   if (!active?.audio) return null
  return (
    <div style={{
      width: "100%", paddingRight: "40px", paddingTop: "10px",
      paddingBottom: "10px", paddingLeft: "40px", display: "flex", alignItems: "center", position: "fixed", bottom: "0", zIndex:"2000", height: "90px", background: "black", color: "white"
    }}>
      <Grid container direction={"column"} className="w-[100px] mr-6" >
      <div className='h-[70px]  rounded w-[100px]'><img src={process.env.NEXT_PUBLIC_BASIC_URL + active.picture} className='w-[100%] h-[100%] object-cover rounded'  /></div>
      </Grid>
      <Grid container direction={"column"} className="w-[150px] mr-12">
        <div onClick={(e)=>router.push("/tracks/" + active._id)} className=' text-white truncate max-w-full cursor-pointer  hover:underline'>{active.name}</div>
        <div className='truncate max-w-full'>{active.artist}</div>
      </Grid>
      <div className='mr-24'>
      <TrackProgress audioRow width={"300px"} right={duration} left={currentTime} onChange={changeCurrentTime} />
      </div>
      <div className="relative">
       <IconButton disabled={disabled}  className='mr-[10px] hover:scale-110 duration-300  transition-all' onClick={addOrRemoveFromLiked}>
         {isLiked?<FavoriteIcon fontSize='medium' color='error' />:<FavoriteBorderIcon fontSize='medium' color='error' />}
      </IconButton>
      {restrictPopup === "like" && <Popup setPopup={setRestrictPopup} className="bottom-[80px] left-[50%] translate-x-[-50%]"/>}
      </div>
      <IconButton className='mr-[10px] hover:scale-110 duration-300  transition-all' onClick={playPrev}> <FastRewindIcon fontSize='medium' color='error' />
      </IconButton>
      <IconButton  className='mr-[10px] bg-green-dark hover:!bg-green-dark hover:scale-105 ' onClick={play}>{!pause ? <Pause fontSize='medium' color='error' /> : <PlayArrow color='error' fontSize='medium' />}</IconButton>
      <IconButton className='mr-[10px] hover:scale-110 duration-300  transition-all'  onClick={playNext}><FastForwardIcon fontSize='medium' color='error' /></IconButton>
      <IconButton  className={`${repeat&&""} mr-[10px] w-[30px] h-[30px] hover:scale-110 duration-300  transition-all`} onClick={repeatHandler}> {!repeat?<RepeatOneOutlinedIcon fontSize='medium' color='error' />:<RepeatOneOnOutlinedIcon fontSize='medium' color="error"  className='bg-dark-green' />}</IconButton>
      <IconButton  className={`mr-[10px] w-[30px] h-[30px] hover:scale-110 duration-300  transition-all`} onClick={shuffleHandler}> {!isShuffle?<ShuffleIcon fontSize='medium' color='error' />:<ShuffleOnIcon fontSize='medium' color="error"  className='bg-dark-green' />}</IconButton>
      <div  style={{ marginLeft: "auto", marginRight: "15px" }} onClick={turnOffVolume}> {!volume?<VolumeOffIcon className="cursor-pointer"  />: <VolumeUp className="cursor-pointer"  />}</div>
      <TrackProgress  width={"150px"} right={100} left={volume} onChange={changeVolume} />
    </div>
  )
}

export default Player