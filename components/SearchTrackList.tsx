
import React from 'react'
import { ITrack } from '../types/track';
import TrackItem from './TrackItem';

interface TrackListProps {
    tracks: ITrack[]
}

const SearchTrackList: React.FC<TrackListProps> = ({ tracks, }) => {
    return (
        <div className='grid md:grid-cols-4  xl:grid-cols-4 2xl:grid-cols-5 min-[1800px]:grid-cols-6'  >
            {tracks?.map((track, index) => <TrackItem index={index} key={track._id} tracklist={tracks} track={track} />)}
        </div>
    )
}

export default SearchTrackList