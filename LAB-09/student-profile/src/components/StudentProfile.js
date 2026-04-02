import React from 'react';

const StudentProfile = () => {
  // Student details stored in JavaScript variables
  const studentName = "Aswitha chandra";
  const department = "Computer Science and Engineering";
  const year = "3rd Year";
  const section = "A";
  const rollNumber = "23BCE9744";
  const email = "aswithachandra@gmail.com";

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2>Student Profile</h2>
        </div>

        <div className="profile-body">
          <div className="profile-info">
            <h3>{studentName}</h3>
            <p><strong>Roll Number:</strong> {rollNumber}</p>
          </div>

          <div className="profile-details">
            <p>
              <strong>Department:</strong> {department}
            </p>
            <p>
              <strong>Year:</strong> {year}
            </p>
            <p>
              <strong>Section:</strong> {section}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
          </div>
        </div>

        <div className="profile-footer">
          <p>Built with React + JSX</p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;