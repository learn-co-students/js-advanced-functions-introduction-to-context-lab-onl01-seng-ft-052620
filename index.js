const employeeRecords = []

function createEmployeeRecord(arr) {
    let newEmployee = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    employeeRecords.push(newEmployee)
    return newEmployee
}

function createEmployeeRecords(array) {
    return array.map( e=> createEmployeeRecord(e))
}

function createTimeInEvent(record, timeIn) {
    record.timeInEvents.push({
        type: 'TimeIn',
        date: timeIn.split(" ")[0],
        hour: parseInt(timeIn.split(" ")[1], 10)
    })
    return record
}

function createTimeOutEvent(record, timeOut) {
    record.timeOutEvents.push({
        type: 'TimeOut',
        date: timeOut.split(" ")[0],
        hour: parseInt(timeOut.split(" ")[1], 10)
    })
    return record
}

function hoursWorkedOnDate(record, date) {
    let timeIn = record.timeInEvents.find(e => e.date === date).hour.toString()
    let timeOut = record.timeOutEvents.find(e => e.date === date).hour.toString()
    let timeInHour = parseInt(timeIn.slice(0, -2), 10)
    let timeInMin = parseInt(timeIn.slice(-2), 10)
    let timeOutHour = parseInt(timeOut.slice(0, -2), 10)
    let timeOutMin = parseInt(timeOut.slice(-2), 10)
    return (timeOutHour - timeInHour) + (timeOutMin - timeInMin)/60
}

function wagesEarnedOnDate(record, date) {
     return (hoursWorkedOnDate(record, date))*(record.payPerHour)
}

function allWagesFor(record) {
    let dates = record.timeInEvents.map(e => e.date)
    return dates.reduce( (a, c) => wagesEarnedOnDate(record, c) + a, 0)
}

function calculatePayroll(array) {
    return array.reduce( (a, c) => allWagesFor(c) + a, 0 )
}

function findEmployeeByFirstName(array, name) {
    return array.find( e => e.firstName === name)
}