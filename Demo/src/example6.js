import React, { Component } from 'react';
import { View, ScrollView, Switch, Text } from 'react-native'
import moment from 'moment'
import FSCalendar from 'react-native-fscalendar'
import styles from './styles'


export default class Example4 extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    this._month = moment().format('Y-MM')
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
              todayColor="#00ffff"
              selectionColor="yellow"
              titleDefaultColor="#6934ab"
              fillDefaultColorDates={{
                [this._month + '-12']: 'plink',
                [this._month + '-17']: '#ff0000',
                [this._month + '-18']: '#ff0000',
                [this._month + '-19']: '#ff0000',
                [this._month + '-21']: '#ff00ff',
                [this._month + '-22']: '#ff00ff',
                [this._month + '-23']: '#ff00ff'
              }}
              fillSelectionColorDates={{
                [this._month + '-12']: 'plink',
                [this._month + '-17']: '#ff0000',
                [this._month + '-18']: '#ff0000',
                [this._month + '-19']: '#ff0000'
              }}
              cellShapeDates={{   // 设置日期单元的形状， 0 - Rectangle; 1 - Circle
                [this._month + '-12']: 0,
                [this._month + '-17']: 1,
                [this._month + '-18']: 1,
                [this._month + '-20']: 1
              }}
          />
        </View>
      </ScrollView>
    );
  }
}
