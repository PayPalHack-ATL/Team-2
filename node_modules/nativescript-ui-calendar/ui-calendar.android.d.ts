import * as commonModule from "./ui-calendar.common";
import { Color } from "tns-core-modules/color";
export * from "./ui-calendar.common";
export declare class CalendarEvent extends commonModule.CalendarEvent {
    private _android;
    readonly android: com.telerik.widget.calendar.events.Event;
    protected _setIsAllDay(value: boolean): void;
    protected _getIsAllDay(): boolean;
    protected _setEndDate(date: Date): void;
    protected _getEndDate(): Date;
    protected _setStartDate(date: Date): void;
    protected _getStartDate(): Date;
    protected _setTitle(value: string): void;
    protected _getTitle(): string;
    protected _setEventColor(value: Color): void;
    protected _getEventColor(): Color;
}
/**
 * Enum values identify to what type of cells is related the style object
 */
export declare enum CellStyleType {
    RegularDayStyle = 0,
    SelectedDayStyle = 1,
    TodayStyle = 2,
    WeekNumberStyle = 3,
    WeekendStyle = 4,
    DayNameStyle = 5,
    TitleStyle = 6,
    MonthNameStyle = 7,
}
export declare class CellStyleInitializer {
    applyStyle(value: any): void;
    private changeCellBorderWidth(value, style);
    onCellBorderWidthChanged(value: any, style: any): void;
    private changeCellBorderColor(value, style);
    onCellBorderColorChanged(value: any, style: any): void;
    private changeCellBackgroundColor(value, style);
    onCellBackgroundColorChanged(value: any, style: any): void;
    private changeCellAlignment(value, style);
    onCellAlignmentChanged(value: any, style: any): void;
    private changeCellPaddingHorizontal(value, style);
    onCellPaddingHorizontalChanged(value: any, style: any): void;
    private changeCellPaddingVertical(value, style);
    onCellPaddingVerticalChanged(value: any, style: any): void;
    private changeCellTextColor(value, style);
    onCellTextColorChanged(value: any, style: any): void;
    private changeCellTextFontName(value, style);
    onCellTextFontNameChanged(value: any, style: any): void;
    private changeCellTextFontStyle(value, style);
    onCellTextFontStyleChanged(value: any, style: any): void;
    private changeCellTextSize(value, style);
    onCellTextSizeChanged(value: any, style: any): void;
    makeDayCellFilter(cellStyleType: CellStyleType, displayMode: com.telerik.widget.calendar.CalendarDisplayMode): com.telerik.widget.calendar.CalendarDayCellFilter;
    makeMonthCellFilter(): com.telerik.widget.calendar.CalendarMonthCellFilter;
}
export declare class CellStyle extends commonModule.CellStyle {
    private _nativeIsYear;
    nativeIsYear: boolean;
    private _owner;
    owner: com.telerik.widget.calendar.RadCalendarView;
    private _initializer;
    readonly initializer: CellStyleInitializer;
    private _android;
    readonly android: com.telerik.widget.calendar.CalendarCellStyle;
    updateNativeStyleFilters(cellStyleType: CellStyleType, displayMode: com.telerik.widget.calendar.CalendarDisplayMode): void;
    onStyleChanged(): void;
    protected onCellBorderWidthChanged(oldValue: number, newValue: number): void;
    protected onCellBorderColorChanged(oldValue: string, newValue: string): void;
    protected onCellBackgroundColorChanged(oldValue: string, newValue: string): void;
    protected onCellTextColorChanged(oldValue: string, newValue: string): void;
    protected onCellTextFontNameChanged(oldValue: string, newValue: string): void;
    protected onCellTextFontStyleChanged(oldValue: string, newValue: string): void;
    protected onCellTextSizeChanged(oldValue: number, newValue: number): void;
    protected onCellPaddingHorizontalChanged(oldValue: number, newValue: number): void;
    protected onCellPaddingVerticalChanged(oldValue: number, newValue: number): void;
    protected onCellAlignmentChanged(oldValue: string, newValue: string): void;
}
export declare class DayEventsViewStyle extends commonModule.DayEventsViewStyle {
    private _owner;
    owner: com.telerik.widget.calendar.RadCalendarView;
    private _android;
    readonly android: com.telerik.widget.calendar.dayview.DayEventsViewStyle;
    applyStyles(): void;
    protected onBackgroundColorChanged(oldValue: string, newValue: string): void;
    private changeBackgroundColor(oldValue, newValue);
    protected onTimeLabelFormatChanged(oldValue: string, newValue: string): void;
    private changeTimeLabelFormat(oldValue, newValue);
    protected onTimeLabelTextColorChanged(oldValue: string, newValue: string): void;
    private changeTimeLabelTextColor(oldValue, newValue);
    protected onTimeLabelTextSizeChanged(oldValue: number, newValue: number): void;
    private changeTimeLabelTextSize(oldValue, newValue);
    protected onTimeLinesWidthChanged(oldValue: number, newValue: number): void;
    private changeTimeLinesWidth(oldValue, newValue);
    protected onTimeLinesColorChanged(oldValue: string, newValue: string): void;
    private changeTimeLinesColor(oldValue, newValue);
}
export declare class AllDayEventsViewStyle extends commonModule.AllDayEventsViewStyle {
    private _owner;
    owner: com.telerik.widget.calendar.RadCalendarView;
    private _android;
    readonly android: com.telerik.widget.calendar.dayview.AllDayEventsViewStyle;
    applyStyles(): void;
    protected onBackgroundColorChanged(oldValue: string, newValue: string): void;
    private changeBackgroundColor(oldValue, newValue);
    protected onAllDayTextChanged(oldValue: string, newValue: string): void;
    private changeAllDayText(oldValue, newValue);
    protected onAllDayTextIsVisibleChanged(oldValue: boolean, newValue: boolean): void;
    private changeAllDayTextIsVisible(oldValue, newValue);
}
export declare class DayCellStyle extends commonModule.DayCellStyle {
    private _owner;
    owner: com.telerik.widget.calendar.RadCalendarView;
    private _eventAdapter;
    eventAdapter: com.telerik.widget.calendar.events.EventAdapter;
    private _initializer;
    readonly initializer: CellStyleInitializer;
    private _android;
    readonly android: com.telerik.widget.calendar.CalendarDayCellStyle;
    updateNativeStyleFilters(cellStyleType: CellStyleType, displayMode: com.telerik.widget.calendar.CalendarDisplayMode): void;
    protected onCellBorderWidthChanged(oldValue: number, newValue: number): void;
    protected onCellBorderColorChanged(oldValue: string, newValue: string): void;
    protected onCellBackgroundColorChanged(oldValue: string, newValue: string): void;
    protected onCellTextColorChanged(oldValue: string, newValue: string): void;
    protected onCellTextFontNameChanged(oldValue: string, newValue: string): void;
    protected onCellTextFontStyleChanged(oldValue: string, newValue: string): void;
    protected onCellTextSizeChanged(oldValue: number, newValue: number): void;
    protected onCellPaddingHorizontalChanged(oldValue: number, newValue: number): void;
    protected onCellPaddingVerticalChanged(oldValue: number, newValue: number): void;
    protected onCellAlignmentChanged(oldValue: string, newValue: string): void;
    onStyleChanged(): void;
    protected onShowEventsTextChanged(oldValue: boolean, newValue: boolean): void;
    protected onEventTextColorChanged(oldValue: string, newValue: string): void;
    protected onEventFontNameChanged(oldValue: string, newValue: string): void;
    protected onEventFontStyleChanged(oldValue: string, newValue: string): void;
    protected onEventTextSizeChanged(oldValue: number, newValue: number): void;
}
/**
 * Cell style class for months in year view mode
 */
export declare class MonthCellStyle extends commonModule.MonthCellStyle {
    private _regularDayStyle;
    readonly regularDayStyle: com.telerik.widget.calendar.CalendarMonthCellStyle;
    private _weekendStyle;
    readonly weekendStyle: com.telerik.widget.calendar.CalendarMonthCellStyle;
    private _todayStyle;
    readonly todayStyle: com.telerik.widget.calendar.CalendarMonthCellStyle;
    private _dayNameStyle;
    readonly dayNameStyle: com.telerik.widget.calendar.CalendarMonthCellStyle;
    private _monthNameStyle;
    readonly monthNameStyle: com.telerik.widget.calendar.CalendarMonthCellStyle;
    private _monthCellStyle;
    readonly monthCellStyle: com.telerik.widget.calendar.CalendarMonthCellStyle;
    onStyleChanged(): void;
    protected onWeekendTextColorChanged(oldValue: string, newValue: string): void;
    protected onTodayTextColorChanged(oldValue: string, newValue: string): void;
    protected onDayTextColorChanged(oldValue: string, newValue: string): void;
    protected onDayFontNameChanged(oldValue: string, newValue: string): void;
    protected onDayFontStyleChanged(oldValue: string, newValue: string): void;
    protected onDayTextSizeChanged(oldValue: number, newValue: number): void;
    protected onDayNameTextColorChanged(oldValue: string, newValue: string): void;
    protected onDayNameFontNameChanged(oldValue: string, newValue: string): void;
    protected onDayNameFontStyleChanged(oldValue: string, newValue: string): void;
    protected onDayNameTextSizeChanged(oldValue: number, newValue: number): void;
    protected onMonthNameTextColorChanged(oldValue: string, newValue: string): void;
    protected onMonthNameFontNameChanged(oldValue: string, newValue: string): void;
    protected onMonthNameFontStyleChanged(oldValue: string, newValue: string): void;
    protected onMonthNameTextSizeChanged(oldValue: number, newValue: number): void;
}
/**
 * Cell style class for inline events cells in month view
 */
export declare class InlineEventCellStyle extends commonModule.InlineEventCellStyle {
    private _adapter;
    apply(adapter: com.telerik.widget.calendar.CalendarAdapter): void;
    protected onCellBackgroundColorChanged(oldValue: string, newValue: string): void;
    protected onEventTextColorChanged(oldValue: string, newValue: string): void;
    protected onEventFontNameChanged(oldValue: string, newValue: string): void;
    protected onEventFontStyleChanged(oldValue: string, newValue: string): void;
    protected onEventTextSizeChanged(oldValue: number, newValue: number): void;
    protected onTimeTextColorChanged(oldValue: string, newValue: string): void;
    protected onTimeFontNameChanged(oldValue: string, newValue: string): void;
    protected onTimeFontStyleChanged(oldValue: string, newValue: string): void;
    protected onTimeTextSizeChanged(oldValue: number, newValue: number): void;
}
export declare class CalendarStyleInitializer {
    updateNativeStyles(style: any): void;
    onShowWeekNumbersChanged(oldValue: boolean, newValue: boolean, style: any): void;
    private changeShowWeekNumbers(newValue, style);
    onShowTitleChanged(oldValue: boolean, newValue: boolean, style: any): void;
    private changeShowTitle(newValue, style);
    onShowDayNamesChanged(oldValue: boolean, newValue: boolean, style: any): void;
    private changeShowDayNames(newValue, style);
    onBackgroundColorChanged(oldValue: string, newValue: string, style: any): void;
    private changeBackgroundColor(newValue, style);
    onDayCellStyleChanged(oldValue: DayCellStyle, newValue: DayCellStyle, style: any): void;
    private changeDayCellStyle(oldValue, newValue, style);
    onSelectedDayCellStyleChanged(oldValue: DayCellStyle, newValue: DayCellStyle, style: any): void;
    private changeSelectedDayCellStyle(oldValue, newValue, style);
    onTodayCellStyleChanged(oldValue: DayCellStyle, newValue: DayCellStyle, style: any): void;
    private changeTodayCellStyle(oldValue, newValue, style);
    onWeekNumberCellStyleChanged(oldValue: CellStyle, newValue: CellStyle, style: any): void;
    private changeWeekNumberCellStyle(oldValue, newValue, style);
    onWeekendCellStyleChanged(oldValue: CellStyle, newValue: CellStyle, style: any): void;
    private changeWeekendCellStyle(oldValue, newValue, style);
    onDayNameCellStyleChanged(oldValue: CellStyle, newValue: CellStyle, style: any): void;
    private changeDayNameCellStyle(oldValue, newValue, style);
    onTitleCellStyleChanged(oldValue: CellStyle, newValue: CellStyle, style: any): void;
    protected changeTitleCellStyle(oldValue: CellStyle, newValue: CellStyle, style: any): void;
    syncSelectionShape(style: any): void;
}
/**
 * Class for month view style
 */
export declare class CalendarMonthViewStyle extends commonModule.CalendarMonthViewStyle {
    private _initializer;
    readonly initializer: CalendarStyleInitializer;
    _owner: RadCalendar;
    owner: RadCalendar;
    updateNativeStyles(): void;
    prepareNativeStyle(style: any, cellType: CellStyleType): void;
    protected updateNativeStyleFilters(style: any, cellType: CellStyleType): void;
    protected onShowWeekNumbersChanged(oldValue: boolean, newValue: boolean): void;
    protected onSelectionShapeChanged(oldValue: string, newValue: string): void;
    protected onSelectionShapeSizeChanged(oldValue: number, newValue: number): void;
    protected onSelectionShapeColorChanged(oldValue: string, newValue: string): void;
    protected onShowTitleChanged(oldValue: boolean, newValue: boolean): void;
    protected onShowDayNamesChanged(oldValue: boolean, newValue: boolean): void;
    protected onBackgroundColorChanged(oldValue: string, newValue: string): void;
    protected onDayCellStyleChanged(oldValue: DayCellStyle, newValue: DayCellStyle): void;
    protected onSelectedDayCellStyleChanged(oldValue: DayCellStyle, newValue: DayCellStyle): void;
    protected onTodayCellStyleChanged(oldValue: DayCellStyle, newValue: DayCellStyle): void;
    protected onWeekNumberCellStyleChanged(oldValue: CellStyle, newValue: CellStyle): void;
    protected onWeekendCellStyleChanged(oldValue: CellStyle, newValue: CellStyle): void;
    protected onDayNameCellStyleChanged(oldValue: CellStyle, newValue: CellStyle): void;
    protected onTitleCellStyleChanged(oldValue: CellStyle, newValue: CellStyle): void;
    protected onInlineEventCellStyleChanged(oldValue: InlineEventCellStyle, newValue: InlineEventCellStyle): void;
}
/**
 * The style class for week mode.
 * NOTE: we should consider if we need an explicit class that is the same as the base one
 */
export declare class CalendarWeekViewStyle extends CalendarMonthViewStyle {
    protected updateNativeStyleFilters(style: any, cellType: CellStyleType): void;
}
/**
 * The style class for day mode.
 */
export declare class CalendarDayViewStyle extends commonModule.CalendarDayViewStyle {
    private _initializer;
    readonly initializer: CalendarStyleInitializer;
    _owner: RadCalendar;
    owner: RadCalendar;
    updateNativeStyles(): void;
    private updateNativeDayStyles();
    prepareNativeStyle(style: any, cellType: CellStyleType): void;
    protected updateNativeStyleFilters(style: any, cellType: CellStyleType): void;
    protected onShowWeekNumbersChanged(oldValue: boolean, newValue: boolean): void;
    protected onSelectionShapeChanged(oldValue: string, newValue: string): void;
    protected onSelectionShapeSizeChanged(oldValue: number, newValue: number): void;
    protected onSelectionShapeColorChanged(oldValue: string, newValue: string): void;
    protected onShowTitleChanged(oldValue: boolean, newValue: boolean): void;
    protected onShowDayNamesChanged(oldValue: boolean, newValue: boolean): void;
    protected onBackgroundColorChanged(oldValue: string, newValue: string): void;
    protected onDayCellStyleChanged(oldValue: DayCellStyle, newValue: DayCellStyle): void;
    protected onSelectedDayCellStyleChanged(oldValue: DayCellStyle, newValue: DayCellStyle): void;
    protected onTodayCellStyleChanged(oldValue: DayCellStyle, newValue: DayCellStyle): void;
    protected onWeekNumberCellStyleChanged(oldValue: CellStyle, newValue: CellStyle): void;
    protected onWeekendCellStyleChanged(oldValue: CellStyle, newValue: CellStyle): void;
    protected onDayNameCellStyleChanged(oldValue: CellStyle, newValue: CellStyle): void;
    protected onTitleCellStyleChanged(oldValue: CellStyle, newValue: CellStyle): void;
    protected onDayEventsViewStyleChanged(oldValue: commonModule.DayEventsViewStyle, newValue: commonModule.DayEventsViewStyle): void;
    private changeDayEventsViewStyle(oldValue, newValue);
    protected onAllDayEventsViewStyleChanged(oldValue: commonModule.AllDayEventsViewStyle, newValue: commonModule.AllDayEventsViewStyle): void;
    private changeAllDayEventsViewStyle(oldValue, newValue);
    protected onInlineEventCellStyleChanged(oldValue: InlineEventCellStyle, newValue: InlineEventCellStyle): void;
    protected onShowWeekChanged(oldValue: boolean, newValue: boolean): void;
    private changeShowWeek(oldValue, newValue);
}
/**
 * The year mode style class
 */
export declare class CalendarYearViewStyle extends commonModule.CalendarYearViewStyle {
    constructor();
    protected _owner: RadCalendar;
    owner: RadCalendar;
    updateNativeStyles(): void;
    protected onTitleCellStyleChanged(oldValue: CellStyle, newValue: CellStyle): void;
    protected onMonthCellStyleChanged(oldValue: MonthCellStyle, newValue: MonthCellStyle): void;
}
/**
 * The year view mode in compact view
 */
export declare class CalendarMonthNamesViewStyle extends commonModule.CalendarMonthNamesViewStyle {
    constructor();
    protected _owner: RadCalendar;
    owner: RadCalendar;
    updateNativeStyles(): void;
    protected updateFilterDisplayMode(filter: com.telerik.widget.calendar.CalendarMonthCellFilter): void;
    protected onTitleCellStyleChanged(oldValue: CellStyle, newValue: CellStyle): void;
    protected onMonthNameCellStyleChanged(oldValue: CellStyle, newValue: CellStyle): void;
}
export declare class RadCalendar extends commonModule.RadCalendar {
    private _android;
    private _forbidNativeSelection;
    private _androidViewId;
    readonly _nativeView: any;
    constructor();
    createNativeView(): any;
    initNativeView(): void;
    private loadNativeDisplayedDate();
    private addOnCellClickListener();
    _syncSelectionShape(): void;
    private addOnInlineEventsClickedListener();
    private addOnDisplayDateChangedListener();
    private addOnDisplayModeChangedListener();
    private notifyViewModeChanged(oldMode, newMode);
    private setDayViewEventSelectedListener();
    private addOnSelectedDatesChangedListener();
    private notifySingleDateSelected(calendar, date);
    private notifyDateDeselected(calendar, date);
    private notifyRangeSelectionChanged(calendar, firstSelected, lastSelected);
    private setNativeViewMode(mode);
    private setNativeSelectionMode(mode);
    private setNativeTransitionMode(mode);
    private setNativeEventsViewMode(data);
    private setNativeMaxDate(data);
    private setNativeMinDate(data);
    private setNativeDisplayedDate(data);
    private setNativeSelectedDate(data);
    private setNativeSelectedDates(data);
    private setNativeSelectedDateRange(data);
    private setNativeHorizontalTransition(data);
    protected getDisplayedDate(): number;
    protected onLocalePropertyChanged(oldValue: string, newValue: string): void;
    private setNativeLocale(locale);
    protected onViewModeChanged(oldValue: string, newValue: string): void;
    protected onSelectionModeChanged(oldValue: string, newValue: string): void;
    protected onTransitionModeChanged(oldValue: string, newValue: string): void;
    protected onEventsViewModeChanged(oldValue: string, newValue: string): void;
    protected onMaxDateChanged(oldValue: string, newValue: string): void;
    protected onMinDateChanged(oldValue: string, newValue: string): void;
    protected onDisplayedDateChanged(oldValue: Date, newValue: Date): void;
    protected onSelectedDateChanged(oldValue: string, newValue: string): void;
    protected onSelectedDatesChanged(oldValue: string, newValue: string): void;
    protected onSelectedDateRangeChanged(oldValue: commonModule.DateRange, newValue: commonModule.DateRange): void;
    protected onHorizontalTransitionChanged(oldValue: boolean, newValue: boolean): void;
    protected onMonthViewStyleChanged(oldValue: commonModule.CalendarMonthViewStyle, newValue: commonModule.CalendarMonthViewStyle): void;
    protected onWeekViewStyleChanged(oldValue: commonModule.CalendarWeekViewStyle, newValue: commonModule.CalendarWeekViewStyle): void;
    protected onDayViewStyleChanged(oldValue: commonModule.CalendarDayViewStyle, newValue: commonModule.CalendarDayViewStyle): void;
    protected onMonthNamesViewStyleChanged(oldValue: CalendarMonthNamesViewStyle, newValue: CalendarMonthNamesViewStyle): void;
    protected onYearViewStyleChanged(oldValue: CalendarYearViewStyle, newValue: CalendarYearViewStyle): void;
    reload(): void;
    navigateForward(): void;
    navigateBack(): void;
    goToDate(date: Date): void;
    getEventsForDate(date: Date): Array<CalendarEvent>;
    static getCalendarFromDate(date: Date): java.util.Calendar;
    static getDateFromCalendar(calendar: java.util.Calendar): Date;
    private clearSelection();
    private initOnInlineEventsClickedListener();
    updateEventSource(): void;
    static getAndroidViewModeFromViewMode(viewMode: string): com.telerik.widget.calendar.CalendarDisplayMode;
    static getViewModeFromAndroidViewMode(calendar: RadCalendar, viewMode: com.telerik.widget.calendar.CalendarDisplayMode): string;
    private static getAndroidTransitonModeFromTransitionMode(value);
    private static getAndroidEventsViewModeFromEventsViewMode(value);
}
