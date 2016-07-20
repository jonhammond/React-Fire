var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');

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
    console.log(this.state);
    return <h1 className="red">
      Hello, React!
    </h1>
  }
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));
