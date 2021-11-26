import React from "react";

import { ReactComponent as CheckIcon } from "assets/icons/check-circle-fill.svg";

import { StorageOrderFormBody } from "../StorageOrderFormBody";

const bodyStyle: React.CSSProperties = {
  display: "grid",
  placeItems: "center",
  padding: "10% 0",
};

const headingStyle: React.CSSProperties = {
  marginTop: "2rem",
  fontSize: "2rem",
};

const captionStyle: React.CSSProperties = {
  color: "lightgrey",
  marginTop: "0.25rem",
};

const Success = () => {
  return (
    <StorageOrderFormBody style={bodyStyle}>
      <CheckIcon fontSize="5rem" color="lightgreen" />
      <p style={headingStyle}>Success!</p>
      <span style={captionStyle}>
        Now you can go and buy a real cloud storage :)
      </span>
    </StorageOrderFormBody>
  );
};

export { Success };
