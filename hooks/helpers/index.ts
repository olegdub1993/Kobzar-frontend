import { ITrack } from "../../types/track";

export const getTracksWord =(tracksArray:ITrack[]):string=>{
  let tracksWord=""
  if (tracksArray!==undefined){
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
  }
  return tracksWord
}

export const getLikesWord=(likesAmount:number):string=>{
    let likesWord=""
    if (likesAmount!==undefined){
    const likesAmountString=likesAmount.toString()
    const numbersArray=likesAmountString.split("")
    const lastNumber=numbersArray[numbersArray.length-1]
    const predlastANumber=numbersArray[numbersArray.length-2]

    if((lastNumber ==="1"||lastNumber==="2"||lastNumber==="3"||lastNumber==="4") && predlastANumber!=='1'){
      likesWord="вподобання"}
      else{
      likesWord="вподобань"
    }
  }
  return likesWord
}
export const getTotalTime=(arr:ITrack[]):number=>{
  let totalTime= arr?.reduce((sum,i)=>{return sum+=i.duration}, 0)
  let totalMinuts=Math.round(totalTime/60)
  return totalMinuts
}

// export const shuffle=(array:ITrack[])=> {
//   for (let i = array.length - 1; i > 0; i--) {
//     let j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   } 
// }