import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Dimensions, processColor, requireNativeComponent } from 'react-native'
import _ from 'lodash'

function convertProps(props) {
  let allKeys = [
    'fillDefaultColorDates', 'fillSelectionColorDates', 'borderDefaultColorDates',
    'borderSelectionColorDates', 'titleDefaultColorDates', 'titleSelectionColorDates',
    'subtitleDefaultColorDates', 'subtitleSelectionColorDates'
  ];
  _.each(allKeys, (key) => {
    if (!props[key]) {
      return
    }
    _.each(props[key], (color, date) => {
      props[key][date] = processColor( color )
    })
  })
  if (props.today) {
    props.today = props.today.getTime()
  }
  if (props.dateBounds) {
    _.each(props.dateBounds, (value, index) => {
      if (value) {
        props.dateBounds[index] = value.getTime()
      }
    })
  }
}

export default class FSCalendar extends Component {
  constructor(props) {
    super(props)
    this._props = _.assign({}, this.props)
    convertProps(this._props)
  }

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    hideHeader: PropTypes.bool,         // 是否隐藏头部
    hideWeekDay: PropTypes.bool,        // 是否隐藏顶部的星期
    scrollEnabled: PropTypes.bool,
    today: PropTypes.instanceOf(Date),
    dateBounds: PropTypes.arrayOf(Date),
    scopeMode: PropTypes.oneOf(['month', 'week']),

    // 回调函数
    onSelectDate: PropTypes.func,
    onDeselectDate: PropTypes.func,
    onCurrentPageChange: PropTypes.func,

    // 颜色样式
    headerTitleColor: PropTypes.string,
    weekdayTextColor: PropTypes.string,
    titleDefaultColor: PropTypes.string,
    titleSelectionColor: PropTypes.string,
    subtitleDefaultColor: PropTypes.string,
    subtitleSelectionColor: PropTypes.string,
    titleWeekendColor: PropTypes.string,
    subtitleWeekendColor: PropTypes.string,
    titleTodayColor: PropTypes.string,
    subtitleTodayColor: PropTypes.string,
    titlePlaceholderColor: PropTypes.string,
    subtitlePlaceholderColor: PropTypes.string,

    todayColor: PropTypes.string,
    todaySelectionColor: PropTypes.string,
    eventColor: PropTypes.string,
    eventDefaultColor:PropTypes.string,
    eventSelectionColor:PropTypes.string,
    borderDefaultColor: PropTypes.string,
    borderSelectionColor: PropTypes.string,
    selectionColor: PropTypes.string,

    // 针对每个单独的日期设置样式
    fillDefaultColorDates: PropTypes.object,
    fillSelectionColorDates: PropTypes.object,
    borderDefaultColorDates: PropTypes.object,
    borderSelectionColorDates: PropTypes.object,
    cellShapeDates: PropTypes.objectOf(PropTypes.number),

    titleDefaultColorDates: PropTypes.object,
    titleSelectionColorDates: PropTypes.object,
    subtitleDefaultColorDates: PropTypes.object,
    subtitleSelectionColorDates: PropTypes.object,

    // 头部样式
    headerMinimumDissolvedAlpha: PropTypes.number,
    headerDateFormat: PropTypes.string
  }

  static defaultProps = {
    width: Dimensions.get('window').width,
    height: 280,            // scopeMode 为 month 建议高度 280, 为 week 建议高度 70
    hideHeader: true,
    hideWeekDay: false,
    scrollEnabled: true,
    today: null,
    scopeMode: 'month'
  }

  componentWillReceiveProps(nextProps) {
    this._props = _.assign({}, nextProps)
    convertProps(this._props)
  }

  render() {
    return (
      <RNFSCalendar { ...this._props } />
    )
  }
}

const RNFSCalendar = requireNativeComponent('RNFSCalendar', {
  propTypes: {
    ...FSCalendar.propTypes,
    today: PropTypes.number
  }
})


export const CellShape = {
  Circle: 0,
  Rectangle: 1
}
