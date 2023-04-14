import { Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import FileUpload from '../../components/FileUpload';
import StepWrapper from '../../components/StepWrapper';
import { useInput } from '../../hooks/useInput';
import MainLayout from './../../layouts/MainLayout';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setSuccess } from '../../store/userSlice';

const Create = () => {
    const [step, setStep] = useState(0);
    const [picture, setPicture] = useState<Blob| null>(null);
    const [category, setCategory] = useState("")
    const name = useInput()
    const dispatch =useDispatch<any>()
    const next = () => {
        if (step !== 1) {
            setStep((step) => step + 1)
        } else {
            const formData = new FormData()
            formData.append("name", name.value)
            formData.append("picture", picture as Blob)
            axios.post(process.env.NEXT_PUBLIC_BASIC_URL + "artists", formData).then((resp) => {
                dispatch(setSuccess('Виконавця створено'))
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
                    <TextField {...name} label="Artist name" sx={{ margin: "20px" }} />
                    {/* <select onChange={(e: any) => setCategory(e.target.value)}>
                        <option value="rock">Рок</option>
                        <option value="christmas">Різдво</option>
                        <option value="popular">Популярні</option>
                        <option value="folk">Народні</option>
                        <option value="forSoul">Для душі</option>
                        <option value="remix">Ремікси</option>
                    </select> */}

                </Grid>}
                {step === 1 && <FileUpload setFile={setPicture} accept="image/*"><Button>Upload Image</Button></FileUpload>}
            </StepWrapper>
            <Grid container justifyContent={"space-between"} >
                <Button color='success' variant='contained' disabled={step === 0} onClick={back} > Go back</Button>
                <Button color='success' variant='contained' onClick={next}>Next</Button>
            </Grid>
        </MainLayout >
    )
}

export default Create