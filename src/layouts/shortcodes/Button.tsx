import DynamicIcon from "@/helpers/DynamicIcon";
import React from "react";

const Button = ({
  label,
  link,
  type,
  style = "primary",
  rel,
  className = "",
  icon,
}: {
  label: string;
  link: string;
  type?: string;
  style?:
    | "primary"
    | "secondary"
    | "transparent"
    | "light"
    | "outline"
    | "ghost";
  rel?: string;
  className?: string;
  icon?: any;
}) => {
  // Determine base button style
  const getButtonStyle = () => {
    switch (style) {
      case "secondary":
        return "btn-secondary";
      case "transparent":
        return "btn-transparent";
      case "light":
        return "btn-light";
      case "outline":
        return "btn-secondary";
      case "ghost":
        return "btn-ghost";
      default:
        return "btn-primary";
    }
  };

  return (
    <a
      href={link}
      target="_blank"
      rel={`noopener noreferrer ${
        rel ? (rel === "follow" ? "" : rel) : "nofollow"
      }`}
      className={`${type ? type : "btn"} ${getButtonStyle()} ${icon && "flex justify-center items-center gap-3 "} ${className}`}
    >
      {label}
      {icon && <DynamicIcon icon={icon} />}
    </a>
  );
};

export default Button;
