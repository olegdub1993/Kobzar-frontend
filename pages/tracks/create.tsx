import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react'
import FileUpload from '../../components/FileUpload';
import StepWrapper from '../../components/StepWrapper';
import { useInput } from '../../hooks/useInput';
import MainLayout from './../../layouts/MainLayout';
import axios from "axios";

const Create = () => {
    const [step, setStep] = useState(0);
    const [audio, setAudio] = useState(null);
    const [picture, setPicture] = useState(null);
    const name=useInput()
    const artist=useInput()
    const text=useInput()
    const next = () => {
        if (step !== 2) {
            setStep((step) => step + 1)
        }else{
            const formData=new FormData()
            formData.append("name",name.value)
            formData.append("text",text.value)
            formData.append("artist",artist.value)
            formData.append("audio",audio)
            formData.append("picture",picture)
            axios.post(process.env.NEXT_PUBLIC_BASIC_URL+"tracks",formData).then((resp)=>{})
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
                    <TextField {...text} label="Tracks text" multiline rows={4} sx={{ margin: "20px" }} />
                </Grid>}
                {step === 1 && <FileUpload  setFile={setPicture} accept="image/*"><Button>Upload Image</Button></FileUpload>}
                {step === 2 && <FileUpload  setFile={setAudio} accept="audio/*"><Button>Upload Track</Button></FileUpload>}
            </StepWrapper>
            <Grid container justifyContent={"space-between"} >
                <Button color='success' variant='contained' disabled={step === 0} onClick={back} > Go back</Button>
                <Button color='success' variant='contained' onClick={next}>Next</Button>
            </Grid>
        </MainLayout >
    )
}

export default Create