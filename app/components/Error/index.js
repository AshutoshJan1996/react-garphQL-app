import React from 'react';
import styled from 'styled-components';

const CenterContent = styled.div`
  display: flex;
  align-self: center;
`;

const Massage = styled.p`
    color: red;
`;

const ErrMassage = (props) => (
    <CenterContent>
        <Massage>{props.massage}</Massage>
    </CenterContent>
);

export default ErrMassage;