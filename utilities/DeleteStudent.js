const students = JSON.parse(window.localStorage.getItem("students"));
 function DeleteStudent(id) {
  let SafeStudents = [];
  let student;
  for (let i = 0; i < students.length; i++) {
    student = students[i];

    if (student.id == id) continue;
    SafeStudents.push(student);
  }



  window.localStorage.setItem("students", JSON.stringify(SafeStudents));
}
