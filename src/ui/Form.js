import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import axios from 'axios'

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
            </div>
        );
    }
}





export default Form;