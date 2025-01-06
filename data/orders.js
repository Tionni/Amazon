export const orders = JSON.parse(localStorage.getItem('orders')) || []
export  function addOrder(order){
    orders.unshift(order)
    saveToStorage()
}
function saveToStorage(){
    console.log(orders)
    localStorage.setItem('orders', JSON.stringify(orders))
}
export function getOrder(orderId){
    let matchingOrder
    orders.forEach((order) => {
        if(orderId === order.id){
            matchingOrder = order
        }
    });
    return matchingOrder
}
export function getProductInOrder(orderId, productId){
    const order = getOrder(orderId)
    let matchingProduct
    order.products.forEach((orderProduct)=>{
        if(productId === orderProduct.productId){
            matchingProduct = orderProduct
        }
    })
    return matchingProduct
}