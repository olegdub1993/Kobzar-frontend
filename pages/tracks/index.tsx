import { Box, Button, Card, Grid, } from '@mui/material';
import React from 'react'
import MainLayout from './../../layouts/MainLayout';
import { useRouter } from 'next/router';
import TrackList from '../../components/TrackList';
import { useTypedSelector } from './../../hooks/useTypedSelector';
import { wrapper } from '../../store/store';
import { fetchTracks, } from '../../store/trackSlice';


const Index = () => {
    const router = useRouter()
    const { tracks, error } = useTypedSelector((state) => state.track)
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