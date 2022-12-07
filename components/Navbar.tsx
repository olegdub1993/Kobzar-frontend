import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import kobza from  "./../public/kobza.jpg"
import Popup from './Popup';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { HoverPopup } from './HoverPopup';
import { fetchUser } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';
const drawerWidth = 240;

 
interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}
const manuItems = [{ text: "Головна", href: "/" ,}, { text: "Пошук", href: "/search" }, { text: "Moя бібліотека", href: "/library",protect:true }, { text: "Tracks List", href: "/tracks",protect:true }, { text: "Alboms List", href: "/alboms",protect:true  },{ text: "Створити плейлист", href: "/createPlaylist", protect:true }, { text: "Cподобані пісні", href: "/liked", protect:true  },]

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Navigation({restrictPopup,setRestrictPopup}:any) {

    const dispatch=useDispatch()
    const {isAuth} = useTypedSelector((state) => state.auth)
    const {user,alboms} = useTypedSelector((state) => state.user)
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const router = useRouter()

    const handleDrawerOpen = () => {
        setOpen(true); 
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
 
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{
                bgcolor: 'black'
            }} open={open}>
                <Toolbar className='flex justify-between'>
                    <div className='flex items-center'>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon color='error' />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            KOBZAR
                        </Typography>
                        {/* <Button onClick={()=>dispatch(fetchUser())} className='bg-white capitalize text-black font-semibold'>Реєстрація</Button> */}
                       {/* <div className="w-[70px]" > <img src={kobza} alt="kobza" /></div>  */}
                    </div>
                    {!isAuth ?<> <Typography className='text-green' variant="h6" noWrap component="div">
                        Зареєструйтесь щоб отримати доступ до всіх можливостей Kobzar
                    </Typography >
                        <Button onClick={() => router.push("/signup")} className='bg-white hover:!bg-red capitalize text-black font-semibold'>Реєстрація</Button></>:
                         <div className='group flex items-center relative h-[64px]'>
                           {user.picture ? <img className="rounded-full w-[40px] h-[40px] bg-red mr-4" 
                            src={process.env.NEXT_PUBLIC_BASIC_URL + user.picture} />:
                            <div className="flex items-center justify-center rounded-full w-[40px] h-[40px] bg-red mr-4"><PersonIcon className="mb-[5px]" /></div>}
                            <Typography className='text-white' variant="h6" noWrap component="div">
                                {user?.username}
                            </Typography>
                            <HoverPopup />
                       </div>
                    }
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{

                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        overflowY:"visible !important" ,
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        bgcolor: "black"
                    },
                }}
            
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader sx={{
                    bgcolor: "black"
                }} >
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon fontSize='large'  color='error' /> : <ChevronRightIcon fontSize='large'  color='error' />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List 
                   className='text-white bg-black  border-b border-white '
                >
                    {manuItems.map(({ text, href,protect }, index) => (
                        <MyListItem restrictPopup={restrictPopup} setRestrictPopup={setRestrictPopup} key={text} text={text} href={href} index={index} protect={protect}/>
                    ))}
                     
                </List>
                
                <List     className='text-white bg-black ' >
                    {alboms?.map((albom) => (<div 
                     onClick={()=>router.push(`/playlist/${albom._id}`)} className='ml-[75px] cursor-pointer mt-3 mb-3' key={albom._id} >{albom.name}</div>
                    ))}
                     
                </List>
            </Drawer>
        </Box >
    );
}
const MyListItem=({text,href,index,protect,setRestrictPopup,restrictPopup}:any)=> {
    const {isAuth} = useTypedSelector((state) => state.auth)
   
    const router = useRouter()
  

    const onListItemClick=(e,href)=>{
        e.stopPropagation()
        if(!isAuth && protect){
            setRestrictPopup(text)
        }
         else{
            router.push(href)
         }
    }
    return  <ListItem  onClick={(e)=>onListItemClick(e,href)} disablePadding 
    className='text-white relative' >
           <ListItemButton>
               <ListItemIcon>
                   {index % 2 === 0 ? <InboxIcon  className='text-red !w-[30px]'/> : <MailIcon  className='text-red !w-[30px]'/>}
               </ListItemIcon>
               <ListItemText primary={text} />
           </ListItemButton>
           { restrictPopup==text && <Popup setPopup={setRestrictPopup}/>}
       </ListItem>
}