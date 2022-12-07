import { Grid, Card, Box } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import Navigation from '../components/Navbar'
import TrackList from '../components/TrackList'
import Playlists from '../components/Playlists'
import MainLayout from '../layouts/MainLayout'
import { wrapper } from '../store/store'
import { fetchTracks, fetchPlaylists} from '../store/trackSlice'
import styles from '../styles/Home.module.css'
import { useTypedSelector } from './../hooks/useTypedSelector';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../store/authSlice'

export default function Home() {
  const dispatch=useDispatch()
  const { tracks, playlists, error } = useTypedSelector((state) => state.track)
  const { isAuth} = useTypedSelector((state) => state.auth)
  const { user} = useTypedSelector((state) => state.user)
  const rock = tracks.filter((t) => t.category === 'rock').map((t,index)=>({...t,index}))
  const popular = tracks.filter((t) => t.category === 'popular').map((t,index)=>({...t,index}))
  const christmas = tracks.filter((t) => t.category === 'christmas').map((t,index)=>({...t,index}))
  const forSoul = tracks.filter((t) => t.category === 'forSoul').map((t,index)=>({...t,index}))
  const remix = tracks.filter((t) => t.category === 'remix').map((t,index)=>({...t,index}))

  return (
    <>
      <MainLayout red>
        <div className=''>
          <div className='text-white text-4xl font-bold mb-6'> Доброго вечора, ми з України!</div>
          <div className='mb-4'>
            <div className='text-white text-2xl font-bold mb-2'>Популярне</div>
            <TrackList tracks={popular} />
          </div>
          <div className='mb-4'>
            <div className='text-white text-2xl font-bold mb-2'>Український рок</div>
            <TrackList tracks={rock} />
          </div>
          <div className='mb-4'>
            <div className='text-white text-2xl font-bold mb-2 '>Різдвяні свята</div>
            <TrackList tracks={christmas} />
          </div>
          <div className='mb-4'>
            <div className='text-white text-2xl font-bold mb-2 '>Для душі</div>
            <TrackList tracks={forSoul} />
          </div>
          <div className='mb-4'>
            <div className='text-white text-2xl font-bold mb-2 '>Ремікси</div>
            <TrackList tracks={remix} />
          </div>
          <div className='mb-4'>
            <div className='text-white text-2xl font-bold mb-2 '>Плейлисти</div>
            <Playlists playlists={playlists} />
          </div>
        </div>
      </MainLayout>
    </>
  )
}
export const getServerSideProps = wrapper.getServerSideProps((store) =>
  async (context) => {
    await store.dispatch(fetchTracks());
    await store.dispatch(fetchPlaylists());
    return {
      props: {}
    }
  }
);













// Old main

{/* <div className={styles.container}>
<h1 className={styles.title}>Welcome to KOBZAR</h1>
<h3 className={styles.subtitle}>All Ukrainian songs are collected here</h3>
<img src="https://glavcom.ua/img/article/7412/49_main-v1615278831.png" />
</div> */}