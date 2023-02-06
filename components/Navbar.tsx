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
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import Popup from './Popup';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { HoverPopup } from './HoverPopup';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AppsIcon from '@mui/icons-material/Apps';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Image from 'next/image'

const drawerWidth = 240;


interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const manuItems = [
    { icon: <AppsIcon className='text-red !w-[30px]' />, text: "Головна", href: "/", },
    { icon: <SearchIcon className='text-red !w-[30px]' />, text: "Пошук", href: "/search" },
    { icon: <LibraryMusicIcon className='text-red !w-[30px]' />, text: "Moя бібліотека", href: "/library", protect: true },
    // { text: "Tracks List", href: "/tracks",protect:true },
    // { text: "Alboms List", href: "/alboms",protect:true  },
    { icon: <PlaylistAddIcon className='text-red !w-[30px]' />, text: "Створити плейлист", href: "/createPlaylist", protect: true },
    { icon: <FavoriteIcon className='text-red !w-[30px]' />, text: "Вподобані", href: "/liked", protect: true },]

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

export default function Navigation({ restrictPopup, setRestrictPopup }: any) {
    const { isAuth } = useTypedSelector((state) => state.auth)
    const { user, alboms } = useTypedSelector((state) => state.user)
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
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
            <AppBar position="fixed"  open={open} className="bg-black">
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
                    {!isAuth ? <> <Typography className='text-green-dark' variant="h6" noWrap component="div">
                        Зареєструйтесь щоб отримати доступ до всіх можливостей Kobzar
                    </Typography >
                        <Button onClick={() => router.push("/signup")} className='!bg-white hover:!bg-red !capitalize !text-black !font-semibold'>Реєстрація</Button></> :
                        <div className='group flex items-center relative h-[64px]'>
                            {user?.picture ? <Image alt="avatar" width={40} height={40} className="rounded-full w-[40px] h-[40px] bg-red mr-4"
                                src={process.env.NEXT_PUBLIC_BASIC_URL + user.picture} /> :
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
                        overflowY: "visible !important",
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        bgcolor: "#1B1C1E"
                    },
                }}

                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader sx={{
                    bgcolor: "#1B1C1E"
                }} >
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon fontSize='large' color='error' /> : <ChevronRightIcon fontSize='large' color='error' />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List
                    className='text-white bg-black  border-b border-white '
                >
                    {manuItems.map((item, index) => (
                        <MyListItem restrictPopup={restrictPopup} setRestrictPopup={setRestrictPopup} key={item.text} index={index} navItem={item} />
                    ))}

                </List>

                <List className='text-white bg-black ' >
                    {alboms?.map((albom) => (<div
                        onClick={() => router.push(`/playlist/${albom._id}`)} className='ml-[75px] cursor-pointer mt-3 mb-3' key={albom._id} >{albom.name}</div>
                    ))}

                </List>
            </Drawer>
        </Box >
    );
}
const MyListItem = ({ navItem, index, setRestrictPopup, restrictPopup }: any) => {
    const { isAuth } = useTypedSelector((state) => state.auth)
    const router = useRouter()


    const onListItemClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
        e.stopPropagation()
        if (!isAuth && navItem.protect) {
            setRestrictPopup(navItem.text)
        }
        else {
            router.push(href)
        }
    }
    return <ListItem onClick={(e) => onListItemClick(e, navItem.href)} disablePadding
        className='text-white relative' >
        <ListItemButton>
            <ListItemIcon>
                {navItem.icon}
            </ListItemIcon>
            <ListItemText primary={navItem.text} />
        </ListItemButton>
        {restrictPopup === navItem.text && <Popup setPopup={setRestrictPopup} className='left-[220px] top-[0px]' />}
    </ListItem>
}