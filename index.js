// Your code here
function createEmployeeRecord(array) {
  let employee = {}
  employee.firstName = array[0]
  employee.familyName = array[1]
  employee.title = array[2]
  employee.payPerHour = array[3]
  employee.timeInEvents = []
  employee.timeOutEvents = []
  return employee
}

function createEmployeeRecords(nested_array) {
  let employeeRecords = nested_array.map( array => {
    let employee = {}
    employee.firstName = array[0]
    employee.familyName = array[1]
    employee.title = array[2]
    employee.payPerHour = array[3]
    employee.timeInEvents = []
    employee.timeOutEvents = []
    return employee
  })
  return employeeRecords
}

function createTimeInEvent(employeeRecord, clockInTime) {
  let timeEvent = {}
  timeEvent.type = 'TimeIn'
  timeEvent.date = clockInTime.split(' ')[0]
  timeEvent.hour = parseInt(clockInTime.split(' ')[1], 10)
  employeeRecord.timeInEvents.push(timeEvent)

  return employeeRecord
}

function createTimeOutEvent(employeeRecord, clockOutTime){
  let timeEvent = {}
  timeEvent.type = 'TimeOut'
  timeEvent.date = clockOutTime.split(' ')[0]
  timeEvent.hour = parseInt(clockOutTime.split(' ')[1], 10)
  employeeRecord.timeOutEvents.push(timeEvent)

  return employeeRecord
}

let hoursWorkedOnDate = function(employee, soughtDate){
  let inEvent = employee.timeInEvents.find(function(e){
      return e.date === soughtDate
  })

  let outEvent = employee.timeOutEvents.find(function(e){
      return e.date === soughtDate
  })

  return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateSought){
  let rawWage = hoursWorkedOnDate(employee, dateSought)
      * employee.payPerHour
  return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee){
  let eligibleDates = employee.timeInEvents.map(function(e){
      return e.date
  })

  let payable = eligibleDates.reduce(function(memo, d){
      return memo + wagesEarnedOnDate(employee, d)
  }, 0)

  return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
return srcArray.find(function(rec){
  return rec.firstName === firstName
})
}

let calculatePayroll = function(arrayOfEmployeeRecords){
  return arrayOfEmployeeRecords.reduce(function(memo, rec){
      return memo + allWagesFor(rec)
  }, 0)
}