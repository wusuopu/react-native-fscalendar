import React, { Component } from 'react';
import { View, ScrollView, Switch, Text } from 'react-native'
import moment from 'moment'
import FSCalendar from 'react-native-fscalendar'
import styles from './styles'


export default class Example3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideHeaderMinimum: false
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
              headerDateFormat="yyyy/MM"
              headerMinimumDissolvedAlpha={this.state.hideHeaderMinimum ? 0 : 0.3}
          />
          <View style={styles.row}>
            <Text style={styles.label}>
              hideHeaderMinimum
            </Text>
            <Switch
              onValueChange={(value) => this.setState({hideHeaderMinimum: value})}
              value={this.state.hideHeaderMinimum}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
