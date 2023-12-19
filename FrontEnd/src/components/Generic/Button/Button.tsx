import { ReactNode, CSSProperties, MouseEventHandler } from "react";
import { StyledDefaultButton, StyledAuthButton } from "./ButtonStyle";
type ButtonProps = {
    children: ReactNode;
    style?: CSSProperties;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ children, onClick }: ButtonProps) => {
    return(
        <StyledDefaultButton onClick={onClick}>
            {children}
        </StyledDefaultButton>
    );
};

export const AuthButton = ({ children, style, onClick }: ButtonProps) => {
    return(
        <StyledAuthButton style={style} onClick={onClick}>
            {children}
        </StyledAuthButton>
    );
};