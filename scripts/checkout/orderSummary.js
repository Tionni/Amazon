import { 
    calculateCartQuantity,
    cart, 
    removeFromCart, 
    updateDeliveryOption, 
    updateQuantity 
   } from "../../data/cart.js";
 import { products, getProduct } from "../../data/products.js";
 
 import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
 import { formatCurrency } from "../utils/money.js";
 import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";
import { calculateDeliveryDate } from "../utils/dateTime.js";
export function renderOrderSummary(){
   let cartSummaryHTML = ''
 
   cart.forEach((cartItem) => {
   const productId = cartItem.productId
   
   const matchingItem = getProduct(productId)
 
   const deliveryOptionId = cartItem.deliveryOptionId
   const deliveryOption =getDeliveryOption(deliveryOptionId)

  
  const dateString = calculateDeliveryDate(deliveryOption)   
 
   cartSummaryHTML += `
   <div class="cart-item-container 
    js-cart-item-container
    js-cart-item-container-${matchingItem.id}">
               <div class="delivery-date">
                 Delivery date: ${dateString}
               </div>
 
               <div class="cart-item-details-grid">
                 <img class="product-image"
                   src="${matchingItem.image}">
 
                 <div class="cart-item-details">
                   <div class="product-name js-product-name-${matchingItem.id}">
                     ${matchingItem.name}
                   </div>
                   <div class="product-price js-product-price-${matchingItem.id}">
                   ${matchingItem.getPrice()}
                   </div>
                   <div class="product-quantity js-product-quantity-${matchingItem.id}">
                     <span>
                       Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
                     </span>
                     <span class="update-quantity-link link-primary js-update-link" data-product-id=${matchingItem.id}>
                       Update
                     </span>
                     <input class="quantity-input js-quantity-input-${matchingItem.id}">
                     <span class="save-quantity-link link-primary js-save-link" data-product-id=${matchingItem.id}>Save</span>
                     <span class="delete-quantity-link link-primary js-delete-link 
                     js-delete-link-${matchingItem.id}"
                    data-product-id="${matchingItem.id}">
                       Delete
                     </span>
                   </div>
                 </div>
 
                 <div class="delivery-options">
                   <div class="delivery-options-title">
                     Choose a delivery option:
                   </div>
                   ${deliveryOptionsHTML(matchingItem, cartItem)}
                 </div>
               </div>
             </div>
   `
   
 
   })
 
 
   function deliveryOptionsHTML(matchingItem, cartItem){
     let html = '';
     deliveryOptions.forEach((deliveryOption)=>{
       
       const dateString = calculateDeliveryDate(deliveryOption)
 
       const priceString =deliveryOption.priceCents === 0 
         ? 'FREE'
         :`$${formatCurrency(deliveryOption.priceCents)} -`
       
       const isChecked = deliveryOption.id === cartItem.deliveryOptionId
 
       html +=`
         <div class="delivery-option js-delivery-option js-delivery-option-${matchingItem.id}-${deliveryOption.id}"
         data-product-id="${matchingItem.id}"
         data-delivery-option-id="${deliveryOption.id}">
         
           <input type="radio"
           ${isChecked ? 'checked': ""}
             class="delivery-option-input  js-delivery-option-input-${matchingItem.id}-${deliveryOption.id}"
             name="delivery-option-${matchingItem.id}">
           <div>
             <div class="delivery-option-date">
             ${dateString}
             </div>
             <div class="delivery-option-price">
               ${priceString} Shipping
             </div>
           </div>
         </div>             
       `
     })
     return html
   }
 
 
 
    // added the generated html to dom
   document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML

  

 //chose the delivery option
   document.querySelectorAll('.js-delivery-option').forEach((element)=>{
     element.addEventListener('click', ()=>{
       const {productId, deliveryOptionId} = element.dataset
       updateDeliveryOption(productId, deliveryOptionId)
       renderOrderSummary()
       renderPaymentSummary()
     })
   })
 
   function updateCartQuantity(){
     
 
     //display to the dom
     document.querySelector('.js-header').innerHTML = `${calculateCartQuantity()} items`
   }
   updateCartQuantity()
 
   //update link
   document.querySelectorAll(".js-update-link").forEach((link)=>{
     link.addEventListener("click", ()=>{
     
       const productId =link.dataset.productId
       const container = document.querySelector(
         `.js-cart-item-container-${productId}`)
       container.classList.add("is-editing-quantity")
     })
   
   })
 
   document.querySelectorAll(".js-save-link").forEach((link)=>{
     link.addEventListener('click', ()=>{
       const productId =link.dataset.productId
 
       const input = document.querySelector(`.js-quantity-input-${productId}`)
       const newQuantity = Number(input.value)
       if (newQuantity < 0 || newQuantity >= 1000) {
         alert('Quantity must be at least 0 and less than 1000');
         return;
     }
 
     updateQuantity(productId, newQuantity)
     
     const container = document.querySelector(
       `.js-cart-item-container-${productId}`)
     container.classList.remove("is-editing-quantity")
 
     //update the quantity in product html
    //  document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity
      renderOrderSummary()
     //update the quantity in header at the top html
  //    document.querySelector('.js-header').innerHTML = `${calculateCartQuantity()} items`
  //  
})
     
     
   })

    //remove from cart after clicking deleting
    document.querySelectorAll(".js-delete-link").forEach((link)=>{
      link.addEventListener('click', ()=>{
        const productId = link.dataset.productId
        
        removeFromCart(productId);
      //   const container = document.querySelector(
      //     `.js-cart-item-container-${productId}`)
      // container.remove()
      
      
      renderOrderSummary()
      
       renderCheckoutHeader()
       renderPaymentSummary()
       
      })
    })
 }
