// Your code here
function createEmployeeRecord (fourElmentArray) {
  return {
    firstName: fourElmentArray[0],
    familyName: fourElmentArray[1],
    title: fourElmentArray[2],
    payPerHour: fourElmentArray[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords (arrayOfArrays) {
  return arrayOfArrays.map(function(array) {
    return createEmployeeRecord(array)
  })
}

function createTimeInEvent (employee, dateStamp) {
  let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date 
    })
    return employee
}

function createTimeOutEvent (employee, dateStamp) {
  let [date, hour] = dateStamp.split(' ')

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  })
  return employee
}

function hoursWorkedOnDate (employee, onDate) {
  let inTime = employee.timeInEvents.find(timeInEvent => 
    timeInEvent.date === onDate
  )

  let outTime = employee.timeOutEvents.find(timeOutEvent => 
    timeOutEvent.date === onDate
  )

  return (outTime.hour - inTime.hour) / 100
}

function wagesEarnedOnDate (employee, onDate) {
  return employee.payPerHour * hoursWorkedOnDate (employee, onDate)
}

function allWagesFor (employee) {
  let dates = employee.timeInEvents.map(timeIn => timeIn.date)
  let wages = dates.map(date => wagesEarnedOnDate(employee, date))
  return wages.reduce((a, b) => a + b, 0)
}

function findEmployeeByFirstName (srcArray, firstName) {
  return srcArray.find(src => src.firstName.toLowerCase() === firstName.toLowerCase())
}

function calculatePayroll (allEmployees) {
  return allEmployees.map(employee => allWagesFor(employee)).reduce((a, b) => a+ b, 0)
}
