import React, { useState } from 'react';

function Marks_table() {
  const [numColumns, setNumColumns] = useState(5); // Initial number of columns

  const addColumn = () => {
    // Increment the number of columns
    setNumColumns(numColumns + 1);
  };

  return (
    <div className='container'>
      <div className="card" style={{ width: "58rem" }}>
        <div className="card-header">
          SEM NUMBER: <input type='number' min="1" max="7" className="mb-3" />
        </div>
        <div className="card-body">
          <h5 className="card-title"></h5>
          <p className="card-text">
            <table >
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
                {[...Array(numColumns)].map((_, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td className="table-active"><input className="form-control" type="text" readOnly /></td>
                    <td><input className="form-control" type="month" /></td>
                    <td><input className="form-control" type="text" readOnly maxLength="1" required /></td>
                    <td><input className="form-control" type="text" readOnly required /></td>
                    <td><input className="form-control" type="text" readOnly maxLength="1" required /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </p>
          <div> SGPA: <input type="number" step="0.01" onInput="limitDecimalPlaces(this, 2)" /></div><br />
          <div>
            <button className="btn btn-dark" type="button" onClick={addColumn}>
              Add Column
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Marks_table;
