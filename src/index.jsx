import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import MyMapComponent from './ui/MyMapComponent';

class App extends React.Component {
    render(props) {
        return (
            <div>My Flask React App!
              
              <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                />


                <Button variant="contained" color="primary">
                    Hello World
                </Button>
                
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
