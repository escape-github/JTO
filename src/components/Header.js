/*
    Header.js
    - top header of main page
    - including logo, buttons, options, etc

    Created by Juan Lee <juanlee@kaist.ac.kr>
    Originally Written by Kihoon Kwon
*/

import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

/*
    Header Component
    - returns a menu bar
*/
export default () => (
    <Menu inverted borderless size="massive">
        <Menu.Item>
            <Icon circular name="chart pie" /> JTO
        </Menu.Item>

        <Menu.Item name='bulletin' href="https://bulletin.kaist.ac.kr/">
            Bulletin Board
        </Menu.Item>
        <Menu.Item name='open' href="http://portal.kaist.ac.kr/">
            Open Courses
        </Menu.Item>
        <Menu.Item name='notifications' href="http://www.kaist.ac.kr/">
            Notifications
        </Menu.Item>
        <Menu.Item name='feedback' href="/feedback">
            Feedback
        </Menu.Item>

        <Menu.Item position="right" name='developers' href="https://github.com/escape-github">
            Developers
        </Menu.Item>
    </Menu>
)