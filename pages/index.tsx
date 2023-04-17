
import TrackList from '../components/TrackList'
import Playlists from '../components/Playlists'
import MainLayout from '../layouts/MainLayout'
import { wrapper } from '../store/store'
import { fetchTracks, fetchPlaylists, fetchArtists} from '../store/trackSlice'
import { useTypedSelector } from './../hooks/useTypedSelector';
import {ITrack } from './../types/track';
import { parseCookies} from "nookies";
import { checkAuth } from './../store/authSlice';
import { fetchUser } from '../store/userSlice'
import ArtistList from '../components/ArtistList'

export default function Home() {
  const { tracks, playlists, artists } = useTypedSelector((state) => state.track)
  // const { isAuth} = useTypedSelector((state) => state.auth)
  // const { user} = useTypedSelector((state) => state.user)
  const rock = tracks.filter((track:ITrack) => track.category === 'rock')
  const popular = tracks.filter((track:ITrack) => track.category === 'popular')
  const christmas = tracks.filter((track:ITrack) => track.category === 'christmas')
  const forSoul = tracks.filter((track:ITrack) => track.category === 'forSoul')
  const remix = tracks.filter((track:ITrack) => track.category === 'remix')

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
            <div className='text-white text-2xl font-bold mb-2 '>Ремікси</div>
            <TrackList tracks={remix} />
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
            <div className='text-white text-2xl font-bold mb-2 '>Виконавці</div>
              <ArtistList artists={artists} />
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
       // in case of auth on next js side
       // if dont use then delete nookies
  // const {accessToken} = parseCookies(context);
  //  const response =  await store.dispatch(fetchUser(accessToken));
    await store.dispatch(fetchTracks());
    await store.dispatch(fetchPlaylists());
    await store.dispatch(fetchArtists());
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