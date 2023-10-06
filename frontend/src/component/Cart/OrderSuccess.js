import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./orderSuccess.css";
//import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <div className="orderSuccessText">Your Order has been Placed successfully </div>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
