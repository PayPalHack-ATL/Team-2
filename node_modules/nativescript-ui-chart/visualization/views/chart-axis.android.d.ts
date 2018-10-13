import * as axisCommonModule from "./chart-axis.common";
export declare class CategoricalAxis extends axisCommonModule.CategoricalAxis {
    private _android;
    readonly android: com.telerik.widget.chart.visualization.cartesianChart.axes.CategoricalAxis;
    protected onMajorTickIntervalChanged(oldValue: number, newValue: number): void;
}
export declare class DateTimeContinuousAxis extends axisCommonModule.DateTimeContinuousAxis {
    private _android;
    constructor();
    readonly android: com.telerik.widget.chart.visualization.cartesianChart.axes.DateTimeContinuousAxis;
    protected onDateFormatChanged(oldValue: string, newValue: string): void;
    protected onLabelFormatChanged(oldValue: string, newValue: string): void;
    protected onSourceDateFormatChanged(oldValue: string, newValue: string): void;
    protected onPlotModeChanged(oldValue: string, newValue: string): void;
    protected onMinimumChanged(oldValue: any, newValue: any): void;
    protected onMaximumChanged(oldValue: any, newValue: any): void;
    protected onMajorStepChanged(oldValue: string, newValue: string): void;
}
export declare class DateTimeCategoricalAxis extends axisCommonModule.DateTimeCategoricalAxis {
    private _android;
    constructor();
    readonly android: any;
    protected onDateFormatChanged(oldValue: string, newValue: string): void;
    protected onLabelFormatChanged(oldValue: any, newValue: any): void;
    protected onDateTimeComponentChanged(oldValue: string, newValue: string): void;
}
export declare class LogarithmicAxis extends axisCommonModule.LogarithmicAxis {
    private _android;
    readonly android: com.telerik.widget.chart.visualization.cartesianChart.axes.LogarithmicAxis;
    protected onExponentStepChanged(oldValue: number, newValue: number): void;
    protected onLogarithmBaseChanged(oldValue: number, newValue: number): void;
    protected onMajorStepChanged(oldValue: string, newValue: string): void;
    protected onMinimumChanged(oldValue: any, newValue: any): void;
    protected onMaximumChanged(oldValue: any, newValue: any): void;
}
export declare class LinearAxis extends axisCommonModule.LinearAxis {
    private _android;
    readonly android: com.telerik.widget.chart.visualization.cartesianChart.axes.LinearAxis;
    protected onMajorStepChanged(oldValue: string, newValue: string): void;
    protected onMinimumChanged(oldValue: any, newValue: any): void;
    protected onMaximumChanged(oldValue: any, newValue: any): void;
}
