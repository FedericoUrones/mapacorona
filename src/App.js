import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Sidebar from './Sidebar';
import MapContainer from './MapContainer';

export default function App() {

  const [data, setData] = useState('');

  const getData = async () => {
    const response = await fetch('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest?onlyCountries=true')
    const data = await response.json()
    data.map((item) => {
      item.key = item.countryregion;
    })
    setData(data)
  }

  useEffect(() => {
    if (!data) {
        getData();
    }
  }, []);

  if (!data) {
    return (<div>Inicializando componentes...</div>);
  } else {
    return (
      <div className="container">
        <Header />
        <div className="row">
          <div className="col-4">
            <Sidebar />
          </div>
          <div className="map-container col-8">
            <MapContainer countriesinfo={data}/>
          </div>
        </div>
      </div>
    );
  }
}