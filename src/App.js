import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";


export default function App() {

  const [data, setData] = useState('');

  const getData = async () => {
    const response = await fetch('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest?onlyCountries=true')
    const data = await response.json()
    data.map((item) => {
      item.key = (item.provincestate)? item.countryregion + "-" + item.provincestate : item.countryregion;
    })
    setData(data)
  }

  useEffect(() => {
    if (!data) {
        getData();
    }
  }, []);

  const state = {
    lat: -38.41,
    lng: -63.61,
    zoom: 4,
  }

  if (!data) {
    return (<div>Inicializando componentes...</div>);
  } else {
    console.log(data);
    return (
      <Map center={state} zoom={state.zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {data.map(item => (
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
    );
  }
}