const readline = require("readline-sync");
const fs = require("fs");
const dataFilePath = "student.json";

try {
  const dataStr = fs.readFileSync(dataFilePath, "utf8");
  var studentJSON = JSON.parse(dataStr);
} catch (err) {
  console.error(err);
}

var showMenu = () => {
  console.log("Quản lý học sinh");
  console.log("===============================");
  console.log("1. Hiển thị tất cả học sinh");
  console.log("2. Thêm mới học sinh");
  console.log("3. Xóa 1 học sinh theo ID");
  console.log("4. Xóa nhiều học sinh theo ID");
  console.log("5. Sửa thông tin học sinh");
  console.log("6. Tìm kiếm học sinh theo tên");
  console.log("7. Tìm kiếm học sinh thủ khoa vào trường");
  console.log("8. Hiển thị danh sách học sinh bị cảnh cáo");
  console.log("9. Sắp xếp học sinh theo bảng chữ cái");
  console.log("10. Sắp xếp học sinh theo điểm trung bình tăng dần");
  console.log("11. Sắp xếp học sinh theo tuổi tăng dần");
  console.log("12. Exit");
  console.log("===============================");
};

// Hiển thị tất cả học sinh
var showStudents = () => {
  console.log("List students");
  console.log("===============================");
  console.log(`ID | Name | Age | Gender | Point in | Point avg`);
  console.log(
    "----------------------------------------------------------------"
  );
  studentJSON.map((student) => {
    console.log(
      `${student.id} | ${student.name} | ${student.age} | ${student.gender} | ${student.pointIn} | ${student.pointAvg}`
    );
    console.log(
      "----------------------------------------------------------------"
    );
  });
};

// Thêm mới học sinh
var addStudent = () => {
  const name = readline.question("Name: ");
  const age = readline.question("Age: ");
  const gender = readline.question("Grader: ");
  const pointIn = readline.question("Point In: ");
  const pointAvg = readline.question("Point Average: ");

  const student = {
    id: studentJSON.length + 1,
    name,
    age,
    gender,
    pointIn,
    pointAvg,
  };

  studentJSON.push(student);
  fs.writeFileSync(dataFilePath, JSON.stringify(studentJSON, null, 2));
};

// Xóa 1 học sinh theo ID
var deleteStudentByID = () => {
  function deleteStudentById(id) {
    const index = studentJSON.findIndex((student) => student.id === id);
    if (index !== -1) {
      studentJSON.splice(index, 1);
      console.log(`Sinh viên có ID ${id} đã bị xóa khỏi file.`);
    } else {
      console.log(`Không tìm thấy sinh viên có ID ${id} trong file.`);
    }
  }
  const id = readline.question("Enter the student ID to delete: ");
  deleteStudentById(parseInt(id));
  fs.writeFileSync(dataFilePath, JSON.stringify(studentJSON, null, 2));
};

// Xóa nhiều học sinh theo ID
var deleteStudentsByID = () => {
  const inputIds = readline.question("List ID need delete (Eg 1,2,...): ");
  const ids = inputIds.split(",");
  data = studentJSON.filter((student) => !ids.includes(student.id.toString()));
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  console.log(`Đã xóa sinh viên với các ID: ${ids.join(", ")} thành công!`);
};

// Sửa thông tin học sinh
var editStudent = () => {
  const id = readline.question("Enter the student ID to edit: ");
  const name = readline.question("Name: ");
  const age = readline.question("Age: ");
  const gender = readline.question("Grader: ");
  const pointIn = readline.question("Point In: ");
  const pointAvg = readline.question("Point Average: ");

  const index = studentJSON.findIndex((student) => student.id === parseInt(id));
  if (index !== -1) {
    studentJSON[index].name = name;
    studentJSON[index].age = age;
    studentJSON[index].gender = gender;
    studentJSON[index].pointIn = pointIn;
    studentJSON[index].pointAvg = pointAvg;
    fs.writeFileSync(dataFilePath, JSON.stringify(studentJSON, null, 2));
  } else {
    console.log(`Không tìm thấy sinh viên có ID ${id} trong file.`);
  }
};

// Tìm kiếm học sinh theo tên
var findStudentByName = () => {
  const nameFind = readline.question("Enter the name in: ");
  data = studentJSON.filter((student) => student.name === nameFind);
  const index = studentJSON.findIndex((student) => student.name === nameFind);
  if (index !== -1) {
    console.log(data);
  } else {
    console.log(`Không tìm thấy sinh viên có tên ${nameFind} trong file.`);
  }
};

// Tìm kiếm học sinh thủ khoa vào trường
var findTopPointStudent = () => {
  data = studentJSON.sort((a, b) => b.pointAvg - a.pointAvg);
  console.log(data[0]);
};

// Hiển thị danh sách học sinh bị cảnh cáo
var showStudentsWithWarnings = () => {
  data = studentJSON.sort((a, b) => b.pointAvg - a.pointAvg);
  data.forEach((student) => {
    if (student.pointAvg <= 4) {
      console.log(student);
    }
  });
};

// Sắp xếp học sinh theo bảng chữ cái
var sortStudentNameByAlphabet = () => {
  data = studentJSON.sort((a, b) => a.name.localeCompare(b.name));
  console.log(data);
};

// Sắp xếp học sinh theo điểm trung bình tăng dần
var sortStudentsByAverageScore = () => {
  data = studentJSON.sort((a, b) => b.pointAvg - a.pointAvg);
  console.log(data);
};

// Sắp xếp học sinh theo tuổi tăng dần
var sortStudentsByAge = () => {
  data = studentJSON.sort((a, b) => a.age - b.age);
  console.log(data);
};

//Giao tiếp Terminal
var main = () => {
  while (true) {
    showMenu();
    const strChoise = "Your choise (Eg 1): ";
    var choice = readline.question(strChoise);
    switch (choice) {
      case "1":
        showStudents();
        break;
      case "2":
        addStudent();
        break;
      case "3":
        deleteStudentByID();
        break;
      case "4":
        deleteStudentsByID();
        break;
      case "5":
        editStudent();
        break;
      case "6":
        findStudentByName();
        break;
      case "7":
        findTopPointStudent();
        break;
      case "8":
        showStudentsWithWarnings();
        break;
      case "9":
        sortStudentNameByAlphabet();
        break;
      case "10":
        sortStudentsByAverageScore();
        break;
      case "11":
        sortStudentsByAge();
        break;
      case "12":
        process.exit();
        break;
      default:
        console.log("Lựa chọn không hợp lệ");
    }
  }
};

main();
