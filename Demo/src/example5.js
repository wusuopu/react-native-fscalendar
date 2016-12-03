import React, { Component } from 'react';
import { View, ScrollView, Switch, Text } from 'react-native'
import moment from 'moment'
import FSCalendar from 'react-native-fscalendar'
import styles from './styles'


export default class Example5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: moment('2016-10-12T00:00:00Z').toDate(),
      min: moment('2016-08-01T00:00:00Z').toDate(),
      max: moment('2016-11-30T00:00:00Z').toDate()
    };
  }

  static propTypes = { }

  static defaultProps = { }

  render() {
    return (
      <ScrollView style={styles.contain}>
        <View style={{flex: 1, marginTop: 20}}>
          <FSCalendar
              hideHeader={false}
              hideWeekDay={false}
              today={this.state.today}
              dateBounds={[this.state.min, this.state.max]}
          />
          <View>
            <Text>
              Date Bounds:
            </Text>
            <Text>
              {this.state.min.toJSON()}~{this.state.max.toJSON()}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
