import React, { Component } from 'react'
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
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    hideHeader: React.PropTypes.bool,         // 是否隐藏头部
    hideWeekDay: React.PropTypes.bool,        // 是否隐藏顶部的星期
    scrollEnabled: React.PropTypes.bool,
    today: React.PropTypes.instanceOf(Date),
    dateBounds: React.PropTypes.arrayOf(Date),
    scopeMode: React.PropTypes.oneOf(['month', 'week']),

    // 回调函数
    onSelectDate: React.PropTypes.func,
    onDeselectDate: React.PropTypes.func,
    onCurrentPageChange: React.PropTypes.func,

    // 颜色样式
    headerTitleColor: React.PropTypes.string,
    weekdayTextColor: React.PropTypes.string,
    titleDefaultColor: React.PropTypes.string,
    titleSelectionColor: React.PropTypes.string,
    subtitleDefaultColor: React.PropTypes.string,
    subtitleSelectionColor: React.PropTypes.string,
    titleWeekendColor: React.PropTypes.string,
    subtitleWeekendColor: React.PropTypes.string,
    titleTodayColor: React.PropTypes.string,
    subtitleTodayColor: React.PropTypes.string,
    titlePlaceholderColor: React.PropTypes.string,
    subtitlePlaceholderColor: React.PropTypes.string,

    todayColor: React.PropTypes.string,
    todaySelectionColor: React.PropTypes.string,
    eventColor: React.PropTypes.string,
    eventDefaultColor: React.PropTypes.string,
    eventSelectionColor: React.PropTypes.string,
    borderDefaultColor: React.PropTypes.string,
    borderSelectionColor: React.PropTypes.string,
    selectionColor: React.PropTypes.string,

    // 针对每个单独的日期设置样式
    fillDefaultColorDates: React.PropTypes.object,
    fillSelectionColorDates: React.PropTypes.object,
    borderDefaultColorDates: React.PropTypes.object,
    borderSelectionColorDates: React.PropTypes.object,
    cellShapeDates: React.PropTypes.objectOf(React.PropTypes.number),

    titleDefaultColorDates: React.PropTypes.object,
    titleSelectionColorDates: React.PropTypes.object,
    subtitleDefaultColorDates: React.PropTypes.object,
    subtitleSelectionColorDates: React.PropTypes.object,

    // 头部样式
    headerMinimumDissolvedAlpha: React.PropTypes.number,
    headerDateFormat: React.PropTypes.string
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
    today: React.PropTypes.number
  }
})


export const CellShape = {
  Circle: 0,
  Rectangle: 1
}
