import { ITrack } from "./track";

export interface IArtist{
     _id: string,
    picture:string,
    name:string,
    tracks:ITrack[],
}