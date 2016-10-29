//
//  Calendar.h
//  RNFSCalendar
//
//  Created by lcj on 10/7/16.
//  Copyright © 2016 kidoohealth. All rights reserved.
//

#ifndef Calendar_h
#define Calendar_h

#import <Foundation/Foundation.h>
#import "FSCalendar.h"
#import "RCTComponent.h"
#import "RCTConvert.h"

#define CALENDAR_COLOR_SETTER(name)     \
- (void) name:(UIColor *)color;

#define CALENDAR_COLOR_SETTER_IMP(name)     \
- (void) name:(UIColor *)color              \
{ [self.appearance name:color]; }

@interface Calendar :FSCalendar <FSCalendarDataSource, FSCalendarDelegate, FSCalendarDelegateAppearance>

@property (nonatomic, retain) NSArray *dateBounds;

@property (nonatomic, copy) RCTBubblingEventBlock onSelectDate;
@property (nonatomic, copy) RCTBubblingEventBlock onDeselectDate;
@property (nonatomic, copy) RCTBubblingEventBlock onCurrentPageChange;

// 针对每个单独的日期设置样式
@property (nonatomic, retain) NSDictionary *fillDefaultColorDates;
@property (nonatomic, retain) NSDictionary *fillSelectionColorDates;
@property (nonatomic, retain) NSDictionary *borderDefaultColorDates;
@property (nonatomic, retain) NSDictionary *borderSelectionColorDates;
@property (nonatomic, retain) NSDictionary *cellShapeDates;

@property (nonatomic, retain) NSDictionary *titleDefaultColorDates;
@property (nonatomic, retain) NSDictionary *titleSelectionColorDates;
@property (nonatomic, retain) NSDictionary *subtitleDefaultColorDates;
@property (nonatomic, retain) NSDictionary *subtitleSelectionColorDates;

// 设置颜色样式
CALENDAR_COLOR_SETTER(setHeaderTitleColor)
CALENDAR_COLOR_SETTER(setWeekdayTextColor)
CALENDAR_COLOR_SETTER(setTitleDefaultColor)
CALENDAR_COLOR_SETTER(setTitleSelectionColor)
CALENDAR_COLOR_SETTER(setSubtitleDefaultColor)
CALENDAR_COLOR_SETTER(setSubtitleSelectionColor)
CALENDAR_COLOR_SETTER(setTitleWeekendColor)
CALENDAR_COLOR_SETTER(setSubtitleWeekendColor)
CALENDAR_COLOR_SETTER(setTitleTodayColor)
CALENDAR_COLOR_SETTER(setSubtitleTodayColor)
CALENDAR_COLOR_SETTER(setTitlePlaceholderColor)
CALENDAR_COLOR_SETTER(setSubtitlePlaceholderColor)

CALENDAR_COLOR_SETTER(setTodayColor)
CALENDAR_COLOR_SETTER(setTodaySelectionColor)
CALENDAR_COLOR_SETTER(setEventColor)
CALENDAR_COLOR_SETTER(setEventDefaultColor)
CALENDAR_COLOR_SETTER(setEventSelectionColor)
CALENDAR_COLOR_SETTER(setBorderDefaultColor)
CALENDAR_COLOR_SETTER(setBorderSelectionColor)
CALENDAR_COLOR_SETTER(setSelectionColor)
// 宏展开后结果：
// - (void) setSelectionColor:(UIColor *)color;

- (void) setHeaderDateFormat:(NSString *)format;
- (void) setHeaderMinimumDissolvedAlpha: (CGFloat)alpha;
- (void) setAdjustsFontSizeToFitContentSize: (BOOL)fit;
@end

#endif /* Calendar_h */
