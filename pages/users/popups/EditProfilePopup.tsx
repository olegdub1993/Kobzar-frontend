import React, { useState } from 'react'
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FileUpload from '../../../components/FileUpload';
import { useDispatch } from 'react-redux';
import {updateProfile  } from '../../../store/userSlice';


interface EditProfilePopup {
setEditMode:(arg:boolean)=>void
// playlist:IPlaylist
}

const EditProfilePopup: React.FC<EditProfilePopup> = ({setEditMode,setImageUrl}) => {
    const {user} = useTypedSelector((state) => state.user)
    const [userPicture,setUserPicture]=useState<File>()
    const [username,setUsername]=useState(user?.username)
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}  className="fixed top-[200px]  left-[50%] translate-x-[-50%] bg-white flex shadow-lg p-6  m-auto w-[500px]  flex-col items-center">
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
             </Box>
    )
}

export default EditProfilePopup