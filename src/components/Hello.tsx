import * as React from 'react';
import styled from '@emotion/styled';

const Title = styled.h1`
  background-color: hotpink;
  padding: 10px 20px;
  color: white;
`;

export interface HelloProps {
  compiler: string;
  framework: string;
}

function Hello(props: HelloProps) {
  return (
    <Title>
      Hello from {props.compiler} and {props.framework}!
    </Title>
  );
}

export default Hello;
