import React from 'react'
import c from './TrackProgress.module.css'
interface TrackProgressProps{
    left:number
    right:number
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void
    width:string
    audioRow?:boolean
}
const TrackProgress:React.FC<TrackProgressProps> = ({left, right, onChange, width, audioRow}) => {
    let minutes=Math.floor(left / 60);
    let seconds = left - minutes * 60;
    seconds=seconds<10?"0"+seconds:seconds
    let minutesAll=Math.floor(right / 60);
    let secondsAll = right - minutesAll * 60; 
    secondsAll=secondsAll<10?"0"+secondsAll:secondsAll
  return (
    <>
    <div style={{display:"flex" ,alignItems:"center"}}>
        <input  style={{width:width}} type="range" min={0} max={right} value={left} onChange={onChange}
        />
        <div style={{marginLeft:"10px"}}>{audioRow ? (<>{minutes} : {seconds} </>):(<>{left}</>)} / {audioRow? (<>{minutesAll} : {secondsAll} </>):(<>{right}</>)}</div>
    </div>
    
    </>
  )
}

export default TrackProgress