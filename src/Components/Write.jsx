import { AddOutlined, DeleteForever, GitHub, LightbulbOutlined, LinkedIn } from "@mui/icons-material";
import { Alert, Button, FormControl, IconButton, MenuItem, Select, Snackbar, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

function Write (){

    const[formData, setFormData] = useState({
        title:"",
        photo:"",
        author:"",
        category:"",
        date: "",
        paragraphs:[]
    })

    const [storyData, setStoryData] = useState([{paragraph:""}])
    const [successMessage, setSuccesMessage] = useState("")
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [filePreview, setFilePreview] = useState("");
    const fileUploadRef = useRef();
    const navigate = useNavigate();

    function handleChange(event){
        const {name,value} = event.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]:value
        }))

    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
          setFilePreview(URL.createObjectURL(file)); // Show preview
        }

        console.log(file)

        setFormData(prevFormData => ({
            ...prevFormData,
            photo:file
        }))
      };


    function handleParagraphs(event,index){
        const values = [...storyData]
        values[index].paragraph = event.target.value;
        setStoryData(values);

        setFormData(prevFormData => ({
            ...prevFormData,
            paragraphs:storyData
        }))
    }

    function DeleteParagraph(index){
        const newParagraphs = [...storyData];
        newParagraphs.splice(index, 1);
        setStoryData(newParagraphs);
    }

    function handleNewParagraphInputField(){
        setStoryData([...storyData, {paragraph:""}])
    }

    function handleSubmit(event){
        event.preventDefault()

        if(!formData.title || !formData.author || !formData.paragraphs || !formData.date){
            setOpenSnackBar(true)
            setSuccesMessage("Please fill all the fields!")
        }

        const formDataToSend = new FormData()

        formDataToSend.append("title", formData.title)
        formDataToSend.append("author", formData.author)
        formDataToSend.append("date", formData.date)
        formDataToSend.append("category", formData.category)
        formDataToSend.append("photo", formData.photo)
        formDataToSend.append("paragraphs", JSON.stringify([...formData.paragraphs]))
        
        console.log(formData)

        fetch('https://blogged-db.onrender.com/stories', {
            method:'POST',
            body:formDataToSend
        })
        .then(response => {
            if(!response.ok){
                throw new Error("Network response is not ok")
            }
            return response.json()
        })
        .then((data) => {

            setFormData({
                title:"",
                photo:"",
                author:"",
                date: "",
                paragraphs:[]
            })

            setStoryData([{paragraph:""}])
            setOpenSnackBar(true)
            setSuccesMessage("Story posted successfully")
        })
        .catch((error) => {
            console.error('Error with stock update operations:', error)
            setOpenSnackBar(true)
            setSuccesMessage("Please fill all the fields!")
        })

    }

    function handleCloseSnackBar(event, reason){
        if(reason === 'clickaway') return;
        setOpenSnackBar(false)
    }

    function handleImageUpload(event){
        event.preventDefault();

        fileUploadRef.current.click();
    }

    function handleStories(){
        navigate('/stories')
    }

    const storyCategories = [
    "Adventure",
    "Business",
    "Entertainment",
    "Sports",
    "Food",
    "Nature",
    "Self-Help",
    "Health",
    "Technology",
    "Mystery",
    "Fantasy",
    "Science Fiction",
    "Horror",
    "Romance",
    "Thriller",
    "Historical Fiction",
    "Comedy",
    "Drama",
    "Crime",
    "Mythology",
    "Dystopian",
    "Supernatural",
    "Fairy Tale",
    "Action",
    "Western",
    "Steampunk",
    "Cyberpunk",
    "Paranormal"
    ];


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
                            <Button onClick={handleStories} sx={{color:'black', backgroundColor:'white', fontFamily:'GT Bold', fontSize:'18px'}} >
                                Stories
                            </Button>
                        </Box>
                    </Box>
            </Box>

            <Box padding={'90px'}>
                <Snackbar
                    open={openSnackBar}
                    autoHideDuration={6000}
                    anchorOrigin={{horizontal:'center', vertical:'bottom'}}
                    onClose={handleCloseSnackBar}
                >
                    <Alert onClose={handleCloseSnackBar} severity={successMessage.startsWith("Please") ? "error":"success"}>
                        {successMessage}
                    </Alert>
                </Snackbar>

                <Typography fontFamily={"GT Bold"} fontSize={'40px'} textAlign={'center'} padding={'30px'}>WRITE NEW STORY</Typography>

                <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', justifyContent:'center',border:'2px dashed #ddd', padding:'30px', borderRadius:'15px'}}>
                    <TextField
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Story Title..."
                        InputProps={{ style: { color: 'white', fontSize:'40px', textAlign:'center' } }}
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
                            mb:'20px'
                          }}

                    />

                    <Box>
                        {/* Drag and Drop Area */}
                        <Box 
                            onClick={handleImageUpload}
                            // onDragOver={handleDragOver}
                            // onDrop={handleDrop}
                            // onDragLeave={handleDragLeave}
                        >
                            <Box 
                                border={"2px dashed #ddd"} 
                                width={'600px'} 
                                height={'300px'} 
                                borderRadius={'15px'} 
                                display={'flex'} 
                                justifyContent={'center'} 
                                flexDirection={'column'} 
                                alignItems={'center'}
                                position="relative"
                                padding={'20px'}
                                margin={'auto'}
                                sx={{
                                    transition:"transform 0.3s ease-in-out",
                                    ":hover":{
                                        transform:'scale(1.03)',
                                    }
                                }}
                            >
                                {/* Show uploaded image if available */}
                                {filePreview ? (
                                    <img 
                                        src={filePreview}
                                        alt="Uploaded Preview"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                            borderRadius: "15px"
                                        }}
                                    />
                                    ) : (
                                            <>
                                                <Box display={'flex'} justifyContent={'center'}>
                                                <img 
                                                    src="upload.png"
                                                    alt="Photo Upload"
                                                    style={{width:"120px", height:"auto"}}
                                                />
                                                </Box>

                                                <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
                                                    <Typography fontFamily={'GT Medium'} fontSize={'25px'}>
                                                        Drop your image here or browse
                                                    </Typography>
                                                    <Typography fontFamily={'GT Light'}>
                                                        Supports: PNG, JPG, JPEG, WEBP
                                                    </Typography>
                                                </Box>
                                            </>
                                )}
                            </Box>

                            {filePreview && <Button onClick={() => handleImageUpload()} sx={{fontFamily:'GT Bold', backgroundColor:'white', color:'orange', ml:'520px', mt:'20px'}}>Change Photo</Button>}
                        </Box>

                        <input 
                            type="file"
                            name="photo"
                            accept="image/*"
                            hidden
                            onChange={handleFileChange}
                            ref={fileUploadRef}
                        />
                    </Box>

                    <Typography fontFamily="GT Bold" fontSize="30px">Author</Typography>
                    <TextField
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        placeholder="Author"
                        InputProps={{ style: { color: 'white' } }}
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
                            mb:'20px',
                            mt:'20px'
                          }}

                    />

                    <Typography fontFamily="GT Bold" fontSize="30px">Date</Typography>
                    <TextField
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        InputProps={{ style: { color: 'white' } }}
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
                            mb:'20px',
                            mt:'20px'
                          }}

                    />

                    <FormControl fullWidth sx={{ mb: '20px', mt: '20px' }}>
                        <Typography fontFamily="GT Bold" fontSize="30px">
                            Category
                        </Typography>
                        <Select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            displayEmpty
                            sx={{
                            color: 'white', // Ensures selected text is white
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
                        >
                            {storyCategories.map((category, index) => (
                            <MenuItem key={index} value={category} sx={{ fontFamily: 'GT Light', color: 'black' }}>
                                {category}
                            </MenuItem>
                            ))}
                        </Select>
                    </FormControl>


                    <Box>
                        <Typography fontFamily={"GT Bold"} fontSize={'30px'} mb={'10px'}>Body</Typography>

                        {storyData.map((story,index) => (
                            <Box key={index} display={'flex'} alignItems={'center'} gap={'20px'}>
                                <TextField
                                    type="text"
                                    name="paragraph"
                                    value={story.paragraph}
                                    onChange={(e) => handleParagraphs(e, index)}
                                    placeholder="Paragraph"
                                    fullWidth
                                    minRows={4}
                                    maxRows={30}
                                    multiline
                                    InputProps={{ style: { color: 'white' } }}
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
                                        mb:'20px'
                                    }}

                                />

                                <IconButton onClick={() => DeleteParagraph(index)}>
                                    <DeleteForever sx={{fontSize:'30px', color:'#ddd', border:'2px solid red', padding:'10px', borderRadius:"8px", ":hover":{backgroundColor:'red', color:'white'}}}/>
                                </IconButton>
                            </Box>
                        ))}
                                <Button onClick={handleNewParagraphInputField} variant="contained" style={{backgroundColor:'grey', color:'white', marginTop:'20px', marginBottom:"20px", display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <AddOutlined sx={{color:'white', fontSize:'19px'}}/>
                                    <Typography fontFamily={"GT Bold"} fontSize={'12px'}>Add new Paragraph</Typography>
                                </Button>
                    </Box>

                    <Button type="submit" variant="contained" sx={{fontFamily:'GT Bold',  backgroundColor:"#6D54B5"}}>POST STORY</Button>
                    
                </form>


            </Box>
        </Box>
     );
}
 
export default Write;