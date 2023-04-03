import React, { useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FileUpload from '../../components/FileUpload';
import { useDispatch } from 'react-redux';
import {updateProfile  } from '../../store/userSlice';

const Index = () => {
    const {user} = useTypedSelector((state) => state.user)
    const [userPicture,setUserPicture]=useState<File>()
    const [imgUrl,setImageUrl]=useState<any>()
    const [username,setUsername]=useState(user?.username)
    const[editMode,setEditMode]=useState(false)
    const [internalError, setInternalError]=useState({name:""})
     const dispatch=useDispatch<any>()
    const setUserPictureHandler=(pictureFile:File)=>{
        const oFReader = new FileReader();
        oFReader.readAsDataURL(pictureFile)
        oFReader.onload = function (oFREvent) {
        setImageUrl(oFREvent?.target?.result);
        setUserPicture(pictureFile)
      }
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        if(!formData.get('username')){
            setInternalError({name:"Введіть нове ім'я"})
            return
        }
        setEditMode(false)
           formData.append("picture", userPicture as Blob)
            dispatch(updateProfile(formData))
    };
    return (
        <MainLayout>
            <div className="flex  items-center"> 
            {imgUrl ? <img className=' rounded-full  w-[200px] h-[200px]' src={imgUrl}/>:user?.picture?<img className=' rounded-full  w-[200px] h-[200px]'  src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + user.picture}/>:
            <div className='bg-black rounded-full flex justify-center items-center w-[200px] h-[200px]'><PersonIcon   className='text-white rounded-full w-[150px] h-[150px]'/></div>}
    
           <div className="ml-8 font-semibold text-4xl"><div> {user?.username} </div>
                    <div>   <Button
                            onClick={()=>setEditMode(true)}
                            className='bg-red hover:bg-black capitalize text-lg font-bold'
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                        Редагувати профіль
                        </Button></div>
                        </div>
            </div>
            {editMode &&
             <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}  className="flex shadow-lg p-6  m-auto w-[500px]  flex-col items-center">
           <FileUpload setFile={setUserPictureHandler} accept="image/*">
            <Button     
                 className='bg-red hover:bg-black mb-6 capitalize text-lg font-bold w-[300px]'
                 >Change Image</Button>
                 </FileUpload>
             <TextField
                 className="w-[300px]"
                 onClick={()=>setInternalError({name:""})}
                 onChange={(e)=>setUsername(e.target.value)}
                 margin="normal"
                 value={username}
                 required
                 fullWidth
                 name="username"
                 label="Ваше імя"
                 id="username"
                 autoComplete="family-name"
             />  
              {internalError && <Grid item xs={12}><div className='text-center text-lg font-semibold text-error'>{internalError.name}</div> </Grid>}
             <div className="flex justify-center">
             <Button
                 className='bg-red hover:bg-black capitalize text-lg font-bold w-[200px] mr-6'
                 type="submit"
                 fullWidth
                 variant="contained"
                 sx={{ mt: 3, mb: 2 }}
             >
                Зберегти
             </Button>
              <Button
                            onClick={()=>setEditMode(false)}
                            className='bg-black hover:bg-black capitalize text-lg font-bold w-[200px]'
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Відмінити 
                        </Button></div>
             </Box>}
        </MainLayout>
    )
}
export default Index
