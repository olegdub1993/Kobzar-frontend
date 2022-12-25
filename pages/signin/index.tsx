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
import { login } from '../../store/authSlice';
import { useTypedSelector } from './../../hooks/useTypedSelector';
import { useRouter } from 'next/router';
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

export default function SignIn() {  
 const {isAuth, error} = useTypedSelector((state) => state.auth)
    const [internalError, setInternalError]=useState({name:""})
    const dispatch = useDispatch<any>() 
    console.log("eee",error)
    
    useEffect(()=>{
        setInternalError(error)
    },[error])

    const router=useRouter()
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        if(!formData.get('email')||!formData.get('password')){
            setInternalError({name:"Заповніть всі поля"})
            return
        }
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        }
        dispatch(login(data))
    };

    if(isAuth) {router.push("/")}

    return (
        <div className=' h-screen bg-gradient-to-b from-[rgba(54,0,2,1)] to-[rgba(140,0,0,1)]  pt-24' >
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" className='bg-yellow p-[30px] rounded shadow-[0px_0px_23px_5px_rgba(0,0,0,0.96)]'>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar className='bg-red'  sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon  className='bg-red'/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            onClick={()=>setInternalError({name:""})}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Ваш Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            onClick={()=>setInternalError({name:""})}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />  
                         {internalError && <Grid item xs={12}><div className='text-center text-lg font-semibold text-error'>{internalError.name}</div> </Grid>}
                         <Grid item xs={12} className="mt-6 mb-4">
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" className='bg-red font-bold hover:!bg-red mr-4 ml-4' />}
                            label="Запам'ятати мене"
                        />
                        </Grid>
                        <Button
                            className='bg-red hover:bg-black capitalize text-lg font-bold'
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Ввійти
                        </Button>
                        <Grid  container justifyContent="flex-end">
                            {/* <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid> */}
                            <Grid item>
                                <Link href="/signup" variant="body2" className='font-bold  text-sm text-red'>
                                    {"Немає акаунта? Зареєструватись"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5,  }} />
            </Container>
        </ThemeProvider>
        </div>
    );
}