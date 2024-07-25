import { ITrack } from "../../types/track";
import { IPlaylist } from "../../types/playlist";
import { IUser } from "../../types/user";
import { useIntl } from "react-intl";

export const getTracksWord =(tracksArray:ITrack[]):string=>{
  const intl=useIntl()
  let tracksWord=""
  if (tracksArray!==undefined){
    const trackAmountString=tracksArray.length.toString()
    const numbersArray=trackAmountString.split("")
    const lastNumber=numbersArray[numbersArray.length-1]
    const predlastNumber=numbersArray[numbersArray.length-2]
    
    if(lastNumber ==="1" && predlastNumber!=='1'){
      tracksWord=intl.formatMessage({id:"playlist.song"})
    }else if((lastNumber==="2"||lastNumber==="3"||lastNumber==="4")&& predlastNumber!=='1'){
      tracksWord=intl.formatMessage({id:"playlist.songs"})
    }else{
      tracksWord=intl.formatMessage({id:"playlist.songs2"})
    }
  }
  return tracksWord
}
export const getPlaylistsWord =(playlistsArray:IPlaylist[]):string=>{
  const intl=useIntl()
  let playlistsWord=""
  if (playlistsArray!==undefined){
    const playlistsAmountString=playlistsArray.length.toString()
    const numbersArray=playlistsAmountString.split("")
    const lastNumber=numbersArray[numbersArray.length-1]
    const predlastNumber=numbersArray[numbersArray.length-2]
    
    if(lastNumber ==="1" && predlastNumber!=='1'){
      playlistsWord=intl.formatMessage({id:"user.playlist"})
    }else if((lastNumber==="2"||lastNumber==="3"||lastNumber==="4")&& predlastNumber!=='1'){
      playlistsWord=intl.formatMessage({id:"user.playlists"})
    }else{
      playlistsWord=intl.formatMessage({id:"user.playlists2"})
    }
  }
  return playlistsWord
}
export const getSubscribersWord =(playlistsArray:IUser[]):string=>{
  const intl=useIntl()
  let playlistsWord=""
  if (playlistsArray!==undefined){
    const playlistsAmountString=playlistsArray.length.toString()
    const numbersArray=playlistsAmountString.split("")
    const lastNumber=numbersArray[numbersArray.length-1]
    const predlastNumber=numbersArray[numbersArray.length-2]
    
    if(lastNumber ==="1" && predlastNumber!=='1'){
      playlistsWord=intl.formatMessage({id:"user.subscriber"})
    }else if((lastNumber==="2"||lastNumber==="3"||lastNumber==="4")&& predlastNumber!=='1'){
      playlistsWord=intl.formatMessage({id:"user.subscribers"})
    }else{
      playlistsWord=intl.formatMessage({id:"user.subscribers2"})
    }
  }
  return playlistsWord
}
  export const getSubscriptionsWord =(playlistsArray:any[]):string=>{
    const intl=useIntl()
    let playlistsWord=""
    if (playlistsArray!==undefined){
      const playlistsAmountString=playlistsArray.length.toString()
      const numbersArray=playlistsAmountString.split("")
      const lastNumber=numbersArray[numbersArray.length-1]
      const predlastNumber=numbersArray[numbersArray.length-2]
      
      if(lastNumber ==="1" && predlastNumber!=='1'){
        playlistsWord=intl.formatMessage({id:"user.subscription"})
      }else if((lastNumber==="2"||lastNumber==="3"||lastNumber==="4")&& predlastNumber!=='1'){
        playlistsWord=intl.formatMessage({id:"user.subscriptions"})
      }else{
        playlistsWord=intl.formatMessage({id:"user.subscriptions2"})
      }
    }
    return playlistsWord
  }

export const getLikesWord=(likesAmount:number):string=>{
  const intl=useIntl()
    let likesWord=""
    if (likesAmount!==undefined){
    const likesAmountString=likesAmount.toString()
    const numbersArray=likesAmountString.split("")
    const lastNumber=numbersArray[numbersArray.length-1]
    const predlastANumber=numbersArray[numbersArray.length-2]

    if((lastNumber ==="1"||lastNumber==="2"||lastNumber==="3"||lastNumber==="4") && predlastANumber!=='1'){
      likesWord=intl.formatMessage({id:"playlist.like"})
    }
      else{
      likesWord=intl.formatMessage({id:"playlist.likes"})
    }
  }
  return likesWord
}
export const getTotalTime=(arr:ITrack[]):number=>{
  let totalTime= arr?.reduce((sum,i)=>{return sum+=i.duration}, 0)
  let totalMinuts=Math.round(totalTime/60)
  return totalMinuts
}

export const shuffle=(array:ITrack[])=> {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  } 
}