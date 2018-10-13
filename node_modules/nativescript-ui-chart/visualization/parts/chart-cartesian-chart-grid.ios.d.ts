import * as cartesianChartGridModule from "./chart-cartesian-chart-grid.common";
export declare class RadCartesianChartGrid extends cartesianChartGridModule.RadCartesianChartGrid {
    constructor();
    protected onOwnerChanged(): void;
    applyGridStyle(): void;
    private updateGridStyle();
    private updateHorizontalFill(color);
    private updateVerticalFill(color);
    protected onVerticalLinesVisibleChanged(oldValue: boolean, newValue: boolean): void;
    protected onHorizontalLinesVisibleChanged(oldValue: boolean, newValue: boolean): void;
    protected onHorizontalStripLinesVisibleChanged(oldValue: boolean, newValue: boolean): void;
    protected onVerticalStripLinesVisibleChanged(oldValue: boolean, newValue: boolean): void;
    protected onVerticalStrokeColorChanged(oldValue: string, newValue: string): void;
    protected onHorizontalStrokeColorChanged(oldValue: string, newValue: string): void;
    protected onHorizontalStrokeWidthChanged(oldValue: number, newValue: number): void;
    protected onVerticalStrokeWidthChanged(oldValue: number, newValue: number): void;
    protected onVerticalStripLineColorChanged(oldValue: string, newValue: string): void;
    protected onHorizontalStripLineColorChanged(oldValue: string, newValue: string): void;
}
