import React, { useEffect } from "react";
import Sidebar from './Sidebar'
import "./dashboard.css"
import { Link } from 'react-router-dom'
import { Typography } from "@material-ui/core";
import { Doughnut, Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import { getAllOrders } from "../../actions/orderAction";


function Dashboard() {
  const dispatch = useDispatch();

  let outOfStock = 0;
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);

  let len_product = products ? products.length : 0;
  let len_orders = orders ? orders.length : 0;
  //checking the amount of things out of stock
  products &&
  products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });
    useEffect(() => {
      dispatch(getAdminProduct());
      dispatch(getAllOrders())
    }, [dispatch]);

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
            data: [outOfStock, len_product - outOfStock],
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
                        <p>{len_product}</p>
                    </Link>
                    <Link to="/admin/orders">
                        <p>Orders</p>
                        <p>{len_orders}</p>
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