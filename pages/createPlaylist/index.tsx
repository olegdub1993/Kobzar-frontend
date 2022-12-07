
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { createPlaylist } from '../../store/userSlice';
import MainLayout from '../../layouts/MainLayout'
import { useDispatch } from 'react-redux';
import FileUpload from '../../components/FileUpload';
import { useInput } from '../../hooks/useInput';

const CreatePlaylist = () => {
    const dispatch=useDispatch()
    const {user} = useTypedSelector((state) => state.user)
    const name = useInput()
    const description = useInput()
    const [picture, setPicture] = useState(null);
    const username = user?.username
    const createPlaylistHandler = () => {
            const formData = new FormData()
            formData.append("name", name.value)
            formData.append("description", description.value)
            formData.append("username", username)
            formData.append("picture", picture)
            dispatch(createPlaylist(formData)) 
        }

    return (
        <MainLayout red> 
            <div className="flex flex-col items-center bg-white w-[500px] p-6 rounded m-auto mt-8 ">
                    <TextField {...name} label="Назва" sx={{ margin: "20px" }} />
                    <TextField {...description} label="Опис (необов'язково)" sx={{ margin: "20px" }} />
                 <FileUpload setFile={setPicture} accept="image/*"><Button className=" text-red text-lg font-semibold">Додати обкладинку</Button></FileUpload>
                <Button color='success' variant='contained' className="bg-green-dark text-lg font-semibold capitalize mt-8" onClick={createPlaylistHandler}>Створити плейлист</Button>
            </div>
        </MainLayout>
    )
}

export default CreatePlaylist
