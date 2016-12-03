import React, { Component } from 'react';
import { View, Text } from 'react-native'
import moment from 'moment'
import FSCalendar from 'react-native-fscalendar'
import styles from './styles'

export default class Example1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: moment()
    };
  }

  static propTypes = { }

  static defaultProps = { }

  render() {
    return (
      <View style={styles.contain}>
        <View style={{flex: 1, marginTop: 20}}>
          <FSCalendar
            hideHeader={false}
          />
        </View>
      </View>
    );
  }
}
