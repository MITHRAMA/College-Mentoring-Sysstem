import React, { useState, useEffect } from 'react';
import Marks_table from './Marks_table';
import Mentor from './Mentor';

function MentorView() {
  const [semesters, setSemesters] = useState([]);
  const [showMyComponent, setShowMyComponent] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState(null);

  const handleButtonClick = () => {
    setShowMyComponent(!showMyComponent);
  };

  const handleSemesterButtonClick = (semNumber) => {
    setSelectedSemester(semNumber);
  };

  const handleSubmission = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/api/submitData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const dataFromServer = await response.json();

      setSemesters((prevSemesters) => {
        const existingSemesterIndex = prevSemesters.findIndex(
          (semester) => semester.semNumber === dataFromServer.semNumber
        );

        if (existingSemesterIndex !== -1) {
          // If semNumber already exists, update the existing entry
          const updatedSemesters = [...prevSemesters];
          updatedSemesters[existingSemesterIndex] = dataFromServer;
          return updatedSemesters;
        } else {
          // If semNumber doesn't exist, add a new entry
          return [...prevSemesters, dataFromServer];
        }
      });

      const isConfirmed = window.confirm('Do you want to submit the form and display the table?');
      if (isConfirmed) {
        alert('Form submitted successfully!');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/getData');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const dataFromServer = await response.json();
        setSemesters(dataFromServer);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='container'>
      
      

      
      <h2>Student Marks</h2>

      <div className="btn-group" role="group">
      {semesters
  .sort((a, b) => a.semNumber - b.semNumber) // Sort semesters in ascending order
  .map((semester, index) => (
    <button
      key={index}
      type="button"
      className={`btn ${selectedSemester === semester.semNumber ? 'btn-primary' : 'btn-secondary'}`}
      onClick={() => handleSemesterButtonClick(semester.semNumber)}
    >
      {semester.semNumber}
    </button>
  ))}

      </div>

      {selectedSemester && (
        <Mentor
          semNumber={selectedSemester}
          columns={semesters.find(semester => semester.semNumber === selectedSemester)?.columns || []}
          sgpa={semesters.find(semester => semester.semNumber === selectedSemester)?.sgpa}
        />
      )}
    </div>
  );
}

export default MentorView;
