
import React from 'react'
import { ITrack } from '../types/track';
import TrackItem from './TrackItem';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface TrackListProps {
    tracks: ITrack[]
}

const TrackList: React.FC<TrackListProps> = ({ tracks, }) => {
    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 1800 },
        items: 7        },
      largeDesktop: {
        breakpoint: { max: 1800, min: 1540 },
        items: 5
      },
      desktop: {
        breakpoint: { max: 1540, min: 1024 },
        items: 4
      },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    return (
        // <div className='flex overflow-x-auto max-w-full'  >
             <Carousel responsive={responsive}>
             {tracks?.map((track, index) => <TrackItem index={index} key={track._id} tracklist={tracks} track={track} />)}
            </Carousel>
        // </div>
    )
}  


export default TrackList