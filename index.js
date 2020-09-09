
function createEmployeeRecord(array){
    let employee = { 
        firstName: array[0], 
        familyName: array[1], 
        title: array[2], 
        payPerHour: array[3], 
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}
function createEmployeeRecords(array){
    let employees = array.map(e => createEmployeeRecord(e))
    return employees
}
function createTimeInEvent(e, timeStamp){
    e["timeInEvents"].push({
        type: "TimeIn",
        date: timeStamp.split(" ")[0],
        hour: parseInt(timeStamp.split(" ")[1], 10)
})
return e
}
function createTimeOutEvent(e, timeStamp){
    e["timeOutEvents"].push({
        type: "TimeOut", 
        date: timeStamp.split(" ")[0],
        hour: parseInt(timeStamp.split(" ")[1], 10)
    })
    return e
}
function hoursWorkedOnDate (e, timeStamp){
    let timeInOnDate = e.timeInEvents.find(timeIn => timeIn.date === timeStamp)
    let timeOutOnDate = e.timeOutEvents.find(timeOut => timeOut.date === timeStamp)
    let hoursWorked = timeOutOnDate.hour - timeInOnDate.hour
    return hoursWorked/100
}
function wagesEarnedOnDate(e, timeStamp){
    let wagesEarned = e.payPerHour * hoursWorkedOnDate(e, timeStamp)
    return wagesEarned
    
}
function allWagesFor(e){
    let totalWages = 0
    e.timeInEvents.forEach(timeIn => totalWages+= wagesEarnedOnDate(e, timeIn.date))
    return totalWages
    //could also be done with map AND reduce 
}
function findEmployeeByFirstName(srcArray, name){
    return srcArray.find(e => e.firstName === name)
}
function calculatePayroll(array){
    // let totalPayroll = 0
    // array.forEach(e => totalPayroll += allWagesFor(e))
    // return totalPayroll
    return array.reduce(function(memo, record){
        return memo + allWagesFor(record)
    }, 0)
}
