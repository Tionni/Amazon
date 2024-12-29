class Car {
    brand
    model
    speed
    isTrunkOpen = false
    constructor(carDetails){
        this.brand = carDetails.brand
        this.model = carDetails.model
        this.speed = 0
    }

    displayInfo(){
        console.log(`${this.brand} ${this.model} speed ${this.speed}km istrunkopen ${this.isTrunkOpen}`)
    }
    go(){
            if(!this.isTrunkOpen){
                this.speed += 5
            }
            
            if(this.speed > 200){
                this.speed = 200
            }
        
        
    }
    brake(){
        
            this.speed -= 5
            if(this.speed < 0){
                this.speed  = 0
            }
        
        
    }
    openTrunk(){
        this.isTrunkOpen = true
    }
    closeTrunk(){
        this.isTrunkOpen = false
    }
}



const car1 = new Car({brand:'Toyota', model: 'Corolla'})
const car2 = new Car({brand: 'Tesla', model: 'Model 3'})

car1.displayInfo()
car2.displayInfo()

car1.go()
car1.go()
car1.go()
car1.brake()

car1.brake()
car2.brake()
car1.displayInfo()
car1.openTrunk()
car1.go()
car1.displayInfo()
car1.closeTrunk()
car1.go()
car1.displayInfo()