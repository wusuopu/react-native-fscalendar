import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native'
import moment from 'moment'
import FSCalendar from 'react-native-fscalendar'
import styles from './styles'


export default class Example2 extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  static propTypes = { }

  static defaultProps = { }

  render() {
    return (
      <ScrollView style={styles.contain}>
        <View style={{flex: 1, marginTop: 20}}>
          <Text style={{textAlign: 'center'}}>Display Month</Text>
          <FSCalendar
              hideHeader={false}
              hideWeekDay={false}
              scopeMode="month"
              height={300}
          />

          <Text style={{textAlign: 'center', marginTop: 20}}>Display Week</Text>
          <FSCalendar
              hideHeader={false}
              hideWeekDay={false}
              scopeMode="week"
              height={240}
          />

        </View>
      </ScrollView>
    );
  }
}
