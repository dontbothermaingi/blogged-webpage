import { Button, IconButton, Typography } from "@mui/material";
import { Box, flexbox } from "@mui/system";
import Book from "@mui/icons-material/Book";
import { NavLink, useNavigate } from "react-router";
import { LinkedIn } from "@mui/icons-material";
import LightbulbOutlined from "@mui/icons-material/LightbulbOutlined";


function HomePage (){

    const navigate = useNavigate()

    function handleRegister(){
        navigate('/register')
    }

    function handleStories(){
        navigate('/stories')
    }


    return ( 

        <Box display={'flex'} flexDirection={'column'}>
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
                    <Typography style={{fontFamily:'GT Medium', cursor:'pointer'}} fontSize={'22px'} ml={'90px'}>Start Writing</Typography>
                    <Button sx={{color:'black', backgroundColor:'white', borderRadius:'25px'}} >
                        <Typography style={{fontFamily:'GT Medium', fontSize:'18px', padding:'7px'}} onClick={handleStories}>Read More</Typography>
                    </Button>
                </Box>
        </Box>
     );
}
 
export default HomePage;