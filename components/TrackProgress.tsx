import React from 'react'

interface TrackProgressProps{
    left:number
    right:number
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void
    width:string
    audioRow?:boolean
}
const TrackProgress:React.FC<TrackProgressProps> = ({left, right, onChange, width, audioRow}) => {
    let minutes=Math.floor(left / 60);
    let persents=(left/right)*100
    let seconds:string| number = left - minutes * 60;
    seconds=seconds<10?"0"+seconds:seconds
    let minutesAll=Math.floor(right / 60);
    let secondsAll:string| number = right - minutesAll * 60; 
    secondsAll=secondsAll<10?"0"+secondsAll:secondsAll
  return (
    <>
    <div  className="flex items-center " >
   {audioRow&& <div className="w-[50px]  text-transparent bg-clip-text bg-gradient-to-r from-[#EC6400] to-[#D80056]" ><>{minutes} : {seconds} </></div>}
  
   <div className="relative rounded-lg z-1 h-[6px] overflow-hidden bg-[#F3F4F6]"  style={{width:width}}>
     <div className="absolute z-[0] top-[0] cursor-pointer h-[6px] rounded-lg bg-gradient-to-r from-[#EC6400] to-[#D80056]"   style={{width:`${persents}%`}}></div>
        <input className="cursor-pointer absolute top-[0]  z-5 h-[6px] rounded-lg overflow-hidden appearance-none bg-transparent"   style={{width:width}} type="range" min={0} max={right} value={left} onChange={onChange}
        />
        </div>
    {audioRow&&  <div className="w-[50px] ml-[10px] text-transparent bg-clip-text bg-gradient-to-r from-[#EC6400] to-[#D80056]" ><>{minutesAll} : {secondsAll} </></div>}
    </div>
    
    </>
  )
}

export default TrackProgress