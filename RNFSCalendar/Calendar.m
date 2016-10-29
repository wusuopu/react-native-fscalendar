//
//  Calendar.m
//  RNFSCalendar
//
//  Created by lcj on 10/7/16.
//  Copyright © 2016 kidoohealth. All rights reserved.
//

#import "Calendar.h"


@implementation Calendar

- (instancetype)init
{
    self = [super init];
    
    self.dataSource = self;
    self.delegate = self;
//    calendar.appearance.adjustsFontSizeToFitContentSize = NO;       // 关闭文字尺寸自适应
    
    return self;
}

//------------------------------------------------------------------------------
// 设置属性
// 是否隐藏头部
- (void) setHideHeader:(BOOL) hide
{
    if (hide) {
        self.headerHeight = 0;
    } else {
        self.headerHeight = FSCalendarAutomaticDimension;
    }
}
// 是否隐藏顶部的星期
- (void) setHideWeekDay:(BOOL) hide
{
    if (hide) {
        self.weekdayHeight = 0;
    } else {
        self.weekdayHeight = FSCalendarAutomaticDimension;
    }
}
// 设置是否可滑动
//- (void) setScrollEnabled:(BOOL) scrollEnabled;
// 设置当前日期
//- (void) setToday:(NSDate *)today;
// 设置日历的显示范围
//- (void) setDateBounds:(NSArray *)bounds

- (void) setScopeMode:(NSString *)scope
{
    if ([scope isEqualToString:@"month"]) {
        [self setScope:FSCalendarScopeMonth];
    } else {
        [self setScope:FSCalendarScopeWeek];
    }
}

// 设置事件回调函数
//- (void) setOnSelectDate:(RCTBubblingEventBlock)onSelectDate;
//- (void) setOnDeselectDate:(RCTBubblingEventBlock)onDeselectDate;
//- (void) setOnCurrentPageChange:(RCTBubblingEventBlock)onCurrentPageChange;

// 设置颜色样式
CALENDAR_COLOR_SETTER_IMP(setHeaderTitleColor)
CALENDAR_COLOR_SETTER_IMP(setWeekdayTextColor)
CALENDAR_COLOR_SETTER_IMP(setTitleDefaultColor)
CALENDAR_COLOR_SETTER_IMP(setTitleSelectionColor)
CALENDAR_COLOR_SETTER_IMP(setSubtitleDefaultColor)
CALENDAR_COLOR_SETTER_IMP(setSubtitleSelectionColor)
CALENDAR_COLOR_SETTER_IMP(setTitleWeekendColor)
CALENDAR_COLOR_SETTER_IMP(setSubtitleWeekendColor)
CALENDAR_COLOR_SETTER_IMP(setTitleTodayColor)
CALENDAR_COLOR_SETTER_IMP(setSubtitleTodayColor)
CALENDAR_COLOR_SETTER_IMP(setTitlePlaceholderColor)
CALENDAR_COLOR_SETTER_IMP(setSubtitlePlaceholderColor)

CALENDAR_COLOR_SETTER_IMP(setTodayColor)
CALENDAR_COLOR_SETTER_IMP(setTodaySelectionColor)
CALENDAR_COLOR_SETTER_IMP(setEventColor)
CALENDAR_COLOR_SETTER_IMP(setEventDefaultColor)
CALENDAR_COLOR_SETTER_IMP(setEventSelectionColor)
CALENDAR_COLOR_SETTER_IMP(setBorderDefaultColor)
CALENDAR_COLOR_SETTER_IMP(setBorderSelectionColor)
CALENDAR_COLOR_SETTER_IMP(setSelectionColor)
// 宏展开后结果：
// - (void) setSelectionColor:(UIColor *)color;
//{
//    [self.appearance setSelectionColor:color];
//}

- (void) setHeaderDateFormat:(NSString *)format
{
    self.appearance.headerDateFormat = format;
}
- (void) setHeaderMinimumDissolvedAlpha:(CGFloat)alpha
{
    self.appearance.headerMinimumDissolvedAlpha = alpha;
}
- (void) setAdjustsFontSizeToFitContentSize: (BOOL)fit
{
    // 文字尺寸自适应
    self.appearance.adjustsFontSizeToFitContentSize = fit;
}
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
#pragma mark FSCalendarDataSource
// FSCalendarDataSource 的接口
// 设置日历的显示范围
- (NSDate *)minimumDateForCalendar:(Calendar *)calendar
{
    if (_dateBounds != nil && [_dateBounds count] == 2) {
        id minimum = [_dateBounds firstObject];
        if ([minimum isEqual:[NSNull null]]) {
            return nil;
        }
        return [RCTConvert NSDate:minimum];
    }
    return nil;
}
- (NSDate *)maximumDateForCalendar:(Calendar *)calendar
{
    if (_dateBounds != nil && [_dateBounds count] == 2) {
        id maximum = [_dateBounds lastObject];
        if ([maximum isEqual:[NSNull null]]) {
            return nil;
        }
        return [RCTConvert NSDate:maximum];
    }
    return nil;
}
// 设置每个日期上事件显示的圆点个数
//- (NSInteger)calendar:(FSCalendar *)calendar numberOfEventsForDate:(nonnull NSDate *)date;
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
#pragma mark FSCalendarDelegate
// FSCalendarDelegate 的接口
/**
 * Tells the delegate a date in the calendar is selected by tapping.
 */
- (void)calendar:(FSCalendar *)calendar didSelectDate:(NSDate *)date
{
#if DEBUG
    NSLog(@"calendar didSelectDate: %@", [self stringFromDate:date]);
#endif
    if (_onSelectDate) {
        _onSelectDate(@{ @"date": @([date timeIntervalSince1970] * 1000) });
    }
}
/**
 * Tells the delegate a date in the calendar is deselected by tapping.
 */
- (void)calendar:(FSCalendar *)calendar didDeselectDate:(NSDate *)date
{
#if DEBUG
    NSLog(@"calendar didDeselectDate: %@", [self stringFromDate:date]);
#endif
    if (_onDeselectDate) {
        _onDeselectDate(@{ @"date": @([date timeIntervalSince1970] * 1000) });
    }
}
/**
 * Tells the delegate the calendar is about to change the bounding rect.
 */
- (void)calendar:(FSCalendar *)calendar boundingRectWillChange:(CGRect)bounds animated:(BOOL)animated
{
#if DEBUG
    NSLog(@"calendar boundingRectWillChange origin: { %f %f %f %f} { %f %f %f %f }",
          calendar.frame.origin.x, calendar.frame.origin.y, calendar.frame.size.width, calendar.frame.size.height,
          bounds.origin.x, bounds.origin.y, bounds.size.width, bounds.size.height);
#endif
    calendar.frame = (CGRect){calendar.frame.origin, bounds.size};
}
/**
 * Tells the delegate the calendar is about to change the current page.
 */
- (void)calendarCurrentPageDidChange:(FSCalendar *)calendar
{
#if DEBUG
    NSLog(@"calendar calendarCurrentPageDidChange: %@", [calendar stringFromDate:calendar.currentPage]);
#endif
    if (_onCurrentPageChange) {
        _onCurrentPageChange(@{ @"date": @([calendar.currentPage timeIntervalSince1970] * 1000) });
    }
}
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
#pragma mark FSCalendarDelegateAppearance
// FSCalendarDelegateAppearance 的接口
// 设置每个日期事件圆点的颜色
- (UIColor *)calendar:(FSCalendar *)calendar appearance:(nonnull FSCalendarAppearance *)appearance eventColorForDate:(nonnull NSDate *)date
{
    return nil;
}
// 设置每个日期各个事件圆点的颜色
- (NSArray *)calendar:(FSCalendar *)calendar appearance:(nonnull FSCalendarAppearance *)appearance eventColorsForDate:(nonnull NSDate *)date
{
    return nil;
}
//----------
// 设置每个选中日期的填充颜色
- (UIColor *)calendar:(FSCalendar *)calendar appearance:(nonnull FSCalendarAppearance *)appearance fillSelectionColorForDate:(nonnull NSDate *)date
{
    if (_fillSelectionColorDates == nil) {
        return appearance.selectionColor;
    }
    if (_fillSelectionColorDates.count == 0) {
        return appearance.selectionColor;
    }
    NSString *key = [calendar stringFromDate:date format:@"yyyy-MM-dd"];
    NSNumber *color = [_fillSelectionColorDates objectForKey:key];
    if (color != nil) {
        return [RCTConvert UIColor:color];
    }
    return appearance.selectionColor;
}
// 设置默认情况下各个日期的填充颜色
- (UIColor *)calendar:(FSCalendar *)calendar appearance:(nonnull FSCalendarAppearance *)appearance fillDefaultColorForDate:(nonnull NSDate *)date
{
    if (_fillDefaultColorDates == nil) {
        return nil;
    }
    if (_fillDefaultColorDates.count == 0) {
        return nil;
    }
    NSString *key = [calendar stringFromDate:date format:@"yyyy-MM-dd"];
    NSNumber *color = [_fillDefaultColorDates objectForKey:key];
    if (color != nil) {
        return [RCTConvert UIColor:color];
    }
    return nil;
}
// 设置默认情况下各个日期的边框颜色
- (UIColor *)calendar:(FSCalendar *)calendar appearance:(nonnull FSCalendarAppearance *)appearance borderDefaultColorForDate:(nonnull NSDate *)date
{
    if (_borderDefaultColorDates == nil) {
        return appearance.borderDefaultColor;
    }
    if (_borderDefaultColorDates.count == 0) {
        return appearance.borderDefaultColor;
    }
    NSString *key = [calendar stringFromDate:date format:@"yyyy-MM-dd"];
    NSNumber *color = [_borderDefaultColorDates objectForKey:key];
    if (color != nil) {
        return [RCTConvert UIColor:color];
    }
    return appearance.borderDefaultColor;
}
// 设置每个选中日期的边框颜色
- (UIColor *)calendar:(FSCalendar *)calendar appearance:(nonnull FSCalendarAppearance *)appearance borderSelectionColorForDate:(nonnull NSDate *)date
{
    if (_borderSelectionColorDates == nil) {
        return appearance.borderSelectionColor;
    }
    if (_borderSelectionColorDates.count == 0) {
        return appearance.borderSelectionColor;
    }
    NSString *key = [calendar stringFromDate:date format:@"yyyy-MM-dd"];
    NSNumber *color = [_borderSelectionColorDates objectForKey:key];
    if (color != nil) {
        return [RCTConvert UIColor:color];
    }
    return appearance.borderSelectionColor;
}
// 设置每个日期单元的形状（圆形 或者 方形）
- (FSCalendarCellShape)calendar:(FSCalendar *)calendar appearance:(nonnull FSCalendarAppearance *)appearance cellShapeForDate:(nonnull NSDate *)date
{
    if (_cellShapeDates == nil) {
        return FSCalendarCellShapeCircle;
    }
    if (_cellShapeDates.count == 0) {
        return FSCalendarCellShapeCircle;
    }
    NSString *key = [calendar stringFromDate:date format:@"yyyy-MM-dd"];
    NSNumber *shape = [_cellShapeDates objectForKey:key];
    if (shape != nil && [shape isEqualToNumber:[NSNumber numberWithUnsignedInteger:FSCalendarCellShapeRectangle]]) {
        return FSCalendarCellShapeRectangle;
    }
    return FSCalendarCellShapeCircle;
}

// 设置日期标题及子标题在正常状态以及选中状态下的颜色
- (UIColor *)calendar:(FSCalendar *)calendar appearance:(nonnull FSCalendarAppearance *)appearance titleDefaultColorForDate:(nonnull NSDate *)date
{
    if (_titleDefaultColorDates == nil) {
        return appearance.titleDefaultColor;
    }
    if (_titleDefaultColorDates.count == 0) {
        return appearance.titleDefaultColor;
    }
    NSString *key = [calendar stringFromDate:date format:@"yyyy-MM-dd"];
    NSNumber *color = [_titleDefaultColorDates objectForKey:key];
    if (color != nil) {
        return [RCTConvert UIColor:color];
    }
    return appearance.titleDefaultColor;
}
- (UIColor *)calendar:(FSCalendar *)calendar appearance:(nonnull FSCalendarAppearance *)appearance subtitleDefaultColorForDate:(nonnull NSDate *)date
{
    if (_subtitleDefaultColorDates == nil) {
        return appearance.subtitleDefaultColor;
    }
    if (_subtitleDefaultColorDates.count == 0) {
        return appearance.subtitleDefaultColor;
    }
    NSString *key = [calendar stringFromDate:date format:@"yyyy-MM-dd"];
    NSNumber *color = [_subtitleDefaultColorDates objectForKey:key];
    if (color != nil) {
        return [RCTConvert UIColor:color];
    }
    return appearance.subtitleDefaultColor;
}
- (UIColor *)calendar:(FSCalendar *)calendar appearance:(nonnull FSCalendarAppearance *)appearance titleSelectionColorForDate:(nonnull NSDate *)date
{
    if (_titleSelectionColorDates == nil) {
        return appearance.titleSelectionColor;
    }
    if (_titleSelectionColorDates.count == 0) {
        return appearance.titleSelectionColor;
    }
    NSString *key = [calendar stringFromDate:date format:@"yyyy-MM-dd"];
    NSNumber *color = [_titleSelectionColorDates objectForKey:key];
    if (color != nil) {
        return [RCTConvert UIColor:color];
    }
    return appearance.titleSelectionColor;
}
- (UIColor *)calendar:(FSCalendar *)calendar appearance:(nonnull FSCalendarAppearance *)appearance subtitleSelectionColorForDate:(nonnull NSDate *)date
{
    if (_subtitleSelectionColorDates == nil) {
        return appearance.subtitleSelectionColor;
    }
    if (_subtitleSelectionColorDates.count == 0) {
        return appearance.subtitleSelectionColor;
    }
    NSString *key = [calendar stringFromDate:date format:@"yyyy-MM-dd"];
    NSNumber *color = [_subtitleSelectionColorDates objectForKey:key];
    if (color != nil) {
        return [RCTConvert UIColor:color];
    }
    return appearance.subtitleSelectionColor;
}
//------------------------------------------------------------------------------
@end
