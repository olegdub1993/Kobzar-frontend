import React, { useState } from 'react'
import { useRouter } from 'next/router';
import MainLayout from './../../layouts/MainLayout';
import { Button, Grid, TextField ,IconButton} from '@mui/material';
import { IComment, ITrack } from './../../types/track';
import axios from 'axios';
import { useInput } from '../../hooks/useInput';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { addTrackToAlbom } from '../../store/userSlice';
import { Pause, PlayArrow } from '@mui/icons-material';
import { setActiveTrack, setPlay, setAudio, setActivePlaylist, setPause, setTaken, setFree } from '../../store/playerSlice';
interface TrackPageProps {
    serverTrack: ITrack
}
const TrackPage = ({ serverTrack }: TrackPageProps) => {
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const { active, pause } = useTypedSelector((state) => state.player)
    const isTrackPlaying=active?._id===track._id
    const dispatch=useDispatch()
    const  pushAndPlay = (e) => {
        e.stopPropagation()
        dispatch(setPause())
        dispatch(setFree())
        dispatch(setActiveTrack(track))
        // shoud be real playlist
        dispatch(setActivePlaylist([track]))
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
    // const router = useRouter()
    // const username = useInput()
    // const text = useInput()
    // const addComment = async () => {
    //     try {
    //         const responce = await axios.post(process.env.NEXT_PUBLIC_BASIC_URL + "tracks/comment", { username: username.value, text: text.value, trackId: serverTrack._id })
    //         setTrack({ ...track, comments: [...track.comments, responce.data] })
    //     } catch (error) {
    //         console.log(e)
    //     }
    // }
    const showPopup=()=>{

    }
    return (
        <MainLayout title={'Kobzar ' + track.name + "-" + track.artist}
            keywords={"Music, tracks, " + track.name + ", " + track.artist} red>
            {/* <Button variant='outlined' onClick={() => router.push("/tracks")}>To list</Button> */}
            <Grid container className="flex mb-8 ">
              <div className='w-[500px] h-[350px] mb-4 mt-2 '>
                 <img className='w-[100%] h-[100%] object-cover rounded' src={process.env.NEXT_PUBLIC_BASIC_URL + track.picture} />
                </div>
                <div className="ml-8 mt-2 max-w-[900px] ">
                    <div className="font-semibold mt-4   mb-4  text-4xl truncate max-w-full">{track.artist}</div>
                    <div className="font-bold mb-16 text-7xl  ">{track.name}</div>
                    
                <div className=" group relative"> <IconButton className='bg-black hover:!bg-green-dark hover:!scale-125  transition-all  duration-500' onClick={showPopup}><MoreVertIcon color='error' className="rotate-180" /></IconButton>
                <Popup trackId={track._id}/>
                </div>
              </div>
             </Grid>
             <div className=' flex justify-center mt-16'>
            {isTrackPlaying?  <IconButton className=' bg-green-dark hover:!bg-green-dark hover:scale-105 shadow-xl  transition-all  duration-500' onClick={playOrPause}>{!pause ? <Pause color='error' className='!w-[200px]  !h-[200px] '/> : <PlayArrow color='error'  className='!w-[200px]  !h-[200px]'/>}</IconButton>:
            <IconButton className='bg-green-dark hover:!bg-green-dark hover:scale-105 shadow-xl   transition-all  duration-500' onClick={pushAndPlay}><PlayArrow  color='error' className='!w-[200px]  !h-[200px]' /></IconButton>
            }
                </div>

                {/* <Grid container>
                    <TextField {...username} label="Your name" fullWidth />
                    <TextField {...text} label="Write comment" fullWidth multiline
                        rows={4} />
                    <Button onClick={addComment}>Send</Button>
                </Grid>
                <div>
                    {track.comments.map((comment: IComment) => <div key={comment._id}>
                        <div>{comment.username}</div>
                        <div>{comment.text}</div>
                    </div>)}
                </div> */}
            
        </MainLayout>
    )
}
const Popup = ({trackId}:any) => {
    const dispatch=useDispatch()
    const {user,alboms} = useTypedSelector((state) => state.user)
    const addTrackToAlbomHandler=(albomId)=>{
        dispatch(addTrackToAlbom({albomId,trackId}))
    }
  return (
  <div  className={`group-hover:block  rounded w-[275px] hidden bg-red p-[15px] top-[0px] left-[35px]  text-black absolute `} >
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
export default TrackPage
export async function getServerSideProps(context) {
    const { id } = context.params
    const response = await axios.get(process.env.NEXT_PUBLIC_BASIC_URL + "tracks/" + id)
    const serverTrack = response.data
    console.log(serverTrack)
    return {
        props: { serverTrack },
    }
}