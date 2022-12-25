import React from 'react'
import { Card, Grid} from '@mui/material';
import { useRouter } from 'next/router';
import { IUser } from './../types/user';

interface UserItemProps {
    user: IUser
}

const UserItem: React.FC<UserItemProps> = ({user}) => {
    const router = useRouter()

    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center",
            margin: "10px",
            padding: "10px",
            width: "230px",
        }}
            className='bg-black pr-6 pl-6 hover:!scale-105 hover:!shadow-lg transition-all  duration-500  w-[230px] min-w-[230px] shadow-sm cursor-pointer'
            onClick={() => router.push("/users/" + user._id)}
        >
            <div className='m-auto w-[150px] h-[150px] mb-4 mt-2 '> <img className='w-[100%] h-[100%] object-cover rounded-full' src={process.env.NEXT_PUBLIC_BASIC_URL + user.picture} /></div>
            <Grid container className="max-w-full text-red" direction={"column"}>
                <div className="font-bold truncate text-center max-w-full mb-4">{user.username}</div>
            </Grid>
        </Card >
    )
}

export default UserItem