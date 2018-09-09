import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import axios from 'axios'

const style = {
  button: {
    background: '#00578e',
    borderRadius: 3,
    color: 'white',
    width: '30%',
    marginTop: '30px'
  },

  registerText: {
    color: 'primary',
    fontFamily: 'Roboto'
  },
  paper: {
    textAlign: 'center',
    paddingBottom: '20px',
  },
  title: {
    paddingTop: '20px',
    fontFamily: 'Roboto'
  }
};

export class SignInPageModal extends React.Component {

  componentDidMount() {
   this.handleOpen();
  }
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  
  clickedLogin() {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/api/v1.0/login',
      data: {"username":"bigboi5", 
              "password":"123"}
  })
  .then(function(response) {
    console.log(response)
    console.log("HI")

  })
  .catch(function(error) {
    console.log(error)
  });

  }


  

  handleChange(name) {
    return event => {
      const { currentTarget } = event;
      this.setState({ [name]: currentTarget.value });
    };
  }

  clickedRegister() {
    this.setRegisterState
  }



  render() {
    const { username, password, first, last } = this.state;

    return (
            <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.open}
      >


        <main
          className="SignInPageModal"
          style={{
            padding: '0 20px',
          }}
        >
          <Paper style={style.paper}>
            <h2 style={style.title}>Sign In</h2>
            <form>


              <div>
                <TextField
                  id="username"
                  label="Username"
                  className="textField"
                  value={username}
                  onChange={this.handleChange('username')}
                  margin="normal"
                />
              </div>

              <div>
                <TextField
                  id="password"
                  label="Password"
                  className="textField"
                  value={password}
                  onChange={this.handleChange('password')}
                  margin="normal"
                  type="password"
                />


              </div>

              <div>
                {/* <input type='submit' value='Sign In' /> */}
                <Button size="large" style={style.button} onClick={() => {this.clickedLogin(); this.handleClose()}}>
                  LOGIN
              </Button>
              
              <Button size="large" style={style.button} onClick={this.clickedRegister}>
                  REGISTER
              </Button>
              </div>
            </form>
          </Paper>
        </main>
      </Modal>
    )
  }
}

export default SignInPageModal;



