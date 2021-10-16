
import { Filler } from 'chart.js'
import React from 'react'
import { useState,useEffect } from 'react'

import {Bar,Line} from 'react-chartjs-2'



export const Stock = () => {

    let obj = {
        stockChartXValues: [],
        stockChartYValues: []
    }

    const [state, setState] = useState(obj)

    const data = (canvas) => {
      const ctx = canvas.getContext("2d");
      const gradient = ctx.createLinearGradient(0, 0, 0, '300');
      const gradient1 = ctx.createLinearGradient(0, 0, 0, '300');
      // gradient.addColorStop(0, '#1FFF0F');   
      // gradient.addColorStop(0, 'rgb(52,228,83');   
      gradient.addColorStop(0, 'red');   
      gradient1.addColorStop(0, 'rgb(52,228,83');   
      // gradient.addColorStop(1, 'rgba(250,174,50,0)');
      gradient.addColorStop(1, 'white');
      gradient1.addColorStop(1, 'white');

      return {
          labels: [...state.stockChartXValues],
       
          datasets: [
              {   
                label:'Stock price',
                fill:'start',
                  backgroundColor : gradient, // Put the gradient here as a fill color
                  borderColor : "#ff6c23",
                  borderWidth: 2,
                  pointColor : "#fff",
                  // pointStrokeColor : "#ff6c23",
                  // pointHighlightFill: "#fff",
                  // pointHighlightStroke: "#ff6c23",
                  data : [...state.stockChartYValues]
              }, 
              {   
                label:'Stock price2',
                fill:'start',
                  backgroundColor : gradient1, // Put the gradient here as a fill color
                  borderColor : "#ff6c23",
                  borderWidth: 2,
                  pointColor : "#fff",
                  // pointStrokeColor : "#ff6c23",
                  // pointHighlightFill: "#fff",
                  // pointHighlightStroke: "#ff6c23",
                  data : [...state.stockChartYValues]
              },
          ]
      }
  }

  var options = {
      responsive: true,
      maintainAspectRatio:true,
      // datasetStrokeWidth : 3,
      // pointDotStrokeWidth : 4,
                elements: {
                    point:{
                        radius: 0
                    },
                  },
                  mouseLine: {
                    color: "#32d296"
                  },
                  //   tooltips: {
                  //     mode: 'index',
                  //     intersect: false,
                  //   },
                  //  hover: {
                  //     mode: 'nearest',
                  //     intersect: true
                  //   },
                    scales: {
                      xAxes: [{
                        display: true,
                        scaleLabel: {
                          display: true,
                          labelString: 'Month'
                        }
                      }],
                      yAxes: [{
                        stacked: true,
                  
                        display: true,
                        scaleLabel: {
                          display: true,
                        },
                      }]
                    },
                  plugins: {
                   
                    legend: {
                    display: true
                    },
                    tooltip: {
                    mode: 'index',
                    intersect: false
                    },
     
         hover: {
                mode: 'nearest',
                intersect: false
                },
   
                    
    
      scaleLabel : "<%= Number(value).toFixed(0).replace('.', ',') + '°C'%>"
              }
  };

  const divStyle = {
      width: '100px',
      height: '100px'
  };

    function fetchStock() {
      const API_KEY = 'IKUF335ZLNROPIE0';
      let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&apikey=${API_KEY}`
      let xValuesfn=[]
      let yValuesfn=[]
     fetch(API_CALL)
     .then((response)=>response.json())
     .then((data)=>{
        //  console.log(data)

         for(var key in data['Time Series (Daily)']){
            xValuesfn.push(key)
            yValuesfn.push(data[`Time Series (Daily)`][key]['1. open']);
            // yValuesfn.push(data[`Time Series (Daily)`][key]['1. open']);

         }
        //  console.log(xValuesfn)
         
                  xValuesfn.reverse();
                  yValuesfn.reverse();
                    xValuesfn.splice(0,40)
           yValuesfn.splice(0,40)
         setState({stockChartXValues:xValuesfn,stockChartYValues:yValuesfn})


     });

    }
    useEffect(() => {
       
//  fetchStock();

    }, [])

    let xcv=[]
    let xcv1=[...state.stockChartYValues]
    let xcv2=[]
    xcv1.splice(0,30)
    let sample=[]
    // let xcv1=[]
    let k=0;
    for(let i=0;i<60;i++)
    {
      if(i<30)
      { 
        xcv2.push(0)
     
      }
      
      
      xcv.push(i)
   sample.push(i);
    }
    xcv2.concat(xcv1)
    xcv2.splice(30,60)
    // sample.concat([...xcv])
    // console.log(xcv)
    // sample.splice(30,60)
    return (
     <>
{/* 22 */}
<br />
<br />
<br />
{/* <div className='Supp' style={{height:'fit-content',width:'30vw',border:'1px solid red',margin:'auto'}} > 
<Line 
 style={{backgroundColor:"white"}}
                data={data} 
                options={options}
            />
            <br />

            <button>Sup !</button>
            <button>Sup !</button>
            <button>Sup !</button>
<Line 

style={{backgroundColor:"white"}}
//  style={{height:'fit-content' , width:'50vw'}}
                data={data} 
                options={options}
            />
</div> */}
<Statewise  options={options} />
     </>


    )





}



export const Statewise = ({options})=>{
  let obj={
    xvals:[],
    yvals:{x:[],y:[],z:[]}
  }

  const getData=(Type)=>
  {   switch(Type)
    {
         case "dailyconfirmed":
     return timeSeries.yvals.x;
     case "dailydeceased":
      return timeSeries.yvals.y;
      case "dailyrecovered":
        return timeSeries.yvals.z;
        case "default":
          return timeSeries.yvals.x;
    }
 
  }
    const [Type,setType]=useState("dailyconfirmed")
    const [stateData,setstatedata]=useState([])
    const [timeSeries,settimeSeries]=useState(obj)
  
  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, '800');
    const gradient1 = ctx.createLinearGradient(0, 0, 0, '800');
    // gradient.addColorStop(0, '#1FFF0F');   
    // gradient.addColorStop(0, 'rgb(52,228,83');   
    gradient.addColorStop(0, 'red');   
    gradient1.addColorStop(0, 'rgb(52,228,83');   
    // gradient.addColorStop(1, 'rgba(250,174,50,0)');
    gradient.addColorStop(1, 'white');
    gradient1.addColorStop(1, 'white');
const getColor=()=>{
  switch(Type)
  {
       case "dailyconfirmed":
   return gradient;
   case "dailydeceased":
    return "rgb(0,0,0,0.5)";
    case "dailyrecovered":
      return "rgb(57, 255, 20,0.5)";
      case "default":
        return gradient;
  }



}
    return {
        labels: [...timeSeries.xvals],
     
        datasets: [
            {   
              label:Type,
              fill:'start',
                backgroundColor : getColor(Type), // Put the gradient here as a fill color
                // borderColor : "#ff6c23",
                borderColor :"black",
                borderWidth: 0.5,
                pointColor : "#fff",
                // pointStrokeColor : "#ff6c23",
                // pointHighlightFill: "#fff",
                // pointHighlightStroke: "#ff6c23",
                data : getData(Type)
            },
            
        ]
    }
}
const divStyle = {
  width: '100px',
  height: '100px'
};

useEffect(() => {
const fetchdata=()=>{
let api_key='https://data.covid19india.org/data.json';
// let api_key='https://data.covid19india.org/v4/min/data.min.json';
fetch(api_key)
.then((response)=>response.json())
.then((data)=>{
  console.log(data)
  console.log(data.cases_time_series)
setstatedata(data.statewise)

let xarr=data.cases_time_series.map((elm,idx)=>{
  return elm.date
})
let yarr={x:[],y:[],z:[]}
data.cases_time_series.map((elm,idx)=>{
yarr.x.push(elm.dailyconfirmed)
yarr.y.push(elm.dailydeceased)
yarr.z.push(elm.dailyrecovered)
})

settimeSeries({xvals:xarr,yvals:yarr});
})
}

fetchdata()
}, [])


return(




<>

<div className='Supp' style={{height:'fit-content',width:'90%',border:'1px solid red',margin:'auto',minHeight:"400px",margin:"auto",backgroundColor:"#D1D5DB",boxShadow:"0px 5px 15px #9CA3AF"}} > 
<br />
<h1>INDIA HISTORICAL STATS</h1>
<br />
<Bar
  data={data}
  options={options}
  style={{backgroundColor:"white",width:"80%",margin:"auto",border:"5px solid black",boxShadow:"0px 5px 15px #9CA3AF"}}
/>
<br />
<button  onClick={()=>{setType("dailyconfirmed")}}>infected</button>
<button  onClick={()=>{setType("dailydeceased")}}>deceased</button>
<button   onClick={()=>{setType("dailyrecovered")}}>recovered</button>

</div>
<br /><br /><br />

  <div style={{width:"90%",minHeight:"1300px",backgroundColor:"#D1D5DB",boxShadow:"0px 5px 15px #9CA3AF",margin:"auto",border:'1px solid red'}}>
  <br />
  <br />
  <h1>INDIA STATE-WISE STATS</h1>
  <br />
 <br />
  <table class="table table-striped table-bordered" style={{backgroundColor:"white",margin:"auto",width:"75%",border:"1px solid black",boxShadow:"0px 5px 15px #9CA3AF"}}>
  <thead className="thead-dark">
    <tr>
      <th scope="col">Row</th>
      <th scope="col">State</th>
      <th scope="col">Confirmed</th>
      <th scope="col">Recovered</th>
      <th scope="col">Dead</th>
      <th scope="col">Active</th>
      <th scope="col">Updated</th>
    </tr>
  </thead>
  <tbody>

  {


    stateData.map((stateData,idx)=>{
      return(
        <tr key={idx}>
      <th scope="row">{idx+1}</th>
      <th scope="col">{stateData.state}</th>
      <th className="uaresafe" scope="col">{stateData.confirmed}</th>
      <th scope="col">{stateData.recovered}</th>
      <th className="upsafe" scope="col">{stateData.deaths}</th>
      <th className="upsafe" scope="col">{stateData.active}</th>
      <th scope="col">{stateData.lastupdatedtime}</th>
    </tr>
      )
    })
  }
    
  </tbody>
</table></div>


<div>





</div>




</>

















)





}

