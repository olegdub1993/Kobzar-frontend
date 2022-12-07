import { ITrack } from "./track";

export interface IPlaylist {
    _id: string,
    picture: string,
    name: string,
    username:string,
    tracks:ITrack[]
}