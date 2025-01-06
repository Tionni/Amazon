import {  orders } from "../data/orders.js";
import { getProduct, loadProductsFetch, products } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { formatCurrency } from "./utils/money.js";
import { addToCart, cart } from "../data/cart.js";

console.log(orders)

async function loadPage(){
    await loadProductsFetch()
    renderOrderPage()
}


function renderOrderPage(){
    let orderHTML = ''

    orders.forEach((order) => {
        const productsInOrder = order.products
        orderHTML += `
        <div class="order-container">
              
              <div class="order-header">
                <div class="order-header-left-section">
                  <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${dayjs(order.orderTime).format('MMMM, D') }</div>
                  </div>
                  <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>${formatCurrency(order.totalCostCents)}</div>
                  </div>
                </div>
    
                <div class="order-header-right-section">
                  <div class="order-header-label">Order ID:</div>
                  <div>${order.id}</div>
                </div>
              </div>
    
              <div class="order-details-grid">
                
                ${displayProductsInCart(productsInOrder, order)}
                
              </div>
            </div>`
        
    });
    document.querySelector('.js-orders-grid').innerHTML = orderHTML
     function displayProductsInCart(orderProducts, order){
        let html = ''
        orderProducts.forEach((product)=>{
            const productId = product.productId
            const matchingItem = getProduct(productId)
            html += 
            `<div class="product-image-container">
            <img src="${matchingItem.image}">
          </div>
    
          <div class="product-details">
            <div class="product-name">
              ${matchingItem.name}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${dayjs(product.estimatedDeliveryTime).format('MMMM, DD')}
            </div>
            <div class="product-quantity">
              Quantity: ${product.quantity}
            </div>
            <button class="buy-again-button button-primary js-buy-again
            " data-product-id="${product.productId}">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>
    
          <div class="product-actions">
            <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>`
          
        })
        return html
     }

     document.querySelectorAll('.js-buy-again').forEach((button)=>{
        button.addEventListener('click', ()=>{
            const { productId } = button.dataset 
            addToCart(productId)
            button.innerHTML = 'Added';
            setTimeout(() => {
              button.innerHTML = `
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              `;
            }, 1000);
            
        })
     })

    
}
loadPage()
