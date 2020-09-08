function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrays) {
    return arrays.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employeeObj, timeStamp) {
    let time = timeStamp.split(" ");
    
    employeeObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time[1], 10),
        date: time[0]
    })

    return employeeObj;
} 

function createTimeOutEvent(employeeObj, timeStamp) {
    let time = timeStamp.split(" ");
    
    employeeObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time[1], 10),
        date: time[0]
    })

    return employeeObj;
} 

function hoursWorkedOnDate(employeeObj, date) {
    let checkIn = employeeObj.timeInEvents.find(record => {
        return record.date === date
    })

    let checkOut = employeeObj.timeOutEvents.find(record => {
        return record.date === date
    })

    return (checkOut.hour - checkIn.hour) / 100
}

function wagesEarnedOnDate(employeeObj, date) {
    return (hoursWorkedOnDate(employeeObj, date) * employeeObj.payPerHour)
}

function allWagesFor(employeeObj) {
    let dates = employeeObj.timeInEvents.map(record => {
        return record.date
    })
    
    
    let pay = dates.reduce(function(acc, time) {
        return acc + wagesEarnedOnDate(employeeObj, time)
    }, 0)

    return pay
}   

function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employee => {
        return employee.firstName === firstName;
    })
}

function calculatePayroll(employees) {
    return employees.reduce(function(acc, employee) {
        return acc + allWagesFor(employee)
    }, 0)
}