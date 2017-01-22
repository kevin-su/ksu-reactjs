/*
App
*/

import 'scss/app.scss';
//
import React from 'react';
import ReactDOM from 'react-dom';
//
import Widget from 'components/widget';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="app">
                <Widget />
            </div>
        );
    };
};

export default App;