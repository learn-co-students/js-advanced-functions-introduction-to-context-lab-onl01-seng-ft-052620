function createEmployeeRecord(recordAry){
  return {
    firstName: recordAry[0],
    familyName: recordAry[1],
    title: recordAry[2],
    payPerHour: recordAry[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(recordsAry){
  return recordsAry.map(createEmployeeRecord);
}

function createTimeInEvent(record, dateStamp){
  return createTimeEvent("timeIn", record, dateStamp);
}

function createTimeOutEvent(record, dateStamp){
  return createTimeEvent("timeOut", record, dateStamp);
}

function createTimeEvent(type, record, dateStamp){
  const [date, hour] = dateStamp.split(" ")
  record[type + "Events"].push({
    type: type[0].toUpperCase() + type.slice(1),
    date: date,
    hour: parseInt(hour, 10)
  });
  return record
}

function hoursWorkedOnDate(record, date){
  const timeInEvent = record.timeInEvents.find((event)=>event.date === date)
  const timeOutEvent = record.timeOutEvents.find((event)=>event.date === date)
  return (timeOutEvent.hour - timeInEvent.hour)/100;
}

function wagesEarnedOnDate(record, date){
  return record.payPerHour*hoursWorkedOnDate(record, date);
}

function allWagesFor(record){
  const datesWorked = record.timeOutEvents.map((event)=>event.date)
  return datesWorked.reduce((totalWages, date)=> {
    return totalWages + wagesEarnedOnDate(record, date)
  }, 0)
}

function findEmployeeByFirstName(recordsAry, firstName){
  return recordsAry.find((record)=>record.firstName === firstName)
}

function calculatePayroll(recordsAry){
  return recordsAry.reduce((totalWages, record)=>{
    return totalWages + allWagesFor(record);
  }, 0);
}
