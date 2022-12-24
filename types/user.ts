import { ITrack } from "./track"
import { IPlaylist } from './playlist';

export interface IUser {
     _id: string,
    picture:string,
    likedPlaylists:string[]
    liked:string[],
    playlists:IPlaylist[],
    subscriptions:IUser[],
    subscribers:IUser[],
    username: string,
    email: string,
    password: string
}