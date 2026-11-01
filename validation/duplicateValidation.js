

export function duplicateValidation(phone) {
    const students = JSON.parse(window.localStorage.getItem("students"))
    let student;
    for(let i = 0; i < students.length; i++) {
        student = students[i];
        if(student.phone == phone) return true
    }
   return false
}