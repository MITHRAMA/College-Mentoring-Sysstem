// DisplaySemTables.js
import React from 'react';
import { Link } from 'react-router-dom';

const DisplaySemTables = ({ semesters }) => {
  return (
    <div>
      <h3 className='text-center'>Available Sem Tables</h3>
      <ul>
        {semesters.map((semester, index) => (
          <li key={index}>
            <Link to={`/sem/${semester.semNumber}`}>Semester {semester.semNumber}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplaySemTables;
