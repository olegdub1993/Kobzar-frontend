import { Grid, Box } from '@mui/material';
import React from 'react'
import { ITrack } from '../types/track';
import TrackItem from './TrackItem';
interface TrackListProps {
    tracks: any[]
}

const TrackList: React.FC<TrackListProps> = ({ tracks, }) => {
    return (
        <Grid container direction={"column"}>
            <Box p={3}>
                {tracks?.map((track) => <TrackItem key={track.added_at} track={track} />)}
            </Box>
        </Grid>
    )
}

export default TrackList