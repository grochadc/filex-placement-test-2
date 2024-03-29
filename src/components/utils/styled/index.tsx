import tw from "tailwind-styled-components";

type CustomButtonProps= {
  variant: string
}

export const StyledButton = tw.button<CustomButtonProps>`
p-2
rounded
m-2
${(props: any) => (props.disabled ? "text-gray-200" : "text-white")}
${(props: any) =>
  props.variant === "primary" && !props.disabled
    ? "bg-blue-500"
    : "bg-gray-500"}
`;
