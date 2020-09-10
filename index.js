// Your code here

const createEmployeeRecord = function(array) {
    return {
         firstName: array[0], 
         familyName: array[1],
         title: array[2],
         payPerHour: array[3],
         timeInEvents: [],
         timeOutEvents: []
    }
}

// let twoRows = [
//     ["moe", "sizlak", "barkeep", 2],
//     ["bartholomew", "simpson", "scamp", 3]
//   ]

const createEmployeeRecords = function(array) {
return array.map(function(e){
    return createEmployeeRecord(e)
    
})
}
const createTimeInEvent = function(object, dateStamp) {
    let hour = dateStamp.split(' ')[1]
    let date = dateStamp.split(' ')[0]
  object.timeInEvents.push({
 type: 'TimeIn',
 hour: parseInt(hour,10),
 date: date
     })
   return object
 }


const createTimeOutEvent = function(object, dateStamp) {
   let hour = dateStamp.split(' ')[1]
   let date = dateStamp.split(' ')[0]
 object.timeOutEvents.push({
type: 'TimeOut',
hour: parseInt(hour,10),
date: date
    })
  return object
}


const hoursWorkedOnDate = function(object, date){
   let inn = object.timeInEvents.find(function(d) {
       return d.date === date
   })
   let out = object.timeOutEvents.find(function(d) {
       return d.date === date
   })

return (out.hour - inn.hour) / 100


}

const wagesEarnedOnDate = function(object, date) {
    
return object.payPerHour * hoursWorkedOnDate(object, date)
}


const allWagesFor = function(object) {
let dateWorked = object.timeInEvents.map(function(d) {
 return d.date
})
return dateWorked.reduce((acc, d) => {
return acc += wagesEarnedOnDate(object, d)
}, 0)

   
}

const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(name){
return name.firstName === firstName
    }) 

}

const calculatePayroll = function(array) {
    return array.reduce((acc, employee) => {
        return acc += allWagesFor(employee)
        }, 0)
}