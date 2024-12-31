import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import {  loadProductsFetch } from "../data/products.js";
// import "../data/cart-class.js" 
// import '../data/car.js'
// import '../data/backend-practice.js'

//async makes a function return a promise
//await let us write asynchronous code like normal code

async function loadPage(){
   
    await loadProductsFetch()
    renderCheckoutHeader()
    renderOrderSummary()
    renderPaymentSummary()
    
}
loadPage()

/*
    loadProductsFetch().then(()=> {
    renderCheckoutHeader()
    renderOrderSummary()
    renderPaymentSummary()
    })
    */


/*
loadProducts(()=>{
    renderCheckoutHeader()
    renderOrderSummary()
    renderPaymentSummary()
})
*/

