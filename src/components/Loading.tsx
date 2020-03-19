import React, { FunctionComponent } from 'react';
import { Loader } from 'semantic-ui-react';
import Center from './Center';

const Loading: FunctionComponent = () => (
  <Center>
    <Loader active />
  </Center>
);
export default Loading;
