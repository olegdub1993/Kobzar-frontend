import React, { useEffect } from 'react'
import { ITrack } from '../types/track'
import { Grid, IconButton } from '@mui/material';
import Pause from '@mui/icons-material/Pause'
import PlayArrow from '@mui/icons-material/PlayArrow';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setMorePopup } from '../store/trackSlice';
import { setActiveTrack, setActiveTrackIndex, setPlay, setActivePlaylist, setActivePlaylistId, setPause, setTaken, setFree } from '../store/playerSlice';
import { useTypedSelector } from '../hooks/useTypedSelector';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { addToLiked, removeFromLiked, addTrackToAlbom, removeTrackFromPlaylist } from '../store/userSlice';
import { IPlaylist } from './../types/playlist';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


interface TrackItemProps {
  index: number
  track: ITrack
  playlist: IPlaylist
  red?: boolean
}

const TrackItem: React.FC<TrackItemProps> = ({ red, track, playlist, index }) => {
  const { user } = useTypedSelector((state) => state.user)
  const { playlistForPage } = useTypedSelector((state) => state.playlist)
  const { active, disabled, pause, activePlaylistId } = useTypedSelector((state) => state.player)
  const { morePopup } = useTypedSelector((state) => state.track)
  const isLiked = user?.liked?.find((id: string) => id === track?._id)
  const isTrackPlaying = active?._id === track._id
  const dispatch = useDispatch<any>();
  const router = useRouter()
  let duration = Math.ceil(track.duration)
  let minutes = Math.floor(duration / 60);
  let seconds: string | number = duration - minutes * 60;
  seconds = seconds < 10 ? "0" + seconds : seconds

  // nead to think
  useEffect(() => {
    if (activePlaylistId === playlistForPage._id) {
      dispatch(setActivePlaylist(playlist.tracks))
    }
  }, [playlistForPage])

  const pushAndPlay = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    dispatch(setPause())
    dispatch(setFree())
    dispatch(setActiveTrack(track))
    dispatch(setActiveTrackIndex(index))
    // console.log("dd",track)
    // console.log("dd",track)
    dispatch(setActivePlaylistId(playlist._id))
    dispatch(setActivePlaylist(playlist.tracks))
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
  const addOrRemoveFromLiked = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    if (!isLiked) {
      dispatch(addToLiked({ id: track._id, type: "track" }))
    }
    else {
      dispatch(removeFromLiked({ id: track._id, type: "track" }))
    }
  }
  // const deleteItem = (e:React.MouseEvent<HTMLElement>) => {
  //     e.stopPropagation()
  //     axios.delete(process.env.NEXT_PUBLIC_BASIC_URL + "tracks/" + track._id).then((r) => console.log("track deleted good"))
  // }
  const onMoreClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    dispatch(setMorePopup(track._id))
  }
  return (
    <div
      className={`${red ? '!bg-red' : ''} hover:bg-[rgba(54,0,2,1)] p-2 flex items-center text-white  pr-6 pl-6 rounded  hover:!shadow-lg transition-all  duration-500  w-full border-b border-black shadow-sm cursor-pointer`}
      onClick={() => router.push("/tracks/" + track._id)}
    >
      <div className='mr-6'>
        {isTrackPlaying ? <IconButton className='!bg-black hover:!bg-green-dark  hover:!scale-125 !transition-all  !duration-500' onClick={playOrPause}>{!pause ? <Pause color='error' /> : <PlayArrow color='error' />}</IconButton> :
          <IconButton className='!bg-black  hover:!scale-125   hover:!bg-green-dark   !transition-all  !duration-500' onClick={pushAndPlay}><PlayArrow color='error' /></IconButton>
        }
      </div>
      <div className='m-auto w-[100px] h-[60px] mr-6 '> <img className='w-[100%] h-[100%] object-cover rounded' src={process.env.NEXT_PUBLIC_BASIC_URL + track.picture} /></div>

      <Grid container className="" direction={"column"}>
        <div className="font-bold truncate max-w-full">{track.name}</div>
        <div className="font-semibold truncate max-w-full">{track.artist}</div>
      </Grid>
      <div className="font-semibold mr-12">{minutes + ":" + seconds}</div>
      {user &&
        <>
          <IconButton disabled={disabled} className='!mr-8  hover:!scale-110 !duration-300  !transition-all' onClick={addOrRemoveFromLiked}>{isLiked ? <FavoriteIcon fontSize='medium' color='error' /> : <FavoriteBorderIcon fontSize='medium' color='error' />}</IconButton>
          <div className=' relative'>
            <IconButton className='  hover:!scale-110  hover:!bg-green-dark  !bg-green-dark   !transition-all  !duration-500' onClick={onMoreClickHandler}><MoreVertIcon /></IconButton>
            {morePopup == track._id && <Popup playlist={playlist} setPopup={(str: string) => dispatch(setMorePopup(str))} trackId={track._id} />}
          </div>
        </>}
    </div>
  )
}

interface PopupProps {
  playlist: any
  trackId: string
  setPopup: (arg: string) => void
}
const Popup: React.FC<PopupProps> = ({ trackId, setPopup, playlist }) => {
  const dispatch = useDispatch<any>()
  const { alboms } = useTypedSelector((state) => state.user)
  const isUserAuthorOfPlaylist = alboms?.find((albom) => albom._id === playlist._id)
  const addTrackToPlaylistHandler = (albomId: string) => {
    setPopup("")
    dispatch(addTrackToAlbom({ albomId, trackId }))
  }

  const removeTrackFromPlaylistHandler = () => {
    setPopup("");
    dispatch(removeTrackFromPlaylist({ playlistId: playlist._id, trackId }))
  }

  return (
    <div onClick={(e) => e.stopPropagation()} className={`text-white  font-bold rounded w-[225px] bg-red p-[15px] bottom-[100%] right-[0px]   absolute `} >
      {isUserAuthorOfPlaylist &&
        <div className="mb-3 hover:opacity-80" onClick={() => removeTrackFromPlaylistHandler()}>Видалити з плейлиста</div>
      }
      Додати до плейлиста:
      <div className="hover:opacity-80">
        {alboms?.map((albom) => {
          if (albom._id !== playlist._id) {
            return <div
              className="text-white mt-2 cursor-pointer hover:!opacity-75" key={albom._id} onClick={() => addTrackToPlaylistHandler(albom._id)}>
              {albom.name}
            </div>
          }
        })}
      </div>
    </div>
  )
}
export default TrackItem