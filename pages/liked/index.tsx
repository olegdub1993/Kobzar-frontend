import React, { useEffect ,useState} from 'react'
import MainLayout from '../../layouts/MainLayout'
import { useDispatch } from 'react-redux';
import { getLiked } from '../../store/userSlice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import SearchTrackList from '../../components/SearchTrackList';
import PlaylistItem from '../../components/PlaylistItem';

 type TabType ={
  type:string,
  text:string
}
const tabs:TabType[]=[{type:"tracks", text:"пісні"},{type:"playlists", text:"плейлисти"}]

const Playlist = () => {  
const [selectedTab,setSelectedTab]=useState("tracks")
const {liked, user} = useTypedSelector((state) => state.user)
const dispatch=useDispatch<any>()
const router = useRouter()
 

useEffect(()=>{
dispatch(getLiked(selectedTab))
},[user,])

const setSelectedTabHandler=(selectedTab:TabType)=>{
  dispatch(getLiked(selectedTab.type)).then(()=>setSelectedTab(selectedTab.type))
}
    return (
        <MainLayout red>
            <div className='pt-6'> 
             <div className='mb-4'>
                {tabs.map((tab)=><Button  key={tab.type} onClick={()=>setSelectedTabHandler(tab)} className={`${selectedTab===tab.type?"shadow-[inset_0px_0px_13px_-2px_rgba(0,0,0,0.96)]":"shadow-[0px_0px_13px_-2px_rgba(0,0,0,0.96)]"} text-white hover:bg-green-dark hover:opacity-75 rounded-3xl !border !border-white bg-green-dark mr-8 mb-8 capitalize text-lg py-2 px-4 font-semibold `}>{tab.text}</Button>)}
                {selectedTab==="tracks"?
                (<>
                      {liked?.length?
                      <> <div className='text-white text-2xl font-bold mb-6'>Пісні, що сподобались:</div><SearchTrackList tracks={liked} /></>:

                      <>  <div className='text-white text-center text-2xl font-bold mt-6 mb-10'>Поки що немає пісень, які Вам сподобались</div>
                    <div className='flex justify-center mt-8'> <Button onClick={()=>router.push('search')} className='text-white hover:bg-green-dark hover:opacity-75  bg-green-dark capitalize text-xl py-2 px-4 font-bold mb-2'>Знайти пісні</Button></div> 
                 </>}
                 </>):
                   (<>
                    {liked?.length?
                    <> <div className='text-white text-2xl font-bold mb-4'>Плейлисти, що сподобались:</div>
                    <div className='flex'> {liked.map((playlist, index) => <PlaylistItem index={index} key={playlist._id}  playlist={playlist} />)}</div>
                    {/* <SearchTrackList tracks={liked} /> */}
                    </>:

                    <>  <div className='text-white text-center text-2xl font-bold mt-6 mb-10'>Поки що немає плейлистів, які Вам сподобались</div>
                  <div className='flex justify-center mt-8'> <Button onClick={()=>router.push('search')} className='text-white hover:bg-green-dark hover:opacity-75  bg-green-dark capitalize text-xl py-2 px-4 font-bold mb-2'>Знайти плейлисти</Button></div> 
               </>}
               </>)}
          </div>
          </div>
        </MainLayout>
    )
}
export default Playlist
