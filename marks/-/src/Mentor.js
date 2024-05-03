import React from 'react';

const Mentor = ({ semNumber, columns, sgpa }) => {
  return (
    <div className="container">
      <div className="card" style={{ width: '58rem' }}>
        <div className="card-header">
          SEM NUMBER: {semNumber}
        </div>
        <div className="card-body">
          <h5 className="card-title"></h5>
          <p className="card-text">
            {semNumber && (
              <table className="table table-striped-columns mg-3">
                <thead>
                  <tr>
                    <th> </th>
                    <th>Subject</th>
                    <th>Month & Year</th>
                    <th>Final Grade</th>
                    <th>Credits</th>
                    <th>Status(P/F)</th>
                  </tr>
                </thead>
                <tbody>
                  {columns.map((column, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td className="table-active">{column.subject}</td>
                      <td>{column.month}</td>
                      <td>{column.finalGrade}</td>
                      <td>{column.credits}</td>
                      <td>{column.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </p>
          {semNumber && (
            <div>SGPA: {sgpa}</div>
          )}
          <br />
        </div>
      </div>
    </div>
  );
};

export default Mentor;
