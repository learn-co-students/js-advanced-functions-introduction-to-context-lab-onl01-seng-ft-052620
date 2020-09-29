// Your code here
function createEmployeeRecord(recordInput){
    const employeeRecord = {
        firstName: recordInput[0],
        familyName: recordInput[1],
        title: recordInput[2],
        payPerHour: recordInput[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord
}

function createEmployeeRecords(twoInputs){
   return twoInputs.map(input => createEmployeeRecord(input))
}

function createTimeInEvent(employeeRecord, timeIn){
    const time = timeIn.split(" ")
    const date = time[0]
    const hr = time[1]
    const newTimeIn = {type: "TimeIn", hour: parseInt(hr, 10), date: date}
    employeeRecord.timeInEvents.push(newTimeIn)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, timeOut){
    const time = timeOut.split(" ")
    const date = time[0]
    const hr = time[1]
    const newTimeOut = {type: "TimeOut", hour: parseInt(hr, 10), date: date}
    employeeRecord.timeOutEvents.push(newTimeOut)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
    let timeIn;

   for(const recordDateIn of employeeRecord.timeInEvents){
        if (recordDateIn.date === date){
            timeIn = recordDateIn.hour
            for(const recordDateOut of employeeRecord.timeOutEvents)
            if (recordDateOut.date === date){
                return ((recordDateOut.hour - timeIn)/100)
            }
        }
    }
    // if ((employeeRecord.timeInEvents[0].date === date) && (employeeRecord.timeOutEvents[0].date ==))
}
function wagesEarnedOnDate(employeeRecord, date){
    const hr = hoursWorkedOnDate(employeeRecord, date)
    return (employeeRecord.payPerHour * hr)
}

function allWagesFor(employeeRecord){
    let payOwedForDates = 0;
    for(const recordDateIn of employeeRecord.timeInEvents){
        payOwedForDates += wagesEarnedOnDate(employeeRecord, recordDateIn.date);
    }
    return payOwedForDates
}

function findEmployeeByFirstName(srcArray, firstName){
    for (const employee of srcArray){
        if (employee.firstName === firstName){
            return employee
        } 
    }
}

function calculatePayroll(employeeRecords){
    let payroll = 0;
    for(const employeeRecord of employeeRecords){
        payroll += allWagesFor(employeeRecord);
    }
    return payroll
}