import React from 'react';
import ReactDOM from 'react-dom';
import MyFancyComponent from './ui/MyMapComponent';
import SimpleModal from './ui/SimpleModal';
class App extends React.Component {


      

    render(props) {
        return (
            <div>My Flask React App!
              
              <MyFancyComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                                />
                <SimpleModal classes="noidea"/>

                
                
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));