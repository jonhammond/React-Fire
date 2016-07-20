var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./header');

var rootUrl = 'https://react-firebase-hammond.firebaseio.com/'

var App = React.createClass({
  // Mixins are a group of methods in an object (ReactFire)
  // that essentially get copy pasted into a component
  mixins: [ ReactFire ],
  // ComponentWillMount function only runs once
  componentWillMount: function () {
    // Bind data onto component from root url to a new
    // object (this.state.items)
    this.bindAsObject(new Firebase(rootUrl + 'items/'), 'items');
  },
  render: function() {
    return <div className="row panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          To-Do List
        </h2>
        <Header itemsStore={this.firebaseRefs.items} />
      </div>
    </div>
  }
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));
