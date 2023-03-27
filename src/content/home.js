// import { useState } from "react";
// import { OutTable, ExcelRenderer } from 'react-excel-renderer';
// import { PieChart, Pie, Tooltip, CartesianGrid, XAxis, YAxis, Legend, Bar,BarChart } from 'recharts';

// const Home = () => {
//     const [state, setState] = useState("")
//     const [stateg, setStateg] = useState("")
//     const [data, setData] = useState(false)
//     const fileHandler = (event) => {
//         let fileObj = event.target.files[0];
//         //just pass the fileObj as parameter
//         ExcelRenderer(fileObj, (err, resp) => {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 let x = resp.rows
//                 setStateg(x)
//                 setState({
//                     cols: resp.cols,
//                     rows: resp.rows
//                 });
//                 setData(true)
//             }
//         });
//     }
//     if (data) {

//         console.log(stateg)
//     }
//     let xy = [];
//     for (let i = 1; i < stateg.length; i++) {
//         xy.push({ name: stateg[i][0], value: stateg[i][2] })
//     }
//     console.log(xy)

//     const datas = xy
//     return (
//         <div>
//             <h2>Add Excel file </h2>
//             <input type="file" onChange={(event) => { fileHandler(event) }} style={{ "padding": "10px" }} />
//             {!data ? "" :
//                 <OutTable data={state.rows} columns={state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
//             }


//             <h2>Employee Salary</h2>
//             <PieChart width={400} height={400}>
//                 <Pie
//                     dataKey="value"
//                     isAnimationActive={false}
//                     data={datas}
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={80}
//                     fill="#8884d8"
//                     label
//                 />
//                 <Tooltip />
//             </PieChart>
            
//             <BarChart
//                 width={500}
//                 height={300}
//                 data={datas}
//                 margin={{
//                     top: 5,
//                     right: 30,
//                     left: 20,
//                     bottom: 5,
//                 }}
//             >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="value" fill="#8884d8" />
//                 <Bar dataKey="uv" fill="#82ca9d" />
//             </BarChart>
//                 <p>**hover on the chart to get employee Salary</p>
//         </div>

//     )
// }
// export default Home;


import { useState } from "react";
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import { PieChart, Pie, Tooltip, CartesianGrid, XAxis, YAxis, Legend, Bar,BarChart,Cell,AreaChart,LineChart } from 'recharts';
import {
    ComposedChart,
    Line,
    Area,
    ResponsiveContainer,
  } from 'recharts';
import Data from "./data";
import { VectorMap } from "react-jvectormap"
  import PieChartWithNeedle from "./pieChartWithNeedle"
  import Map from "./worldMap";
  import "./home.css";
  const { getCode, getName } = require('country-list');

const Home = () => {
    const [state, setState] = useState("")
    const [stateg, setStateg] = useState("")
    const [inputData, setData] = useState(false)
    const fileHandler = (event) => {
        let fileObj = event.target.files[0];
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                let x = resp.rows
                setStateg(x)
                setState({
                    cols: resp.cols,
                    rows: resp.rows
                });
                setData(true)
            }
        });
    }
    if (inputData) {

        // console.log(stateg)
    }
    const pie_charts = [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
        { name: "Group C", value: 300 },
        { name: "Group D", value: 200 }
      ];
      
      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    let composed_chart = [];
    for (let i = 2; i < stateg.length; i++) {
        composed_chart.push({ brand: stateg[i][0], male: stateg[i][1], female: stateg[i][2], amount: stateg[i][3] })
    }

    let area_chart = [];
    for (let i = 2; i < stateg.length; i++) {
        area_chart.push({ brand: stateg[i][0], male: stateg[i][1], female: stateg[i][2], amount: stateg[i][3] })
    }

    let line_chart = [];
    for (let i = 2; i < stateg.length; i++) {
        line_chart.push({ brand: stateg[i][0], male: stateg[i][1], female: stateg[i][2], amount: stateg[i][3] })
    }
    // console.log(xyz)

  
    let bar_chart = [];
    for (let i = 2; i < stateg.length; i++) {
        bar_chart.push({brand: stateg[i][0], USD: stateg[i][36], EUR: stateg[i][37]})
    }
 
    let pie_chart = [];
    for (let i = 2; i < stateg.length; i++) {
        pie_chart.push({brand: stateg[i][0], amount: stateg[i][3]})
    }
    let worldMap = {};
    let mapDatas;
    if(inputData){

        // console.log({country:stateg[2][6],USD:stateg[10][6]})
        for (let i = 6; i < 26; i++) {
        worldMap[getCode(stateg[2][i])] =stateg[10][i]
    }
    // console.log(worldMap)

     mapDatas = worldMap
    }
    
    let pieChartNeedle = [];
   
    return (
        <div className="content">
            <div className="main_content">
            <div className="input">

            <h2>Add Excel file </h2>
            <input type="file" className="inputbar" onChange={(event) => { fileHandler(event) }} style={{ "padding": "20px" }} />
            </div>
            {!inputData ? "" :
                <OutTable className="table" data={state.rows} columns={state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
            }
            </div>


           
     
{inputData?
<div>

            <h2>composed chart</h2>
       <ComposedChart
          layout="vertical"
          width={700}
          height={500}
          data={composed_chart}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="brand" type="category" scale="band" />
          <Tooltip />
          <Legend />
          <Area dataKey="brand" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="male" barSize={20} fill="#413ea0" />
          <Line dataKey="female" stroke="#ff7300" />
        </ComposedChart>
</div>
:""}

{inputData?
    
<div>
    <h2>Area chart</h2>
        <AreaChart width={900} height={500} data={area_chart}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="brand" />
  <YAxis />
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Area type="monotone" dataKey="male" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
  <Area type="monotone" dataKey="female" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
</AreaChart>
</div>

:""}


{inputData?
<div>
    <h2>Bar Chart</h2>
<BarChart width={900} height={500} data={bar_chart}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="brand" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="USD" fill="#8884d8" />
  <Bar dataKey="EUR" fill="#82ca9d" />
</BarChart>
</div>
:""}
{inputData?
<div>
    <h2>Pie Chart</h2>
<PieChart width={900} height={500}>
  <Pie data={pie_chart} dataKey="brand" nameKey="amount" cx="50%" cy="50%" outerRadius={90} fill="#8884d8" />
  <Pie data={pie_chart} dataKey="amount" nameKey="brand" cx="50%" cy="50%" innerRadius={100} outerRadius={200} fill="#82ca9d" label />
</PieChart>
</div>
:""}
{inputData?
<div className="world_map">
    <h2>WorldMap Chart</h2>
<Map mapDatas={mapDatas}/>
</div>
:""}
{inputData?
<div className="line_chart" > 
    <h2>Line Chart</h2>
<LineChart width={900} height={500} data={line_chart}
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
  <XAxis dataKey="brand" />
  <YAxis />
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Legend verticalAlign="top" height={36}/>
  <Line name="pv of pages" type="monotone" dataKey="male" stroke="#8884d8" />
  <Line name="uv of pages" type="monotone" dataKey="female" stroke="#82ca9d" />
</LineChart>
</div>

:""}
{inputData?
<PieChart className="pie_chart" width={900} height={500}>
      <Pie
        data={pie_charts}
        cx={320}
        cy={250}
        innerRadius={100}
        outerRadius={200}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >

        {inputData?pie_charts.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        )):""}
      </Pie>
      </PieChart>

:""}
        </div>

    )
}

export default Home;