// Your code here
function createEmployeeRecord(employeeArr){
    return {
        firstName: employeeArr[0],
        familyName: employeeArr[1],
        title: employeeArr[2],
        payPerHour: employeeArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeesArr){
    return employeesArr.map(arr => createEmployeeRecord(arr))
}

function createTimeInEvent(employee, time){
    let timeArr = time.split(" ")

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(timeArr[1]),
        date: timeArr[0]
    })

    return employee
}

function createTimeOutEvent(employee, time){
    let timeArr = time.split(" ")

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(timeArr[1]),
        date: timeArr[0]
    })

    return employee
}

function hoursWorkedOnDate(employee,date){
    let timeInEvent = employee.timeInEvents.find(event => event.date === date)
    let timeOutEvent = employee.timeOutEvents.find(event => event.date === date)

    return (timeOutEvent.hour - timeInEvent.hour)/100
}

function wagesEarnedOnDate(employee, date){
    return hoursWorkedOnDate(employee,date) * employee.payPerHour
}

function allWagesFor(employee){
    let dates = employee.timeInEvents.map(e => e.date)

    return dates.reduce((total,date) => total + wagesEarnedOnDate(employee,date),0)
}

function findEmployeeByFirstName(employeesArr,firstName){
    return employeesArr.find(employee => employee.firstName === firstName)
}

function calculatePayroll(employeesArr){
    return employeesArr.reduce((total,employee) => total + allWagesFor(employee), 0)
}