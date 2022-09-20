import React from "react";
import "./filterDiv.scss";

export default function FilterDiv(props: any) {
  return (
    <section className="filters">
      <div className="filter-role">role</div>
      <div className="filter-hiring-regime">hiring</div>
      <div className="filter-salary">salary</div>
      <div className="filter-schooling">school</div>
    </section>
  );
}
