//
//  RNFSCalendar.m
//  RNFSCalendar
//
//  Created by lcj on 10/7/16.
//  Copyright © 2016 kidoohealth. All rights reserved.
//

#import "RNFSCalendar.h"

// 定义 UIColor 属性
#define RCT_COLOR_PROPERTY(name, setter)                \
RCT_CUSTOM_VIEW_PROPERTY(name, UIColor, Calendar)       \
{ [view setter:[RCTConvert UIColor:json]]; }

@implementation RNFSCalendar

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(hideHeader, BOOL);
RCT_EXPORT_VIEW_PROPERTY(hideWeekDay, BOOL);
RCT_EXPORT_VIEW_PROPERTY(scrollEnabled, BOOL);
RCT_EXPORT_VIEW_PROPERTY(today, NSDate);            // 日历的当前日期
RCT_EXPORT_VIEW_PROPERTY(dateBounds, NSArray);      // 日历的日期范围
RCT_EXPORT_VIEW_PROPERTY(scopeMode, NSString);      // 日历显示模式： month | week

// 回调函数
RCT_EXPORT_VIEW_PROPERTY(onSelectDate, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onDeselectDate, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onCurrentPageChange, RCTBubblingEventBlock);

// 针对每个单独的日期设置样式
RCT_EXPORT_VIEW_PROPERTY(fillDefaultColorDates, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(fillSelectionColorDates, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(borderDefaultColorDates, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(borderSelectionColorDates, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(cellShapeDates, NSDictionary);

RCT_EXPORT_VIEW_PROPERTY(titleDefaultColorDates, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(titleSelectionColorDates, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(subtitleDefaultColorDates, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(subtitleSelectionColorDates, NSDictionary);

// 颜色样式
RCT_COLOR_PROPERTY(headerTitleColor, setHeaderTitleColor)
RCT_COLOR_PROPERTY(weekdayTextColor, setWeekdayTextColor)
RCT_COLOR_PROPERTY(titleDefaultColor, setTitleDefaultColor)
RCT_COLOR_PROPERTY(titleSelectionColor, setTitleSelectionColor)
RCT_COLOR_PROPERTY(subtitleDefaultColor, setSubtitleDefaultColor)
RCT_COLOR_PROPERTY(subtitleSelectionColor, setSubtitleSelectionColor)
RCT_COLOR_PROPERTY(titleWeekendColor, setTitleWeekendColor)
RCT_COLOR_PROPERTY(subtitleWeekendColor, setSubtitleWeekendColor)
RCT_COLOR_PROPERTY(titleTodayColor, setTitleTodayColor)
RCT_COLOR_PROPERTY(subtitleTodayColor, setSubtitleTodayColor)
RCT_COLOR_PROPERTY(titlePlaceholderColor, setTitlePlaceholderColor)
RCT_COLOR_PROPERTY(subtitlePlaceholderColor, setSubtitlePlaceholderColor)

RCT_COLOR_PROPERTY(todayColor, setTodayColor)
RCT_COLOR_PROPERTY(todaySelectionColor, setTodaySelectionColor)
RCT_COLOR_PROPERTY(eventColor, setEventColor)
RCT_COLOR_PROPERTY(eventDefaultColor, setEventDefaultColor)
RCT_COLOR_PROPERTY(eventSelectionColor, setEventSelectionColor)
RCT_COLOR_PROPERTY(borderDefaultColor, setBorderDefaultColor)
RCT_COLOR_PROPERTY(borderSelectionColor, setBorderSelectionColor)
RCT_COLOR_PROPERTY(selectionColor, setSelectionColor)
// 宏展开后结果如下：
// RCT_CUSTOM_VIEW_PROPERTY(selectionColor, UIColor, Calendar)
// {
//     [view setSelectionColor:[RCTConvert UIColor:json]];
// }


RCT_EXPORT_VIEW_PROPERTY(headerDateFormat, NSString);
RCT_EXPORT_VIEW_PROPERTY(headerMinimumDissolvedAlpha, CGFloat);

- (instancetype)init
{
    self = [super init];
    return self;
}

- (UIView *)view
{
    Calendar *calendar = [[Calendar alloc] init];
    self.calendar = calendar;
    return self.calendar;
}


@end
