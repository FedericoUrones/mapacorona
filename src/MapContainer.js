import React from 'react';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";

export default function MapContainer (props) {
    const state = {
        lat: -38.41,
        lng: -63.61,
        zoom: 4,
        }
    console.log("MapContainer")
    console.log(props)
    if (!props) {
        return (null)
    }

    return (
        <div className="map-frame">  
            <Map center={state} zoom={state.zoom}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {props.countriesinfo.map(item => (
                <Marker
                    key={item.key}
                    position={[
                        item.location.lat,
                        item.location.lng
                    ]}
                    >
                    <Popup>
                        <div>
                        <p> <strong>{item.key}</strong> </p>
                        <p> confirmados: {item.confirmed} </p>
                        <p> muertes: {item.deaths} </p>
                        <p> recuperados: {item.recovered} </p>
                        </div>
                    </Popup>
                    </Marker>
                ))
            }
            </Map>
        </div>
    )
}