import Box from "@mui/material/Box";
import {AppBar, TextField, Toolbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {NavLink} from "react-router-dom";
import AuiList from "./AuiList";
import Drawer from "@mui/material/Drawer";
import * as React from "react";
import Spacing from "./Spacing";
import {useState} from "react";

export default function Login() {
    const [token, setToken] = useState('')

    function generateNewToken(n){
        let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let token = '';
        for(let i = 0; i < n; i++) {
            token += chars[Math.floor(Math.random() * chars.length)];
        }
        setToken(token)
    }

    return (
        <div>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h4" component="div" sx={{flexGrow: 1}}>
                            AUI
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Spacing/> <TextField sx={{ml: 5, mr: 5}} id="outlined-basic" label="Login Token" variant="outlined"/>
                <NavLink to="/"><Button variant="contained" onClick={()=> localStorage.setItem('token', token)}>Login</Button></NavLink>
                <Button variant="contained" sx={{color: "#FF0000"}} onClick={() => generateNewToken(60)}>Generate Account Token</Button>
                <TextField
                    sx={{width: '600px'}}
                    value={token}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Box>
        </div>
    );

}