import React from "react";

export default ({ name, description, score }) => (
  <div class="card" style={{ width: 20 + "em" }}>
    <img src="https://picsum.photos/768" alt="ss" />
    <div className="card-body" style={{ textAlign: "center" }}>
      <h4 className="card-title">{name}</h4>
      <p className="card-text">{description}</p>
      <p className="card-text">{score}</p>
      <button>Vote</button>
    </div>
  </div>
);
