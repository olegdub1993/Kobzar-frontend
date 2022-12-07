import React from 'react'
import { ITrack } from '../types/track'
import { Button, Card, Grid, IconButton } from '@mui/material';
import Pause from '@mui/icons-material/Pause'
import PlayArrow from '@mui/icons-material/PlayArrow';
import Delete from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setMorePopup} from '../store/trackSlice';
import { setActiveTrack, setPlay, setAudio, setActivePlaylist, setPause, setTaken, setFree } from '../store/playerSlice';
import { useTypedSelector } from '../hooks/useTypedSelector';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { addTrackToAlbom } from '../store/userSlice';
interface TrackItemProps {
    track: ITrack
    tracklist:ITrack[]
    red?:boolean
}

const TrackItem: React.FC<TrackItemProps> = ({red, track, tracklist,}) => {
    const { active, pause } = useTypedSelector((state) => state.player)
    const {morePopup } = useTypedSelector((state) => state.track)
    const isTrackPlaying=active?._id===track._id
    const dispatch = useDispatch();
    const router = useRouter()
    const  pushAndPlay = (e) => {
        e.stopPropagation()
        dispatch(setPause())
        dispatch(setFree())
        dispatch(setActiveTrack(track))
        dispatch(setActivePlaylist(tracklist))
        setTimeout(() => { dispatch(setTaken()) }, 500)
        // dispatch(setAudio(track))
        // setAudio(track,dispatch,volume,true,)
    }
     const playOrPause=(e)=>{
        e.stopPropagation()
            if (pause) {
              dispatch(setPlay())
            } else {
              dispatch(setPause())
            }
    }
    const deleteItem = (e) => {
        e.stopPropagation()
        axios.delete(process.env.NEXT_PUBLIC_BASIC_URL + "tracks/" + track._id).then((r) => console.log("track deleted good"))
    }
    const onMoreClickHandler =(e)=>{
         e.stopPropagation()
         dispatch(setMorePopup(track._id))
    }
    return (
        <div
            className={`${red?'!bg-red':'' } hover:opacity-80 p-2 flex items-center bg-green-dark pr-6 pl-6 rounded  hover:!shadow-lg transition-all  duration-500  w-full border-b border-white shadow-sm cursor-pointer`}
            onClick={() => router.push("/tracks/" + track._id)}
        >
             <div className='mr-4'>
            {isTrackPlaying?  <IconButton className='bg-black hover:!bg-green-dark  hover:scale-125 transition-all  duration-500' onClick={playOrPause}>{!pause ? <Pause color='error'  /> : <PlayArrow color='error' />}</IconButton>:
            <IconButton className='bg-black  hover:scale-125   hover:!bg-green-dark   transition-all  duration-500' onClick={pushAndPlay}><PlayArrow color='error' /></IconButton>
            }
                </div>
            <div className='m-auto w-[100px] h-[60px] mr-4 '> <img className='w-[100%] h-[100%] object-cover rounded' src={process.env.NEXT_PUBLIC_BASIC_URL + track.picture} /></div>
           
            <Grid container className="max-w-full" direction={"column"}>
                <div className="font-bold truncate max-w-full">{track.name}</div>
                <div className="font-semibold truncate max-w-full">{track.artist}</div>
            </Grid>
            <div className=' relative'>
            <IconButton className='  hover:scale-110   hover:!bg-red   transition-all  duration-500' onClick={onMoreClickHandler}><MoreVertIcon/></IconButton>
            { morePopup==track._id && <Popup setPopup={(str)=>dispatch(setMorePopup(str))} trackId={track._id} />}
            </div>
        </div>
    )
}
const Popup = ({trackId, setPopup}:any) => {
    const dispatch=useDispatch()
    const {user,alboms} = useTypedSelector((state) => state.user)
    const addTrackToAlbomHandler=(albomId)=>{
        setPopup("")
        dispatch(addTrackToAlbom({albomId,trackId}))
    }
  return (
  <div onClick={(e)=>e.stopPropagation()}  className={`text-white  font-bold rounded w-[225px] bg-red p-[15px] bottom-[100%] right-[0px]   absolute `} >
           додати до альбому
         <div className="mt-4">
            {alboms?.map((albom)=><div 
            className="text-white mt-2 cursor-pointer hover:!opacity-75" key={albom._id} onClick={()=>addTrackToAlbomHandler(albom._id)}>
                {albom.name}
            </div>)}
  </div>
    </div>
  )
}
export default TrackItem