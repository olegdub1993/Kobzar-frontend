
import React, { useState, useEffect } from 'react'
import MainLayout from './../../layouts/MainLayout';
import { useTypedSelector } from './../../hooks/useTypedSelector';
import { fetchTracks, } from '../../store/trackSlice';
import { useDispatch } from 'react-redux';
import { searchContent } from './../../store/searchSlice';
import useDebouncedFunction from './../../hooks/useDebouncedFunc';
import SearchTrackList from '../../components/SearchTrackList';
import { Button } from '@mui/material';
import Playlists from '../../components/Playlists'
import UserItem from './../../components/UserItem';
import { IArtist } from '../../types/artist';

type TabType = {
    type: string,
    text: string
}
const tabs: TabType[] = [
    { type: "all", text: "все" },
    { type: "tracks", text: "пісні" },
    { type: "playlists", text: "плейлисти" },
    { type: "artists", text: "артисти" },
    { type: "users", text: "профілі" }]


const Search = () => {
    const { tracks, error } = useTypedSelector((state) => state.track)
    const { searchedData, noContent } = useTypedSelector((state) => state.search)
    const [selectedTab, setSelectedTab] = useState("all")
    const tracksWithIndex = tracks.map((t, index) => ({ ...t, index }))
    const searchedTracks = searchedData?.tracks
    const searchedPlaylists = searchedData?.playlists
    const searchedUsers = searchedData?.users
    const searchedArtists= searchedData?.artists
    const dispatch = useDispatch<any>()
    const [query, setQuery] = useState<string>("")
    const debouncedFetch = useDebouncedFunction((query: string) => { dispatch(searchContent({ query, type: selectedTab })) }, 500);
    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        debouncedFetch(e.target.value);
    }
    useEffect(() => {
        dispatch(fetchTracks())
    },
        [])
    console.log("no cont", noContent)
    if (error) return (<MainLayout><div>{error}</div></MainLayout>)

    const setSelectedTabHandler = (selectedTab: TabType) => {
        setSelectedTab(selectedTab.type)
        dispatch(searchContent({ query, type: selectedTab.type }))
    }
    return (
        <MainLayout title={'Kobzar - tracks list '} red>
            <div>
                <div className="flex mb-8 mt-4 ">
                    <input
                        style={{ backgroundColor: "transparent" }}
                        className='w-[400px] h-[50px] p-2 mr-24 text-white dark:text-gray  bg- bg-opacity-0 outline-none bg-none rouded-sm text-semibold placeholder:text-semibold placeholder:text-white dark:placeholder:text-gray  border-b-2 border-white dark:border-gray'
                        value={query}
                        placeholder="Пошук"
                        onChange={search} />
                    {tabs.map((tab) => <Button key={tab.type} onClick={() => setSelectedTabHandler(tab)} className={`${selectedTab === tab.type ? "!shadow-[inset_0px_0px_13px_-2px_rgba(0,0,0,0.96)]" : "!shadow-[0px_0px_13px_-2px_rgba(0,0,0,0.96)]"} !text-white dark:!text-black !min-w-[80px] hover:!bg-green-dark hover:!opacity-75 !rounded-3xl !border !border-white !bg-green-dark dark:!bg-blue-dark !mr-8  !capitalize !text-lg !py-2 !px-4 !font-semibold !duration-300  !transition-all `}>{tab.text}</Button>)}
                </div>
                {(noContent && query) &&
                    <div className='text-white dark:text-black text-2xl font-bold mb-2 '>За вашим запитом нічого не знайдено</div>}
                {(!searchedTracks?.length && !searchedPlaylists?.length && !searchedArtists?.length && !searchedUsers?.length) ?
                    <>
                        <div className='text-white dark:text-black text-2xl mt-8 font-bold  mb-2'>Пісні, які найчастіше шукають:</div>
                        <SearchTrackList tracks={tracksWithIndex} />
                    </> :
                    <>
                        {searchedTracks?.length ?
                            <>
                                <div className='text-white dark:text-black text-2xl font-bold mt-4 mb-2'>Пісні</div>
                                <SearchTrackList tracks={searchedTracks} />
                            </> : ""}
                        {searchedPlaylists?.length ?
                            <div className='mb-4'>
                                <div className='text-white dark:text-black text-2xl font-bold  mt-4 mb-2 '>Плейлисти</div>
                                <Playlists playlists={searchedPlaylists} />
                            </div> : ""}
                        {searchedArtists?.length ?
                            <div className='mb-4'>
                                <div className='text-white dark:text-black text-2xl font-bold  mt-4 mb-2 '>Виконавці</div>
                                <div className='grid md:grid-cols-4  xl:grid-cols-4 2xl:grid-cols-5 min-[1800px]:grid-cols-6'>
                                    {searchedArtists.map((searchedArist) => <UserItem key={searchedArist._id} user={searchedArist} />)}
                                </div>
                            </div> : ""}
                        {searchedUsers?.length ?
                            <div className='mb-4'>
                                <div className='text-white dark:text-black text-2xl font-bold  mt-4 mb-2 '>Профілі</div>
                                <div className='grid md:grid-cols-4  xl:grid-cols-4 2xl:grid-cols-5 min-[1800px]:grid-cols-6'>
                                    {searchedUsers.map((searchedUser) => <UserItem key={searchedUser._id} user={searchedUser} />)}
                                </div>
                            </div> : ""}
                    </>}
            </div>
        </MainLayout>

    )
}
export default Search


