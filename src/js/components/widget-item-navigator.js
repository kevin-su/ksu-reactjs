/*
WidgetItemNavigator
*/

import 'scss/widget-item-navigator.scss';
//
import React from 'react';
import ReactDOM from 'react-dom';

class WidgetItemNavigator extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="widget-item-navigator">
              {this.props.data.prevIndex > -1  &&
                <button type="button" className="btn btn-prev" onClick={this.props.events.prev}>Prev</button>
              }
              {this.props.data.nextIndex <= this.props.data.total-1 &&
                <button type="button" className="btn btn-next" onClick={this.props.events.next}>{this.props.data.content[this.props.data.nextIndex].title}</button>
              }
            </div>
        );
    };
}

export default WidgetItemNavigator;
