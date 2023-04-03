import { Box, Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import FileUpload from '../../../components/FileUpload'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { updatePlaylist } from '../../../store/playlistSlice'
import { IPlaylist } from '../../../types/playlist';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Image from 'next/image'

interface EditPlaylistProps {
    setEditMode: (arg: boolean) => void
    playlist: IPlaylist
}

const EditPlaylistPopup: React.FC<EditPlaylistProps> = ({ setEditMode, playlist }) => {
    // const {user} = useTypedSelector((state) => state.user)
    const [playlistPicture, setPlaylistPicture] = useState<File>()
    const [imgUrl, setImageUrl] = useState<any>()
    const [name, setName] = useState(playlist?.name)
    const [description, setDescription] = useState(playlist?.description)
    const [internalError, setInternalError] = useState({ name: "" })
    const dispatch = useDispatch<any>()

    const setPlaylistPictureHandler = (pictureFile: File) => {
        const oFReader = new FileReader();
        oFReader.readAsDataURL(pictureFile)
        oFReader.onload = function (oFREvent) {
            setImageUrl(oFREvent?.target?.result);
            setPlaylistPicture(pictureFile)
        }
    }
    const updatePlaylistHandler = () => {
        setEditMode(false)
        const formData = new FormData();
        formData.append("name", name)
        formData.append("description", description)
        formData.append("id", playlist._id)
        formData.append("picture", playlistPicture as Blob)
        dispatch(updatePlaylist(formData))
    }
    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     setEditMode(false)
    //     const formData = new FormData(event.currentTarget);
    //        formData.append("picture", playlistPicture as Blob)

    //         dispatch(updatePlaylist(formData))
    // };

    return (
        <div className="shadow-[0px_0px_33px_2px_rgba(0,0,0,0.96)]  flex flex-col items-center fixed top-[200px]  left-[50%] translate-x-[-50%] bg-white w-[750px] p-6 rounded m-auto mt-8 ">
            <div className="flex mb-4 w-full justify-between">
                <div className="flex flex-col items-center w-[50%] ">
                    {imgUrl ? <img className='m-auto rounded-lg mb-4 w-[320px] h-[250px]' src={imgUrl} /> : playlist?.picture ? <img className='m-auto rounded-lg mb-4 w-[320px] h-[250px]' src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + playlist.picture} /> :
                        <div className='bg-black m-auto rounded-lg mb-4 flex justify-center items-center w-[250px] h-[250px]'><AddPhotoAlternateIcon className='!text-white !rounded-full !w-[150px] !h-[150px]' /></div>}
                    <FileUpload setFile={setPlaylistPictureHandler} accept="image/*"><Button className=" !text-red !text-lg !font-semibold">{imgUrl ? "Змінити" : "Додати"} обкладинку</Button></FileUpload>
                </div>
                <div className="flex flex-col w-[50%] items-center">
                    <TextField
                        className="!w-[300px]"
                        onClick={() => setInternalError({ name: "" })}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                        value={name}
                        required
                        fullWidth
                        name="name"
                        label="Назва плейлиста"
                        id="name"
                    />
                    <TextField
                        className="!w-[300px]"
                        onClick={() => setInternalError({ name: "" })}
                        onChange={(e) => setDescription(e.target.value)}
                        margin="normal"
                        value={description}
                        required
                        fullWidth
                        name="description"
                        label="Опис (необов'язково)"
                        id="description"
                    />
                </div>
            </div>
            {internalError && <Grid item xs={12}><div className='!text-center  !text-lg !font-semibold !text-error'>{internalError.name}</div> </Grid>}
            <div className="flex justify-center">
                <Button
                    className='!bg-red hover:!bg-black !capitalize !text-lg !font-bold !w-[200px] !mr-10'
                    //   type="submit"
                    onClick={updatePlaylistHandler}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Зберегти
                </Button>
                <Button
                    onClick={() => setEditMode(false)}
                    className='!bg-black hover:!bg-black !capitalize !text-lg !font-bold !w-[200px]'
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Відмінити
                </Button></div>
        </div>
        // <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}  className="flex shadow-lg rouded p-8 bg-white  left-[50%] fixed top-[200px] m-auto w-[500px]  flex-col items-center">
        //   </Box>
    )
}

export default EditPlaylistPopup