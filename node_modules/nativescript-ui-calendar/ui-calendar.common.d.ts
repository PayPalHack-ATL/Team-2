import { View, ViewBase, Property } from "tns-core-modules/ui/core/view";
import { EventData } from "tns-core-modules/data/observable";
import { Color } from "tns-core-modules/color";
import { ObservableArray } from "tns-core-modules/data/observable-array";
export declare namespace CalendarViewMode {
    let Week: string;
    let Month: string;
    let MonthNames: string;
    let Year: string;
    let Day: string;
}
export declare namespace SelectionShape {
    let Round: string;
    let Square: string;
    let None: string;
}
export declare namespace CalendarEventsViewMode {
    let None: string;
    let Inline: string;
    let Popover: string;
}
export declare namespace CalendarSelectionMode {
    let None: string;
    let Single: string;
    let Multiple: string;
    let Range: string;
}
export declare namespace CalendarTransitionMode {
    let None: string;
    let Slide: string;
    let Stack: string;
    let Flip: string;
    let Fold: string;
    let Float: string;
    let Rotate: string;
    let Plain: string;
    let Free: string;
    let Combo: string;
    let Overlap: string;
}
/**
 * Font styles
 */
export declare namespace FontStyles {
    /**
    * Regular font style
    */
    let Normal: string;
    /**
    * Bold font style
    */
    let Bold: string;
    /**
     * Italic font style
     */
    let Italic: string;
    /**
     * Combine Bold and Italic styles
     */
    let BoldItalic: string;
}
/**
* Defines the alignment options for cells in Calendar component.
*/
export declare namespace CalendarCellAlignment {
    /**
     The cell content is aligned to left.
     */
    let Left: string;
    /**
     The cell content is aligned to right.
     */
    let Right: string;
    /**
     The cell content is aligned to top.
     */
    let Top: string;
    /**
     The cell content is aligned to bottom.
     */
    let Bottom: string;
    /**
     The cell content is aligned horizontally.
     */
    let HorizontalCenter: string;
    /**
     The cell content is aligned vertically.
     */
    let VerticalCenter: string;
}
export declare class DateRange {
    private _startDate;
    private _endDate;
    constructor(startDate?: any, endDate?: any);
    startDate: any;
    endDate: any;
    normalize(): void;
}
export declare class CalendarEvent {
    constructor(title: string, startDate: Date, endDate: Date, isAllDay?: boolean, eventColor?: Color);
    readonly android: any;
    readonly ios: any;
    title: string;
    startDate: Date;
    endDate: Date;
    isAllDay: boolean;
    eventColor: Color;
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
export declare class CalendarViewModeChangedEventData implements EventData {
    /**
    *Returns the name of the event that has been fired.
    */
    eventName: string;
    /**
    * The object that fires the event.
    */
    object: any;
    /**
    * The old value of the ViewMode property.
    */
    oldValue: string;
    /**
     * The new value of the ViewMode property.
     */
    newValue: string;
}
export declare class CalendarCellTapEventData implements EventData {
    /**
    * Returns the name of the event that has been fired.
    */
    eventName: string;
    /**
    * The object that fires the event.
    */
    object: any;
    /**
     * The related native cell.
     */
    cell: any;
    /**
     * The related Date.
     */
    date: Date;
}
export declare class CalendarSelectionEventData implements EventData {
    /**
    * Returns the name of the event that has been fired.
    */
    eventName: string;
    /**
    * The object that fires the event.
    */
    object: any;
    /**
     * The relative Date.
     */
    date: Date;
}
export declare class CalendarInlineEventSelectedData implements EventData {
    /**
    * Returns the name of the event that has been fired.
    */
    eventName: string;
    /**
    * The object that fires the event.
    */
    object: any;
    /**
     * The data for inline event selected in calendar.
     */
    eventData: CalendarEvent;
}
export declare class CalendarDayViewEventSelectedData implements EventData {
    /**
    * Returns the name of the event that has been fired.
    */
    eventName: string;
    /**
    * The object that fires the event.
    */
    object: any;
    /**
     * The data for day view event selected in calendar.
     */
    eventData: CalendarEvent;
}
export declare class CalendarNavigationEventData implements EventData {
    /**
    * Returns the name of the event that has been fired.
    */
    eventName: string;
    /**
    * The object that fires the event.
    */
    object: any;
    /**
     * The relative Date.
     */
    date: Date;
}
export declare class CalendarMonthViewStyle extends ViewBase {
    owner: RadCalendar;
    showWeekNumbers: boolean;
    showTitle: boolean;
    showDayNames: boolean;
    todayCellStyle: DayCellStyle;
    backgroundColor: string;
    dayCellStyle: DayCellStyle;
    dayNameCellStyle: CellStyle;
    weekNumberCellStyle: CellStyle;
    weekendCellStyle: CellStyle;
    titleCellStyle: CellStyle;
    selectedDayCellStyle: DayCellStyle;
    inlineEventCellStyle: InlineEventCellStyle;
    selectionShape: string;
    selectionShapeSize: number;
    selectionShapeColor: string;
    updateViewStyles(forceUpdate?: boolean): void;
    static showWeekNumbersProperty: Property<CalendarMonthViewStyle, boolean>;
    static selectionShapeProperty: Property<CalendarMonthViewStyle, string>;
    private onSelectionShapePropertyChanged(oldValue, newValue);
    protected onSelectionShapeChanged(oldValue: string, newValue: string): void;
    static selectionShapeSizeProperty: Property<CalendarMonthViewStyle, number>;
    private onSelectionShapeSizePropertyChanged(oldValue, newValue);
    protected onSelectionShapeSizeChanged(oldValue: number, newValue: number): void;
    static selectionShapeColorProperty: Property<CalendarMonthViewStyle, string>;
    private onSelectionShapeColorPropertyChanged(oldValue, newValue);
    protected onSelectionShapeColorChanged(oldValue: string, newValue: string): void;
    private onShowWeekNumbersPropertyChanged(oldValue, newValue);
    protected onShowWeekNumbersChanged(oldValue: boolean, newValue: boolean): void;
    static showTitleProperty: Property<CalendarMonthViewStyle, boolean>;
    private onShowTitlePropertyChanged(oldValue, newValue);
    protected onShowTitleChanged(oldValue: boolean, newValue: boolean): void;
    static showDayNamesProperty: Property<CalendarMonthViewStyle, boolean>;
    private onShowDayNamesPropertyChanged(oldValue, newValue);
    protected onShowDayNamesChanged(oldValue: boolean, newValue: boolean): void;
    static backgroundColorProperty: Property<CalendarMonthViewStyle, string>;
    private onCellBackgroundColorPropertyChanged(oldValue, newValue);
    protected onBackgroundColorChanged(oldValue: string, newValue: string): void;
    static dayCellStyleProperty: Property<CalendarMonthViewStyle, DayCellStyle>;
    private onDayCellStylePropertyChanged(oldValue, newValue);
    protected onDayCellStyleChanged(oldValue: DayCellStyle, newValue: DayCellStyle): void;
    static selectedDayCellStyleProperty: Property<CalendarMonthViewStyle, DayCellStyle>;
    private onSelectedDayCellStylePropertyChanged(oldValue, newValue);
    protected onSelectedDayCellStyleChanged(oldValue: DayCellStyle, newValue: DayCellStyle): void;
    static todayCellStyleProperty: Property<CalendarMonthViewStyle, DayCellStyle>;
    private onTodayCellStylePropertyChanged(oldValue, newValue);
    protected onTodayCellStyleChanged(oldValue: DayCellStyle, newValue: DayCellStyle): void;
    static dayNameCellStyleProperty: Property<CalendarMonthViewStyle, CellStyle>;
    private onDayNameCellStylePropertyChanged(oldValue, newValue);
    protected onDayNameCellStyleChanged(oldValue: CellStyle, newValue: CellStyle): void;
    static weekNumberCellStyleProperty: Property<CalendarMonthViewStyle, CellStyle>;
    private onWeekNumberCellStylePropertyChanged(oldValue, newValue);
    protected onWeekNumberCellStyleChanged(oldValue: CellStyle, newValue: CellStyle): void;
    static weekendCellStyleProperty: Property<CalendarMonthViewStyle, CellStyle>;
    private onWeekendCellStylePropertyChanged(oldValue, newValue);
    protected onWeekendCellStyleChanged(oldValue: CellStyle, newValue: CellStyle): void;
    static titleCellStyleProperty: Property<CalendarMonthViewStyle, CellStyle>;
    private onTitleCellStylePropertyChanged(oldValue, newValue);
    protected onTitleCellStyleChanged(oldValue: CellStyle, newValue: CellStyle): void;
    static inlineEventCellStyleProperty: Property<CalendarMonthViewStyle, InlineEventCellStyle>;
    private onInlineEventCellStylePropertyChanged(oldValue, newValue);
    protected onInlineEventCellStyleChanged(oldValue: InlineEventCellStyle, newValue: InlineEventCellStyle): void;
}
/**
 * Style class for Week view mode
 */
export declare class CalendarWeekViewStyle extends CalendarMonthViewStyle {
}
/**
 * Style class for Day view mode
 */
export declare class CalendarDayViewStyle extends CalendarWeekViewStyle {
    showWeek: boolean;
    dayEventsViewStyle: DayEventsViewStyle;
    allDayEventsViewStyle: AllDayEventsViewStyle;
    static showWeekProperty: Property<CalendarDayViewStyle, boolean>;
    private onShowWeekPropertyChanged(oldValue, newValue);
    protected onShowWeekChanged(oldValue: boolean, newValue: boolean): void;
    static dayEventsViewStyleProperty: Property<CalendarDayViewStyle, DayEventsViewStyle>;
    private onDayEventsViewStylePropertyChanged(oldValue, newValue);
    protected onDayEventsViewStyleChanged(oldValue: DayEventsViewStyle, newValue: DayEventsViewStyle): void;
    static allDayEventsViewStyleProperty: Property<CalendarDayViewStyle, AllDayEventsViewStyle>;
    private onAllDayEventsViewStylePropertyChanged(oldValue, newValue);
    protected onAllDayEventsViewStyleChanged(oldValue: AllDayEventsViewStyle, newValue: AllDayEventsViewStyle): void;
}
/**
 * Style class for Year view mode
 */
export declare class CalendarYearViewStyle extends ViewBase {
    owner: RadCalendar;
    titleCellStyle: CellStyle;
    monthCellStyle: MonthCellStyle;
    static titleCellStyleProperty: Property<CalendarYearViewStyle, CellStyle>;
    private onTitleCellStylePropertyChanged(oldValue, newValue);
    protected onTitleCellStyleChanged(oldValue: CellStyle, newValue: CellStyle): void;
    static monthCellStyleProperty: Property<CalendarYearViewStyle, MonthCellStyle>;
    private onMonthCellStylePropertyChanged(oldValue, newValue);
    protected onMonthCellStyleChanged(oldValue: MonthCellStyle, newValue: MonthCellStyle): void;
}
/**
 * Style class for year view with month names only view mode
 */
export declare class CalendarMonthNamesViewStyle extends ViewBase {
    owner: RadCalendar;
    titleCellStyle: CellStyle;
    monthNameCellStyle: CellStyle;
    static titleCellStyleProperty: Property<CalendarMonthNamesViewStyle, CellStyle>;
    private onTitleCellStylePropertyChanged(oldValue, newValue);
    protected onTitleCellStyleChanged(oldValue: CellStyle, newValue: CellStyle): void;
    static monthNameCellStyleProperty: Property<CalendarMonthNamesViewStyle, CellStyle>;
    private onMonthNameCellStylePropertyChanged(oldValue, newValue);
    protected onMonthNameCellStyleChanged(oldValue: CellStyle, newValue: CellStyle): void;
}
/**
 * The style class with customization properties for months in year view
 * Note: this class is not inherited from CellStyle
 */
export declare class MonthCellStyle extends ViewBase {
    owner: any;
    weekendTextColor: string;
    todayTextColor: string;
    dayTextColor: string;
    dayFontName: string;
    dayFontStyle: string;
    dayTextSize: number;
    dayNameTextColor: string;
    dayNameFontName: string;
    dayNameFontStyle: string;
    dayNameTextSize: number;
    monthNameTextColor: string;
    monthNameFontName: string;
    monthNameFontStyle: string;
    monthNameTextSize: number;
    static weekendTextColorProperty: Property<MonthCellStyle, string>;
    private onWeekendТextColorPropertyChanged(oldValue, newValue);
    protected onWeekendTextColorChanged(oldValue: string, newValue: string): void;
    static todayTextColorProperty: Property<MonthCellStyle, string>;
    private onTodayТextColorPropertyChanged(oldValue, newValue);
    protected onTodayTextColorChanged(oldValue: string, newValue: string): void;
    static dayTextColorProperty: Property<MonthCellStyle, string>;
    private onDayТextColorPropertyChanged(oldValue, newValue);
    protected onDayTextColorChanged(oldValue: string, newValue: string): void;
    static dayFontNameProperty: Property<MonthCellStyle, string>;
    private onDayFontNamePropertyChanged(oldValue, newValue);
    protected onDayFontNameChanged(oldValue: string, newValue: string): void;
    static dayFontStyleProperty: Property<MonthCellStyle, string>;
    private onDayFontStylePropertyChanged(oldValue, newValue);
    protected onDayFontStyleChanged(oldValue: string, newValue: string): void;
    static dayTextSizeProperty: Property<MonthCellStyle, number>;
    private onDayTextSizePropertyChanged(oldValue, newValue);
    protected onDayTextSizeChanged(oldValue: number, newValue: number): void;
    static dayNameTextColorProperty: Property<MonthCellStyle, string>;
    private onDayNameТextColorPropertyChanged(oldValue, newValue);
    protected onDayNameTextColorChanged(oldValue: string, newValue: string): void;
    static dayNameFontNameProperty: Property<MonthCellStyle, string>;
    private onDayNameFontNamePropertyChanged(oldValue, newValue);
    protected onDayNameFontNameChanged(oldValue: string, newValue: string): void;
    static dayNameFontStyleProperty: Property<MonthCellStyle, string>;
    private onDayNameFontStylePropertyChanged(oldValue, newValue);
    protected onDayNameFontStyleChanged(oldValue: string, newValue: string): void;
    static dayNameTextSizeProperty: Property<MonthCellStyle, number>;
    private onDayNameTextSizePropertyChanged(oldValue, newValue);
    protected onDayNameTextSizeChanged(oldValue: number, newValue: number): void;
    static monthNameTextColorProperty: Property<MonthCellStyle, string>;
    private onMonthNameТextColorPropertyChanged(oldValue, newValue);
    protected onMonthNameTextColorChanged(oldValue: string, newValue: string): void;
    static monthNameFontNameProperty: Property<MonthCellStyle, string>;
    private onMonthNameFontNamePropertyChanged(oldValue, newValue);
    protected onMonthNameFontNameChanged(oldValue: string, newValue: string): void;
    static monthNameFontStyleProperty: Property<MonthCellStyle, string>;
    private onMonthNameFontStylePropertyChanged(oldValue, newValue);
    protected onMonthNameFontStyleChanged(oldValue: string, newValue: string): void;
    static monthNameTextSizeProperty: Property<MonthCellStyle, number>;
    private onMonthNameTextSizePropertyChanged(oldValue, newValue);
    protected onMonthNameTextSizeChanged(oldValue: number, newValue: number): void;
}
export declare class CellStyle extends ViewBase {
    owner: any;
    cellBorderWidth: number;
    cellBorderColor: string;
    cellBackgroundColor: string;
    cellAlignment: any;
    cellTextColor: string;
    cellTextFontName: string;
    cellTextFontStyle: string;
    cellTextSize: number;
    cellPaddingHorizontal: number;
    cellPaddingVertical: number;
    readonly ios: any;
    readonly android: any;
    static cellBorderWidthProperty: Property<CellStyle, number>;
    private onCellBorderWidthPropertyChanged(oldValue, newValue);
    protected onCellBorderWidthChanged(oldValue: number, newValue: number): void;
    static cellBorderColorProperty: Property<CellStyle, string>;
    private onCellBorderColorPropertyChanged(oldValue, newValue);
    protected onCellBorderColorChanged(oldValue: string, newValue: string): void;
    static cellBackgroundColorProperty: Property<CellStyle, string>;
    private onCellBackgroundColorPropertyChanged(oldValue, newValue);
    protected onCellBackgroundColorChanged(oldValue: string, newValue: string): void;
    static cellAlignmentProperty: Property<CellStyle, any>;
    private onCellAlignmentPropertyChanged(oldValue, newValue);
    protected onCellAlignmentChanged(oldValue: any, newValue: any): void;
    static cellTextColorProperty: Property<CellStyle, string>;
    private onCellТextColorPropertyChanged(oldValue, newValue);
    protected onCellTextColorChanged(oldValue: string, newValue: string): void;
    static cellTextFontNameProperty: Property<CellStyle, string>;
    private onCellTextFontNamePropertyChanged(oldValue, newValue);
    protected onCellTextFontNameChanged(oldValue: string, newValue: string): void;
    static cellTextFontStyleProperty: Property<CellStyle, string>;
    private onCellTextFontStylePropertyChanged(oldValue, newValue);
    protected onCellTextFontStyleChanged(oldValue: string, newValue: string): void;
    static cellTextSizeProperty: Property<CellStyle, number>;
    private onCellTextSizePropertyChanged(oldValue, newValue);
    protected onCellTextSizeChanged(oldValue: number, newValue: number): void;
    static cellPaddingHorizontalProperty: Property<CellStyle, number>;
    private onCellPaddingHorizontalPropertyChanged(oldValue, newValue);
    protected onCellPaddingHorizontalChanged(oldValue: number, newValue: number): void;
    static cellPaddingVerticalProperty: Property<CellStyle, number>;
    private onCellPaddingVerticalPropertyChanged(oldValue, newValue);
    protected onCellPaddingVerticalChanged(oldValue: number, newValue: number): void;
}
export declare class DayEventsViewStyle extends ViewBase {
    owner: any;
    backgroundColor: string;
    timeLabelFormat: string;
    timeLabelTextColor: string;
    timeLabelTextSize: number;
    timeLinesWidth: number;
    timeLinesColor: string;
    readonly ios: any;
    readonly android: any;
    static backgroundColorProperty: Property<DayEventsViewStyle, string>;
    private onBackgroundColorPropertyChanged(oldValue, newValue);
    protected onBackgroundColorChanged(oldValue: string, newValue: string): void;
    static timeLabelFormatProperty: Property<DayEventsViewStyle, string>;
    private onTimeLabelFormatPropertyChanged(oldValue, newValue);
    protected onTimeLabelFormatChanged(oldValue: string, newValue: string): void;
    static timeLabelTextColorProperty: Property<DayEventsViewStyle, string>;
    private onTimeLabelTextColorPropertyChanged(oldValue, newValue);
    protected onTimeLabelTextColorChanged(oldValue: string, newValue: string): void;
    static timeLabelFontNameProperty: Property<DayEventsViewStyle, string>;
    private onTimeLabelFontNamePropertyChanged(oldValue, newValue);
    protected onTimeLabelFontNameChanged(oldValue: string, newValue: string): void;
    static timeLabelFontStyleProperty: Property<DayEventsViewStyle, string>;
    private onTimeLabelFontStylePropertyChanged(oldValue, newValue);
    protected onTimeLabelFontStyleChanged(oldValue: string, newValue: string): void;
    static timeLabelTextSizeProperty: Property<DayEventsViewStyle, number>;
    private onTimeLabelTextSizePropertyChanged(oldValue, newValue);
    protected onTimeLabelTextSizeChanged(oldValue: number, newValue: number): void;
    static timeLinesWidthProperty: Property<DayEventsViewStyle, number>;
    private onTimeLinesWidthPropertyChanged(oldValue, newValue);
    protected onTimeLinesWidthChanged(oldValue: number, newValue: number): void;
    static timeLinesColorProperty: Property<DayEventsViewStyle, string>;
    private onTimeLinesColorPropertyChanged(oldValue, newValue);
    protected onTimeLinesColorChanged(oldValue: string, newValue: string): void;
}
export declare class AllDayEventsViewStyle extends ViewBase {
    owner: any;
    backgroundColor: string;
    allDayText: string;
    allDayTextIsVisible: boolean;
    static ALL_DAY_TEXT: string;
    readonly ios: any;
    readonly android: any;
    static backgroundColorProperty: Property<AllDayEventsViewStyle, string>;
    private onBackgroundColorPropertyChanged(oldValue, newValue);
    protected onBackgroundColorChanged(oldValue: string, newValue: string): void;
    static allDayTextProperty: Property<AllDayEventsViewStyle, string>;
    private onAllDayTextPropertyChanged(oldValue, newValue);
    protected onAllDayTextChanged(oldValue: string, newValue: string): void;
    static allDayTextIsVisibleProperty: Property<AllDayEventsViewStyle, boolean>;
    private onAllDayTextIsVisiblePropertyChanged(oldValue, newValue);
    protected onAlDayTextIsVisibleChanged(oldValue: boolean, newValue: boolean): void;
}
export declare class DayCellStyle extends CellStyle {
    showEventsText: boolean;
    eventTextColor: string;
    eventFontName: string;
    eventFontStyle: string;
    eventTextSize: number;
    static showEventsTextProperty: Property<DayCellStyle, boolean>;
    private onShowEventsTextPropertyChanged(oldValue, newValue);
    protected onShowEventsTextChanged(oldValue: boolean, newValue: boolean): void;
    static eventTextColorProperty: Property<DayCellStyle, string>;
    private onEventTextColorPropertyChanged(oldValue, newValue);
    protected onEventTextColorChanged(oldValue: string, newValue: string): void;
    static eventFontNameProperty: Property<DayCellStyle, string>;
    private onEventFontNamePropertyChanged(oldValue, newValue);
    protected onEventFontNameChanged(oldValue: string, newValue: string): void;
    static eventFontStyleProperty: Property<DayCellStyle, string>;
    private onEventFontStylePropertyChanged(oldValue, newValue);
    protected onEventFontStyleChanged(oldValue: string, newValue: string): void;
    static eventTextSizeProperty: Property<DayCellStyle, number>;
    private onEventTextSizePropertyChanged(oldValue, newValue);
    protected onEventTextSizeChanged(oldValue: number, newValue: number): void;
}
/**
 * Cell style class for inline events cells in month view
 */
export declare class InlineEventCellStyle extends ViewBase {
    cellBackgroundColor: string;
    eventTextColor: string;
    eventFontName: string;
    eventFontStyle: string;
    eventTextSize: number;
    timeTextColor: string;
    timeFontName: string;
    timeFontStyle: string;
    timeTextSize: number;
    static cellBackgroundColorProperty: Property<InlineEventCellStyle, string>;
    private onCellBackgroundColorPropertyChanged(oldValue, newValue);
    protected onCellBackgroundColorChanged(oldValue: string, newValue: string): void;
    static eventTextColorProperty: Property<InlineEventCellStyle, string>;
    private onEventTextColorPropertyChanged(oldValue, newValue);
    protected onEventTextColorChanged(oldValue: string, newValue: string): void;
    static eventFontNameProperty: Property<InlineEventCellStyle, string>;
    private onEventFontNamePropertyChanged(oldValue, newValue);
    protected onEventFontNameChanged(oldValue: string, newValue: string): void;
    static eventFontStyleProperty: Property<InlineEventCellStyle, string>;
    private onEventFontStylePropertyChanged(oldValue, newValue);
    protected onEventFontStyleChanged(oldValue: string, newValue: string): void;
    static eventTextSizeProperty: Property<InlineEventCellStyle, number>;
    private onEventTextSizePropertyChanged(oldValue, newValue);
    protected onEventTextSizeChanged(oldValue: number, newValue: number): void;
    static timeTextColorProperty: Property<InlineEventCellStyle, string>;
    private onTimeTextColorPropertyChanged(oldValue, newValue);
    protected onTimeTextColorChanged(oldValue: string, newValue: string): void;
    static timeFontNameProperty: Property<InlineEventCellStyle, string>;
    private onTimeFontNamePropertyChanged(oldValue, newValue);
    protected onTimeFontNameChanged(oldValue: string, newValue: string): void;
    static timeFontStyleProperty: Property<InlineEventCellStyle, string>;
    private onTimeFontStylePropertyChanged(oldValue, newValue);
    protected onTimeFontStyleChanged(oldValue: string, newValue: string): void;
    static timeTextSizeProperty: Property<InlineEventCellStyle, number>;
    private onTimeTextSizePropertyChanged(oldValue, newValue);
    protected onTimeTextSizeChanged(oldValue: number, newValue: number): void;
}
export declare class RadCalendar extends View {
    static dateSelectedEvent: string;
    static dateDeselectedEvent: string;
    static cellTapEvent: string;
    static inlineEventSelectedEvent: string;
    static dayViewEventSelectedEvent: string;
    static navigatedToDateEvent: string;
    static navigatingToDateStartedEvent: string;
    static viewModeChangedEvent: string;
    locale: string;
    minDate: any;
    maxDate: any;
    selectedDate: any;
    selectedDates: any;
    selectedDateRange: DateRange;
    viewMode: string;
    eventsViewMode: string;
    selectionMode: string;
    transitionMode: string;
    displayedDate: Date;
    eventSource: ObservableArray<CalendarEvent>;
    horizontalTransition: boolean;
    dayViewStyle: CalendarDayViewStyle;
    monthViewStyle: CalendarMonthViewStyle;
    weekViewStyle: CalendarWeekViewStyle;
    yearViewStyle: CalendarYearViewStyle;
    monthNamesViewStyle: CalendarMonthNamesViewStyle;
    static localeProperty: Property<RadCalendar, string>;
    protected onLocalePropertyChanged(oldValue: string, newValue: string): void;
    static minDateProperty: Property<RadCalendar, any>;
    private onMinDatePropertyChanged(oldValue, newValue);
    static maxDateProperty: Property<RadCalendar, any>;
    private onMaxDatePropertyChanged(oldValue, newValue);
    static selectedDateProperty: Property<RadCalendar, any>;
    private onSelectedDatePropertyChanged(oldValue, newValue);
    static selectedDatesProperty: Property<RadCalendar, any>;
    private onSelectedDatesPropertyChanged(oldValue, newValue);
    static selectedDateRangeProperty: Property<RadCalendar, DateRange>;
    private onSelectedDateRangePropertyChanged(oldValue, newValue);
    static viewModeProperty: Property<RadCalendar, string>;
    private onViewModePropertyChanged(oldValue, newValue);
    static eventsViewModeProperty: Property<RadCalendar, string>;
    private onEventsViewModePropertyChanged(oldValue, newValue);
    static selectionModeProperty: Property<RadCalendar, string>;
    private onSelectionModePropertyChanged(oldValue, newValue);
    static transitionModeProperty: Property<RadCalendar, string>;
    private onTransitionModePropertyChanged(oldValue, newValue);
    static displayedDateProperty: Property<RadCalendar, Date>;
    private onDisplayedDatePropertyChanged(oldValue, newValue);
    static eventSourceProperty: Property<RadCalendar, ObservableArray<CalendarEvent>>;
    private onEventSourcePropertyChanged(oldValue, newValue);
    static horizontalTransitionProperty: Property<RadCalendar, boolean>;
    private onHorizontalTransitionPropertyChanged(oldValue, newValue);
    static monthViewStyleProperty: Property<RadCalendar, CalendarMonthViewStyle>;
    private onMonthViewStylePropertyChanged(oldValue, newValue);
    static weekViewStyleProperty: Property<RadCalendar, CalendarWeekViewStyle>;
    private onWeekViewStylePropertyChanged(oldValue, newValue);
    static dayViewStyleProperty: Property<RadCalendar, CalendarDayViewStyle>;
    private onDayViewStylePropertyChanged(oldValue, newValue);
    static yearViewStyleProperty: Property<RadCalendar, CalendarYearViewStyle>;
    private onYearViewStylePropertyChanged(oldValue, newValue);
    static monthNamesViewStyleProperty: Property<RadCalendar, CalendarMonthNamesViewStyle>;
    private onMonthNamesViewStylePropertyChanged(oldValue, newValue);
    reload(): void;
    navigateForward(): void;
    navigateBack(): void;
    goToDate(date: Date): void;
    getEventsForDate(date: Date): Array<CalendarEvent>;
    parseDate(value: any): Date;
    private getSelectedDatesList();
    _addSelectedDate(date: Date): void;
    _removeSelectedDate(date: Date): void;
    protected onEventSourceChanged(oldValue: ObservableArray<CalendarEvent>, newValue: ObservableArray<CalendarEvent>): void;
    protected EventSourceChangedInternal(data: any): void;
    updateEventSource(): void;
    protected onDisplayedDateChanged(oldValue: Date, newValue: Date): void;
    protected onSelectionModeChanged(oldValue: string, newValue: string): void;
    protected onTransitionModeChanged(oldValue: string, newValue: string): void;
    protected onViewModeChanged(oldValue: string, newValue: string): void;
    protected onEventsViewModeChanged(oldValue: string, newValue: string): void;
    protected onSelectedDateRangeChanged(oldValue: DateRange, newValue: DateRange): void;
    protected onSelectedDatesChanged(oldValue: any, newValue: any): void;
    protected onSelectedDateChanged(oldValue: any, newValue: any): void;
    protected onMaxDateChanged(oldValue: any, newValue: any): void;
    protected onMinDateChanged(oldValue: any, newValue: any): void;
    protected onHorizontalTransitionChanged(oldValue: boolean, newValue: boolean): void;
    protected onMonthViewStyleChanged(oldValue: CalendarMonthViewStyle, newValue: CalendarMonthViewStyle): void;
    protected onWeekViewStyleChanged(oldValue: CalendarWeekViewStyle, newValue: CalendarWeekViewStyle): void;
    protected onDayViewStyleChanged(oldValue: CalendarDayViewStyle, newValue: CalendarDayViewStyle): void;
    protected onYearViewStyleChanged(oldValue: CalendarYearViewStyle, newValue: CalendarYearViewStyle): void;
    protected onMonthNamesViewStyleChanged(oldValue: CalendarMonthNamesViewStyle, newValue: CalendarMonthNamesViewStyle): void;
}
