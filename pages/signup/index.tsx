import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from "next/link";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { signup } from '../../store/authSlice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useEffect, useState } from 'react';

function Copyright(props: any) {
    
    return (
        <Typography variant="body2" className='font-bold' align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Kobzar
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {
    const {isAuth, error} = useTypedSelector((state) => state.auth)
    const [internalError, setError]=useState({name:""})
    const dispatch = useDispatch<any>() 
    console.log("eee",error)
    useEffect(()=>{
        setError(error)
    },[error])
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(!data.get('username')||!data.get('email')||!data.get('password')){
            setError({name:"Заповніть всі поля"})
            return
        }
        dispatch(signup({
            username:data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
        }));
    };
   useEffect(()=>{},
   [])
    return (
        <div className=' h-screen bg-gradient-to-b from-[rgba(54,0,2,1)] to-[rgba(140,0,0,1)]  pt-24' >
            <ThemeProvider theme={theme} >
                <Container component="main" maxWidth="xs" className='bg-yellow p-[30px] rounded shadow-[0px_0px_23px_5px_rgba(0,0,0,0.96)] '>
                {isAuth? 
                 <div className='text-red font-semibold text-3xl m-2 mt-8 mb-8 text-center' >
                     Ви зареєструвались!) 
                     <div className='text-red font-semibold text-2xl m-4 text-center' >Щоб активувати акaунт будь ласка перейдіть за посиланням яке ми додали  до листа надісланого на вашу пошту.</div>
                 </div>:<>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar className='bg-red' sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon className='bg-red' />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, }} >
                            <Grid container spacing={2}>
                                {/* <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        sx={{ color: "#10100e", border: "1px solid #10100e", }}
                                    />
                                </Grid> */}
                                <Grid item xs={12} >
                                    <TextField
                                        // sx={{ background: "white" }}
                                        required
                                        fullWidth
                                        id="username"
                                        label="Прізвище та ім'я"
                                        name="username"
                                        autoComplete="family-name"
                                        onClick={()=>setError({name:""})}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        // sx={{ background: "white" }}
                                        required
                                        fullWidth
                                        id="email"
                                        label="Ваш Email"
                                        name="email"
                                        autoComplete="email"
                                        onClick={()=>setError({name:""})}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onClick={()=>setError({name:""})}
                                        // sx={{ background: "white" }}
                                        required
                                        fullWidth
                                        name="password"
                                        label="Пароль"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                {internalError && <Grid item xs={12}><div className='text-center text-lg font-semibold text-error'>{internalError.name}</div> </Grid>}
                                <Grid item xs={12} className="mt-6 mb-4">
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails"  className='bold bg-red hover:!bg-red mr-4 ml-4' />}
                                        label="Я хочу отримувати інформацію щодо нових можливостей Kobzar."
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className='bg-red hover:bg-black capitalize text-lg font-bold'
                                sx={{ mt: 3, mb: 2, }}
                            >
                                Зареєструватись
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/signin" variant="body2" className='font-bold text-sm text-red'>
                                        Вже маєте акаунт? Ввійти
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} /></>}
                </Container>
            </ThemeProvider>
        </div>
    );
}