import * as annotationModule from "./chart-annotation.common";
export declare class ChartGridLineAnnotation extends annotationModule.ChartGridLineAnnotation {
    private _ios;
    readonly ios: TKChartGridLineAnnotation;
    constructor();
    private update();
    protected onOwnerChanged(): void;
    protected onValueChanged(oldValue: any, newValue: any): void;
    protected onAxisIdChanged(oldValue: string, newValue: string): void;
    protected onZPositionChanged(oldValue: string, newValue: string): void;
    protected onHiddenChanged(oldValue: boolean, newValue: boolean): void;
    protected onStrokeWidthChanged(oldValue: number, newValue: number): void;
    protected onStrokeColorChanged(oldValue: string, newValue: string): void;
    protected onStrokeDashPatternChanged(oldValue: string, newValue: string): void;
}
export declare class ChartPlotBandAnnotation extends annotationModule.ChartPlotBandAnnotation {
    private _ios;
    readonly ios: TKChartBandAnnotation;
    constructor();
    private update();
    protected onOwnerChanged(): void;
    protected onMinValueChanged(oldValue: any, newValue: any): void;
    protected onMaxValueChanged(oldValue: any, newValue: any): void;
    protected onFillColorChanged(oldValue: string, newValue: string): void;
    protected onAxisIdChanged(oldValue: string, newValue: string): void;
    protected onZPositionChanged(oldValue: string, newValue: string): void;
    protected onHiddenChanged(oldValue: boolean, newValue: boolean): void;
    protected onStrokeWidthChanged(oldValue: number, newValue: number): void;
    protected onStrokeColorChanged(oldValue: string, newValue: string): void;
    protected onStrokeDashPatternChanged(oldValue: string, newValue: string): void;
}
