import React, { Component } from 'react';
import { View, ScrollView, Switch, Text } from 'react-native'
import moment from 'moment'
import FSCalendar from 'react-native-fscalendar'
import styles from './styles'


export default class Example4 extends Component {
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
          <FSCalendar
              hideHeader={false}
              hideWeekDay={false}
              onSelectDate={(ev) => {
                this.setState({
                  selection: new Date(ev.nativeEvent.date)
                })
              }}
              onDeselectDate={(ev) => {
                this.setState({
                  deselection: new Date(ev.nativeEvent.date)
                })
              }}
              onCurrentPageChange={(ev) => {
                this.setState({
                  page: new Date(ev.nativeEvent.date)
                })
              }}
          />
        </View>
        <View>
          <Text>selection: {this.state.selection ? this.state.selection.toJSON() : ''}</Text>
          <Text>deselection: {this.state.deselection ? this.state.deselection.toJSON() : ''}</Text>
          <Text>page: {this.state.page ? this.state.page.toJSON() : ''}</Text>
        </View>
      </ScrollView>
    );
  }
}
