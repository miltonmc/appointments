import React from 'react';
import Center from './Center';
import { Loader } from 'semantic-ui-react';

export default (props) => (
  <Center>
    <Loader active {...props} />
  </Center>
);
