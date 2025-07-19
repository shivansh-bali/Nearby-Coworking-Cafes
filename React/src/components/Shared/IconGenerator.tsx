import React from "react";
import { FaUserCircle } from "react-icons/fa";
import {colorMapping} from '../../constant'
interface IconProps {
  name?: string;
  data?: string;
}

const IconGenerator: React.FC<IconProps> = ({ name, data }) => {
  const getInitials = (name: string): string => {
    const words = name.split(" ");
    const initials = words
      .filter((word) => word.length > 0)
      .map((word) => word[0].toUpperCase())
      .slice(0, 2)
      .join("");

    return initials;
  };

  const getColorByLetter = (letter: string): string => {

    // Convert the letter to uppercase to match the mapping keys
    const uppercaseLetter = letter.toUpperCase();

    // Check if a color is defined for the letter
    if (uppercaseLetter in colorMapping) {
      return colorMapping[uppercaseLetter];
    }

    // Return a default color if no mapping is found
    return "#000000"; // Default color (black)
  };

  const initials = getInitials(name ? name : "");
  const firstLetter = initials.charAt(0);
  const color = getColorByLetter(firstLetter);

  const profileStyle = {
    width: "127px",
    height: "127px",
    borderRadius: "50%",
    backgroundColor: name ? color : "rgb(144 143 143)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "16px",
    fontWeight: "bold",
    color: "rgb(255, 255, 255)",
    marginLeft: "3px",
  }

  const userStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: name ? color : "rgb(144 143 143)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#ffffff", // For text color
    marginRight: "10px",
    cursor: "pointer",
  }

  const reviewStyle = {
    width: "56px",
    height: "56px",
    borderRadius: "13px",
    backgroundColor: name ? color : "rgb(144 143 143)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "16px",
    fontWeight: "bold",
    color: "rgb(0 0 0)",
    marginRight: "10px",
    cursor: "pointer",
}

const userProfileStyle = {
  width: "61px",
  height: "61px",
  borderRadius: "50%",
  backgroundColor: name ? color : "rgb(144 143 143)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "16px",
  fontWeight: "bold",
  color: "rgb(0 0 0)",
  marginRight: "10px",
  cursor: "pointer",
}


const itemUserProfileStyle = {
  width: "23px",
  height: "23px",
  borderRadius: "50%",
  backgroundColor: name ? color : "rgb(144 143 143)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "12px",
  fontWeight: "bold",
  color: "rgb(0 0 0)",
  cursor: "pointer",
}

  return (
    <div
      style={data==="true" ? userStyle : data==="review" ? reviewStyle : data==="userProfile" ? userProfileStyle : data==="itemUser" ? itemUserProfileStyle : profileStyle}
    >
      {name ? initials : <FaUserCircle style={{ fontSize: "40px" }} />}
    </div>
  );
};

export default IconGenerator;
