import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import axios from 'axios'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';



class Form extends React.Component {

    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    state = {
        appleQty: '',
        orangeQty: '0',
        row: []
    };




    handleSubmit = (props) => {
        this.setState({ open: true });
        console.log("SUCCESSSSSSS")
        debugger;
        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/api/v1.0/addOrder',
            data: this.state.row
        });
        debugger;

    };


    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;

        let id = 0;
        function createData(category, name, price, servings, qty) {
          id += 1;
          return { id, category, name, price, servings, qty };
        }
        
        const rows = [
            createData('Fruit', 'Apples', 1.18, 3, 1),
            createData('Fruit', 'Oranges', .83, 2, 2),
            createData('Fruit', 'Bananas', .45, 3, 0),
            createData('Fruit', 'Blackberries', 5.18, 3, 0),
            createData('Fruit', 'Blueberries', 3.91, 3, 0),
            createData('Vegetables', 'Broccoli', 1.84,3, 1),
            createData('Vegetables', 'Celery', 2.25, 3,0),
            createData('Vegetables', 'Carrots', 1.40, 3, 0),
            createData('Vegetables', 'Lettuce', 1.95, 3,5),
            createData('Vegetables', 'Spinach', 3.92, 3,0),
            createData('Fruit', 'Grapefruit', .66,3, 0),
            createData('Fruit', 'Mangoes', 1.00, 3,3),
            createData('Fruit', 'Honeydew', .55, 3,0),
        ];


        return (
            <div>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        Apple
                </Grid>
                    <Grid item>
                        $1.50
                </Grid>
                    <Grid item>
                        <TextField id="appleQty" type="number" value={this.state.appleQty} onChange={this.handleChange('appleQty')} />
                    </Grid>
                </Grid>

                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        Orange
                </Grid>
                    <Grid item>
                        $2.00
                </Grid>
                    <Grid item>
                        <TextField id="appleQty" type="number" value={this.state.orangeQty} onChange={this.handleChange('orangeQty')} />
                    </Grid>
                </Grid>

                <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                    Submit
                </Button>

                        <Paper >
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Category</TableCell>
                                        <TableCell numeric>Name</TableCell>
                                        <TableCell numeric>Price ($)</TableCell>
                                        <TableCell numeric>Servings </TableCell>
                                        <TableCell numeric>Qty</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map(row => {
                                        return (
                                            <TableRow key={row.id}>
                                                <TableCell component="th" scope="row">
                                                    {row.category}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell numeric>{row.price}</TableCell>
                                                <TableCell numeric>{row.servings}</TableCell>
                                                <TableCell numeric><TextField defaultValue={row.qty} onChange={this.handleChange(row.qty)}></TextField></TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Paper>


            </div>
        );
    }
}





export default Form;