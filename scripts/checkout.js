import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import {  loadProductsFetch } from "../data/products.js";
// import "../data/cart-class.js" 
// import '../data/car.js'
// import '../data/backend-practice.js'

//async makes a function return a promise
//await let us write asynchronous code like normal code
//we manually create an error using throw
//reject creates an error in the future in a promise

async function loadPage(){
   try{
    //throw 'error'
    await loadProductsFetch()

   } catch(error){
    console.log("unexpected error. Please try again later")
   }
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

