import * as axisCommonModule from "./chart-axis.common";
export declare class LinearAxis extends axisCommonModule.LinearAxis {
    private _ios;
    readonly ios: TKChartNumericAxis;
    constructor();
    protected onMajorStepChanged(oldValue: string, newValue: string): void;
    protected onMinimumChanged(oldValue: any, newValue: any): void;
    protected onMaximumChanged(oldValue: any, newValue: any): void;
}
export declare class CategoricalAxis extends axisCommonModule.CategoricalAxis {
    private _ios;
    readonly ios: TKChartCategoryAxis;
    constructor();
}
export declare class DateTimeContinuousAxis extends axisCommonModule.DateTimeContinuousAxis {
    constructor();
    private _dateFormatter;
    readonly dateFormatter: NSDateFormatter;
    private _ios;
    readonly ios: TKChartDateTimeAxis;
    protected onMinimumChanged(oldValue: any, newValue: any): void;
    protected onMaximumChanged(oldValue: any, newValue: any): void;
    private updateRange();
    protected onPlotModeChanged(oldValue: string, newValue: string): void;
    protected onDateFormatChanged(oldValue: string, newValue: string): void;
    protected onLabelFormatChanged(oldValue: any, newValue: any): void;
    protected onMajorStepChanged(oldValue: string, newValue: string): void;
}
export declare class DateTimeCategoricalAxis extends axisCommonModule.DateTimeCategoricalAxis {
    constructor();
    private _ios;
    readonly ios: TKChartDateTimeCategoryAxis;
    protected onDateFormatChanged(oldValue: string, newValue: string): void;
    protected onLabelFormatChanged(oldValue: any, newValue: any): void;
    protected onDateTimeComponentChanged(oldValue: string, newValue: string): void;
}
export declare class LogarithmicAxis extends axisCommonModule.LogarithmicAxis {
    constructor();
    private _ios;
    readonly ios: TKChartLogarithmicAxis;
    protected onExponentStepChanged(oldValue: number, newValue: number): void;
    protected onLogarithmBaseChanged(oldValue: number, newValue: number): void;
    protected onMajorStepChanged(oldValue: string, newValue: string): void;
    protected onMinimumChanged(oldValue: any, newValue: any): void;
    protected onMaximumChanged(oldValue: any, newValue: any): void;
}
