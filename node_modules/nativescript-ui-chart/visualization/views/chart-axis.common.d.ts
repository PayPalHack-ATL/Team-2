import * as initializersCommon from "../../initializers/chart-initializers.common";
import { ViewBase, Property } from "tns-core-modules/ui/core/view";
/**
* Represents an axis in a Cartesian chart. This class is a base class for all
* axes that can be used within a RadCartesianChart instance.
*/
export declare class CartesianAxis extends ViewBase {
    protected _initializer: initializersCommon.CartesianAxisValueMapper;
    id: string;
    lineColor: string;
    lineThickness: number;
    lineHidden: boolean;
    labelTextColor: string;
    labelSize: any;
    labelFormat: any;
    labelMargin: any;
    labelRotationAngle: any;
    labelFitMode: any;
    labelLayoutMode: any;
    horizontalLocation: string;
    verticalLocation: string;
    ticksThickness: number;
    ticksLength: number;
    ticksOffset: number;
    ticksHidden: boolean;
    ticksColor: string;
    allowPan: boolean;
    allowZoom: boolean;
    hidden: boolean;
    static idProperty: Property<CartesianAxis, string>;
    static lineColorProperty: Property<CartesianAxis, string>;
    private onLineColorPropertyChanged(oldValue, newValue);
    protected onLineColorChanged(oldValue: string, newValue: string): void;
    static lineThicknessProperty: Property<CartesianAxis, number>;
    private onLineThicknessPropertyChanged(oldValue, newValue);
    protected onLineThicknessChanged(oldValue: number, newValue: number): void;
    static lineHiddenProperty: Property<CartesianAxis, boolean>;
    private onLineHiddenPropertyChanged(oldValue, newValue);
    protected onLineHiddenChanged(oldValue: boolean, newValue: boolean): void;
    static labelTextColorProperty: Property<CartesianAxis, string>;
    private onLabelTextColorPropertyChanged(oldValue, newValue);
    protected onLabelTextColorChanged(oldValue: string, newValue: string): void;
    /**
    * Identifies the labelSize dependency property.
    */
    static labelSizeProperty: Property<CartesianAxis, any>;
    private onLabelSizePropertyChanged(oldValue, newValue);
    /**
    * Called when the labelSize property changes.
    * @param data an object containing information about the change event.
    */
    protected onLabelSizeChanged(oldValue: any, newValue: any): void;
    /**
    * Identifies labelFormat dependency property.
    */
    static labelFormatProperty: Property<CartesianAxis, any>;
    private onLabelFormatPropertyChanged(oldValue, newValue);
    /**
    * Called when the labelFormat property changes.
    * @param data an object containing information about the change event.
    */
    protected onLabelFormatChanged(oldValue: any, newValue: any): void;
    /**
    * Identifies the labelMargin dependency property.
    */
    static labelMarginProperty: Property<CartesianAxis, number>;
    private onLabelMarginPropertyChanged(oldValue, newValue);
    /**
    * Called when the labelMargin property changes.
    * @param data an object containing information about the change event.
    */
    protected onLabelMarginChanged(oldValue: any, newValue: number): void;
    /**
    * Identifies the labelRotationAngle dependency property.
    */
    static labelRotationAngleProperty: Property<CartesianAxis, number>;
    private onLabelRotationAnglePropertyChanged(oldValue, newValue);
    /**
    * Called when the labelRotationAngle property changes.
    * @param data an object containing information about the change event.
    */
    protected onLabelRotationAngleChanged(oldValue: number, newValue: number): void;
    /**
    * Identifies the labelFitMode dependency property.
    */
    static labelFitModeProperty: Property<CartesianAxis, any>;
    private onLabelFitModePropertyChanged(oldValue, newValue);
    /**
    * Called when the labelFitMode property changes.
    * @param data an object containing information about the change event.
    */
    protected onLabelFitModeChanged(oldValue: any, newValue: any): void;
    /**
    * Identifies the labelLayoutMode dependency property.
    */
    static labelLayoutModeProperty: Property<CartesianAxis, any>;
    private onLabelLayoutModePropertyChanged(oldValue, newValue);
    /**
    * Called when the labelLayoutMode property changes.
    * @param data an object containing information about the change event.
    */
    protected onLabelLayoutModeChanged(oldValue: any, newValue: any): void;
    static ticksThicknessProperty: Property<CartesianAxis, number>;
    private onTicksThicknessPropertyChanged(oldValue, newValue);
    protected onTicksThicknessChanged(oldValue: number, newValue: number): void;
    static ticksLengthProperty: Property<CartesianAxis, number>;
    private onTicksLengthPropertyChanged(oldValue, newValue);
    protected onTicksLengthChanged(oldValue: number, newValue: number): void;
    static ticksOffsetProperty: Property<CartesianAxis, number>;
    private onTicksOffsetPropertyChanged(oldValue, newValue);
    protected onTicksOffsetChanged(oldValue: number, newValue: number): void;
    static ticksHiddenProperty: Property<CartesianAxis, boolean>;
    private onTicksHiddenPropertyChanged(oldValue, newValue);
    protected onTicksHiddenChanged(oldValue: boolean, newValue: boolean): void;
    static ticksColorProperty: Property<CartesianAxis, string>;
    private onTicksColorPropertyChanged(oldValue, newValue);
    protected onTicksColorChanged(oldValue: string, newValue: string): void;
    /**
    * Identifies the horizontalLocation dependency property.
    */
    static horizontalLocationProperty: Property<CartesianAxis, string>;
    private onHorizontalLocationPropertyChanged(oldValue, newValue);
    /**
    * Called when the horizontalLocation property changes.
    * @param data an object containing information about the change event.
    */
    protected onHorizontalLocationChanged(oldValue: string, newValue: string): void;
    /**
    * Identifies the verticalLocation dependency property.
    */
    static verticalLocationProperty: Property<CartesianAxis, string>;
    private onVerticalLocationPropertyChanged(oldValue, newValue);
    /**
    * Called when the verticalLocation property changes.
    */
    protected onVerticalLocationChanged(oldValue: string, newValue: string): void;
    /**
    * Identifies the allowPan dependency property.
    */
    static allowPanProperty: Property<CartesianAxis, boolean>;
    private onAllowPanPropertyChanged(oldValue, newValue);
    /**
    * Called when the allowPan property changes.
    */
    protected onAllowPanChanged(oldValue: boolean, newValue: boolean): void;
    /**
    * Identifies the allowZoom dependency property.
    */
    static allowZoomProperty: Property<CartesianAxis, boolean>;
    private onAllowZoomPropertyChanged(oldValue, newValue);
    /**
    * Called when the allowZoom property changes.
    */
    protected onAllowZoomChanged(oldValue: boolean, newValue: boolean): void;
    /**
    * Identifies the hidden dependency property.
    */
    static hiddenProperty: Property<CartesianAxis, boolean>;
    private onHiddenPropertyChanged(oldValue, newValue);
    /**
    * Called when the hidden property changes.
    */
    protected onHiddenChanged(oldValue: boolean, newValue: boolean): void;
    protected readonly initializer: initializersCommon.CartesianAxisValueMapper;
    readonly android: any;
    readonly ios: any;
    /**
     *  Keeps instance to owner chart in iOS and chart or series for Android
     */
    private _owner;
    owner: any;
    update(): void;
}
export declare class CategoricalAxis extends CartesianAxis {
    majorTickInterval: number;
    plotMode: string;
    static majorTickIntervalProperty: Property<CategoricalAxis, number>;
    private onMajorTickIntervalPropertyChanged(oldValue, newValue);
    static plotModeProperty: Property<CategoricalAxis, string>;
    private onPlotModePropertyChanged(oldValue, newValue);
    static lastLabelVisibilityProperty: Property<CategoricalAxis, string>;
    private onLastLabelVisibilityPropertyChanged(oldValue, newValue);
    static firstLabelVisibilityProperty: Property<CategoricalAxis, string>;
    private onFirstLabelVisibilityPropertyChanged(oldValue, newValue);
    protected readonly initializer: initializersCommon.CategoricalAxisValueMapper;
    protected onMajorTickIntervalChanged(oldValue: number, newValue: number): void;
    protected onPlotModeChanged(oldValue: string, newValue: string): void;
    protected onLastLabelVisibilityChanged(oldValue: string, newValue: string): void;
    protected onFirstLabelVisibilityChanged(oldValue: string, newValue: string): void;
}
export declare class LinearAxis extends CartesianAxis {
    majorStep: number;
    maximum: number;
    minimum: number;
    static majorStepProperty: Property<LinearAxis, string>;
    static minimumProperty: Property<LinearAxis, any>;
    static maximumProperty: Property<LinearAxis, any>;
    private onMinimumPropertyChanged(oldValue, newValue);
    protected onMinimumChanged(oldValue: number, newValue: number): void;
    private onMaximumPropertyChanged(oldValue, newValue);
    protected onMaximumChanged(oldValue: number, newValue: number): void;
    private onMajorStepPropertyChanged(oldValue, newValue);
    protected onMajorStepChanged(oldValue: string, newValue: string): void;
}
export declare class DateTimeContinuousAxis extends LinearAxis {
    plotMode: string;
    dateFormat: string;
    sourceDateFormat: string;
    static plotModeProperty: Property<DateTimeContinuousAxis, string>;
    static dateFormatProperty: Property<DateTimeContinuousAxis, string>;
    static sourceDateFormatProperty: Property<DateTimeContinuousAxis, string>;
    private onPlotModePropertyChanged(oldValue, newValue);
    private onDateFormatPropertyChanged(oldValue, newValue);
    private onSourceDateFormatPropertyChanged(oldValue, newValue);
    protected onPlotModeChanged(oldValue: string, newValue: string): void;
    protected onDateFormatChanged(oldValue: string, newValue: string): void;
    protected onSourceDateFormatChanged(oldValue: string, newValue: string): void;
}
export declare class DateTimeCategoricalAxis extends CategoricalAxis {
    dateTimeComponent: string;
    dateFormat: string;
    static dateTimeComponentProperty: Property<DateTimeCategoricalAxis, string>;
    static dateFormatProperty: Property<DateTimeCategoricalAxis, string>;
    private onDateTimeComponentPropertyChanged(oldValue, newValue);
    private onDateFormatPropertyChanged(oldValue, newValue);
    protected onDateTimeComponentChanged(oldValue: string, newValue: string): void;
    protected onDateFormatChanged(oldValue: string, newValue: string): void;
    readonly android: any;
    readonly ios: any;
}
export declare class LogarithmicAxis extends LinearAxis {
    exponentStep: number;
    logarithmBase: number;
    static exponentStepProperty: Property<LogarithmicAxis, number>;
    static logarithmBaseProperty: Property<LogarithmicAxis, number>;
    private onExponentStepPropertyChanged(oldValue, newValue);
    private onLogarithmBasePropertyChanged(oldValue, newValue);
    protected onExponentStepChanged(oldValue: number, newValue: number): void;
    protected onLogarithmBaseChanged(oldValue: number, newValue: number): void;
    readonly android: any;
    readonly ios: any;
}
