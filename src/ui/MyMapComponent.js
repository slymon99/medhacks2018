import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import SignInPageModal from './SignInPageModal'

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 39.286897, lng: -76.641673 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 39.286897, lng: -76.641673 }} onClick={props.onMarkerClick} />}
  </GoogleMap>
);

class position extends React.Component {
  state = {
    isMarkerShown: false,
    data: [
      createData('39.288912', '-76.631203', "Community Engagement Center"),
      createData('39.291171', '-76.640741', "Franklin Square School"),
      createData('39.287814', '-76.649725', "Central Baptist Church"),
      createData('39.297627', '-76.665858', "Alexander Hamilton Elementary School"),
      createData('39.29968', '-76.630398', "Furman L Templeton Elementary School"),
    ],
    page: 0,
    rowsPerPage: 10,
  };

// class MyFancyComponent extends React.PureComponent {
//   state = {
//     isMarkerShown: false,
//   }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
    console.log("hiiiii")
  }

  render() {
    return (
      <div>
        <SignInPageModal />
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
      </div>
    )
  }
}

export default MyFancyComponent;
