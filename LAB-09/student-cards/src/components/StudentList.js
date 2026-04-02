import React from 'react';
import StudentCard from './StudentCard';

const StudentList = () => {
  // Array of student data (can be easily extended)
  const students = [
    {
      name: "Aswitha chandra",
      department: "Computer Science & Engineering",
      marks: 92,
      rollNo: "CSE21001"
    },
    {
      name: "Sujay chandra",
      department: "Electronics & Communication",
      marks: 85,
      rollNo: "ECE21015"
    },
    {
      name: "Abhi nav chandra",
      department: "Mechanical Engineering",
      marks: 78,
      rollNo: "ME21008"
    },
    {
      name: "Bharath chandra",
      department: "Information Technology",
      marks: 95,
      rollNo: "IT21022"
    },
    {
      name: "Saharsha chandra",
      department: "Civil Engineering",
      marks: 67,
      rollNo: "CE21010"
    }
  ];

  return (
    <div className="student-list">
      <h2>Student Performance Cards</h2>
      <div className="cards-container">
        {students.map((student, index) => (
          <StudentCard
            key={index}
            name={student.name}
            department={student.department}
            marks={student.marks}
            rollNo={student.rollNo}
          />
        ))}
      </div>
    </div>
  );
};

export default StudentList;