import React, { useState } from 'react';

const Marks_table = ({ onSubmission }) => {
  const [numColumns, setNumColumns] = useState(5); // Initial number of columns
  const [columns, setColumns] = useState([...Array(numColumns)].map(() => ({}))); // Initial columns state
  const [semNumber, setSemNumber] = useState('');
  const [sgpa, setSgpa] = useState('');

  const addColumn = () => {
    setNumColumns(numColumns + 1);
    setColumns([...columns, {}]);
  };

  const deleteColumn = (index) => {
    const updatedColumns = [...columns];
    updatedColumns.splice(index, 1);
    setNumColumns(numColumns - 1);
    setColumns(updatedColumns);
  };

  const handleSubmit = () => {
    // Validate if semNumber is provided
    if (!semNumber) {
      alert('Please enter a valid SEM NUMBER');
      return;
    }

    // Creating an object to store the submitted data
    const formData = {
      semNumber: semNumber,
      sgpa: sgpa,
      columns: columns.map((column, index) => ({
        subject: column.subject,
        month: column.month,
        finalGrade: column.finalGrade,
        credits: column.credits,
        status: column.status,
      })),
    };

    // Pass the submitted data to the callback
    onSubmission(formData);

    // Reset the state for the next input
    setSemNumber('');
    setSgpa('');
    setColumns([...Array(numColumns)].map(() => ({})));
    setColumns([]); 
  };

  return (
    <div className="container">
      <div className="card" style={{ width: '58rem' }}>
        <div className="card-header">
          SEM NUMBER:{' '}
          <input
            type="number"
            min="1"
            max="7"
            className="mb-3"
            value={semNumber}
            onChange={(e) => setSemNumber(e.target.value)}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title"></h5>
          <p className="card-text">
            <table className="table table-striped-columns mg-3">
              <thead>
                <tr>
                  <th> </th>
                  <th>Subject</th>
                  <th>Month & Year</th>
                  <th>Final Grade</th>
                  <th>Credits</th>
                  <th>Status(P/F)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {columns.map((column, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td className="table-active">
                      <input
                        className="form-control"
                        type="text"
                        onChange={(e) =>
                          setColumns([
                            ...columns.slice(0, index),
                            { ...columns[index], subject: e.target.value },
                            ...columns.slice(index + 1),
                          ])
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        type="month"
                        onChange={(e) =>
                          setColumns([
                            ...columns.slice(0, index),
                            { ...columns[index], month: e.target.value },
                            ...columns.slice(index + 1),
                          ])
                        }
                        required
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        type="text"
                        maxLength="1"
                        onChange={(e) =>
                          setColumns([
                            ...columns.slice(0, index),
                            { ...columns[index], finalGrade: e.target.value },
                            ...columns.slice(index + 1),
                          ])
                        }
                        required
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        type="text"
                        onChange={(e) =>
                          setColumns([
                            ...columns.slice(0, index),
                            { ...columns[index], credits: e.target.value },
                            ...columns.slice(index + 1),
                          ])
                        }
                        required
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        type="text"
                        maxLength="1"
                        onChange={(e) =>
                          setColumns([
                            ...columns.slice(0, index),
                            { ...columns[index], status: e.target.value },
                            ...columns.slice(index + 1),
                          ])
                        }
                        required
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteColumn(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </p>
          <div>
            SGPA:{' '}
            <input
              type="number"
              value={sgpa}
              onChange={(e) => setSgpa(e.target.value)}
            />
          </div>
          <br />
          <div>
            <button
              className="btn btn-dark"
              type="button"
              onClick={addColumn}
            >
              Add Column
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marks_table;
