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
        orangeQty: '',
    };




    handleSubmit = () => {
        this.setState({ open: true });
        console.log("SUCCESSSSSSS")
        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/api/v1.0/addOrder',
            data: {
                "contents":
                    { "Oranges": 3 },
                "customerID": 1,
                "locationID": 4253235
            }
        });
    };


    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;

        let id = 0;
        function createData(name, calories, fat, carbs, protein) {
          id += 1;
          return { id, name, calories, fat, carbs, protein };
        }
        
        const rows = [
          createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
          createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
          createData('Eclair', 262, 16.0, 24, 6.0),
          createData('Cupcake', 305, 3.7, 67, 4.3),
          createData('Gingerbread', 356, 16.0, 49, 3.9),
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
                                        <TableCell>Dessert (100g serving)</TableCell>
                                        <TableCell numeric>Calories</TableCell>
                                        <TableCell numeric>Fat (g)</TableCell>
                                        <TableCell numeric>Carbs (g)</TableCell>
                                        <TableCell numeric>Protein (g)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map(row => {
                                        return (
                                            <TableRow key={row.id}>
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell numeric>{row.calories}</TableCell>
                                                <TableCell numeric>{row.fat}</TableCell>
                                                <TableCell numeric>{row.carbs}</TableCell>
                                                <TableCell numeric><TextField defaultValue={row.protein}></TextField></TableCell>
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