import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';


class App extends React.Component {
    render() {
        return (
            <div>My Flask React App!

                <Button variant="contained" color="primary">
                    Hello World
                </Button>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
