import { ITrack } from "./track";

export interface IPlaylist {
    _id: string,
    picture: string,
    name: string,
    description:string,
    likes:number,
    username:string,
    userPicture:string,
    tracks:ITrack[],
    userId:string
}