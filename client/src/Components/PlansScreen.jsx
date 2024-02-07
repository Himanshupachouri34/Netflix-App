import React from 'react'
import '../Style/PlansScreen.css'
import { useNavigate } from "react-router-dom";


function PlansScreen() {
  const navigate = useNavigate()
    const amount = 500 * 100;
    const currency = 'INR';
    const receipt = 'qwerty'


    const paymentHandler = async(req,res) => {
      const response = await fetch("http://localhost:2000/order", {
          method: "POST",
          body: JSON.stringify({
              amount,
              currency,
              receipt
          }),
          headers: {
              "Content-Type" : "application/json"
          }
      })
      const order = await response.json()
      console.log(order);


      var options = {
          "key": "rzp_test_YjwKsc2YoXgoQF", // Enter the Key ID generated from the Dashboard
          amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency,
          "name": "Netflix By Himanshu", //your business name
          "description": "Complete Transaction",
          "image": "https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png",
          "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          "handler": function (response){
              alert(`Payment Id: ${response.razorpay_payment_id} Congratulations!`);
              navigate('/');
          },
          "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
              "name": "Himanshu", //your customer's name
              "email": "Himanshu@dhiskyau.com", 
              "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
          },
          "notes": {
              "address": "Razorpay Corporate Office"
          },
          "theme": {
              "color": "#ee0a0a"
          }
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response){
              alert(response.error.code);
              alert(response.error.description);
              alert(response.error.source);
              alert(response.error.step);
              alert(response.error.reason);
              alert(response.error.metadata.order_id);
              alert(response.error.metadata.payment_id);
      });
      rzp1.open();
      e.preventDefault();

  }


  return (
    <div className='PlansScreen'>
      <div className="plansScreen_info">
        <h3>Standard</h3>
        <button onClick={paymentHandler} >Subscribe</button>       
      </div>
      <div className="plansScreen_info">
        <h3>Family</h3>
        <button onClick={paymentHandler} >Subscribe</button>       
      </div>
    </div>
  )
}

export default PlansScreen