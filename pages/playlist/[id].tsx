import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import MainLayout from '../../layouts/MainLayout';
import { Button, Grid, IconButton, } from '@mui/material';
import axios from 'axios';
import { IPlaylist } from '../../types/playlist';
import TrackItem from '../../components/TrackItemLiniar';
import Image from 'next/image'
import albomPicture from './../../public/kobza.jpg'
import { useDispatch } from 'react-redux';
import { setMorePopup } from '../../store/trackSlice'
import { fetchPlaylist } from '../../store/playlistSlice'
import { wrapper } from '../../store/store'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addToLiked, removeFromLiked } from '../../store/userSlice';
import Pause from '@mui/icons-material/Pause';
import PlayArrow from '@mui/icons-material/PlayArrow';
import { setActivePlaylist, setActivePlaylistId, setActiveTrack, setPlay, setFree, setPause, setTaken } from '../../store/playerSlice';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getTracksWord, getLikesWord, getTotalTime } from './../../hooks/helpers/index';
import { NextPage } from 'next';
import EditPlaylistPopup from './popups/EditPlaylistPopup';
import DeletePlaylistPopup from './popups/DeletePlaylistPopup';
import { parseCookies } from "nookies";
import { fetchUser } from '../../store/userSlice'

const PlaylistPage: NextPage = () => {
  const { playlistForPage } = useTypedSelector((state) => state.playlist)
  const { morePopup } = useTypedSelector((state) => state.track)
  const [deletePopup, setDeletePopup] = useState(false)
  const { user } = useTypedSelector((state) => state.user)
  const { disabled, activePlaylistId, pause } = useTypedSelector((state) => state.player)

  const [editMode, setEditMode] = useState(false)
  const isPlaylistPlaying = activePlaylistId === playlistForPage?._id
  const isLiked = user?.likedPlaylists?.find((id: string) => id === playlistForPage?._id)
  const totalTime = getTotalTime(playlistForPage?.tracks)
  const tracksWord = getTracksWord(playlistForPage?.tracks)
  const likesWord = getLikesWord(playlistForPage?.likes)

  // let tracksWithIdex= playlistForPage.tracks?.map((t,index)=>({...t,index})) 
  // const [playlist, setPlaylist] = useState<IPlaylist>(serverPlaylist)
  // console.log("this",serverPlaylist)
  const router = useRouter()
  const dispatch = useDispatch<any>()
  //  if(serverPlaylist.tracks){
  //    serverPlaylist.tracks = serverPlaylist.tracks.map((t,index)=>({...t,index})) 
  //  }

  const addOrRemoveFromLiked = () => {
    if (!isLiked) {
      dispatch(addToLiked({ id: playlistForPage._id, type: "playlist" }))
    }
    else {
      dispatch(removeFromLiked({ id: playlistForPage._id, type: "playlist" }))
    }
  }
  const pushAndPlay = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    dispatch(setPause())
    dispatch(setFree())
    dispatch(setActiveTrack(playlistForPage?.tracks[0]))
    dispatch(setActivePlaylist(playlistForPage?.tracks))
    dispatch(setActivePlaylistId(playlistForPage?._id))
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
  const onMoreClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    dispatch(setMorePopup(playlistForPage._id))
  }

  return (
    <MainLayout title={'Kobzar ' + playlistForPage?.name}
      keywords={"Music, tracks, " + playlistForPage?.name} red >
      <div>
        <Grid container className="flex mb-12 items-center text-white relative">
          <div className='w-[500px] h-[350px] mb-4 mt-2 '>
            <Image alt="Albom picture" className='w-[100%] h-[100%] object-cover rounded' width={500} height={350} src={playlistForPage?.picture ? process.env.NEXT_PUBLIC_S3_BUCKET_URL + playlistForPage?.picture : albomPicture} />
          </div>
          <div className="ml-8 mr-24 mt-2">
            <div className="font-semibold mb-4 mt-6 text-2xl max-w-full">Плейлист</div>
            <div className="font-semibold mb-8 mt-8 text-5xl max-w-full">{playlistForPage?.name}</div>
            {playlistForPage?.description && <div className="font-bold min-h-[72px] mb-10 text-3xl max-w-[600px]">{playlistForPage?.description}</div>}
            <div className="flex items-center mb-2">
              <Image alt="Albom picture" className='object-cover mr-4 rounded-full !h-[60px]' width={60} height={60} src={playlistForPage?.userPicture ? process.env.NEXT_PUBLIC_S3_BUCKET_URL + playlistForPage?.userPicture : albomPicture} />
              <div onClick={(e) => router.push("/users/" + playlistForPage.userId)} className=" hover:underline cursor-pointer font-semibold  text-2xl  max-w-full">{playlistForPage?.username}</div>
            </div>
            <div className="flex">
              <div className="font-bold mb-8 text-xl mr-2 max-w-full">{playlistForPage?.tracks?.length + ' ' + tracksWord},</div>
              <div className="font-bold mb-8 text-xl mr-2 max-w-full">{playlistForPage?.likes + ' ' + likesWord},</div>
              <div className="font-bold mb-8 text-xl  max-w-full">приблизно {totalTime} хв</div>
            </div>
          </div>
          {isPlaylistPlaying ? <IconButton className='!bg-green-dark hover:!bg-green-dark   hover:!scale-125 !transition-all  !duration-500' onClick={playOrPause}>{!pause ? <Pause color='error' className='!w-[120px]  !h-[120px]' /> : <PlayArrow color='error' className='!w-[120px]  !h-[120px]' />}</IconButton> :
            <IconButton className='!bg-green-dark  hover:!scale-125   hover:!bg-green-dark   !transition-all  !duration-500' onClick={pushAndPlay}><PlayArrow color='error' className='!w-[120px]  !h-[120px]' /></IconButton>
          }
          {user &&
            <>
              <div>
                <IconButton disabled={disabled} className='!ml-16  hover:!scale-110 !duration-300  !transition-all' onClick={addOrRemoveFromLiked}>
                  {isLiked ? <FavoriteIcon fontSize='medium' className='!w-[120px]  !h-[120px]' color='error' /> : <FavoriteBorderIcon fontSize='medium' className='!w-[120px]  !h-[120px]' color='error' />}
                </IconButton>
              </div>
              <div className="absolute top-[30px] right-[20px]">
                <div className=' relative'>
                  <IconButton className='  hover:scale-110  !bg-green-dark    hover:!bg-green-dark    transition-all  duration-500' onClick={onMoreClickHandler}><MoreVertIcon /></IconButton>
                  {morePopup == playlistForPage._id && <Popup setDeletePopup={setDeletePopup} setEditMode={setEditMode} playlist={playlistForPage} setPopup={(str: string) => dispatch(setMorePopup(str))} />}
                </div>
              </div>
            </>}
        </Grid>
        <div>
          {playlistForPage?.tracks?.length ?
            <div>
              {playlistForPage?.tracks?.map((track, index) => <TrackItem key={track._id+index} index={index} track={track} playlist={playlistForPage} />)}
            </div> :
            <> <div className='text-white text-center text-2xl font-bold mb-2'>У цьому альбомі поки що немає пісень</div>
              <div className='flex justify-center mt-8'> <Button onClick={() => router.push('/search')} className='!text-white hover:!bg-green-dark hover:!opacity-75  !bg-green-dark !capitalize !text-xl !py-2 px-4 !font-bold !mb-2'>Знайти та додати пісні</Button></div>
            </>}
        </div>
        {editMode && <EditPlaylistPopup playlist={playlistForPage} setEditMode={setEditMode} />}
        {deletePopup && <DeletePlaylistPopup playlist={playlistForPage} setPopup={setDeletePopup} />}
      </div>
    </MainLayout>
  )
}

interface PopupProps {
  playlist: any
  setEditMode: (arg: boolean) => void
  setDeletePopup: (arg: boolean) => void
  setPopup: (arg: string) => void
}
const Popup: React.FC<PopupProps> = ({ setPopup, playlist, setEditMode, setDeletePopup }) => {
  const dispatch = useDispatch<any>()
  const { alboms, user } = useTypedSelector((state) => state.user)
  const isUserAuthorOfPlaylist = alboms?.find((albom) => albom?._id === playlist._id)
  const isLiked = user?.likedPlaylists?.find((id: string) => id === playlist?._id)
  const editHandler = () => {
    setPopup("")
    setEditMode(true)

  }

  const removePlaylistHandler = () => {
    setPopup("");
    setDeletePopup(true)
  }

  const addOrRemoveFromLiked = () => {
    if (!isLiked) {
      setPopup("");
      dispatch(addToLiked({ id: playlist._id, type: "playlist" }))
    }
    else {
      setPopup("");
      dispatch(removeFromLiked({ id: playlist._id, type: "playlist" }))
    }
  }

  return (
    <div onClick={(e) => e.stopPropagation()} className={`text-white  h-[120px] font-bold rounded w-[225px] bg-black p-6 top-[0px] right-[100%]  absolute `} >
      {isUserAuthorOfPlaylist ?
        <><div onClick={() => editHandler()} className="hover:opacity-80 mb-3 cursor-pointer"> Редагувати</div>
          <div onClick={() => removePlaylistHandler()} className="hover:opacity-80 cursor-pointer">Видалити</div>
        </> :
        <div onClick={addOrRemoveFromLiked} className="hover:opacity-80 cursor-pointer">{!isLiked ? 'Додати до' : 'Видалити з'} бібліотеки</div>}
    </div>
  )
}


export default PlaylistPage

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  async (context) => {
    // in case of auth on next js side
    // const {accessToken} = parseCookies(context);
    //  const response =  await store.dispatch(fetchUser(accessToken));

    const id = context?.params?.id
    await store.dispatch(fetchPlaylist(id as string));
    //  const response = await axios.get(process.env.NEXT_PUBLIC_S3_BUCKET_URL + "alboms/" + id)
    //  const serverPlaylist = response.data
    return {
      props: {},
    }
  })


