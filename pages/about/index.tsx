import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { useIntl } from 'react-intl'

const About = () => {
  const intl=useIntl()
    return (
        <MainLayout red>
           <div className='pt-6 text-white dark:text-black text-xl pr-12'> 
             <div className='mb-6 text-3xl font-semibold'>About Us</div>
             <div className='mb-4'>With Kobzar, it’s easy to find the right music or podcast for every moment – on your phone, your computer, your tablet and more.</div>
             <div className='mb-4'>There are millions of tracks and episodes on Kobzar. So whether you’re behind the wheel, working out, partying or relaxing, the right music or podcast is always at your fingertips. Choose what you want to listen to, or let Kobzar surprise you.</div>
             <div className='mb-4'>You can also browse through the collections of friends, artists, and celebrities, or create a radio station and just sit back.</div>
             Soundtrack your life with Kobzar. Subscribe or listen for free.
          </div>
        </MainLayout>
    )
}
export default About
