// Your code here
function createEmployeeRecord(array){
    const output = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return output;
}

function createEmployeeRecords(array){
   return array.map(record => createEmployeeRecord(record));
}

function createTimeInEvent(employeeRecord, date){
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(date.split(" ")[1]),
        date: date.split(" ")[0]
    })
    return employeeRecord
}
function createTimeOutEvent(employeeRecord, date){
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(date.split(" ")[1]),
        date: date.split(" ")[0]
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
    const timeIn = employeeRecord.timeInEvents.find(event => event.date == date);
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date == date);

    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, date){
    const hrs = hoursWorkedOnDate(employeeRecord, date);
    return employeeRecord.payPerHour * hrs;
}

function allWagesFor(employeeRecord){
   const dates = employeeRecord.timeInEvents.map(e => e.date);
   return dates.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0)
}

function findEmployeeByFirstName(array, firstName){
    return array.find(e => e.firstName == firstName);
}

function calculatePayroll(records){
    return records.reduce((total, employee) => total + allWagesFor(employee), 0)
}