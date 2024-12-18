import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
export function calculateDeliveryDate(deliveryOption){

    let noOfdays = deliveryOption.deliveryDays
     
    let deliveryDate = dayjs()
    while(noOfdays > 0){
       deliveryDate  = deliveryDate.add(1, 'day')
       if(!(isWeekend(deliveryDate))) {
        noOfdays --
       }
       

    }

    
       
       const dateString = deliveryDate.format('dddd, MMMM D')

       return dateString
}
function isWeekend(date){
    const dayOfWeek = date.format('dddd')
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday'
}