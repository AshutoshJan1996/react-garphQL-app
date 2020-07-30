import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 75%;
    padding: 10px;
    box-sizing: border-box;
`;
const Lable = styled.label`
    font-weight: bold;
    display: block;
    margin-bottom: 8px;
`;

const Custinput = styled.input`
    outline: none;
    border: 1px solid #ccc;
    background-color: white;
    font: inherit;
    padding: 6px 10px;
    display: block;
    width: 100%;
    box-sizing: border-box;
`;

const Input = (props) => {

    return(
        <Container>
            <Lable>{props.label}</Lable>
            <Custinput
                type='text'
                onChange={props.changed}
                value={props.value} />
        </Container>
    )
}

export default Input;