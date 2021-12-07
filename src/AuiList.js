import './App.css';
import {
    Button,
    Container, LinearProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Tooltip, Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import PopoverPopupState from "./PopUp";
import firebase from "firebase/compat";

function AuiList() {
    const columns = [
        {id: 'name', label: 'Name', minWidth: 170},
        {id: 'dateAdded', label: 'Date Added', minWidth: 100},
        {
            id: 'dateToDo',
            label: 'Date To Do',
            minWidth: 170,
        },
        {
            id: 'extraInfo',
            label: 'Extra Info',
            minWidth: 170,
        },
    ];

    const [rows, setRows] = useState([{name: '', dateAdded: '', dateToDo: '', extraInfo: ''}])
    const [taskName, setTaskName] = useState('')
    const [dateToDo, setDateToDo] = useState('')
    const [extraInfo, setExtraInfo] = useState('')
    const [infoIndex, setInfoIndex] = useState([])
    const [loading, setLoading] = useState(true)

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

    function removeAll(user) {
        let newArray = []
        setRows(newArray)

        if (user != null) {
            firebase.database().ref('usernames/' + user + '/entries').set(newArray);
        }
    }


    function addRow(name, dateAdded, dateToDo, extraInfo) {
        setRows([...rows, {name, dateAdded, dateToDo, extraInfo}])
    }

    const TableComponent = () => {
        const [page, setPage] = useState(0);
        const [rowsPerPage, setRowsPerPage] = useState(10);

        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
        };

        return (
            <Paper sx={{width: '100%', overflow: 'hidden'}}>
                <TableContainer sx={{maxHeight: 440}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <LinearProgress/>) : (rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1}>
                                        {columns.map((column, index) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            }))}

                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        )
    }

    useEffect(() => {
        rows.splice(0, 1)

        readEntrys("administrator")
    }, [])

    useEffect(() => {
        if (!loading)
            storeEntry("administrator")
    }, [rows])

    return (
        <Container>
            <h1>AUI</h1>
            <br/><br/>
            <h4>Tasks</h4>
            <br/><br/>
            <TextField id="outlined-basic" label="Task Name" variant="outlined" value={taskName}
                       onChange={e => setTaskName(e.target.value)}/>
            <TextField id="outlined-basic" label="Extra Information" variant="outlined" value={extraInfo}
                       onChange={e => setExtraInfo(e.target.value)}/>
            <TextField
                label="Date To Do"
                type="date"
                value={dateToDo}
                onChange={e => setDateToDo(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <br/><br/>
            <Button variant="contained"
                    onClick={() => addRow(taskName, new Date().toLocaleDateString("uk-Uk"), new Date(dateToDo).toLocaleDateString("uk-UK"), extraInfo)}>Add</Button>
            <br/><br/><br/><br/><br/>
            <TableComponent/>
            <br/><br/>
            <Button variant="contained"
                    onClick={() => removeAll("administrator")}>Clear List</Button>

        </Container>
    );
}

export default AuiList;
