import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 10px;
    align-items: center;
`;

const Button = (props) => {
    return (
        <Container>
            <button onClick = {props.clicked}>{props.children}</button>
        </Container>
    )
}

export default Button;