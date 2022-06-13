import React, { Component, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import MyMarker from "./MyMarker";

function MultiMaps(props) {
  const defaultProps = {
    center: {
      lat: 44.321373,
      lng: 6.673402,
    },
    zoom: 4,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "80vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCAOg4gbzQQw4nQCpO2O1CYejeKaMiO-aM" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {props.huntedStadiums.map((stad) => {
          return (
            <MyMarker key={stad.id} lat={stad.latitude} lng={stad.longitude} />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}

export default MultiMaps;
