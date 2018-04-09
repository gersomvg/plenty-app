import React from 'react';
import RN from 'react-native';

import Root from 'common/Root';
import Box from 'common/Box';
import Separator from 'common/Separator';
import Entry from './components/Entry';

export default class Home extends React.Component {
    render() {
        return (
            <Root>
                <Box safeTop>
                    <Entry />
                </Box>
                <Separator />
            </Root>
        );
    }
}
