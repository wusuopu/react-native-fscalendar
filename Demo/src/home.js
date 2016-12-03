import React, { Component } from 'react'
import { View, ScrollView, Switch, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import styles from './styles'


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  static propTypes = { }

  static defaultProps = { }

  render() {
    return (
      <View style={[styles.contain, {justifyContent: 'center', alignItems: 'center'}]}>
        <View style={styles.row}>
          <Text style={styles.item} onPress={Actions.Example1}>
            Basic >
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.item} onPress={Actions.Example2}>
            Calendar Scope >
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.item} onPress={Actions.Example3}>
            Header Format >
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.item} onPress={Actions.Example4}>
            Event >
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.item} onPress={Actions.Example5}>
            Date Bounds >
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.item} onPress={Actions.Example6}>
            Color >
          </Text>
        </View>
      </View>
    )
  }
}

