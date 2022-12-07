import { Grid, Box } from '@mui/material';
import React from 'react'
import { ITrack } from '../types/track';
import TrackItem from './TrackItem';

interface TrackListProps {
    tracks: ITrack[]
}

const SearchTrackList: React.FC<TrackListProps> = ({ tracks, }) => {
    return (
        <div className='grid grid-cols-6'  >
            {tracks?.map((track, index) => <TrackItem index={index} key={track._id} tracklist={tracks} track={track} />)}
        </div>
    )
}

export default SearchTrackList