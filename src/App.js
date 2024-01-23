import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
function App() {
  const [expandedRows, setExpandedRows] = useState([0, 1]);
  const [data, setData] = useState([
    {
      id: Math.random().toFixed(2),
      name: "Parent 1",
      children: [
        {
          id: Math.random().toFixed(4),
          name: "Child 1",
        },
        {
          id: Math.random().toFixed(4),
          name: "Child 2",
        },
      ],
    },
    {
      id: Math.random().toFixed(2),
      name: "Parent 2",
      children: [
        {
          id: Math.random().toFixed(4),
          name: "Child 3",
        },
        {
          id: Math.random().toFixed(4),
          name: "Child 4",
        },
        {
          id: Math.random().toFixed(4),
          name: "child 5",
        },
      ],
    },
    // Add more data as needed
  ]);
  // Toggle function to expand/collapse rows
  const toggleRow = (index) => {
    const currentIndex = expandedRows.indexOf(index);
    const newExpandedRows = [...expandedRows];
    if (currentIndex === -1) {
      newExpandedRows.push(index);
    } else {
      newExpandedRows.splice(currentIndex, 1);
    }
    setExpandedRows(newExpandedRows);
  };
  const addParent = (id, index) => {
    data.splice(index + 1, 0, {
      id: Math.random().toFixed(2),
      children: [{ id: "", name: "" }],
      name: "New parent",
    });
    setData(data);
    expandRowFunction();
    // setExpandedRows([index]);
  };
const deleteParent = (id, index) => {
   let filteredValue =  data.filter((x, id) => index !== id);
   console.log("Filtered Value : ", filteredValue)
    setData(filteredValue);
    expandRowFunction();
    // setExpandedRows([index]);
  };
  const childRow = (childId, parentId, index, parentIndex) => {
    data.forEach((element, idx) => {
      if (parentId === element.id) {
        element.children.splice(index + 1, 0, {
          id: Math.random().toFixed(2),
          name: "newChild",
        });
        element.children.join();
      }
    });
    expandRowFunction();
    // setExpandedRows([parentIndex]);
  };
  const deleteChildRow = (childId, parentId, index, parentIndex) => {
    data.forEach((element, idx) => {
      if (parentId === element.id) {
      let filteredValue = element.children.filter((ele,idx) => idx !== index);
        element.children = filteredValue;
      }
    });
    expandRowFunction();
    // setExpandedRows([parentIndex]);
  };
  const expandRowFunction = () => {
    let arr = [];
    data.forEach((ele, idx) => {
      arr.push(idx);
    });
    setExpandedRows(arr);
  };
  return (
    <table style={{ width: "75%" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <React.Fragment key={row.id}>
            <tr>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>
                <button onClick={() => addParent(row.id, index)}>Add</button>
              </td>
               <td>
                <button onClick={() => deleteParent(row.id, index)}>Delete</button>
              </td>
              <td
                onClick={() => {
                  toggleRow(index);
                }}
              >
                {expandedRows.includes(index) ? "▼" : "►"}
              </td>
            </tr>

            {expandedRows.includes(index) && (
              <tr>
                {row.children.map((child, idx) => {
                  return (
                    <React.Fragment key={child.id}>
                      <div style={{ display: "flex" }}>
                        <td style={{ paddingLeft: "25rem" }}>{child.id}</td>
                        <td style={{ paddingLeft: "25rem" }}>{child.name}</td>
                        <td style={{ paddingLeft: "25rem" }}>
                          <button
                            onClick={() =>
                              childRow(child.id, row.id, idx, index)
                            }
                          >
                            Add Child
                          </button>
                        </td>
                            <td style={{ paddingLeft: "25rem" }}>
                          <button
                            onClick={() =>
                              deleteChildRow(child.id, row.id, idx, index)
                            }
                          >
                            Delete Child
                          </button>
                        </td>
                      </div>
                    </React.Fragment>
                  );
                })}
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default App;
