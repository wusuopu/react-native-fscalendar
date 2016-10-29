import React, { Component } from 'react';
import { View, ScrollView, Switch, Text } from 'react-native';
import FSCalendar from 'react-native-fscalendar'
import moment from 'moment'

const styles = {
  row: {
    flexDirection: 'row',
    margin: 5
  },
  label: {
    flex: 1
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideHeader: false,
      hideWeekDay: false,
      hideHeaderMinimum: false,
      scrollEnabled: true,
      scopeMode: true,
    };
  }

  static propTypes = { }

  static defaultProps = { }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1, marginTop: 20}}>
          <FSCalendar
              hideHeader={this.state.hideHeader}
              hideWeekDay={this.state.hideWeekDay}
              scrollEnabled={this.state.scrollEnabled}
              today={moment('2016-10-12T00:00:00Z').toDate()}
              dateBounds={[
                moment('2016-08-01T00:00:00Z').toDate(),
                moment('2016-11-30T00:00:00Z').toDate()
              ]}
              scopeMode={this.state.scopeMode ? 'month' : 'week'}
              height={this.state.scopeMode ? 280 : 110}
              onSelectDate={(ev) => {
                console.log('onSelectDate: ', ev.nativeEvent)
                this.setState({
                  selection: new Date(ev.nativeEvent.date)
                })
              }}
              onDeselectDate={(ev) => {
                console.log('onDeselectDate: ', ev.nativeEvent)
                this.setState({
                  deselection: new Date(ev.nativeEvent.date)
                })
              }}
              onCurrentPageChange={(ev) => {
                console.log('onCurrentPageChange: ', ev.nativeEvent)
                this.setState({
                  page: new Date(ev.nativeEvent.date)
                })
              }}
              todayColor="#00ffff"
              selectionColor="yellow"
              titleDefaultColor="#6934ab"
              fillDefaultColorDates={{
                '2016-10-12': 'plink',
                '2016-10-17': '#ff0000',
                '2016-10-18': '#ff0000',
                '2016-10-19': '#ff0000',
                '2016-10-21': '#ff00ff',
                '2016-10-22': '#ff00ff',
                '2016-10-23': '#ff00ff'
              }}
              fillSelectionColorDates={{
                '2016-10-12': 'plink',
                '2016-10-17': '#ff0000',
                '2016-10-18': '#ff0000',
                '2016-10-19': '#ff0000'
              }}
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
          <View style={styles.row}>
            <Text style={styles.label}>
              hideWeekDay
            </Text>
            <Switch
              onValueChange={(value) => this.setState({hideWeekDay: value})}
              value={this.state.hideWeekDay}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>
              scrollEnabled
            </Text>
            <Switch
              onValueChange={(value) => this.setState({scrollEnabled: value})}
              value={this.state.scrollEnabled}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>
              scopeMode month/week
            </Text>
            <Switch
              onValueChange={(value) => this.setState({scopeMode: value})}
              value={this.state.scopeMode}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
