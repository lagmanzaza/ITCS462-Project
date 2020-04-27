import React from "react";
// style={{ width: 20 + "em" }}
// <img src="https://picsum.photos/768" alt="ss" />
export default ({ name, description, score, id, onClick }) => (
  <div className="card">
    <div className="card-body" style={{ textAlign: "center" }}>
      <h4 className="card-title">Party Name: {name}</h4>
      <p className="card-text">Description: {description}</p>
      <p className="card-text">Score: {score}</p>
      <button onClick={() => onClick(id)}>Vote</button>
    </div>
  </div>
);
