import { Container } from '@mui/material';
import Head from 'next/head';
import React from 'react'
import Navigation from '../components/Navbar'
import Player from '../components/Player';


type propsType = {
    title?:string
    description?:string
    keywords?:string
    children: React.ReactNode;
}

const MainLayout: React.FC<propsType> = ({ children,title,description,keywords}: propsType) => {
    return (
        <>
        <Head>
            <title>{title||"Kobzar"}</title>
            <meta name='description' content={"This Ukranian music platform. " + description}/>
            <meta name='robots' content="index, follow"/>
            <meta name="keywords" content={keywords||"Music, tracks, artists"}/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </Head>
            <Navigation />
            <Container sx={{
                mt: "100px"
            }} >
                {children}
            </Container>
            <Player/>
        </>
    )
}

export default MainLayout