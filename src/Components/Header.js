/*
    Header.js
    - top header of main page
    - including logo, buttons, options, etc

    Created by Juan Lee <juanlee@kaist.ac.kr>
    Originally Written by Kihoon Kwon
*/

import React from 'react';
import { Menu } from 'semantic-ui-react';

/*
    Header Component
    - returns a menu bar
*/
export default () => (
    <Menu borderless size="massive">
        <Menu.Item>
            JTO:졸업시뮬레이터
        </Menu.Item>
        <Menu.Item name='about'>
            About
        </Menu.Item>
        <Menu.Item name='google' href="http://www.google.com">
            Go to Google
        </Menu.Item>
        <Menu.Item name='naver' href="http://www.naver.com">
            Go to Naver
        </Menu.Item>
    </Menu>
)