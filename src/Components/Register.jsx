import { LightbulbOutlined } from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Alert, Button, IconButton, InputAdornment, Snackbar, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router";

function Register(){

    const [openSnackbar, setOPenSnackbar] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [showPassowrd, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const [formData,setFormData] = useState({
        first_name:"",
        last_name:"",
        username:"",
        email:"",
        password:"",
        confirm_password:"",

    })

    function handleChange(event){
        const {name,value} = event.target

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]:value
        }))
    }

    function handleSubmit(event){
        event.preventDefault()

        if (formData.password !== formData.confirm_password) {
            setOPenSnackbar(true);
            setSuccessMessage('Passwords do not match');
            return;
        }

        fetch("/register-api",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if(!response.ok){
                throw new Error("Failed to register user")
            }
            return response.json()
        })
        .then((data)=>{
            setOPenSnackbar(true)
            setSuccessMessage("Registration Successfull")
            console.log(`${data.username} registered successfully`)
        })
        .catch((error)=>{
            console.error("Failed to register", error)
            setOPenSnackbar(true)
            setSuccessMessage('Failed to Register')
        })
    }

    function handleShowPassword(){
        setShowPassword(!showPassowrd)
    }

    function handleCloseSnackBar(reason, event){
        if(reason === 'clickaway') return;
        setOPenSnackbar(false)
    }

    function handleLogin(){
      navigate('/login')
    }

    function handleHome(){
      navigate('/')
    }

    return ( 
        <Box 
           display={'flex'} 
           flexDirection={'row'} 
           gap={'30px'} 
           justifyContent={'space-between'} 
           sx={{backgroundColor:'#171517'}} 
           height={'90vh'}
        >

            <Box flex={1}>
                <img 
                   src="/1.jpeg"
                   alt="picture"
                   style={{width:'100%', height:'100%', borderRadius:'20px'}}
                />
            </Box>

            <Box flex={1}>

                <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
                        <IconButton sx={{color:'white'}}>
                            <LightbulbOutlined sx={{fontSize:'33px'}}/>
                        </IconButton>
                        <Typography style={{fontFamily:'GT Bold', cursor:'pointer'}} fontSize={'35px'} onClick={handleHome} >Blogged</Typography>
                </Box>

                <Typography style={{fontFamily:'GT Medium'}} fontSize={'50px'} textAlign={'center'} mt={'80px'}> Create an cccount</Typography>
                <Typography style={{fontFamily:'GT Regular'}} textAlign={'center'} mb={'40px'}>Already have an account? <span style={{color:'#837BA2', cursor:'pointer'}} onClick={handleLogin}>Log in</span></Typography>

                <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', width:'500px', justifyContent:'center', margin:'auto'}}>

                    <Box display={'flex'} gap={'20px'} justifyContent={'space-between'}>
                    <TextField 
                        value={formData.first_name}
                        onChange={handleChange}
                        type="text"
                        label="First Name"
                        variant="outlined"
                        InputProps={{
                            style: {
                              color: 'white', // Text color inside the input
                              backgroundColor:'#3C364C'
                            },
                          }}
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
                        name="first_name"
                        color="white"
                    />

                    <TextField 
                        value={formData.last_name}
                        name="last_name"
                        onChange={handleChange}
                        type="text"
                        label="Last Name"
                        variant="outlined"
                        InputProps={{
                            style: {
                              color: 'white', // Text color inside the input
                              backgroundColor:'#3C364C'
                            },
                          }}
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
                    </Box>

                    <TextField 
                        value={formData.username}
                        name="username"
                        onChange={handleChange}
                        type="text"
                        label="Username"
                        InputProps={{
                            style: {
                              color: 'white', // Text color inside the input
                              backgroundColor:'#3C364C'
                            },
                          }}
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
                        variant="outlined"
                    />

                    <TextField 
                        value={formData.email}
                        name="email"
                        onChange={handleChange}
                        type="text"
                        label="Email"
                        InputProps={{
                            style: {
                              color: 'white', // Text color inside the input
                              backgroundColor:'#3C364C'
                            },
                          }}
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
                        variant="outlined"
                    />
                
                    <TextField 
                        value={formData.password}
                        name="password"
                        onChange={handleChange}
                        type={showPassowrd ? 'text':'password'}
                        label="Password"
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
                        variant="outlined"
                        InputProps={{
                            style: {
                                color: 'white', // Text color inside the input
                                backgroundColor:'#3C364C'
                              },
                            endAdornment:(
                                <InputAdornment position="end">
                                    <IconButton
                                    onClick={handleShowPassword}
                                    edge={'end'}
                                    sx={{color:'grey'}}
                                    >
                                        {showPassowrd ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    <TextField 
                        value={formData.confirm_password}
                        name="confirm_password"
                        onChange={handleChange}
                        type={showPassowrd ? 'text':'password'}
                        label="Confirm Passowrd"
                        InputProps={{
                            style: {
                              color: 'white', // Text color inside the input
                              backgroundColor:'#3C364C'
                            },
                          }}
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
                        variant="outlined"
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{backgroundColor:"#6D54B5"}}
                    >
                        <Typography fontFamily={'GT Regular'} padding={'7px'}>Create account</Typography>
                    </Button>
                    
                </form>
            </Box>

            <Snackbar 
              open={openSnackbar}
              onClose={handleCloseSnackBar}
              autoHideDuration={6000}
              anchorOrigin={{vertical:'top', horizontal:'center'}}
            >
                <Alert
                onClose={handleCloseSnackBar}
                  severity={successMessage.startsWith('Failed') ? 'error': 'success'}
                  sx={{ width: '100%' }}
                >
                    {successMessage}
                </Alert>
            </Snackbar>

        </Box>
     );
}
 
export default Register;