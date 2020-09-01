function createEmployeeRecord(arr){
   const record = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return record
}

function createEmployeeRecords(arrOfArrays){
    return arrOfArrays.map(arr => createEmployeeRecord(arr))
}

function createTimeInEvent(record, dateStamp){
    record.timeInEvents.push( {type: 'TimeIn', date: dateStamp.slice(0, 10), hour: parseInt(dateStamp.slice(-5))})
    return record
}

function createTimeOutEvent(record, dateStamp){
    record.timeOutEvents.push({type: "TimeOut", date: dateStamp.slice(0, 10), hour: parseInt(dateStamp.slice(-5))})
    return record
}

function hoursWorkedOnDate(record, date){
    let starting = record.timeInEvents.find(obj => obj.date == date)
    let ending = record.timeOutEvents.find(obj => obj.date == date)
    let hours = (ending.hour - starting.hour) / 100
    return hours 

}

function wagesEarnedOnDate(record, date){
    return hoursWorkedOnDate(record, date) * record.payPerHour
}


//I think this one should have been reduce but could't get it to work 
function allWagesFor(record){
    let total = 0
    record.timeInEvents.map(obj => total += wagesEarnedOnDate(record, obj.date))
    return total
}

//same story
function calculatePayroll(records){
    let sum = 0
    records.map(record => sum += allWagesFor(record))
    return sum
}

function findEmployeeByFirstName(records, firstName){
    return records.find(record => record.firstName === firstName)
}