import React from 'react';
import { useState, useEffect } from 'react';
import { VegaLite } from 'react-vega';

export default function Trend() {

    const url = "https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/timeseries?iso2=AR"
    
    const [data, setData] = useState('');

    const getData = async () => {
      const response = await fetch(url)
      const dataArray = await response.json()
      const formattedData = []
      const firstItemTimeseries = dataArray[0].timeseries
      const keys = Object.keys(firstItemTimeseries)
      keys.map(key => {
        formattedData.push({
            date: new Date(key),
            type: 'Confirmados',
            quantity: firstItemTimeseries[key].confirmed
        })
        formattedData.push({
            date: new Date(key),
            type: 'Muertes',
            quantity: firstItemTimeseries[key].deaths
        })
        formattedData.push({
            date: new Date(key),
            type: 'Recuperados',
            quantity: firstItemTimeseries[key].recovered
        })
      })
      console.log(formattedData)
      setData({items: formattedData})
    }
  
    useEffect(() => {
      if (!data) {
          getData();
      }
    }, []);

    const spec = {
        width: 200,
        height: 200,
        mark: {
            type: 'line',
            tooltip: true
        },
        encoding: {
          x: { field: 'date', type: 'temporal', title: 'Fecha' },
          y: { field: 'quantity', type: 'quantitative', title: 'Cantidad'},
          color: {field: 'type', type: 'nominal'}
        },
        data: { name: 'items' }
      }

    if (!data) {
        return (<div>Buscando datos de Tendencia...</div>);
    }
    return (
        <div>
            <h4>Tendencia en Argentina</h4>
            <VegaLite spec={spec} data={data} />
        </div>
    )
}