import { Book, BusinessCenterOutlined, LightbulbOutlined } from "@mui/icons-material";
import AppSettingsAlt from "@mui/icons-material/AppSettingsAlt";
import Coffee from "@mui/icons-material/Coffee";
import Group from "@mui/icons-material/Group";
import LinkedIn from "@mui/icons-material/LinkedIn";
import MusicNoteOutlined from "@mui/icons-material/MusicNoteOutlined";
import Pets from "@mui/icons-material/Pets";
import PresentToAllOutlined from "@mui/icons-material/PresentToAllOutlined";
import Reviews from "@mui/icons-material/Reviews";
import Search from "@mui/icons-material/Search";
import SportsFootballOutlined from "@mui/icons-material/SportsFootballOutlined";
import Star from "@mui/icons-material/Star";
import { Button, Card, CardContent, CardMedia, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Stories (){

    const [searchTerm, setSearchTerm] = useState('')
    const [selectedGenre, setSelectedGenre] = useState('')
    const [stories, setStories] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        fetch('http://localhost:3000/stories')
        .then(response => response.json())
        .then((data) => {
            setStories(data)
        })
    },[])

    const filteredStories = stories
    .filter((story) => 
        !selectedGenre || story.category === selectedGenre // Genre filter
    )
    .filter((story) => 
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) // Search filter
    );



    function handleHome(){
        navigate('/')
    }

    function handleStoryRead(storyId){
        navigate(`/story-read/${storyId}`)
    }

    const display = selectedGenre

    return ( 
        <Box display={'flex'} flexDirection={'column'} gap={'30px'}>

            <Box display={'flex'} justifyContent={'space-between'}> 
                <Box display={'flex'} alignItems={'center'} gap={'30px'} flexDirection={'row'}>
                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                        <IconButton sx={{color:'white'}}>
                            <LightbulbOutlined sx={{fontSize:'33px'}}/>
                        </IconButton>
                        <Typography style={{fontFamily:'GT Bold', cursor:"pointer"}} fontSize={'35px'} onClick={handleHome}>Blogged</Typography>
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
                    <Typography style={{fontFamily:'GT Bold'}} fontSize={'25px'}>Denis Maingi</Typography>
                </Box>
                </a>
            </Box>

            <Box display={'flex'} justifyContent={'space-between'} flexDirection={'row'} margin={0}>
                <Box flex={0.5}>
                    <Typography style={{fontFamily:'GT Bold'}} fontSize={"29px"} mb="20px"  mt={'30px'}>Filters</Typography>
                    <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
                        <Box display={'flex'} alignItems={'center'} gap={'20px'}>
                            <IconButton sx={{color:'white', backgroundColor:'#2D2D2D', borderRadius:'10px', ":hover":{backgroundColor:'white', color:'#2D2D2D'}}}>
                                <PresentToAllOutlined sx={{padding:'2px', fontSize:'25px'}}/>
                            </IconButton>
                            <Typography style={{fontFamily:"GT Regular"}} fontSize={'20px'}>Wishlist</Typography>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} gap={'20px'}>
                            <IconButton sx={{color:'white', backgroundColor:'#2D2D2D', borderRadius:'10px', ":hover":{backgroundColor:'white', color:'#2D2D2D'}}}>
                                <Star sx={{padding:'2px', fontSize:'25px'}}/>
                            </IconButton>
                            <Typography style={{fontFamily:"GT Regular"}} fontSize={'20px'}>Ratings</Typography>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} gap={'20px'}>
                            <IconButton sx={{color:'white', backgroundColor:'#2D2D2D', borderRadius:'10px', ":hover":{backgroundColor:"white", color:'#2D2D2D'}}}>
                                <Reviews sx={{padding:'2px', fontSize:"25px"}}/>
                            </IconButton>
                            <Typography style={{fontFamily:"GT Regular"}} fontSize={'20px'}>Reviews</Typography>
                        </Box>
                    </Box>

                    <Typography style={{fontFamily:'GT Bold'}} fontSize={"29px"} mb="20px" mt={'10px'}>Genres</Typography>
                    <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
                        <Box display={'flex'} alignItems={'center'} gap={'20px'} onClick={() => setSelectedGenre('Business')}>
                        <IconButton sx={{color:'white',color: selectedGenre === 'Business' ? '#2D2D2D' : 'white', backgroundColor: selectedGenre === 'Business' ? 'white' : '#2D2D2D', borderRadius:'10px', ":hover":{backgroundColor:"white", color:'#2D2D2D'}}} onClick={() => setSelectedGenre('Business')}>
                            <BusinessCenterOutlined sx={{ padding: '2px', fontSize: '25px' }} />
                        </IconButton>

                            <Typography style={{fontFamily:"GT Regular", cursor:'pointer'}} fontSize={'20px'}>Business</Typography>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} gap={'20px'} onClick={() => setSelectedGenre('Entertainment')}>
                            <IconButton sx={{color:'white',color: selectedGenre === 'Entertainment' ? '#2D2D2D' : 'white', backgroundColor: selectedGenre === 'Entertainment' ? 'white' : '#2D2D2D', borderRadius:'10px', ":hover":{backgroundColor:"white", color:'#2D2D2D'}}} onClick={() => setSelectedGenre('Entertainment')}>
                                <MusicNoteOutlined sx={{padding:'2px', fontSize:'25px'}}/>
                            </IconButton>
                            <Typography style={{fontFamily:"GT Regular", cursor:'pointer'}} fontSize={'20px'}>Entertainment</Typography>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} gap={'20px'} onClick={() => setSelectedGenre('Food')}>
                            <IconButton sx={{color:'white',color: selectedGenre === 'Food' ? '#2D2D2D' : 'white', backgroundColor: selectedGenre === 'Food' ? 'white' : '#2D2D2D', borderRadius:'10px', ":hover":{backgroundColor:"white", color:'#2D2D2D'}}} onClick={() => setSelectedGenre('Food')}>
                                <Coffee sx={{padding:'2px', fontSize:"25px"}}/>
                            </IconButton>
                            <Typography style={{fontFamily:"GT Regular", cursor:'pointer'}} fontSize={'20px'}>Food</Typography>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} gap={'20px'} onClick={() => setSelectedGenre('Sports')}>
                            <IconButton sx={{color:'white',color: selectedGenre === 'Sports' ? '#2D2D2D' : 'white', backgroundColor: selectedGenre === 'Sports' ? 'white' : '#2D2D2D', borderRadius:'10px', ":hover":{backgroundColor:"white", color:'#2D2D2D'}}} onClick={() => setSelectedGenre('Sports')}>
                                <SportsFootballOutlined sx={{padding:'2px', fontSize:"25px"}}/>
                            </IconButton>
                            <Typography style={{fontFamily:"GT Regular", cursor:'pointer'}} fontSize={'20px'}>Sports</Typography>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} gap={'20px'} onClick={() => setSelectedGenre('Nature')}>
                            <IconButton sx={{color:'white',color: selectedGenre === 'Nature' ? '#2D2D2D' : 'white', backgroundColor: selectedGenre === 'Nature' ? 'white' : '#2D2D2D', borderRadius:'10px', ":hover":{backgroundColor:"white", color:'#2D2D2D'}}} onClick={() => setSelectedGenre('Nature')}>
                                <Pets sx={{padding:'2px', fontSize:"25px"}}/>
                            </IconButton>
                            <Typography style={{fontFamily:"GT Regular", cursor:'pointer'}} fontSize={'20px'}>Nature</Typography>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} gap={'20px'} onClick={() => setSelectedGenre('Self-Help')}>
                            <IconButton sx={{color:'white',color: selectedGenre === 'Self-Help' ? '#2D2D2D' : 'white', backgroundColor: selectedGenre === 'Self-Help' ? 'white' : '#2D2D2D', borderRadius:'10px', ":hover":{backgroundColor:"white", color:'#2D2D2D'}}} onClick={() => setSelectedGenre('Self-Help')}>
                                <Group sx={{padding:'2px', fontSize:"25px"}}/>
                            </IconButton>
                            <Typography style={{fontFamily:"GT Regular", cursor:'pointer'}} fontSize={'20px'}>Self-Help</Typography>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} gap={'20px'} onClick={() => setSelectedGenre('Technology')}>
                            <IconButton sx={{color:'white',color: selectedGenre === 'Technology' ? '#2D2D2D' : 'white', backgroundColor: selectedGenre === 'Technology' ? 'white' : '#2D2D2D', borderRadius:'10px', ":hover":{backgroundColor:"white", color:'#2D2D2D'}}} onClick={() => setSelectedGenre('Technology')}>
                                <AppSettingsAlt sx={{padding:'2px', fontSize:"25px"}}/>
                            </IconButton>
                            <Typography style={{fontFamily:"GT Regular", cursor:'pointer'}} fontSize={'20px'}>Technology</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box flex={3}>
                    <Typography style={{fontFamily:'GT Bold'}} fontSize={'60px'}> Trending and Interesting.</Typography>

                    <Box ml={'10px'} mb={'20px'} gap={'20px'} display={'flex'}>
                        <Button variant="contained" style={{backgroundColor:"#2D2D2D", borderRadius:'10px'}}><Typography style={{fontFamily:"GT Regular", padding:'4px'}} fontSize={'15px'}>Filter by: {display ? <span style={{fontFamily:'GT Bold'}}>{selectedGenre}</span>:(<span style={{fontFamily:'GT Bold'}}>none</span>)}</Typography></Button>
                        <Button onClick={() => setSelectedGenre("")} variant="contained" style={{backgroundColor:"#2D2D2D", borderRadius:'10px'}}><Typography style={{fontFamily:"GT Regular"}} fontSize={'15px'}>Clear Filter</Typography></Button>
                    </Box>
                    <Box 
                        display={'grid'} 
                        gridTemplateColumns={{xs:'repeat(1, 1fr)', md:'repeat(1, 1fr)'}}
                        gridAutoRows="auto"
                        gap="20px"
                        margin="0 10px"
                    >
                        {filteredStories.map((story,index) => (
                            <Card 
                                key={index}
                                onClick={() => handleStoryRead(story.id)}
                                sx={{
                                    borderRadius: '15px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    height: '300px',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    padding: '10px',
                                    backgroundColor: '#2D2D2D',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.03)',
                                        boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                                    },
                                    '@media (max-width:600px)': {
                                        height: '400px',
                                    },
                                }}
                            >

                                <CardMedia
                                    component={'img'}
                                    image={story.image}
                                    alt="1"
                                    sx={{ borderRadius: '12px', objectFit: 'cover',}}
                                    

                                >
                                    
                                </CardMedia>
                                <CardContent>
                                    <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} height={'285px'}>
                                        <Box>
                                            <Typography style={{fontFamily:'GT Bold', color:'white'}} textAlign={'left'} fontSize={'35px'}>{story.title}</Typography>
                                            <Typography style={{fontFamily:'GT Regular', color:'white'}} textAlign={'left'} fontSize={'20px'}>{story.contentparagraph1}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography style={{fontFamily:'GT Regular', color:'white'}} textAlign={'left'} fontSize={'16px'} display={'flex'} justifyContent={'flex-end'}>Author: {story.author}</Typography>
                                            <Typography style={{fontFamily:'GT Regular', color:'white'}} textAlign={'left'} fontSize={'16px'} display={'flex'} justifyContent={'flex-end'}>Date: {story.date}</Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                                
                            </Card>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
     );
}
 
export default Stories;