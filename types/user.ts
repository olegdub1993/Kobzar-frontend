import { ITrack } from "./track"

export interface IUser {
    // _id: string,
    picture:string,
    likedPlaylists:string[]
    liked:string[],
    username: string,
    email: string,
    password: string
}