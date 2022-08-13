import tw from "tailwind-styled-components";

export const StyledButton = tw.button`
p-2
rounded
${(props: any) => (props.disabled ? "text-gray-200" : "text-white")}
${(props: any) =>
  props.variant === "primary" && !props.disabled
    ? "bg-blue-500"
    : "bg-gray-500"}
`;
