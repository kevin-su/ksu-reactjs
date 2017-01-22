/*
Widget
*/

import 'scss/widget.scss';
//
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { itemsFetchData, getItem, isActive } from 'actions/items';
//
import WidgetItem from 'components/widget-item';
import WidgetItemNavigator from 'components/widget-item-navigator';

class Widget extends React.Component {
    constructor(props) {
        super(props);
        this.events = {
            prev: this.prev.bind(this),
            next: this.next.bind(this)
        };
    }
    componentDidMount() {
        this.props.fetchData();
    }
    prev() {
        this.props.getItem(this.props.prevIndex);
    }
    next() {
        this.props.getItem(this.props.nextIndex);
    }
    toggle() {
        this.props.toggleAction(!this.props.active);
        this.accordion(!this.props.active);
    }
    accordion(active) {
        let elWidgetAccordion = document.querySelector('.widget .widget-accordion');
        let elWidgetBlock = document.querySelector('.widget .widget-accordion .widget-block');
        let slideDirection;
        let resultHeight;

        if (!active) {
            //slide down
            slideDirection = -1;
            resultHeight = 0;
        } else {
            //slide up
            slideDirection = 1;
            resultHeight = parseInt(getComputedStyle(elWidgetBlock).height);
        }

        function animateSlide(currentHeight) {
            let height = (currentHeight + (slideDirection * 10));
            if (height < 0) {
                height = 0
            }
            elWidgetAccordion.style.height = height + 'px';
            slide();
        }

        function slide() {
            let currentHeight = parseInt(getComputedStyle(elWidgetAccordion).height);
            setTimeout(function() {
                //slide down
                if (!active) {
                    if (currentHeight > resultHeight) {
                        animateSlide(currentHeight);
                    }
                } else {
                    //slide up
                    if (currentHeight < resultHeight) {
                        animateSlide(currentHeight);
                    } else {
                        elWidgetAccordion.removeAttribute('style');
                    }
                }
            }, 1);
        };

        slide();
    }
    render() {
        let contentItem = this.props.contentItem && Object.keys(this.props.contentItem).length ? this.props.contentItem : null;
        return (
            <div className={`widget ${this.props.active ? 'expand' : 'collapse'}`}>
                <div className="widget-header">
                    <h1 className="widget-header-title">
                        {this.props.isLoading && !this.props.hasErrored ?'Loading... ':''}
                        {this.props.title && <img className="icon" src="svg/open-iconic/svg/file.svg" />}
                        {this.props.title || (this.props.hasErrored && `Sorry, we aren't able to complete your request at this time. Please try again`)}

                        {contentItem && <button type="button" className="btn btn-toggle" onClick={this.toggle.bind(this)}>Collapse/Expand</button>}
                        {this.props.hasErrored &&
                            <button type="button" className="btn btn-reload" onClick={this.props.fetchData}>
                                <img className="icon" src={`svg/open-iconic/svg/reload.svg`} />
                            </button>
                        }
                    </h1>
                </div>
                <div className="widget-accordion">
                    <div className="widget-block">
                        {contentItem && <WidgetItem data={this.props} />}
                        {contentItem && <WidgetItemNavigator data={this.props} events={this.events} />}
                    </div>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    // console.log(state.isActive);
    return {
        isLoading: state.itemsIsLoading,
        title: state.items.title,
        content: state.items.content,
        total: state.items && state.items.content ? state.items.content.length : 0,
        contentItem: state.showItem.content,
        prevIndex: state.showItem.prevIndex,
        nextIndex: state.showItem.nextIndex,
        active: state.isActive,
        hasErrored: state.itemsFetchErrored
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(itemsFetchData()),
        getItem: (index) => dispatch(getItem(index)),
        toggleAction: (bool) => dispatch(isActive(bool))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Widget);
