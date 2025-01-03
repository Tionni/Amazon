import { addToCart, loadFromStorage, cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";

describe("test suite: AddToCart", ()=>{
    beforeEach(()=>{
        spyOn(localStorage, 'setItem')
    })

    it('adds an exiting product to the cart', ()=>{
       
        

        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([
              {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'

              } 
            ])
        })
        
        loadFromStorage()
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart[0].quantity).toEqual(2)
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
              productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
              quantity: 2,
              deliveryOptionId: '1'

            } 
          ]))

    })
    it('adds a new product to the cart', ()=>{
       
      
        //create a mock
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([])
        })
        
        loadFromStorage()
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart[0].quantity).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
              productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
              quantity: 1,
              deliveryOptionId: '1'

            } 
          ]))
    })
})

describe("test suite: removeFromCart", ()=>{

    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'
   
    beforeEach(()=>{
        spyOn(localStorage, 'setItem')
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([
                {
                  productId: productId1,
                  quantity: 1,
                  deliveryOptionId: '1'
  
                } 
              ])
              
        })
        loadFromStorage()

    })

    it('remove a productId that is in the cart', ()=>{
        removeFromCart(productId1)
        expect(cart.length).toEqual(0)
        
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]))
        
    })
    it('remove a productId that is not in the cart', ()=>{
        removeFromCart(productId2)
        expect(cart.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
              productId: productId1,
              quantity: 1,
              deliveryOptionId: '1'

            } 
          ]))
    })

})

describe("test suite: updateDeliveryOption()", ()=>{


  beforeEach(()=>{
    spyOn(localStorage, 'setItem')
    
  })


  it("update the delivery option of a product in the cart", ()=>{
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '1'

      }])
      
    })
    loadFromStorage()
    updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', "3")
    expect(cart.length).toEqual(1)
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart[0].deliveryOptionId).toEqual('3')
    expect(cart[0].quantity).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
      {
        
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '3'

    }
    ]))
  })

  it("update the delivery option of a product that is not in the cart", ()=>{
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '1'

      }])
      
    })
    loadFromStorage()
    updateDeliveryOption('ttt', "3")
    expect(cart.length).toEqual(1)
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart[0].deliveryOptionId).toEqual('1')
    expect(cart[0].quantity).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(0)
    
  })

  it("use a deliveryOption that does not exists", ()=>{
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '1'

      }])
      
    })
    loadFromStorage()
    updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', "5")
    expect(cart.length).toEqual(1)
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart[0].deliveryOptionId).toEqual('1')
    expect(cart[0].quantity).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(0)
  })
})