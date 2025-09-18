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
  target,
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
  target?: "_self" | "_blank";
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

  const resolvedTarget = target ?? "_blank";
  const relParts: string[] = [];

  if (resolvedTarget === "_blank") {
    relParts.push("noopener", "noreferrer");
    if (rel && rel !== "follow") {
      relParts.push(rel);
    }
    if (!rel) {
      relParts.push("nofollow");
    }
  } else if (rel && rel !== "follow") {
    relParts.push(rel);
  }

  const relAttr = relParts.length > 0 ? relParts.join(" ") : undefined;

  return (
    <a
      href={link}
      target={resolvedTarget}
      rel={relAttr}
      className={`${type ? type : "btn"} ${getButtonStyle()} ${
        icon && "flex justify-center items-center gap-3 "
      } ${className}`}
    >
      {label}
      {icon && <DynamicIcon icon={icon} />}
    </a>
  );
};

export default Button;
