import React from 'react'
import { Card, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { IUser } from './../types/user';
import albomPicture from './../public/kobza.jpg'
import Image from 'next/image';
interface UserItemProps {
    user: IUser
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
    const router = useRouter()
    //this component should  be renamed bacause  it is for users and artists
    return (
        <div
            className=' flex flex-col items-center m-[10px] p-[10px]  bg-black pr-6 pl-6 hover:!scale-105 hover:!shadow-lg !transition-all rounded  !duration-500  w-[230px] min-w-[230px] shadow-sm cursor-pointer'
            onClick={user.username?() => router.push("/users/" + user._id):() => router.push("/artists/" + user._id)}
        >
            <div className='m-auto w-[150px] h-[150px] mb-8 mt-2 '>
               <Image alt="User picture" className='w-[100%] h-[100%] object-cover rounded-full' width={150} height={150} src={user.picture ? process.env.NEXT_PUBLIC_S3_BUCKET_URL + user.picture : albomPicture} />
             </div>
            <Grid container className="max-w-full text-red" direction={"column"}>
                <div className="font-bold truncate text-center max-w-full mb-4">{user.username?user.username:user.name}</div>
            </Grid>
        </div >
    )
}

export default UserItem