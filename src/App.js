import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import {AppBar, TextField, Toolbar, Typography} from "@mui/material";
import AuiList from "./AuiList";
import Spacing from "./Spacing";
import firebase from "firebase/compat";


export default function App() {
    const [rows, setRows] = useState([])
    const [taskName, setTaskName] = useState('')
    const [dateToDo, setDateToDo] = useState('')
    const [extraInfo, setExtraInfo] = useState('')
    const [loading, setLoading] = useState(true)
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const list = () => (
        <Box
            sx={{width: 300}}
            role="presentation"
        >
            <Spacing/> <TextField sx={{ml: 5, mr: 5}} id="outlined-basic" label="Task Name" variant="outlined"
                                  value={taskName}
                                  onChange={e => setTaskName(e.target.value)}/>
            <Spacing/> <TextField sx={{ml: 5, mr: 5}} id="outlined-basic" label="Extra Information" variant="outlined"
                                  value={extraInfo}
                                  onChange={e => setExtraInfo(e.target.value)}/>
            <Spacing/> <TextField
            sx={{ml: 5, mr: 5}}
            label="Date To Do"
            type="date"
            value={dateToDo}
            onChange={e => setDateToDo(e.target.value)}
            InputLabelProps={{
                shrink: true,
            }}
        />
            <Spacing/>
            <Button sx={{ml: 2, mr: 4}} variant="contained"
                    onClick={() => onCreate(taskName, new Date().toLocaleDateString("uk-Uk"), new Date(dateToDo).toLocaleDateString("uk-UK"), extraInfo)}>Create</Button>
            <Button sx={{mr: 2, ml: 4}} variant="contained"
                    onClick={toggleDrawer('left', false)}>Cancel</Button>
        </Box>
    );

    function onCreate(name, dateAdded, dateToDo, extraInfo){
        toggleDrawer('left', false)
        addRow(name, dateAdded, dateToDo, extraInfo)
        setExtraInfo('')
        setTaskName('')
    }

    function addRow(name, dateAdded, dateToDo, extraInfo) {
        setRows([...rows, {name, dateAdded, dateToDo, extraInfo}])
    }

    function storeEntry(user) {
        if (user != null) {
            firebase.database().ref('usernames/' + user + '/entries').set(rows);
        }
    }

    function readEntrys(user) {
        firebase.database().ref('usernames/' + user + '/entries').on('value', (snap) => {
            if (snap.val()) {
                setRows(snap.val())
            }
            setLoading(false)
        })
    }

    useEffect(() => {
        rows.splice(0, 1)

        readEntrys("administrator")
    }, [])

    useEffect(() => {
        console.log(rows)
        if (!loading)
            storeEntry("administrator")
    }, [rows])

    function removeAll(user) {
        let newArray = []
        setRows(newArray)

        if (user != null) {
            firebase.database().ref('usernames/' + user + '/entries').set(newArray);
        }
    }

    return (
        <div>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Button
                            color="inherit"
                            variant="outlined"
                            sx={{mr: 100}}
                            onClick={toggleDrawer('left', true)}
                        >Create</Button>
                        <Typography variant="h4" component="div" sx={{flexGrow: 1}}>
                            AUI
                        </Typography>
                        <Button sx={{color: "#FF0000"}}>A D M I N I S T R A T O R</Button>
                    </Toolbar>
                </AppBar>
                <AuiList rows={rows} loading={loading}/>
            </Box>
            <Drawer
                anchor={'left'}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
            >
                {list('left')}
            </Drawer>
        </div>
    );
}