import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import {  loadProductsFetch } from "../data/products.js";
// import "../data/cart-class.js" 
// import '../data/car.js'
// import '../data/backend-practice.js'



    loadProductsFetch().then(()=> {
    renderCheckoutHeader()
    renderOrderSummary()
    renderPaymentSummary()
    
})


/*
loadProducts(()=>{
    renderCheckoutHeader()
    renderOrderSummary()
    renderPaymentSummary()
})
*/

