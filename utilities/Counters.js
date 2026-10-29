const students = JSON.parse(window.localStorage.getItem("students"));
export function Counters(id, status) {
  let UpdateStudents = [];
  let student;
  for (let i = 0; i < students.length; i++) {
    student = students[i];

    if (student.id == id) {
      student.status = status;
      UpdateStudents.push(student);
      continue;
    }
    UpdateStudents.push(student);
  }

  window.localStorage.setItem("students", JSON.stringify(UpdateStudents))
}
