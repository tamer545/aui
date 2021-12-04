import logo from './logo.svg';
import './App.css';
import {
    Button,
    Container,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow,
    TextField
} from "@mui/material";
import {useState} from "react";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import DateAdapter from '@mui/lab/AdapterDateFns';

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

function addRow(name, dateAdded, dateToDo) {
    rows.push({name, dateAdded, dateToDo})
}

let rows = []

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
                        {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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

function App() {
    const [taskName, setTaskName] = useState('')
    const [dateToDo, setDateToDo] = useState('')
    return (
        <Container>
            <h1>AUI</h1>
            <br/><br/>
            <h4>Tasks</h4>
            <br/><br/>
            <TextField id="outlined-basic" label="Task Name" variant="outlined" value={taskName}
                       onChange={e => setTaskName(e.target.value)}/>
            <TextField id="outlined-basic" label="Task Name" variant="outlined" value={dateToDo}
                       onChange={e => setDateToDo(e.target.value)}/>
            <Button variant="contained"
                    onClick={() => addRow(taskName, new Date().toLocaleDateString("uk-Uk"), '93')}>Add</Button>
            <br/><br/>
            <TableComponent/>
        </Container>
    );
}

export default App;
