// Your code here
// Your code here
 //array =  ["Loki", "Laufeysson-Odinsson", "HR Representative", 35]
 let createEmployeeRecord  = (array) => {
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
    
    function createEmployeeRecords(array){
        let employeeRecords = array.map(e => createEmployeeRecord(e))
        return employeeRecords
    }
    
    function createTimeInEvent(employee, dateSt) {
        let [date, hour] = dateSt.split(' ')
        
        employee.timeInEvents.push({
            type: 'TimeIn',
            hour: parseInt(hour, 10),
            date
        })
        return employee
    }
    function createTimeOutEvent(employee, dateSt) {
        let [date, hour] = dateSt.split(' ')
        
        employee.timeOutEvents.push({
            type: 'TimeOut',
            hour: parseInt(hour, 10),
            date
        })
        return employee
    }
    
     function hoursWorkedOnDate (employee, dateSt){
        let inEvent = employee.timeInEvents.find(function(e){
            return e.date === dateSt
        })
    
        let outEvent = employee.timeOutEvents.find(function(e){
            return e.date === dateSt
        })
    
        return (outEvent.hour - inEvent.hour) / 100
    }
    
    function wagesEarnedOnDate(employee, dateSt){
     let earningInfo = hoursWorkedOnDate(employee, dateSt) * employee.payPerHour
    return  earningInfo
    }

    function allWagesFor(employee){
        let total = 0
        employee.timeInEvents.forEach(timeIn => total+= wagesEarnedOnDate(employee, timeIn.date))
        return total
    }

    let findEmployeeByFirstName = function(srcArray, firstName) {
        return srcArray.find( rec => {
          return rec.firstName === firstName
        })
    }

    function calculatePayroll(employees){
        let total = 0
        employees.forEach(employee => total+= allWagesFor(employee))
        return total
     }