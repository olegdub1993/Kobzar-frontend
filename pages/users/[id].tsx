import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import MainLayout from '../../layouts/MainLayout';
import { Button, Grid, IconButton, } from '@mui/material';
import Image from 'next/image'
import albomPicture from './../../public/kobza.jpg'
import { useDispatch } from 'react-redux';
import { setMorePopup } from '../../store/trackSlice'
import { fetchUserProfile } from '../../store/usersSlice'
import { wrapper } from '../../store/store'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { setRestrictPopup, } from '../../store/authSlice';
import { addToLiked, removeFromLiked, createSubscription, deleteSubscription } from '../../store/userSlice';
import { getPlaylistsWord, getSubscriptionsWord, getSubscribersWord } from './../../hooks/helpers/index';
import { NextPage } from 'next';
import Popup from './../../components/Popup';
import EditProfilePopup from './popups/EditProfilePopup';
import PlaylistItem from "./../../components/PlaylistItem"
import UserItem from './../../components/UserItem';

const UserPage: NextPage = (props) => {
  const { userForPage } = useTypedSelector((state) => state.users)
  const { restrictPopup } = useTypedSelector((state) => state.auth)
  const { user } = useTypedSelector((state) => state.user)
  const { disabled, activePlaylistId, pause } = useTypedSelector((state) => state.player)
  const [editMode, setEditMode] = useState(false)
  const isSubscription = user?.subscriptions?.find((id: string) => id === userForPage?._id)
  const router = useRouter()
  const [imgUrl, setImageUrl] = useState<any>()
  const dispatch = useDispatch<any>()

  const playlistsWord = getPlaylistsWord(userForPage?.playlists)
  const subscribersWord = getSubscribersWord(userForPage?.subscribers)
  const subscriptionsWord = getSubscriptionsWord(userForPage?.subscriptions)

  const createOrRemoveSubscription = (e: React.MouseEvent<HTMLElement>) => {
    if (!user) {
      e.stopPropagation()
      dispatch(setRestrictPopup("subscribe"))
      return
    }
    if (!isSubscription) {
      dispatch(createSubscription(userForPage._id))
    }
    else {
      dispatch(deleteSubscription(userForPage._id))
    }
  }

  // const onMoreClickHandler =(e:React.MouseEvent<HTMLElement>)=>{
  //   e.stopPropagation()
  //   dispatch(setMorePopup(userForPage?._id))
  // }

  return (
    <MainLayout title={'Kobzar ' + userForPage?.username}
      keywords={"Music, tracks, " + userForPage?.username} red >
      <div>
        <Grid container className="flex mb-12 items-center text-white relative">
          <div className='w-[300px] h-[300px] mb-4 mt-2 '>
            {imgUrl ? <img className=' rounded-full  w-[300px] h-[300px]' src={imgUrl} /> : <Image alt="User picture" className='w-[100%] h-[100%] object-cover rounded-full' width={300} height={300} src={userForPage?.picture ? process.env.NEXT_PUBLIC_BASIC_URL + userForPage?.picture : albomPicture} />}
          </div>
          <div className="ml-16 mr-24 mt-2">
            <div className="font-semibold mb-4 mt-6 text-2xl max-w-full">Профіль</div>
            <div className="font-bold mb-8 text-2xl  max-w-full">{userForPage?.username}</div>
            <div className="flex">
              <div className="font-bold mb-8 text-xl mr-2 max-w-full">{userForPage?.playlists?.length + ' ' + playlistsWord},</div>
              <div className="font-bold mb-8 text-xl mr-2 max-w-full">{userForPage?.subscribers?.length + ' ' + subscribersWord},</div>
              <div className="font-bold mb-8 text-xl  max-w-full">{userForPage?.subscriptions?.length + ' ' + subscriptionsWord}</div>
            </div>
            {user?.id === userForPage?._id &&
              <Button
                onClick={() => setEditMode(true)}
                className='bg-green-dark w-[250px] hover:bg-black capitalize text-lg font-bold'
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Редагувати профіль
              </Button>
            }
            {user?.id !== userForPage?._id &&
              <div className="relative">
                <Button disabled={disabled} onClick={(e) => createOrRemoveSubscription(e)} className='bg-white capitalize w-[150px] hover:!bg-light-red text-black font-semibold'>{isSubscription ? "Відписатись" : "Підписатись"}</Button>
                {restrictPopup === "subscribe" && <Popup setPopup={() => dispatch(setRestrictPopup(""))} className="bottom-[80px] left-[50%] translate-x-[-50%]" />}
              </div>
            }
          </div>

        </Grid>
        {!!userForPage?.playlists?.length &&
          <div className='font-bold text-xl mb-4 text-white'>
            Плейлисти
            <div className="flex">
              {userForPage?.playlists?.map((playlist, index) => <PlaylistItem index={index} key={playlist._id} playlist={playlist} />)}
            </div>
          </div>}
        {!!userForPage?.subscribers?.length &&
          <div className='font-bold text-xl mb-4 text-white'>
            Підписники
            <div className="flex">
              {userForPage?.subscribers?.map((subscriber) => <UserItem key={subscriber._id} user={subscriber} />)}
            </div>
          </div>}
        {!!userForPage?.subscriptions?.length &&
          <div className='font-bold text-xl mb-4 text-white'>
            Підписки
            <div className="flex">
              {userForPage?.subscriptions?.map((subscription) => <UserItem key={subscription._id} user={subscription} />)}
            </div>
          </div>}
        {editMode && <EditProfilePopup setEditMode={setEditMode} setImageUrl={setImageUrl} />}
      </div>
    </MainLayout>
  )
}

export default UserPage

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  async (context) => {
    const id = context?.params?.id
    await store.dispatch(fetchUserProfile(id as string));
    return {
      props: {},
    }
  })


