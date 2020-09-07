// Your code here
let createEmployeeRecord = function(recordArray) {
    let employee = {
        firstName: recordArray[0],
        familyName: recordArray[1],
        title: recordArray[2],
        payPerHour: recordArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

let createEmployeeRecords = function(array) {
    return array.map(element => createEmployeeRecord(element))
}

let createTimeInEvent = function(employee, time) {
    employee["timeInEvents"].push({
        type: "TimeIn",
        hour: parseInt(time.split(" ")[1], 10),
        date: time.split(" ")[0]
    })

    
    return employee
}

let createTimeOutEvent = function(employee, time) {
    employee["timeOutEvents"].push({
        type: "TimeOut",
        hour: parseInt(time.split(" ")[1], 10),
        date: time.split(" ")[0]
    })
    return employee
}

let hoursWorkedOnDate = function(employee, date) {
    let timeInOnDate = employee.timeInEvents.find(timeIn => timeIn.date === date)
    let timeOutOnDate = employee.timeOutEvents.find(timeOut => timeOut.date === date)
    let hoursWorked = timeOutOnDate.hour - timeInOnDate.hour
    return hoursWorked/100
}

let wagesEarnedOnDate = function(employee, date) {
    let hoursWorked = hoursWorkedOnDate(employee, date)
    return hoursWorked * employee.payPerHour
}

let allWagesFor = function(employee) {
    let eligibleDates = employee.timeInEvents.map(function(e) {
        return e.date
    })
    let totalWages = eligibleDates.reduce(function(memo, date) {
        return memo + wagesEarnedOnDate(employee, date)
    }, 0)
    return totalWages
}

let calculatePayroll = function(array) {
    return array.reduce(function(memo, record) {
        return memo + allWagesFor(record)
    }, 0)
}

let findEmployeeByFirstName = function(array, firstName) {
    return array.find(function(record) {
        return record.firstName === firstName
    })
}