import React from 'react';
import Button from '@mui/material/Button';
import {css} from '@emotion/react';

const style = css`
  background-color: aqua;
`;

const HelloWorld: React.FunctionComponent = (): React.ReactElement => <div >
  <Button css={style} variant="contained">
Hello World
  </Button >
</div >;

export default HelloWorld;
