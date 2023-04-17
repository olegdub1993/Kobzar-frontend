
import React from 'react'
import { ITrack } from '../types/track';
import TrackItem from './TrackItem';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IArtist } from '../types/artist';
import UserItem from './UserItem';

interface ArtistListProps {
    artists: IArtist[]
}

const ArtistList: React.FC<ArtistListProps> = ({ artists }) => {
    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 1800 },
        items: 6        },
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
              {artists?.map((artist, index) => <UserItem key={artist._id} user={artist} /> )}
            </Carousel>
        // </div>
    )
}  


export default ArtistList