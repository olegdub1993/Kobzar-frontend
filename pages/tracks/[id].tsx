import React, {useState} from 'react'
import MainLayout from './../../layouts/MainLayout';
import { Grid, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { addTrackToAlbom, addToLiked, removeFromLiked } from '../../store/userSlice';
import { fetchTrack, setMorePopup } from '../../store/trackSlice';
import { Pause, PlayArrow } from '@mui/icons-material';
import { setActiveTrack, setPlay, setActivePlaylist, setPause, setTaken, setFree } from '../../store/playerSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { wrapper } from '../../store/store'
import { NextPage } from 'next';
import { Button } from '@mui/material'
import Image from 'next/image'
// interface TrackPageProps {
//     serverTrack: ITrack
// }

const TrackPage: NextPage = () => {
  const { active, disabled, pause } = useTypedSelector((state) => state.player)
  const { trackForPage, morePopup } = useTypedSelector((state) => state.track)
  const { user } = useTypedSelector((state) => state.user)
  const isLiked = user?.liked?.find((id: string) => id === trackForPage?._id)
  const isTrackPlaying = active?._id === trackForPage?._id
  const dispatch = useDispatch<any>()
  const [warningPopup, setWarningPopup] = useState(false)
  const [activeLokalPlaylist, setActiveLokalPlaylist] = useState("")

  const pushAndPlay = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    dispatch(setPause())
    dispatch(setFree())
    dispatch(setActiveTrack(trackForPage))
    // shoud be real playlist
    dispatch(setActivePlaylist([trackForPage]))
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
      dispatch(addToLiked({ id: trackForPage?._id, type: "track" }))
    }
    else {
      dispatch(removeFromLiked({ id: trackForPage?._id, type: "track" }))
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
  const showPopup = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    dispatch(setMorePopup(trackForPage?._id))
  }
  return (
    <MainLayout title={'Kobzar ' + trackForPage?.name + "-" + trackForPage?.artist}
      keywords={"Music, tracks, " + trackForPage?.name + ", " + trackForPage?.artist} red>
      {/* <Button variant='outlined' onClick={() => router.push("/tracks")}>To list</Button> */}
      <Grid container className="flex mb-8 relative text-white">
        <div className='w-[500px] h-[350px] mb-4 mt-2 '>
         { trackForPage?.picture?<Image width={500} height={350} className='rounded w-[500px] h-[350px] object-cover' alt="Track's image" src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + trackForPage?.picture} />:""}
        </div>
        <div className="ml-8 mt-2 max-w-[900px] relative ">
          <div className="font-semibold mb-4 mt-6 text-2xl max-w-full">Пісня</div>
          <div className="font-bold mb-10 text-6xl  ">{trackForPage?.name}</div>
          <div className="font-semibold mt-4   mb-4  text-4xl max-w-full">{trackForPage?.artist}</div>
          {user &&
            <IconButton disabled={disabled} className='!mr-[10px] !absolute !bottom-0 hover:!scale-110 !duration-300  !transition-all' onClick={addOrRemoveFromLiked}>{isLiked ? <FavoriteIcon className="!w-[60px] !h-[60px]" color='error' /> : <FavoriteBorderIcon className="w-[60px] h-[60px]" color='error' />}</IconButton>}
        </div>
        {user && <div className="absolute top-[30px] right-[20px]">
          <div className="relative"> <IconButton className='!bg-black hover:!bg-green hover:!scale-125  !transition-all  !duration-500' onClick={showPopup}><MoreVertIcon color='error' className="rotate-180" /></IconButton>
            {morePopup === trackForPage?._id && <Popup trackId={trackForPage?._id} setActivePlaylist={setActiveLokalPlaylist} setWarningPopup={setWarningPopup}/>}
          </div>
        </div>
        }
      </Grid>
      <div className=' flex justify-center mt-16'>
        {isTrackPlaying ? <IconButton className=' !bg-green-dark hover:!bg-green-dark hover:!scale-105 !shadow-xl  !transition-all  !duration-500' onClick={playOrPause}>{!pause ? <Pause color='error' className='!w-[200px]  !h-[200px] ' /> : <PlayArrow color='error' className='!w-[200px]  !h-[200px]' />}</IconButton> :
          <IconButton className='!bg-green-dark hover:!bg-green-dark hover:!scale-105 !shadow-xl   !transition-all  !duration-500' onClick={pushAndPlay}><PlayArrow color='error' className='!w-[200px]  !h-[200px]' /></IconButton>
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
         {warningPopup && <WarningPopup playlist={activeLokalPlaylist} setPopup={setWarningPopup} trackId={trackForPage?._id}/>}
    </MainLayout>
  )
}
const Popup = ({ trackId, setWarningPopup, setActivePlaylist}: any) => {
  const dispatch = useDispatch<any>()
  const { alboms } = useTypedSelector((state) => state.user)

  const addTrackToAlbomHandler = (albom: any) => {
    setActivePlaylist(albom)
    const alreadyExist=albom.tracks.find((t:string)=>t===trackId)
    if(alreadyExist){
      console.log("eeewsdtgh")
      setWarningPopup(true)
    } else{
      dispatch(addTrackToAlbom({ albomId:albom._id, trackId }))
    }
  }
  return (
    <div className={`text-white text-lg font-semibold shadow-[0px_0px_16px_0px_rgba(0,0,0,0.96)] bg-green  rounded w-[275px]  px-4 py-6 top-[0px] right-[100%]  absolute `} >
      Додати до альбому:
      <div className="mt-4">
        {alboms?.map((albom) => <div
          className="mt-2 cursor-pointer font-bold hover:!opacity-75" key={albom._id} onClick={() => addTrackToAlbomHandler(albom)}>
          {albom.name}
        </div>)}
      </div>
    </div>
  )
}

const WarningPopup = ({setPopup, playlist,trackId}:any) => {
  const dispatch=useDispatch<any>()

  const addHandler=()=>{
    setPopup(false)
    dispatch(addTrackToAlbom({ albomId:playlist._id, trackId }))
  }    

  return (
    <div className=' p-8 shadow-[0px_0px_23px_2px_rgba(0,0,0,0.96)] rounded w-[400px] bg-green-dark text-white fixed top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] z-[1500]'>
        {/* Увійдіть, щоб переглянути збережені пісні, подкасти, виконавців і плейлісти в розділі "Моя бібліотека". */}
         <div className="text-2xl mb-8 pl-4 pr-4 text-center"> Ця пісня вже є в плейлисті {playlist.name}</div>
        <div className="flex justify-between center ">
        <Button onClick={(e) =>{ addHandler()}} className='!w-[150px] !normal-case hover:!bg-light-red !bg-transparent !text-black !font-semibold'>Усе одно  додати</Button>
        <Button onClick={() =>setPopup(false)} className='!bg-white !w-[150px]  !normal-case  hover:!bg-light-red !text-black !font-semibold'>Не додавати</Button>
  </div>
    </div>
  )
}

export default TrackPage
export const getServerSideProps = wrapper.getServerSideProps((store) =>
  async (context) => {
    const id = context?.params?.id
    await store.dispatch(fetchTrack(id as string));
    // const response = await axios.get(process.env.NEXT_PUBLIC_BASIC_URL + "tracks/" + id)
    // const serverTrack = response.data
    return {
      props: {},
    }
  })