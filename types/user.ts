import { ITrack } from "./track"
import { IPlaylist } from './playlist';
import { IArtist } from "./artist";

export interface IUser {
     _id: string,
    picture:string,
    likedPlaylists:string[]
    liked:string[],
    playlists:IPlaylist[],
    subscriptions:IUser[],
    subscribers:IUser[],
    subscriptionsToArtists:IArtist[],
    username: string,
    email: string,
    password: string,
    // this property for artist
    name?: string;
}