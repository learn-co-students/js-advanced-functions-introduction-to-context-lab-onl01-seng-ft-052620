// Your code here
function createEmployeeRecord(array) {
    const newEmployee = {}
    newEmployee.firstName = array[0]
    newEmployee.familyName = array[1]
    newEmployee.title = array[2]
    newEmployee.payPerHour = array[3]
    newEmployee.timeInEvents = []
    newEmployee.timeOutEvents = []
    return newEmployee
}

function createEmployeeRecords(array) {
    const newEmployees = []
    array.forEach(record => {
        const newEmployee = {}
        newEmployee.firstName = record[0]
        newEmployee.familyName = record[1]
        newEmployee.title = record[2]
        newEmployee.payPerHour = record[3]
        newEmployee.timeInEvents = []
        newEmployee.timeOutEvents = []
        newEmployees.push(newEmployee)
    })
    return newEmployees
}

function createTimeInEvent(employee, timeIn) {
    const newTimeIn = {}
    newTimeIn.type = "TimeIn"
    newTimeIn.hour = parseInt(timeIn.substring(11, 15))
    newTimeIn.date = timeIn.substring(0, 10)
    employee.timeInEvents.push(newTimeIn)
    return employee
}

function createTimeOutEvent(employee, timeOut) {
    const newTimeOut = {}
    newTimeOut.type = "TimeOut"
    newTimeOut.hour = parseInt(timeOut.substring(11, 15))
    newTimeOut.date = timeOut.substring(0, 10)
    employee.timeOutEvents.push(newTimeOut)
    return employee
}

function hoursWorkedOnDate(employee, date) {
    const timeIn = (employee.timeInEvents.find(element => element.date == date)).hour
    const timeOut = (employee.timeOutEvents.find(element => element.date == date)).hour
    const hoursWorked = ((timeOut - timeIn) / 100)
    return hoursWorked
}

function wagesEarnedOnDate(employee, date) {
    const wagesEarned = (hoursWorkedOnDate(employee, date) * employee.payPerHour )
    return wagesEarned
}

function allWagesFor(employee) {
    const allWages = []
    const workedDates = []
    employee.timeInEvents.forEach(timeIn => {
        workedDates.push(timeIn.date)
    })
    workedDates.forEach(workedDate => {
        let dailyWages = wagesEarnedOnDate(employee, workedDate)
        allWages.push(dailyWages)
    })
    const totalWages = allWages.reduce(function(memo, i) {return memo + i})
    return totalWages
}

function calculatePayroll(array) {
    const wagesForAllWorkers = []
    array.forEach(employee => {
        const employeeWages = allWagesFor(employee)
        wagesForAllWorkers.push(employeeWages)
    })
    const grandTotal = wagesForAllWorkers.reduce(function(memo, i) {return memo + i})
    return grandTotal
}

function findEmployeeByFirstName(srcArray, firstName) {
    const matchingRecord = (srcArray.find(employee => employee.firstName == firstName))
    return matchingRecord
}