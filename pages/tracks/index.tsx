import { Box, Button, Card, debounce, Grid, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react'
import MainLayout from './../../layouts/MainLayout';
import { useRouter } from 'next/router';
import { ITrack } from '../../types/track';
import TrackList from '../../components/TrackList';
import { useTypedSelector } from './../../hooks/useTypedSelector';
import { wrapper } from '../../store/store';
import { fetchTracks, setTracks } from '../../store/trackSlice';
import { useDispatch } from 'react-redux';
import { searchTracks } from './../../store/trackSlice';
import useDebouncedFunction from './../../hooks/useDebouncedFunc';

const Index = () => {
    const router = useRouter()
    const { tracks, error } = useTypedSelector((state) => state.track)
    const dispatch = useDispatch()
    const [query, setQuery] = useState<string>("")
    const debouncedFetch = useDebouncedFunction((query: string) => { dispatch(searchTracks(query)) }, 500);
    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        debouncedFetch(e.target.value);
    }

    if (error) return (<MainLayout><div>{error}</div></MainLayout>)
    return (
        <MainLayout title={'Kobzar - tracks list '}>
            <Grid container justifyContent={"center"} >
                <Card style={{
                    width: 800
                }}>
                    <Box p={3}>
                        <Grid container justifyContent={"space-between"} >
                            <h1>Tracks list</h1>
                            <Button onClick={() => router.push("/tracks/create")} >Download</Button>
                        </Grid>
                    </Box>
                    <TextField fullWidth
                        value={query}
                        onChange={search} />
                    <TrackList tracks={tracks} />
                </Card>
            </Grid>
        </MainLayout>

    )
}
export default Index


export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async (context) => {
        await store.dispatch(fetchTracks());
        return {
            props: {}
        }
    }
);