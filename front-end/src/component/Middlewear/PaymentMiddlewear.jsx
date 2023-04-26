import React, { Fragment, useState, useEffect } from 'react'
import Payment from '../Cart/Payment'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"; 
import axios from "axios";

function PaymentMiddlewear() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  //getting the stripe api key from config
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    await setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    getStripeApiKey();

  })
  console.log(stripeApiKey);



  return (
    <Fragment>
      <Elements stripe={loadStripe(stripeApiKey)}>
        <Payment />
      </Elements>
        
    </Fragment>
  )
}

export default PaymentMiddlewear