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
import { addToLiked, removeFromLiked } from '../../store/userSlice';
import { Pause, PlayArrow } from '@mui/icons-material';
import { setActivePlaylist, setActivePlaylistId, setActiveTrack,setPlay, setFree, setPause, setTaken } from '../../store/playerSlice';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getTracksWord,getLikesWord,getTotalTime } from './../../hooks/helpers/index';
import { NextPage } from 'next';
import EditPlaylistPopup from './popups/EditPlaylistPopup';
import DeletePlaylistPopup from './popups/DeletePlaylistPopup';
 
const UserPage:NextPage = () => {
    const { userForPage} = useTypedSelector((state) => state.user)
    const { morePopup } = useTypedSelector((state) => state.track)
    const [deletePopup,setDeletePopup]=useState(false)
    const { user } = useTypedSelector((state) => state.user)
    const { disabled,activePlaylistId,pause } = useTypedSelector((state) => state.player)
    const[editMode,setEditMode]=useState(false)
    const isPlaylistPlaying = activePlaylistId===userForPage?._id
    const isLiked=user?.likedPlaylists?.find((id)=>id === userForPage?._id)

    // let tracksWithIdex= userForPage.tracks?.map((t,index)=>({...t,index})) 
    // const [playlist, setPlaylist] = useState<IPlaylist>(serverPlaylist)
    // console.log("this",serverPlaylist)
   const router= useRouter()
   const dispatch=useDispatch<any>()
//  if(serverPlaylist.tracks){
//    serverPlaylist.tracks = serverPlaylist.tracks.map((t,index)=>({...t,index})) 
//  }

const addOrRemoveFromLiked=()=>{
    if(!isLiked){
      dispatch(addToLiked({id:userForPage?._id, type:"playlist"}))
    }
    else{
      dispatch(removeFromLiked({id:userForPage?._id, type:"playlist"}))
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
                    <div className='w-[400px] h-[400px] mb-4 mt-2 '>  
                      <Image alt="Albom picture" className='w-[100%] h-[100%] object-cover rounded-full' width={400} height={400} src={userForPage?.picture ? process.env.NEXT_PUBLIC_BASIC_URL + userForPage?.picture : albomPicture} />
                    </div>
                      <div className="ml-8 mr-24 mt-2">
                          <div className="font-semibold mb-4 mt-6 text-2xl max-w-full">Профіль</div>
                          <div className="font-bold mb-8 text-2xl  max-w-full">{userForPage?.username}</div>
                      </div>
                {user && <>
                       <div>
                          <IconButton disabled={disabled}  className='ml-16  hover:scale-110 duration-300  transition-all' onClick={addOrRemoveFromLiked}>
                            {isLiked?<FavoriteIcon  fontSize='medium' className='!w-[120px]  !h-[120px]' color='error' />:<FavoriteBorderIcon fontSize='medium' className='!w-[120px]  !h-[120px]' color='error' />}
                          </IconButton>
                        </div>
                       <div className="absolute top-[30px] right-[20px]">
                          <div className=' relative'>
                            <IconButton className='  hover:scale-110  !bg-green-dark    hover:!bg-green-dark    transition-all  duration-500' onClick={onMoreClickHandler}><MoreVertIcon/></IconButton>
                        </div>
                      </div>
                   </>}
             </Grid>
                {/* <div> 
                  {userForPage?.playlists?.length&&  
                  <div  > */}
                   {/* {userForPage?.playlists?.map((playlist,index)=>  <TrackItem key={playlist._id} index={index}  track={track} playlist={userForPage} />)} */}
                  {/* </div>  }  
                </div> */}
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


