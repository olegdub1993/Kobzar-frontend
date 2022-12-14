import { ITrack } from "../../types/track";

export const getTracksWord =(tracksArray:ITrack[]):string=>{
  if (tracksArray!==undefined){
    let tracksWord;
    const trackAmountString=tracksArray.length.toString()
    const numbersArray=trackAmountString.split("")
    const lastNumber=numbersArray[numbersArray.length-1]
    const predlastNumber=numbersArray[numbersArray.length-2]
    
    if(lastNumber ==="1" && predlastNumber!=='1'){
      tracksWord="пісня"
    }else if((lastNumber==="2"||lastNumber==="3"||lastNumber==="4")&& predlastNumber!=='1'){
      tracksWord="пісні"
    }else{
      tracksWord="пісень"
    }
    return tracksWord
  }
}

export const getLikesWord=(likesAmount:number):string=>{
    if (likesAmount!==undefined){
    let likesWord;
    const likesAmountString=likesAmount.toString()
    const numbersArray=likesAmountString.split("")
    const lastNumber=numbersArray[numbersArray.length-1]
    const predlastANumber=numbersArray[numbersArray.length-2]

    if((lastNumber ==="1"||lastNumber==="2"||lastNumber==="3"||lastNumber==="4") && predlastANumber!=='1'){
      likesWord="вподобання"}
      else{
      likesWord="вподобань"
    }
    return likesWord
  }
}