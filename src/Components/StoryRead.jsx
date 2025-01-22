import { Book, LightbulbOutlined, LinkedIn, Search } from "@mui/icons-material";
import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import Person2Outlined from "@mui/icons-material/Person2Outlined";
import { Button, Divider, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function StoryRead (){

    const [story, setStory] = useState({})
    const {storyId} = useParams()
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(()=>{
        fetch(`http://127.0.0.1:1904/story/${storyId}`)
        .then(response => response.json())
        .then((data) => {
            setStory(data);
        })
        .catch(error => console.error("Error fetching story:", error));
    }, [storyId]);

    function handleHome(){
        navigate('/')  
    }

    function handleStories(){
        navigate('/stories')  
    }

    return ( 
        <Box>
            <Box display={'flex'} justifyContent={'space-between'} mb={'30px'}> 
                <Box display={'flex'} alignItems={'center'} gap={'30px'} flexDirection={'row'}>
                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                        <IconButton sx={{color:'white'}}>
                            <LightbulbOutlined sx={{fontSize:'33px'}}/>
                        </IconButton>
                        <Typography style={{fontFamily:'GT Bold', cursor:'pointer'}} fontSize={'35px'} onClick={handleHome} >Blogged</Typography>
                    </Box>
                    
                    <Box>
                        <TextField
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search for story..."
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#3C364A', // Default border color
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white', // Border color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'white', // Border color when focused
                                },
                                },
                                '& .MuiInputLabel-root': {
                                color: 'grey', // Label color
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                color: 'white', // Label color when focused
                                },
                            }}
                            variant="outlined"
                            InputProps={{
                                style: {
                                    color: 'white', // Text color inside the input
                                    backgroundColor:'#3C364C',
                                    borderRadius:'5px',
                                    height:'40px',
                                    width:"400px"
                                },
                                endAdornment:(
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge={'end'}
                                            sx={{color:'grey'}}
                                        >
                                            <Search />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                </Box>

                <a href={'https://www.linkedin.com/in/denis-maingi-8a987a305/'} style={{textDecoration:'none', color:'white'}}>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                    <IconButton sx={{color:'white'}}>
                        <LinkedIn sx={{fontSize:'33px'}}/>
                    </IconButton>
                    <Typography style={{fontFamily:'GT Bold', cursor:'pointer'}} fontSize={'25px'}>Denis Maingi</Typography>
                </Box>
                </a>

            </Box>
            <Box display={'flex'}>
                    <Box flex={0.5} mt={"30px"}>
                        <Typography style={{fontFamily:'GT Bold', fontSize:"30px"}} mb={'20px'}>Details</Typography>
                        <Box display={'flex'} alignItems={'center'} gap={'20px'} mb={'30px'}>
                            <IconButton sx={{color:'white', backgroundColor:'#2D2D2D', borderRadius:'10px'}}>
                                <Person2Outlined style={{color:'white'}} sx={{padding:'2px', fontSize:'25px'}}/>
                            </IconButton>
                            <Typography style={{fontFamily:'GT Regular', color:'white', fontSize:'21px'}}>{story.author}</Typography>
                        </Box>

                        <Box display={'flex'} alignItems={'center'} gap={'20px'}>
                            <IconButton sx={{color:'white', backgroundColor:'#2D2D2D', borderRadius:'10px'}}>
                                <CalendarMonthOutlined style={{color:'white'}} sx={{padding:'2px', fontSize:'25px'}}/>
                            </IconButton>
                            <Typography style={{fontFamily:'GT Regular', color:'white', fontSize:'21px'}}>{story.date}</Typography>
                        </Box>

                        <Button 
                          variant="contained"
                          style={{backgroundColor:'white', borderRadius:'20px'}}
                          sx={{mt:'30px'}}
                          onClick={handleStories}
                        >
                            <Typography style={{fontFamily:'GT Medium', color:'black', fontSize:'21px', padding:'2px'}}>More Stories</Typography>
                        </Button>
                        
                    </Box>

                    <Divider style={{color:'white', height:'300px'}} orientation="vertical"/>

                    <Box display={'flex'} flexDirection={'column'} gap={'30px'} alignItems={'center'} flex={4}>
                        <Typography style={{fontFamily:'GT Ultrabold', fontSize:"50px"}}>{story.title}</Typography>

                        <Box>
                            <img 
                            src={story.images}
                            alt="Image"
                            />
                        </Box>

                        <Box width={'80%'} display={'flex'} flexDirection={'column'} gap={'20px'}>
                            <Typography style={{fontFamily:'GT Medium', color:'white', fontSize:'22px'}}>{story.contentparagraph1}</Typography>
                            <Typography style={{fontFamily:'GT Regular', color:'white', fontSize:'22px'}}>{story.contentparagraph2}</Typography>
                            <Typography style={{fontFamily:'GT Regular', color:'white', fontSize:'22px'}}>{story.contentparagraph3}</Typography>
                            <Typography style={{fontFamily:'GT Regular', color:'white', fontSize:'22px'}}>{story.contentparagraph4}</Typography>
                            <Typography style={{fontFamily:'GT Regular', color:'white', fontSize:'22px'}}>{story.contentparagraph5}</Typography>
                            <Typography style={{fontFamily:'GT Regular', color:'white', fontSize:'22px'}}>{story.contentparagraph6}</Typography>
                            <Typography style={{fontFamily:'GT Regular', color:'white', fontSize:'22px'}}>{story.contentparagraph7}</Typography>
                            <Typography style={{fontFamily:'GT Regular', color:'white', fontSize:'22px'}}>{story.contentparagraph8}</Typography>
                            <Typography style={{fontFamily:'GT Regular', color:'white', fontSize:'22px'}}>{story.contentparagraph9}</Typography>
                            <Typography style={{fontFamily:'GT Regular', color:'white', fontSize:'22px'}}>{story.contentparagraph10}</Typography>
                        </Box>
                    </Box>
            </Box>
        </Box>
     );
}
 
export default StoryRead;