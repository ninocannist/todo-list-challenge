import * as React from 'react';
import styled from '@emotion/styled';

const Title = styled.h1`
  background-color: hotpink;
  padding: 10px 20px;
  color: white;
  border-radius: 20px;
`;

export interface HelloProps {
  compiler: string;
  framework: string;
}

function Hello(props: HelloProps) {
  return (
    <Title>
      Hello frome {props.compiler} and {props.framework}!
    </Title>
  );
}

export default Hello;
