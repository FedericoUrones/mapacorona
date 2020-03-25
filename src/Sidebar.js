import React from 'react';
import { useState, useEffect } from 'react';
import Trend from './Trend';

export default function Sidebar () {
    const briefUrl = "https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/brief"
    const argBriefUrl = "https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest?iso2=AR"
    
    const [data, setData] = useState('');

    const getData = async () => {
      const responseBrief = await fetch(briefUrl)
      const dataBrief = await responseBrief.json()
      const responseAr = await fetch(argBriefUrl)
      const dataAr = await responseAr.json()      
      console.log(dataAr)
      const response = {
          brief: dataBrief,
          argBrief: dataAr[0]
      }
      setData(response)
    }
  
    useEffect(() => {
      if (!data) {
          getData();
      }
    }, []);

    if (!data) {
        return (<div>Buscando datos...</div>);
    }

    return (
        <div>
            <h4>A nivel mundial</h4>
            <ul>
                <li><span>Muertes confirmadas: {data.brief.deaths}</span></li>
                <li><span>Casos confirmados: {data.brief.confirmed}</span></li>
                <li><span>Casos recuperados: {data.brief.recovered}</span></li>
            </ul>
            <h4>Argentina</h4>
            <ul>
                <li><span>Muertes confirmadas: {data.argBrief.deaths}</span></li>
                <li><span>Casos confirmados: {data.argBrief.confirmed}</span></li>
                <li><span>Casos recuperados: {data.argBrief.recovered}</span></li>
            </ul>            
            <Trend />
        </div>
    )
}