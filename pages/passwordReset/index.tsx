import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from "next/link";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { sendPasswordLink, setError } from '../../store/authSlice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useEffect, useState } from 'react';


function Copyright(props: any) {
    return (
        <Typography variant="body2" className='font-bold' align="center" {...props}>
            {'Copyright © '}
            <Link href="https://mui.com/">
                Kobzar
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme(); 
export default function PasswordReset() {
    const { error, message} = useTypedSelector((state) => state.auth)
    const [internalError, setInternalError] = useState({ name: "" })
    const dispatch = useDispatch<any>()
    const[email,setEmail]=useState("")

    useEffect(() => {
        setInternalError(error)
    }, [error])

    useEffect(()=> ()=> {
        if(error){dispatch(setError(""))
    }
    },[])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!email) {
            setInternalError({ name: "Заповніть всі поля" })
            return
        }
        const data = {email }
        dispatch(sendPasswordLink(data))
    };

    return (
        <div className=' h-screen bg-gradient-to-b from-[rgba(54,0,2,1)] to-[rgba(140,0,0,1)]  pt-24' >
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs" className='bg-yellow !p-[30px] rounded shadow-[0px_0px_23px_5px_rgba(0,0,0,0.96)]'>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar className='!bg-red mb-6' sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon className='!bg-red' />
                        </Avatar>
                        {message?
                        <Typography component="h1" variant="h5" className="text-center">
                            {message}
                        </Typography>:
                        <>
                        <Typography component="h1" variant="h5"  className="text-center">
                            Введіть свою електронну адресу
                        </Typography>
                        <Box component="form"  className='!w-full' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                onClick={() => setInternalError({ name: "" })}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Ваш Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                error={((internalError.name&&!email)||internalError.name==="Повинен бути і-мейл"||internalError.name===`Користувач з поштою ${email} вже існує`)}
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            {internalError.name && <Grid item xs={12}><div className='text-center text-lg font-semibold text-error'>{internalError.name}</div> </Grid>}
                            <Button
                                className='!bg-red hover:!bg-black !capitalize !text-lg !font-bold'
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Відправити
                            </Button>
                        </Box>
                        </>}
                    </Box>
                    <Copyright sx={{ mt: 5, }} />
                </Container>
            </ThemeProvider>
        </div>
    );
}