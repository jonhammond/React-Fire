var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./header');
var List = require('./list');

var rootUrl = 'https://react-firebase-hammond.firebaseio.com/'

var App = React.createClass({
  // Mixins are a group of methods in an object (ReactFire)
  // that essentially get copy pasted into a component
  mixins: [ ReactFire ],
  getInitialState: function() {
    return {
      items: {},
      loaded: false
    };
  },
  // ComponentWillMount function only runs once
  componentWillMount: function () {
    this.fb = new Firebase(rootUrl + 'items/');
    // Bind data onto component from root url to a new
    // object (this.state.items)
    this.bindAsObject(this.fb, 'items');
    // When fb emits the 'value' event,
    // this.handleDataLoaded returns value
    this.fb.on('value', this.handleDataLoaded)
  },
  render: function() {
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          To-Do List
        </h2>
        <Header itemsStore={this.firebaseRefs.items} />
        <hr />
        <div className={"content " + (this.state.loaded ? "loaded" : "")} >
          <List items={this.state.items} />
          {this.clearAllButton()}
        </div>
      </div>
    </div>
  },
  handleDataLoaded: function() {
    this.setState({
      loaded: true });
  },
  clearAllButton: function() {
    if(!this.state.loaded) {
      return null;
    } else {
      return <div className="text-center clear-complete">
        <hr/>
        <button
          type="button"
          className="btn btn-default" onClick={this.handleClearAllClick}
          >
          Clear All Completed Tasks
        </button>
      </div>
    };
  },
  handleClearAllClick: function() {
    for (var key in this.state.items) {
      if(this.state.items[key].done === true) {
        this.fb.child(key).remove();
      };
    };
  }
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));
