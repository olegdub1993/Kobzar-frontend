import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import MainLayout from '../../layouts/MainLayout';
import { Button, Grid, IconButton, } from '@mui/material';
import Image from 'next/image'
import albomPicture from './../../public/kobza.jpg'
import { useDispatch } from 'react-redux';
import { setMorePopup } from '../../store/trackSlice'
import { fetchArtistProfile } from '../../store/artistSlice'
import { wrapper } from '../../store/store'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { setRestrictPopup, } from '../../store/authSlice';
import { addToLiked, removeFromLiked, createSubscription, deleteSubscription } from '../../store/userSlice';
import { getPlaylistsWord, getSubscriptionsWord, getSubscribersWord } from './../../hooks/helpers/index';
import { NextPage } from 'next';
import Popup from './../../components/Popup';
import PlaylistItem from "./../../components/PlaylistItem"
import UserItem from './../../components/UserItem';
import TrackItem from '../../components/TrackItemLiniar';
import { IPlaylist } from '../../types/playlist';

const ArtistPage: NextPage = (props) => {
  const { artist } = useTypedSelector((state) => state.artist)

  const { restrictPopup } = useTypedSelector((state) => state.auth)
  const { user } = useTypedSelector((state) => state.user)
  const { disabled, activePlaylistId, pause } = useTypedSelector((state) => state.player)
  const [editMode, setEditMode] = useState(false)
  const isSubscription = user?.subscriptionsToArtists?.find((id: string) => id === artist?._id)
  const router = useRouter()
  const [imgUrl, setImageUrl] = useState<any>()
  const dispatch = useDispatch<any>()

  // const playlistsWord = getPlaylistsWord(userForPage?.playlists)
  // const subscribersWord = getSubscribersWord(userForPage?.subscribers)
  // const subscriptionsWord = getSubscriptionsWord(userForPage?.subscriptions)

  const createOrRemoveSubscription = (e: React.MouseEvent<HTMLElement>) => {
    if (!user) {
      e.stopPropagation()
      dispatch(setRestrictPopup("subscribe"))
      return
    }
    if (!isSubscription) {
      dispatch(createSubscription({type:"artists", id:artist._id}))
    }
    else {
      dispatch(deleteSubscription({type:"artists", id:artist._id}))
    }
  }

  // const onMoreClickHandler =(e:React.MouseEvent<HTMLElement>)=>{
  //   e.stopPropagation()
  //   dispatch(setMorePopup(userForPage?._id))
  // }
let pathA=process.env.NEXT_PUBLIC_S3_BUCKET_URL + artist?.picture

  return (
    <MainLayout title={'Kobzar ' + artist?.name}
      keywords={"Music, tracks, " + artist?.name} red differPadding >
      <div >
        <Grid container className="flex mb-[202px] items-center text-white relative">
          <div style={{backgroundImage: `url(${pathA})`, backgroundPosition:"top", backgroundSize:"cover",backgroundRepeat:"no-repeat"}} className={`w-full h-[410px] z-0 top-0 mb-4  absolute bg-[image:var(--image-url)]`}>
            {/* {imgUrl ? <img className='   w-[300px] h-[300px]' src={imgUrl} /> : <Image alt="User picture" fill  object-fit= "contain"
          src={artist?.picture ? process.env.NEXT_PUBLIC_S3_BUCKET_URL + artist?.picture : albomPicture} />} */}
          </div>
          <div className="ml-16 mr-24 mt-2 z-0 relative">
            <div className="font-semibold mb-4 mt-6 text-2xl max-w-full">Виконавець</div>
            <div className="font-bold mb-8 text-8xl  max-w-full">{artist?.name}</div>
          </div>
        </Grid>
        <div className="pt-8 pb-32 bg-gradient-to-b from-[#000000] to-[#720000] ">
        <div className="relative">
                <Button disabled={disabled} onClick={(e) => createOrRemoveSubscription(e)} className='!bg-white !ml-8 !mb-8 !capitalize !w-[150px] hover:!bg-light-red !text-black !font-semibold'>{isSubscription ? "Відписатись" : "Підписатись"}</Button>
                {restrictPopup === "subscribe" && <Popup setPopup={() => dispatch(setRestrictPopup(""))} className="bottom-[80px] left-[50%] translate-x-[-50%]" />}
         </div>
        {artist?.tracks?.length ?
            <div>
              {artist?.tracks?.map((track, index) => <TrackItem withoutName key={track._id+index} index={index} track={track} playlist={artist as IPlaylist} />)}
            </div>:""}
        </div>
      </div>
    </MainLayout>
  )
}

export default ArtistPage

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  async (context) => {
    const id = context?.params?.id
    await store.dispatch(fetchArtistProfile(id as string));
    return {
      props: {},
    }
  })


