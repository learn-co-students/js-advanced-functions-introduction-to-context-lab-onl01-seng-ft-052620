// Your code here

function createEmployeeRecord(arrayOfInfo){
let employee = {
    firstName: arrayOfInfo[0],
    familyName: arrayOfInfo[1],
    title: arrayOfInfo[2],
    payPerHour: arrayOfInfo[3],
    timeInEvents:[],
    timeOutEvents:[]
}
return employee

}

function createEmployeeRecords(array){
    let employees = array.map(element => createEmployeeRecord(element))
    return employees
}

function createTimeInEvent(employee, time){
    employee["timeInEvents"].push({
        type: "TimeIn",
        hour: parseInt(time.split(" ")[1], 10),
        date: time.split(" ")[0]
     
})
return employee
}

function createTimeOutEvent(employee, time){
    employee["timeOutEvents"].push({
        type: "TimeOut",
        hour: parseInt(time.split(" ")[1], 10),
        date: time.split(" ")[0]
     
})
return employee
}

function hoursWorkedOnDate (employee, date){
    let timeInOnDate = employee.timeInEvents.find(timeIn => timeIn.date === date)
    let timeOutOnDate = employee.timeOutEvents.find(timeOut => timeOut.date === date)
    let hoursWorked = timeOutOnDate.hour - timeInOnDate.hour
    return hoursWorked/100
}


function wagesEarnedOnDate(employee, date){
    let hoursWorked = hoursWorkedOnDate(employee, date)
    return hoursWorked * employee.payPerHour


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