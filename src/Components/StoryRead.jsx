import { Book, LightbulbOutlined, LinkedIn, Search } from "@mui/icons-material";
import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import Person2Outlined from "@mui/icons-material/Person2Outlined";
import { Button, Divider, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function StoryRead (){

    const [story, setStory] = useState(null)
    const {storyId} = useParams()
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(()=>{
        fetch(`https://blogged-db.onrender.com/story/${storyId}`)
        .then(response => response.json())
        .then((data) => {
            setStory(data);
            console.log(data)
        })
        .catch(error => console.error("Error fetching story:", error));
    }, [storyId]);
    
    if (!story) {
        return <Typography>Loading story...</Typography>;
    }

    function handleHome(){
        navigate('/')  
    }

    function handleStories(){
        navigate('/stories')  
    }

    function deleteStory(event){
        event.preventDefault()

        fetch(`https://blogged-db.onrender.com/story/${storyId}`,{
            method:'DELETE'
        })
        .then(response => {
            if(!response.ok){
                throw new Error("Network response is not ok")
            }
            return response.json()
        })
        .then((data) => {
            navigate('/stories')
        })
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

                        <Box mt={'30px'}>
                            <Button onClick={deleteStory} variant="contained" sx={{backgroundColor:'red', color:'white', fontFamily:'GT Bold'}}>DELETE</Button>
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
                                src={`https://blogged-db.onrender.com${story.photo}`}
                                alt="Image"
                            />
                        </Box>

                        <Box width={'80%'} display={'flex'} flexDirection={'column'} gap={'20px'}>
                            {story.paragraphs.map((paragraph, index) => (
                                <Typography key={index} style={{fontFamily:'GT Light', color:'white', fontSize:'22px'}}>{paragraph.paragraph}</Typography>
                            ))}
                        </Box>

                    </Box>
            </Box>
        </Box>
     );
}
 
export default StoryRead;