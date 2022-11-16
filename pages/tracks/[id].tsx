import React, { useState } from 'react'
import { useRouter } from 'next/router';
import MainLayout from './../../layouts/MainLayout';
import { Button, Grid, TextField } from '@mui/material';
import { IComment, ITrack } from './../../types/track';
import axios from 'axios';
import { useInput } from '../../hooks/useInput';

interface TrackPageProps {
    serverTrack: ITrack
}
const TrackPage = ({ serverTrack }: TrackPageProps) => {
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const router = useRouter()
    const username = useInput()
    const text = useInput()
    const addComment = async () => {
        try {
            const responce = await axios.post(process.env.NEXT_PUBLIC_BASIC_URL + "tracks/comment", { username: username.value, text: text.value, trackId: serverTrack._id })
            setTrack({ ...track, comments: [...track.comments, responce.data] })
        } catch (error) {
            console.log(e)
        }
    }
    return (
        <MainLayout title={'Kobzar ' + track.name + "-" + track.artist}
            keywords={"Music, tracks, " + track.name + ", " + track.artist}>
            <Button variant='outlined' onClick={() => router.push("/tracks")}>To list</Button>
            <Grid container>
                <img src={process.env.NEXT_PUBLIC_BASIC_URL + serverTrack.picture} />
                <div>
                    <div>{track.name}</div>
                    <div>{track.artist}</div>
                    <div>{track.listens}</div>
                </div>
                <Grid container>
                    <TextField {...username} label="Your name" fullWidth />
                    <TextField {...text} label="Write comment" fullWidth multiline
                        rows={4} />
                    <Button onClick={addComment}>Send</Button>
                </Grid>
                <div>
                    {track.comments.map((comment: IComment) => <div key={comment._id}>
                        <div>{comment.username}</div>
                        <div>{comment.text}</div>
                    </div>)}
                </div>
            </Grid>
        </MainLayout>
    )
}

export default TrackPage
export async function getServerSideProps(context) {
    const { id } = context.params
    const response = await axios.get(process.env.NEXT_PUBLIC_BASIC_URL + "tracks/" + id)
    const serverTrack = response.data
    console.log(serverTrack)
    return {
        props: { serverTrack },
    }
}