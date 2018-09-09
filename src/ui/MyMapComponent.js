import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import SignInPageModal from './SignInPageModal'
import SimpleModal from './SimpleModal';

const MyMapComponent = compose(
 withProps({
   googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
   loadingElement: <div style={{ height: `100%` }} />,
   containerElement: <div style={{ height: `650px` }} />,
   mapElement: <div style={{ height: `100%` }} />,
 }),
 withScriptjs,
 withGoogleMap
)((props) =>
 <GoogleMap
   defaultZoom={15}
   defaultCenter={{ lat:39.295281, lng:-76.645619 }}
 >
   {props.isMarkerShown && <Marker position={{ lat: 39.288912, lng: -76.631203 }} onClick={props.onMarkerClick} />}
   {props.isMarkerShown && <Marker position={{ lat: 39.291171, lng: -76.640741 }} onClick={props.onMarkerClick} />}
   {props.isMarkerShown && <Marker position={{ lat: 39.287814, lng: -76.649725 }} onClick={props.onMarkerClick} />}
   {props.isMarkerShown && <Marker position={{ lat: 39.297627, lng: -76.665858 }} onClick={props.onMarkerClick} />}
   {props.isMarkerShown && <Marker position={{ lat: 39.29968, lng: -76.630398 }} onClick={props.onMarkerClick} />}
 </GoogleMap>
);

class MyFancyComponent extends React.PureComponent {
  state = {
    isMarkerShown: true,
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false, open: true })
    this.delayedShowMarker()
    console.log("hiiiii")
  }

  // toggleModal() {
  //   this.setState({
  //   open: this.state.open
  //   });
  //  }
  // // handleOpen = () => {
  // //   this.setState({ open: true });
  // // };
  render() {
    return (
      <div>
        <SignInPageModal />
        <SimpleModal classes = "left" open={this.handleMarkerClick} />
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
      </div>
    )
  }
}

export default MyFancyComponent;