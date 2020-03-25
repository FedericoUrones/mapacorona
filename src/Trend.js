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
      let confirmed = 0, deaths = 0, recovered = 0;
      const firstMarch = new Date(2020, 2, 1)
      keys.map(key => {
        const dateItem = new Date(key)
        if (dateItem >= firstMarch) {
            confirmed = firstItemTimeseries[key].confirmed - confirmed
            formattedData.push({
                date: dateItem,
                type: 'Confirmados',
                quantity: confirmed
            })
            deaths = firstItemTimeseries[key].deaths - deaths
            formattedData.push({
                date: dateItem,
                type: 'Muertes',
                quantity: deaths
            })
            recovered = firstItemTimeseries[key].recovered - recovered
            formattedData.push({
                date: dateItem,
                type: 'Recuperados',
                quantity: recovered
            })
        }
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
        data: { name: 'items' },
        actions: false
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