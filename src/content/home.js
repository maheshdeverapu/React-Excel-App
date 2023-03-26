import { useState } from "react";
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import { PieChart, Pie, Tooltip, CartesianGrid, XAxis, YAxis, Legend, Bar,BarChart } from 'recharts';

const Home = () => {
    const [state, setState] = useState("")
    const [stateg, setStateg] = useState("")
    const [data, setData] = useState(false)
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
    if (data) {

        console.log(stateg)
    }
    let xy = [];
    for (let i = 1; i < stateg.length; i++) {
        xy.push({ name: stateg[i][0], value: stateg[i][2] })
    }
    console.log(xy)

    const datas = xy
    return (
        <div>
            <h2>Add Excel file </h2>
            <input type="file" onChange={(event) => { fileHandler(event) }} style={{ "padding": "10px" }} />
            {!data ? "" :
                <OutTable data={state.rows} columns={state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
            }


            <h2>Employee Salary</h2>
            <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={datas}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                />
                <Tooltip />
            </PieChart>
            
            <BarChart
                width={500}
                height={300}
                data={datas}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
                <p>**hover on the chart to get employee Salary</p>
        </div>

    )
}
export default Home;