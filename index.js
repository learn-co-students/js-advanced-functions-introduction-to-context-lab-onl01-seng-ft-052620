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

function createEmployeeRecords(arrays){
    let employee = arrays.map(element => createEmployeeRecord(element))
        return employee
    }
    
function createTimeInEvent(employeeObj, dateStamp){
    employeeObj["timeInEvents"].push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1], 10),
        date: dateStamp.split(" ")[0]
    })
    return employeeObj
}


function createTimeOutEvent(employeeObj, dateStamp){
    employeeObj["timeOutEvents"].push({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1], 10),
        date: dateStamp.split(" ")[0]

})
return employeeObj
}

function hoursWorkedOnDate(employeeObj, date){
    let timeInOnDate = employeeObj.timeInEvents.find(timeIn => timeIn.date === date)
    let timeOutOnDate = employeeObj.timeOutEvents.find(timeOut => timeOut.date === date)
    let hoursWorked = timeOutOnDate.hour - timeInOnDate.hour
    return hoursWorked/100
}

function wagesEarnedOnDate(employeeObj,date){
    let hoursWorked = hoursWorkedOnDate(employeeObj,date)
    return hoursWorked * employeeObj.payPerHour
}

function allWagesFor(employee){
    let total = 0
    employee.timeInEvents.forEach(timeIn => total+= wagesEarnedOnDate(employee, timeIn.date))
    return total
}


function calculatePayroll(employees){
   let total = 0
   employees.forEach(employee => total+= allWagesFor(employee))
   return total
}

function findEmployeeByFirstName(employees, name){
   return  employees.find(employee=> employee.firstName === name)
}  