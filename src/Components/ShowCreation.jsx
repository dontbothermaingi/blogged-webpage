import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

function StoryCreation (){

    const token = localStorage.getItem('access_token')
    const [openSnackBar, setOPenSnackBar] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [formData, setFormData] = useState({
        header:"",
        body:"",
    })

    function handleChange (event){
        const{name,value} = event.target

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]:value
        }))
    }

    function handleSubmit(event){
        event.preventDefault()

        fetch("/story", {
            method:"POST",
            headers:{
                "Authorization":`Bearer ${token}`,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(formData),
            credentials:'include'
        })
        .then(response => {
            if(!response.ok){
                throw new Error ('Failed to post story')
            }
            return response.json()
        })
        .then((data) =>{
            console.log(`${data.header} posted successfylly`)
            setOPenSnackBar(true)
            setSuccessMessage('Story posted successfully')
        })
        .catch((error) => {
            console.error('Failed to post story', error)
            setOPenSnackBar(true)
            setSuccessMessage('Failed to post story')
        })
    }

    function handleCloseSnackBar(event, reason){
        if(reason === 'clickaway') return;
        setOPenSnackBar(false)
    }

    return ( 
        <Box>
            <form onSubmit={handleSubmit}>
                <TextField 
                   value={formData.header}
                   name="header"
                   onChange={handleChange}
                   type="text"
                   variant="outlined"
                   label="Story Header"
                   sx={{mb:'20px'}}
                />
                
                <TextField 
                  value={formData.body}
                  name="body"
                  onChange={handleChange}
                  type="text"
                  variant="outlined"
                  label='Body'
                  sx={{mb:"20px", minWidth:410}}
                  fullWidth
                  multiline
                  minRows={4}  // Initial number of rows
                  maxRows={20}   // Maximum number of rows

                />

                <Button 
                   type="submit"
                   variant="contained"
                   color="secondary"
                >
                    POST
                </Button>
            </form>

            <Snackbar
               open={openSnackBar}
               onClose={handleCloseSnackBar}
               anchorOrigin={{vertical:"top", horizontal:'center'}}
               autoHideDuration={6000}
            >
                <Alert
                  onClose={handleCloseSnackBar}
                  severity={successMessage.startsWith('Failed') ? 'error':'success'}
                  sx={{ width: '100%' }}

                >
                    {successMessage}
                </Alert>
            </Snackbar>

        </Box>
     );
}
 
export default StoryCreation;