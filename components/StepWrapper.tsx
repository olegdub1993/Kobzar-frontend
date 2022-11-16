import { Step, StepLabel, Stepper, Grid, Card } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'


interface StepWrapperProps {
    activeStep: number
    children: React.ReactNode
}
const steps = ["Track Info", "Track Picture", "Track Audio"]
const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, children }) => {
    return (

        <Container>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) => <Step key={index} completed={activeStep > index}>
                    <StepLabel >{step}</StepLabel>
                </Step>)}
            </Stepper>
            <Grid container justifyContent={"center"} sx={{
                margin: "50px",
                height: "300px"
            }} >
                <Card sx={{
                    width: "700px"
                }}>
                    {children}
                </Card>
            </Grid>
        </Container>
    )
}

export default StepWrapper