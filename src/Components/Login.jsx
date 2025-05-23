import { LightbulbOutlined } from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Alert, Button, IconButton, InputAdornment, Snackbar, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router";

function Login ({onLogin}){

    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username:"",
        password:"",
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

        if (!formData.username || !formData.password) {
            setOpenSnackBar(true);
            setSuccessMessage('Please fill in all fields!!');
            return;
        }

        fetch('/login', {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if(!response.ok){
                throw new Error('Failed to Login')
            }
            return response.json()
        })
        .then((userData) => {
            onLogin(userData)
            setOpenSnackBar(true)
            setSuccessMessage('Login Successful')

        })
        .catch((error) => {
            console.error('Failed to login', error)
            setOpenSnackBar(true)
            setSuccessMessage("username/password is incorrect")
        })
    }

    function handleShowPassword(){
        setShowPassword(!showPassword)
    }

    function handleCloseSnackBar(event,reason){
        if(reason === 'clickaway') return ;
        setOpenSnackBar(false)
    }

    function handleRegister (){
        navigate('/register')
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

                <Typography style={{fontFamily:'GT Medium'}} fontSize={'50px'} textAlign={'center'} mt={'80px'}>Welcome Back!</Typography>
                <Typography style={{fontFamily:'GT Regular'}} textAlign={'center'} mb={'40px'}>You don't have an account? <span style={{color:'#837BA2', cursor:'pointer'}} onClick={handleRegister}>Register</span></Typography>

                <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', width:'500px', justifyContent:'center', margin:'auto'}}>

                    <TextField 
                        value={formData.username}
                        onChange={handleChange}
                        type="text"
                        label="Username"
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
                        value={formData.password}
                        name="password"
                        onChange={handleChange}
                        type={showPassword ? 'text':'password'}
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
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{backgroundColor:"#6D54B5"}}
                    >
                        <Typography fontFamily={'GT Regular'} padding={'7px'}>Login</Typography>
                    </Button>
                    
                </form>
            </Box>

            <Snackbar 
              open={openSnackBar}
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
 
export default Login;