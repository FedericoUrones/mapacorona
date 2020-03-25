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
            confirmed: firstItemTimeseries[key].confirmed,
            deaths: firstItemTimeseries[key].deaths,
            recovered: firstItemTimeseries[key].recovered
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
        width: 300,
        height: 300,
        mark: 'line',
        encoding: {
          x: { field: 'date', type: 'temporal' },
          y: { field: 'confirmed', type: 'quantitative' },
        },
        data: { name: 'items' }, // note: vega-lite data attribute is a plain object instead of an array
      }

    if (!data) {
        return (<div>Buscando datos de Tendencia...</div>);
    }
    return (
        <VegaLite spec={spec} data={data} />
    )
}