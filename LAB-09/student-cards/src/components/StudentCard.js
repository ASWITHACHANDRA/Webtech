import React from 'react';

const StudentCard = (props) => {
  const { name, department, marks, rollNo } = props;

  // Calculate grade based on marks
  const getGrade = (marks) => {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B';
    if (marks >= 60) return 'C';
    return 'D';
  };

  return (
    <div className="student-card">
      <div className="card-header">
        <h3>{name}</h3>
        <span className="roll-no">#{rollNo}</span>
      </div>
      
      <div className="card-body">
        <p><strong>Department:</strong> {department}</p>
        <p><strong>Marks:</strong> {marks}/100</p>
        <p><strong>Grade:</strong> 
          <span className={`grade ${getGrade(marks).toLowerCase()}`}>
            {getGrade(marks)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default StudentCard;