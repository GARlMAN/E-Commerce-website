import React from 'react'
import Sidebar from './Sidebar'
import "./dashboard.css"
import { Link } from 'react-router-dom'
import { Typography } from "@material-ui/core";
import { Doughnut, Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';

import { useSelector, useDispatch } from "react-redux";


function Dashboard() {
    //state of the line chart
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, 4000],
          },
        ],
      };
       
      const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
          {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [3, 7 - 3],
          },
        ],
      };
    

  return (
    <div className="dashboard">
        <Sidebar />
        <div className="dashboardContainer">
            <Typography component="h1">Dashboard</Typography>

            <div className="dashboardSummary">
                <div>
                    <p>
                    Total Amount <br /> ₹100
                    </p>
                </div>
                <div className="dashboardSummaryBox2">
                    <Link to="/admin/products">
                        <p>Product</p>
                        <p>5</p>
                    </Link>
                    <Link to="/admin/orders">
                        <p>Orders</p>
                        <p>sdfsdf</p>
                    </Link>
                    <Link to="/admin/users">
                        <p>Users</p>
                        <p>sdfsdf</p>
                    </Link>
                </div>
            </div>
            <div className="lineChart">
                <Line data={lineState} />
            </div>
            <div className="doughnutChart">
                <Doughnut data={doughnutState} />
            </div>
        </div>
    </div>
  )
}

export default Dashboard