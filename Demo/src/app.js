import React, { Component } from 'react';
import {Scene, Router} from 'react-native-router-flux'
import Home from './home'
import Example1 from './example1'
import Example2 from './example2'
import Example3 from './example3'
import Example4 from './example4'
import Example5 from './example5'
import Example6 from './example6'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  static propTypes = { }

  static defaultProps = { }

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="Example1" component={Example1} title="Example1" />
          <Scene key="Example2" component={Example2} title="Example2" />
          <Scene key="Example3" component={Example3} title="Example3" />
          <Scene key="Example4" component={Example4} title="Example4" />
          <Scene key="Example5" component={Example5} title="Example5" />
          <Scene key="Example6" component={Example6} title="Example6" />
          <Scene key="home" component={Home} title="FSCalendar Example" initial />
        </Scene>
      </Router>
    )
  }
}
