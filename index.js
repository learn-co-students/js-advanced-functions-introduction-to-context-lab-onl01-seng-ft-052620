// Your code here
function createEmployeeRecord(arr){
    const newObj = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return newObj
}

function createEmployeeRecords(arrOfArr){
    return arrOfArr.map(function(arr){return createEmployeeRecord(arr)});
}

function createTimeInEvent(record, date){
    let h = parseInt(date.split(' ')[1],10)
    let d = date.split(' ')[0]

    let timeIn = {
        type: "TimeIn",
        hour: h,
        date: d
    }
    record.timeInEvents.push(timeIn)
    return record
}

function createTimeOutEvent(record, date){
    let h = parseInt(date.split(' ')[1],10)
    let d = date.split(' ')[0]

    let timeOut = {
        type: "TimeOut",
        hour: h,
        date: d
    }
    record.timeOutEvents.push(timeOut)
    return record
}

function hoursWorkedOnDate(record, date){
    let hoursWorked = 0
    let timeIn = record.timeInEvents.find(function(obj){return obj.date==date})
    let timeOut = record.timeOutEvents.find(function(obj){return obj.date==date})

    return hoursWorked = (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(record, date){
    
    let hours = hoursWorkedOnDate(record,date)
    return record.payPerHour * hours
}

function allWagesFor(record){
    let dates = record.timeInEvents.map(function(timeIn){
        return timeIn.date
    })
   
    return dates.reduce(function(memo, date){
        return memo + wagesEarnedOnDate(record, date)
    },0)

    
}

function findEmployeeByFirstName(records, firstName){
    return records.find(function(obj){
        return obj.firstName === firstName
    })
}

function calculatePayroll(records){
    return records.reduce(function(memo, record){
        return memo + allWagesFor(record)
    }, 0)
}