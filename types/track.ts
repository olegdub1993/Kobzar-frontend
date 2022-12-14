export interface IComment {
    _id: string,
    username: string,
    text: string,
}
export interface ITrack {
    _id: string,
    duration:number,
    category: string,
    audio: string,
    picture: string,
    artist: string,
    name: string,
    listens: number,
    comments: IComment[],
    index: number
}