
import React, { useState, useEffect } from 'react'
import MainLayout from './../../layouts/MainLayout';
import { useTypedSelector } from './../../hooks/useTypedSelector';
import { fetchTracks,  } from '../../store/trackSlice';
import { useDispatch } from 'react-redux';
import { searchTracks } from './../../store/trackSlice';
import useDebouncedFunction from './../../hooks/useDebouncedFunc';
import SearchTrackList from '../../components/SearchTrackList';

const Search = () => {
    const {searchedTracks, tracks, error, noTracks } = useTypedSelector((state) => state.track)
    const tracksWithIndex=tracks.map((t,index)=>({...t,index}))
    const searchedTracksWithIndex=searchedTracks.map((t,index)=>({...t,index}))
    const dispatch = useDispatch<any>()
    const [query, setQuery] = useState<string>("")
    const debouncedFetch = useDebouncedFunction((query: string) => { dispatch(searchTracks(query)) }, 500);
    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        debouncedFetch(e.target.value);
    }
    useEffect(()=>{
        dispatch(fetchTracks())
    },
    [])
 console.log(error)
    if (error) return (<MainLayout><div>{error}</div></MainLayout>)

    return (
        <MainLayout title={'Kobzar - tracks list '} red>
                    <input 
                        style={{backgroundColor:"transparent"}}
                        className='w-[400px] h-[50px] p-2  text-white mb-6 bg- bg-opacity-0 outline-none bg-none rouded-sm text-semibold placeholder:text-semibold placeholder:text-white  border-b-2 border-white'
                        value={query}
                        placeholder="Search"
                        onChange={search} />
               {noTracks &&  <div className='text-white text-2xl mt-8 font-bold mb-2 '>За вашим запитом нічого не знайдено</div>}
            {(!searchedTracks.length) ?
             <>
            <div className='text-white text-2xl mt-8 font-bold mb-2'>Пісні, які найчастіше шукають:</div>
            <SearchTrackList  tracks={tracksWithIndex} />
                </>:
                    <SearchTrackList  tracks={searchedTracksWithIndex} />}
        </MainLayout>

    )
}
export default Search


