import './App.css';
import {
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Tooltip
} from "@mui/material";
import {useEffect, useState} from "react";
import PopoverPopupState from "./PopUp";

function App() {
    const columns = [
        {id: 'name', label: 'Name', minWidth: 170},
        {id: 'dateAdded', label: 'Date Added', minWidth: 100},
        {
            id: 'dateToDo',
            label: 'Date To Do',
            minWidth: 170,
            align: 'right',
        },
    ];

    const [rows, setRows] = useState([{}])
    const [taskName, setTaskName] = useState('')
    const [dateToDo, setDateToDo] = useState('')
    const [extraInfo, setExtraInfo] = useState('(no info)')
    const [allInfos, setAllInfos] = useState([])

    function addRow(name, dateAdded, dateToDo) {
        setRows([...rows, {name, dateAdded, dateToDo}])
        setAllInfos([...allInfos, extraInfo])
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
                            {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => {
                                return (
                                    <PopoverPopupState>
                                        <Tooltip title={allInfos[idx]}>
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
                                        </Tooltip>
                                    </PopoverPopupState>
                                );
                            })}
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
        setAllInfos([...allInfos, ''])
    }, [])

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
            />
            <Button variant="contained"
                    onClick={() => addRow(taskName, new Date().toLocaleDateString("uk-Uk"), new Date(dateToDo).toLocaleDateString("uk-UK"))}>Add</Button>
            <br/><br/>
            <TableComponent/>
        </Container>
    );
}

export default App;
