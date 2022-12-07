
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { createPlaylist } from '../../store/userSlice';
import MainLayout from '../../layouts/MainLayout'
import { useDispatch } from 'react-redux';
import FileUpload from '../../components/FileUpload';
import { useInput } from '../../hooks/useInput';
import Image from 'next/image'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { AppState} from '../../store/store';

const CreatePlaylist = () => {
    const dispatch=useDispatch<any>()
    const {user} = useTypedSelector((state:AppState) => state.user)
    const [imgUrl,setImageUrl]=useState<string>("")
    const [internalError, setInternalError]=useState({name:""})
    const name = useInput()
    const description = useInput()
    const [picture, setPicture] = useState<Blob | null>(null);
    const username = user?.username

    const setPictureHandler=(pictureFile:File)=>{
        const oFReader = new FileReader();
        oFReader.readAsDataURL(pictureFile)
        oFReader.onload = function (oFREvent) {
        setImageUrl(oFREvent?.target?.result as string);
        setPicture(pictureFile)
      }
    }
    const createPlaylistHandler = () => {
        if(!name.value){
            setInternalError({name:"Введіть назву альбому"})
            return
         }
            const formData = new FormData()
            formData.append("name", name.value)
            formData.append("description", description.value)
            formData.append("username", username as string)
            formData.append("picture", picture as Blob)
            dispatch(createPlaylist(formData)) 
        }

    return (
        <MainLayout red> 
            <div className="flex flex-col items-center bg-white w-[700px] p-6 rounded m-auto mt-8 ">
                <div className="flex mb-4 w-full justify-between">
               <div  className="flex flex-col items-center w-[50%] "> 
                     {imgUrl?<Image className='m-auto rounded-lg mb-4 w-[250px] h-[250px]' height={250} width={250} src={imgUrl} alt="Albom picture"/>:
                    <div className='bg-black m-auto rounded-lg mb-4 flex justify-center items-center w-[250px] h-[250px]'><AddPhotoAlternateIcon   className='text-white rounded-full w-[150px] h-[150px]'/></div>}
                 <FileUpload setFile={setPictureHandler} accept="image/*"><Button className=" text-red text-lg font-semibold">{imgUrl?"Змінити":"Додати"} обкладинку</Button></FileUpload>
               </div>
                <div  className="flex flex-col w-[50%] items-center">
                    <TextField  onClick={()=>setInternalError({name:""})}  {...name} label="Назва" className='m-[20px] w-[300px]' />
                    <TextField {...description} label="Опис (необов'язково)"  className='m-[20px] w-[300px]' />
               </div>
               </div>
               {internalError && <div className='text-center text-xl font-semibold text-error'>{internalError.name}</div>}
                <Button color='success' variant='contained' className="bg-green-dark text-lg font-semibold capitalize mt-8" onClick={createPlaylistHandler}>Створити плейлист</Button>
            </div>
        </MainLayout>
    )
}

export default CreatePlaylist
