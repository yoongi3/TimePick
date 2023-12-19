import styled from "styled-components";

const commonButtonStyles = `
    padding: 2px 10px;
    font-size: 14px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
`;

export const StyledAuthButton = styled.button`
    ${commonButtonStyles}
    background-color: #E0FBFC;
    color: #3D5A80;

    &:hover {
        background-color: #EE6C4D;
        color: #FFFFFF;
    }
`;

export const StyledDefaultButton = styled.button`
    ${commonButtonStyles}
    background-color: #EE6C4D;
    color: #FFFFFF;

    &:hover {
        background-color: #E0FBFC;
        color: #3D5A80;
    }
`;