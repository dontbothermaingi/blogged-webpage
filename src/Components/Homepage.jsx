import { Button, IconButton, Typography } from "@mui/material";
import { Box, useMediaQuery} from "@mui/system";
import { useNavigate } from "react-router";
import { LinkedIn } from "@mui/icons-material";
import LightbulbOutlined from "@mui/icons-material/LightbulbOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import GitHub from "@mui/icons-material/GitHub";


function HomePage (){

    const navigate = useNavigate()
    const isMobile = useMediaQuery("(max-width:768px")

    function handleRegister(){
        navigate('/register')
    }

    function handleStories(){
        navigate('/stories')
    }

    function handleWrite(){
        navigate('/write')
    }


    return ( 
        <Box>
            {isMobile ? (
                <Box>
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}  mt={'20px'}>
                        <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                            <LightbulbOutlined sx={{fontSize:'28px'}}/>
                            <Typography style={{fontFamily: 'GT Bold', cursor:"pointer"}} fontSize={'25px'}>Blogged</Typography>
                        </Box>

                        <Box>
                            <IconButton>
                                <MenuIcon sx={{color:'white'}}/>
                            </IconButton>
                        </Box>
                    </Box>

                    <Box>
                        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} marginTop={'30px'} alignItems={'center'} gap={'30px'}>
                            <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                <Typography style={{fontFamily:"GT Bold"}} fontSize={'25px'}>Express Yourself</Typography>
                                <Typography style={{fontFamily:"GT Bold"}} fontSize={'25px'}>Through the power of </Typography>
                                <Typography style={{fontFamily:"GT Bold"}} fontSize={'25px'}>words and Stories</Typography>
                            </Box>

                            <img
                                src={`/Yellow Minion.png`}
                                alt="minion"
                                style={{ maxHeight: "100%", maxWidth: "100%" }}
                            />

                            <Box display={'flex'} alignItems={'center'} gap={'20px'} mt={'20px'}>
                                <Typography style={{fontFamily:'GT Medium', cursor:'pointer'}} fontSize={'18px'} onClick={handleWrite}>Start Writing</Typography>

                                <Button sx={{color:'black', backgroundColor:'white', borderRadius:'10px'}} >
                                    <Typography style={{fontFamily:'GT Bold', fontSize:'15px', padding:'2px'}} onClick={handleStories}>Read More</Typography>
                                </Button>
                            </Box>
                        </Box>

                       
                    </Box>
                </Box>
            ):(
                <Box display={'flex'} flexDirection={'column'} padding={'20px'}>
                        <Box 
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                        > 
                            <Box display={'flex'} gap={'20px'}>
                                <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                                    <IconButton sx={{color:'white'}}>
                                        <LightbulbOutlined sx={{fontSize:'33px'}}/>
                                    </IconButton>
                                    <Typography style={{fontFamily: 'GT Bold', cursor:"pointer"}} fontSize={'35px'}>Blogged</Typography>
                                </Box>
                            </Box>

                            <a href={'https://www.linkedin.com/in/denis-maingi-8a987a305/'} style={{textDecoration:'none', color:'white'}}>
                                <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                                        <IconButton sx={{color:'white'}}>
                                            <LinkedIn sx={{fontSize:'33px'}}/>
                                        </IconButton>
                                        <Typography style={{fontFamily:'GT Bold', cursor:'pointer', color:'white'}} fontSize={'25px'}>Denis Maingi</Typography>
                                </Box>
                            </a>

                            <a href={'https://github.com/dontbothermaingi'} style={{textDecoration:'none', color:'white'}}>
                                <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                                        <IconButton sx={{color:'white'}}>
                                            <GitHub sx={{fontSize:'33px'}}/>
                                        </IconButton>
                                        <Typography style={{fontFamily:'GT Bold', cursor:'pointer', color:'white'}} fontSize={'25px'}>dontbothermaingi</Typography>
                                </Box>
                            </a>

                            <Box display={'flex'} gap={'20px'} alignItems={'center'}>
                                <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                                    <Button sx={{color:'black', backgroundColor:'white', fontFamily:'GT Bold', fontSize:'18px'}} >
                                        Login
                                    </Button>
                                </Box>
                                <Typography style={{fontFamily:'GT Bold', cursor:'pointer'}} fontSize={'22px'} onClick={handleRegister}>Sign Up</Typography>
                            </Box>
                        </Box>

                        <Box display={'flex'} justifyContent={'center'} marginTop={'30px'} alignItems={'center'} gap={'30px'}>
                            <Typography style={{fontFamily:"GT Ultrabold"}} fontSize={'50px'}>Express Yourself Through the power of <br/> words and Stories</Typography>
                            <img
                            src={`/Yellow Minion.png`}
                            alt="minion"
                            //   style={{ maxHeight: "100%", maxWidth: "100%" }}
                            />
                        </Box>

                        <Box display={'flex'} alignItems={'center'} gap={'20px'}>
                            <Typography style={{fontFamily:'GT Medium', cursor:'pointer'}} fontSize={'22px'} ml={'90px'} onClick={handleWrite}>Start Writing</Typography>
                            <Button sx={{color:'black', backgroundColor:'white', borderRadius:'25px'}} >
                                <Typography style={{fontFamily:'GT Medium', fontSize:'18px', padding:'7px'}} onClick={handleStories}>Read More</Typography>
                            </Button>
                        </Box>
                </Box>
            )}

        </Box>
     );
}
 
export default HomePage;