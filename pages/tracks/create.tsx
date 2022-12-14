import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react'
import FileUpload from '../../components/FileUpload';
import StepWrapper from '../../components/StepWrapper';
import { useInput } from '../../hooks/useInput';
import MainLayout from './../../layouts/MainLayout';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setSuccess } from '../../store/userSlice';

const Create = () => {
    const [step, setStep] = useState(0);
    const [audio, setAudio] = useState<Blob| null>(null);
    const [picture, setPicture] = useState<Blob| null>(null);
    const [category, setCategory] = useState("")
    const name = useInput()
    const artist = useInput()
    const dispatch =useDispatch<any>()
    const next = () => {
        if (step !== 2) {
            setStep((step) => step + 1)
        } else {
            const formData = new FormData()
            formData.append("name", name.value)
            formData.append("category", category)
            formData.append("artist", artist.value)
            formData.append("audio", audio as Blob)
            formData.append("picture", picture as Blob)
            axios.post(process.env.NEXT_PUBLIC_BASIC_URL + "tracks", formData).then((resp) => {
                dispatch(setSuccess('Трек створено'))
             })
        }

    }

    const back = () => {
        setStep((step) => step - 1)
    }
    return (
        <MainLayout>
            <StepWrapper activeStep={step}>
                {step === 0 && <Grid container direction={"column"} >
                    <TextField {...name} label="Tracks name" sx={{ margin: "20px" }} />
                    <TextField {...artist} label="Tracks author" sx={{ margin: "20px" }} />
                    <select onChange={(e: any) => setCategory(e.target.value)}>
                        <option value="rock">Рок</option>
                        <option value="christmas">Різдво</option>
                        <option value="popular">Популярні</option>
                        <option value="folk">Народні</option>
                        <option value="forSoul">Для душі</option>
                        <option value="remix">Ремікси</option>
                    </select>

                </Grid>}
                {step === 1 && <FileUpload setFile={setPicture} accept="image/*"><Button>Upload Image</Button></FileUpload>}
                {step === 2 && <FileUpload setFile={setAudio} accept="audio/*"><Button>Upload Track</Button></FileUpload>}
            </StepWrapper>
            <Grid container justifyContent={"space-between"} >
                <Button color='success' variant='contained' disabled={step === 0} onClick={back} > Go back</Button>
                <Button color='success' variant='contained' onClick={next}>Next</Button>
            </Grid>
        </MainLayout >
    )
}

export default Create