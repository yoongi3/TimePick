import styled from "styled-components"

const Container = styled.div`
    background-color : #FFFFFF;
    color : #3D5A80;
    font-size : 64px;
    text-align : center;
    padding : 1vw;
`

function Header(){
    return (
        <div>
        <Container>WEBPAGE NAME</Container>
        </div>
    )
};

export default Header