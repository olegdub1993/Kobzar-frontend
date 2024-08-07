import { Container } from '@mui/material';
import Head from 'next/head';
import React, { useEffect,useState } from 'react'
import Navbar from '../components/Navbar';
import Player from '../components/Player';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../store/authSlice';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { getUserPlaylists, setDarkMode } from '../store/userSlice';
import SuccesOperation from '../components/SuccesOperation';
import { setMorePopup} from '../store/trackSlice';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
// import NavigationButtons from '../components/NavigationButtons';
type propsType = {
    title?: string
    description?: string
    keywords?: string
    children: React.ReactNode;
    red?:boolean;
    differPadding?:boolean;
}

const MainLayout: React.FC<propsType> = ({ children, title, description, keywords ,red, differPadding}: propsType) => {
    const {loading} = useTypedSelector((state) => state.auth)
    const {darkMode} = useTypedSelector((state) => state.user)
    const dispatch=useDispatch<any>() 
    const [restrictPopup, setRestrictPopup] = useState("");

    useEffect(()=>{
        if (localStorage.getItem("token")){
            console.log("token")
          dispatch(checkAuth()).then(()=>dispatch(getUserPlaylists()))
        }
        if (localStorage.getItem("darkMode")!=="false"){
          dispatch(setDarkMode(true))
        }
        },
        [])

    // const updateChildrenWithProps = React.Children.map(
    //          children,
    //         (child, i) => {
    //           return React.cloneElement(child, {
    //           //this properties are available as a props in child components
    //           restrictPopup: restrictPopup,
    //           setRestrictPopup: setRestrictPopup
    //           });
    //         }
    //       );
     if(loading) return <div className="bg-gradient-to-b h-screen flex items-center justify-center from-[rgba(54,0,2,1)] to-[rgba(140,0,0,1)]">
                         <HourglassBottomIcon className='!w-[100px]  !h-[100px]'/>
                        </div>

    return (
        <>
            <Head>
                <title>{title || "Kobzar"}</title>
                <meta name='description' content={"This Ukranian music platform. " + description} />
                <meta name='robots' content="index, follow" />
                <meta name="keywords" content={keywords || "Music, tracks, artists"} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="google-site-verification" content="Bk1K1l77NXeJADdWOmMZrERi-WRCKNY7G9JlArRpans" />
            </Head> 
            <div className={`${darkMode && 'dark'}`} onClick={()=>{setRestrictPopup(""); dispatch(setMorePopup(""))}}>
            <Navbar setRestrictPopup={setRestrictPopup} restrictPopup={restrictPopup} />
             <div  className={`${red &&!darkMode?"bg-gradient-to-b from-[#000000] via-[#720000] to-[#E70103]":""}
             ${differPadding?"!pl-[240px] !pb-[90px] !pr-[0px] !pt-[64px]":""} dark:bg-blue-light  pl-[300px] min-h-screen pt-[80px] pb-[110px] p-8 relative `} >
                {/* <div className='fixed left-[40px] top-[80px] text-[70px] text-[#fafd23] font-bold uppercase '  style={{fontFamily: "'Clash Display', sans-serif", writingMode:'vertical-rl',textOrientation: 'upright',textShadow: '4px 4px 2px rgba(150, 150, 150, 1)'}} >
                 Слава  </div> 
                 <div className='fixed left-[145px] top-[210px] text-[70px]  text-[#064ebb] font-bold uppercase '  style={{ writingMode:'vertical-rl',textOrientation: 'upright',textShadow: '4px 4px 2px rgba(150, 150, 150, 1)'}} >
                  Україні </div> */}
                  {/* <NavigationButtons/> */}
                {children}
            </div>
            <SuccesOperation/>
            <Player setRestrictPopup={setRestrictPopup} restrictPopup={restrictPopup}  />
            </div>
        </>
    )
}

export default MainLayout