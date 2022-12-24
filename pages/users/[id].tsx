import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import MainLayout from '../../layouts/MainLayout';
import { Button, Grid, IconButton,  } from '@mui/material';
import axios from 'axios';
import { IPlaylist } from '../../types/playlist';
import TrackItem from '../../components/TrackItemLiniar';
import Image from 'next/image'
import albomPicture from './../../public/kobza.jpg'
import { useDispatch } from 'react-redux';
import {setMorePopup} from '../../store/trackSlice'
import {fetchUserProfile} from '../../store/userSlice'
import { wrapper } from '../../store/store'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addToLiked, removeFromLiked, createSubscription, deleteSubscription } from '../../store/userSlice';
import { Pause, PlayArrow } from '@mui/icons-material';
import { setActivePlaylist, setActivePlaylistId, setActiveTrack,setPlay, setFree, setPause, setTaken } from '../../store/playerSlice';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getPlaylistsWord,getSubscriptionsWord,getSubscribersWord } from './../../hooks/helpers/index';
import { NextPage } from 'next';
import EditPlaylistPopup from './popups/EditPlaylistPopup';
import DeletePlaylistPopup from './popups/DeletePlaylistPopup';
import PlaylistItem from "./../../components/PlaylistItem" 
import UserItem from './../../components/UserItem';

const UserPage:NextPage = () => {
    const {userForPage} = useTypedSelector((state) => state.user)
    const { morePopup } = useTypedSelector((state) => state.track)
    const [deletePopup,setDeletePopup]=useState(false)
    const { user } = useTypedSelector((state) => state.user)
    const { disabled,activePlaylistId,pause } = useTypedSelector((state) => state.player)
    const[editMode,setEditMode]=useState(false)
    const isSubscription=user?.subscriptions?.find((id)=>id === userForPage?._id)
    const router= useRouter()
    const dispatch=useDispatch<any>()
    
    const playlistsWord=getPlaylistsWord(userForPage?.playlists)
    const subscribersWord= getSubscribersWord(userForPage?.subscribers)
    const subscriptionsWord=getSubscriptionsWord(userForPage?.subscriptions)

const createOrRemoveSubscription=()=>{
    if(!isSubscription){
      dispatch(createSubscription(userForPage._id))
    }
    else{
      dispatch(deleteSubscription(userForPage._id))
    }
  }

const onMoreClickHandler =(e:React.MouseEvent<HTMLElement>)=>{
  e.stopPropagation()
  dispatch(setMorePopup(userForPage?._id))
}

    return (
        <MainLayout title={'Kobzar ' + userForPage?.username }
            keywords={"Music, tracks, " + userForPage?.username} red >
            <Grid container className="flex mb-12 items-center text-white relative">
                    <div className='w-[300px] h-[300px] mb-4 mt-2 '>  
                      <Image alt="Albom picture" className='w-[100%] h-[100%] object-cover rounded-full' width={300} height={300} src={userForPage?.picture ? process.env.NEXT_PUBLIC_BASIC_URL + userForPage?.picture : albomPicture} />
                    </div>
                      <div className="ml-16 mr-24 mt-2">
                          <div className="font-semibold mb-4 mt-6 text-2xl max-w-full">Профіль</div>
                          <div className="font-bold mb-8 text-2xl  max-w-full">{userForPage?.username}</div>
                          <div className="flex">
                            <div className="font-bold mb-8 text-xl mr-2 max-w-full">{userForPage?.playlists?.length+' '+playlistsWord},</div>
                            <div className="font-bold mb-8 text-xl mr-2 max-w-full">{userForPage?.subscribers?.length+' '+subscribersWord},</div>
                            <div className="font-bold mb-8 text-xl  max-w-full">{userForPage?.subscriptions?.length+' '+subscriptionsWord}</div>
                          </div>
                         <Button disabled={disabled}  onClick={createOrRemoveSubscription} className='bg-white capitalize w-[150px] hover:!bg-light-red text-black font-semibold'>{isSubscription?"Відписатись":"Підписатись"}</Button>
                      </div>
                   
             </Grid> 
             {!!userForPage?.playlists?.length  && 
             <div className='font-bold text-xl mb-4 text-white'>
                Плейлисти
              <div className="flex">
                      {userForPage?.playlists?.map((playlist, index) => <PlaylistItem index={index} key={playlist._id}  playlist={playlist} />)}
               </div>
            </div>}
            {!!userForPage?.subscribers?.length && 
             <div className='font-bold text-xl mb-4 text-white'>
                Підписники
              <div className="flex">
                      {userForPage?.subscribers?.map((subscriber )=> <UserItem  key={subscriber._id}  user={subscriber} />)}
               </div>
            </div>}
            {!!userForPage?.subscriptions?.length && 
              <div className='font-bold text-xl mb-4 text-white'>
                 Підписки
               <div className="flex">
                       {userForPage?.subscriptions?.map((subscription) => <UserItem  key={subscription._id}  user={subscription} />)}
                </div>
             </div>}
        </MainLayout>
    )
}

export default UserPage

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  async (context) => {
    const id = context?.params?.id
   await store.dispatch(fetchUserProfile(id as string));
    return {
        props: {  },
    }
})


