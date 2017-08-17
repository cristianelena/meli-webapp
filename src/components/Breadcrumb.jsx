import React from "react";
import "./Breadcrumb.css";

const Breadcrumb = (props) =>  <ul className="breadcrumb">{ props.paths.map((path, key) => <li key={ key }>{ path }</li>) }</ul>;

export default Breadcrumb;
