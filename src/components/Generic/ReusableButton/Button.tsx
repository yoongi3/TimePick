import { ReactNode, CSSProperties, MouseEventHandler } from "react";

type ButtonProps = {
    children: ReactNode;
    style?: CSSProperties;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}
const Button = ({ children, style, onClick }: ButtonProps) => {
    return(
        <button style={style} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button