import { getOrder, getProductInOrder } from "../data/orders.js"
import { getProduct, loadProductsFetch } from "../data/products.js"
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

async function loadPage(){
    await loadProductsFetch()
    renderTrackingPage()
}
loadPage()

function renderTrackingPage(){
        const url = new URL(window.location.href)
        const orderId = url.searchParams.get('orderId')
        const productId = url.searchParams.get('productId')
        const product = getProduct(productId)
        const order = getOrder(orderId)
        const productsInOrder = getProductInOrder(orderId, productId)
        console.log(productsInOrder)
        const currenttime = dayjs()
        
        const orderTime = dayjs(order.orderTime)
        
        const deliveryTime = dayjs(productsInOrder.estimatedDeliveryTime)
       

         const percentageProgress = ((currenttime - orderTime) / (deliveryTime - orderTime)) * 100
         console.log(percentageProgress)

        let html = `
        <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
        </a>

        <div class="delivery-date">
        Arriving on ${dayjs(productsInOrder.estimatedDeliveryTime).format('dddd, MMMM, D') }
        </div>

        <div class="product-info">
        ${product.name}
        </div>

        <div class="product-info">
        Quantity: ${productsInOrder.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
        <div class="progress-label ${percentageProgress < 50 ? "current-status": ""}">
            Preparing
        </div>
        <div class="progress-label ${(percentageProgress >= 50 && percentageProgress < 100) ? "current-status" : "" }">
            Shipped
        </div>
        <div class="progress-label ${percentageProgress >= 100 ? "current-status" : ""}">
            Delivered
        </div>
        </div>

        <div class="progress-bar-container">
        <div class="progress-bar" style="width:${percentageProgress}%"></div>
        </div>
        </div>`

        document.querySelector('.js-main').innerHTML = html
}
