import { Container } from '@mui/material';
import Head from 'next/head';
import React, { useEffect } from 'react'
import Navigation from '../components/Navbar'
import Player from '../components/Player';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../store/authSlice';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { getUserAlboms } from '../store/userSlice';
import SuccesOperation from '../components/SuccesOperation';
import { setMorePopup} from '../store/trackSlice';

type propsType = {
    title?: string
    description?: string
    keywords?: string
    children: React.ReactNode;
    red?:boolean;
}

const MainLayout: React.FC<propsType> = ({ children, title, description, keywords ,red}: propsType) => {
    const {loading} = useTypedSelector((state) => state.auth)
    const dispatch=useDispatch() 
    const [restrictPopup, setRestrictPopup] = React.useState("");
    useEffect(()=>{
        if (localStorage.getItem("token")){
          dispatch(checkAuth()).then(()=>dispatch(getUserAlboms()))
         
        }
        },[])

     if(loading) return <div>Завантаження</div>

    return (
        <>
            <Head>
                <title>{title || "Kobzar"}</title>
                <meta name='description' content={"This Ukranian music platform. " + description} />
                <meta name='robots' content="index, follow" />
                <meta name="keywords" content={keywords || "Music, tracks, artists"} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link href="https://api.fontshare.com/v2/css?f[]=clash-display@700&display=swap" rel="stylesheet"></link>
            </Head>
            <div onClick={()=>{setRestrictPopup(""); dispatch(setMorePopup(""))}}>
            <Navigation setRestrictPopup={setRestrictPopup} restrictPopup={restrictPopup} />
            <div  className={`${red?"bg-gradient-to-b from-[rgba(54,0,2,1)] to-[rgba(140,0,0,1)]":""} pl-[300px] min-h-screen pt-[80px] pb-[110px] p-8 relative `} >
                {/* <div className='fixed left-[40px] top-[80px] text-[70px] text-[#fafd23] font-bold uppercase '  style={{fontFamily: "'Clash Display', sans-serif", writingMode:'vertical-rl',textOrientation: 'upright',textShadow: '4px 4px 2px rgba(150, 150, 150, 1)'}} >
                 Слава  </div>
                 <div className='fixed left-[145px] top-[210px] text-[70px]  text-[#064ebb] font-bold uppercase '  style={{ writingMode:'vertical-rl',textOrientation: 'upright',textShadow: '4px 4px 2px rgba(150, 150, 150, 1)'}} >
                  Україні </div> */}
                {children}
                
            </div>
            <SuccesOperation/>
            <Player />
            </div>
        </>
    )
}

export default MainLayout