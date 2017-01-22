/*
WidgetItem
*/

import 'scss/widget-item.scss';
//
import React from 'react';
import ReactDOM from 'react-dom';

class WidgetItem extends React.Component {
    constructor(props) {
        super(props);
        this.thumbnail = null;
    }
    render() {
        let contentItem = this.props.data.contentItem;
        let thumbnail = this.thumbnail = contentItem.thumbnail ? <img src={'img/'+contentItem.thumbnail} /> : this.thumbnail;
        return (
            <div className="widget-item">
                <div className="col-md-1-3">
                  <figure>
                    {thumbnail}
                  </figure>
                </div>
                <div className="col-md-2-3">
                    <div className="widget-item-description" dangerouslySetInnerHTML={{__html:contentItem.description}} />
                </div>
            </div>
        );
    };
}

export default WidgetItem;
