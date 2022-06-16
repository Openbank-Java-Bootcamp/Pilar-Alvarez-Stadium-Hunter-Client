import React, { Component, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

const StadiumMarker = ({ text }) => (
  <div className="marker">
    <p className="name-st">
      <b>{text}</b>
    </p>
    <div className="icon-marker">&#9989;</div>
  </div>
);

function MyMap(props) {
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  const newCenter = {
    lat: props.stadium.latitude,
    lng: props.stadium.longitude,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "70vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCAOg4gbzQQw4nQCpO2O1CYejeKaMiO-aM" }}
        defaultCenter={defaultProps.center}
        center={newCenter}
        defaultZoom={defaultProps.zoom}
        zoom={13}
      >
        <StadiumMarker
          lat={props.stadium.latitude}
          lng={props.stadium.longitude}
          text={props.stadium.name}
        />
      </GoogleMapReact>
    </div>
  );
}

export default MyMap;
