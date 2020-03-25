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
                <li>Casos recuperados: <span className="text-success">{data.brief.recovered}</span></li>
                <li>Casos confirmados: <span className="text-secondary">{data.brief.confirmed}</span></li>
                <li>Muertes: <span className="text-danger">{data.brief.deaths}</span></li>
            </ul>
            <h4>Argentina</h4>
            <ul>
                <li>Casos recuperados: <span className="text-success">{data.argBrief.recovered}</span></li>
                <li>Casos confirmados: <span className="text-secondary">{data.argBrief.confirmed}</span></li>
                <li>Muertes: <span className="text-danger">{data.argBrief.deaths}</span></li>
            </ul>            
            <Trend />
        </div>
    )
}