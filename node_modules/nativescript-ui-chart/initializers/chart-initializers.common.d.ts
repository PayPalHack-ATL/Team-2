import { RadChartBase } from "../ui-chart.common";
import { ChartSeries, CartesianSeries, CategoricalSeries, PieSeries, BarSeries, DonutSeries, RangeBarSeries, BubbleSeries, OhlcSeries, ScatterSeries, ScatterBubbleSeries } from "../visualization/views/chart-series.common";
import { CartesianAxis, CategoricalAxis } from "../visualization/views/chart-axis.common";
import { RadLegendView } from "../visualization/views/chart-legend-view.common";
import { Palette } from "../visualization/parts/chart-palette.common";
import { ObservableArray, ChangedData } from "tns-core-modules/data/observable-array";
export interface ChartBaseValueMapper {
    onLegendChanged(oldValue: RadLegendView, newValue: RadLegendView, chart: RadChartBase): void;
    onPalettesChanged(data: ChangedData<any>, chart: RadChartBase): any;
    onPalettesPropertyChanged(oldValue: ObservableArray<Palette>, newValue: ObservableArray<Palette>, chart: RadChartBase): void;
    onSeriesChanged(data: ChangedData<any>, chart: RadChartBase): void;
    onSeriesPropertyChanged(oldValue: ObservableArray<any>, newValue: ObservableArray<any>, chart: RadChartBase): any;
    onAnnotationsChanged(data: ChangedData<any>, chart: RadChartBase): void;
    onAnnotationsPropertyChanged(oldValue: ObservableArray<any>, newValue: ObservableArray<any>, chart: RadChartBase): void;
    onSelectionModeChanged(oldValue: string, newValue: string, chart: RadChartBase): void;
    loadSeries(chart: RadChartBase): any;
    loadAnnotations(chart: RadChartBase): any;
    reloadPalettes(chart: RadChartBase): any;
    updateHorizontalAxisPalette(chart: RadChartBase): any;
    updateVerticalAxisPalette(chart: RadChartBase): any;
}
export interface ChartSeriesValueMapper {
    onLegendTitleChanged(newValue: string, series: ChartSeries): void;
    onItemsChanged(oldValue: any, newValue: any, series: ChartSeries): void;
    onValuePropertyChanged(oldValue: any, newValue: any, series: ChartSeries): void;
    onShowLabelsChanged(oldValue: boolean, newValue: boolean, series: ChartSeries): void;
    onLabelStyleChanged(oldValue: any, newValue: any, series: ChartSeries): void;
    onSelectionModeChanged(oldValue: string, newValue: string, series: ChartSeries): void;
    applyLabelStyle(series: ChartSeries, chart?: RadChartBase): any;
}
export interface CartesianSeriesValueMapper extends ChartSeriesValueMapper {
    onHorizontalAxisChanged(oldValue: CartesianAxis, newValue: CartesianAxis, series: CartesianSeries): void;
    onVerticalAxisChanged(oldValue: CartesianAxis, newValue: CartesianAxis, series: CartesianSeries): void;
}
export interface CategoricalSeriesValueMapper extends CartesianSeriesValueMapper {
    onCategoryPropertyChanged(oldValue: string, newValue: string, series: CategoricalSeries): void;
    onStackModePropertyChanged(oldValue: string, newValue: string, series: CategoricalSeries): void;
    updateNative(series: CategoricalSeries): any;
}
export interface SplineSeriesValueMapper extends LineSeriesValueMapper {
}
export interface PieSeriesValueMapper extends ChartSeriesValueMapper {
    onLabelPropertyChanged(oldValue: string, newValue: string, series: PieSeries): void;
    onExpandRadiusChanged(oldValue: number, newValue: number, series: PieSeries): void;
    onOuterRadiusFactorChanged(oldValue: number, newValue: number, series: PieSeries): void;
    onStartAngleChanged(oldValue: number, newValue: number, series: PieSeries): void;
    onEndAngleChanged(oldValue: number, newValue: number, series: PieSeries): void;
    onShowPercentageChanged(oldValue: boolean, newValue: boolean, series: PieSeries): void;
}
export interface DonutSeriesValueMapper extends PieSeriesValueMapper {
    onInnerRadiusFactorChanged(oldValue: any, newValue: any, series: DonutSeries): void;
}
export interface BarSeriesValueMapper extends CategoricalSeriesValueMapper {
    onMinBarSizeChanged(oldValue: number, newValue: number, series: BarSeries): any;
    onMaxBarSizeChanged(oldValue: number, newValue: number, series: BarSeries): any;
}
export interface RangeBarSeriesValueMapper extends CategoricalSeriesValueMapper {
    onHighPropertyNameChanged(oldValue: string, newValue: string, series: RangeBarSeries): any;
    onLowPropertyNameChanged(oldValue: string, newValue: string, series: RangeBarSeries): any;
}
export interface LineSeriesValueMapper extends CategoricalSeriesValueMapper {
}
export interface BubbleSeriesValueMapper extends CategoricalSeriesValueMapper {
    onBubbleSizePropertyChanged(oldValue: string, newValue: string, series: BubbleSeries): void;
    onBubbleScalePropertyChanged(oldValue: number, newValue: number, series: BubbleSeries): void;
}
export interface CartesianAxisValueMapper {
    onLineHiddenChanged(oldValue: boolean, newValue: boolean, axis: CartesianAxis): any;
    onLineThicknessChanged(oldValue: number, newValue: number, axis: CartesianAxis): any;
    onLineColorChanged(oldValue: string, newValue: string, axis: CartesianAxis): any;
    onLabelTextColorChanged(oldValue: string, newValue: string, axis: CartesianAxis): any;
    onLabelMarginChanged(oldValue: any, newValue: any, axis: CartesianAxis): any;
    onLabelRotationAngleChanged(oldValue: any, newValue: any, axis: CartesianAxis): any;
    onLabelFitModeChanged(oldValue: any, newValue: any, axis: CartesianAxis): any;
    onLabelLayoutModeChanged(oldValue: any, newValue: any, axis: CartesianAxis): any;
    onLabelFormatChanged(oldValue: any, newValue: any, axis: CartesianAxis): any;
    onHorizontalLocationChanged(oldValue: string, newValue: string, axis: CartesianAxis): any;
    onVerticalLocationChanged(oldValue: string, newValue: string, axis: CartesianAxis): any;
    onLabelSizeChanged(oldValue: any, newValue: any, axis: CartesianAxis): any;
    onAllowZoomChanged(oldValue: boolean, newValue: boolean, axis: CartesianAxis): any;
    onAllowPanChanged(oldValue: boolean, newValue: boolean, axis: CartesianAxis): any;
    onHiddenChanged(oldValue: boolean, newValue: boolean, axis: CartesianAxis): any;
    onTicksHiddenChanged(oldValue: boolean, newValue: boolean, axis: CartesianAxis): any;
    onTicksThicknessChanged(oldValue: number, newValue: number, axis: CartesianAxis): any;
    onTicksOffsetChanged(oldValue: number, newValue: number, axis: CartesianAxis): any;
    onTicksLengthChanged(oldValue: number, newValue: number, axis: CartesianAxis): any;
    onTicksColorChanged(oldValue: string, newValue: string, axis: CartesianAxis): any;
}
export interface CategoricalAxisValueMapper extends CartesianAxisValueMapper {
    onMajorTickIntervalChanged(oldValue: number, newValue: number, axis: CategoricalAxis): any;
    onPlotModeChanged(oldValue: string, newValue: string, axis: CategoricalAxis): any;
    onLastLabelVisibilityChanged(oldValue: string, newValue: string, axis: CategoricalAxis): any;
    onFirstLabelVisibilityChanged(oldValue: string, newValue: string, axis: CategoricalAxis): any;
}
export interface OhlcSeriesValueMapper extends CategoricalSeriesValueMapper {
    onHighPropertyNameChanged(oldValue: string, newValue: string, series: OhlcSeries): any;
    onLowPropertyNameChanged(oldValue: string, newValue: string, series: OhlcSeries): any;
    onOpenPropertyNameChanged(oldValue: string, newValue: string, series: OhlcSeries): any;
    onClosePropertyNameChanged(oldValue: string, newValue: string, series: OhlcSeries): any;
}
export interface CandlestickSeriesValueMapper extends OhlcSeriesValueMapper {
}
export interface ScatterSeriesValueMapper extends CartesianSeriesValueMapper {
    onXPropertyChanged(oldValue: string, newValue: string, series: ScatterSeries): any;
    onYPropertyChanged(oldValue: string, newValue: string, series: ScatterSeries): any;
}
export interface ScatterBubbleSeriesValueMapper extends ScatterSeriesValueMapper {
    onBubbleSizePropertyChanged(oldValue: string, newValue: string, series: ScatterBubbleSeries): any;
    onBubbleScaleChanged(oldValue: number, newValue: number, series: ScatterBubbleSeries): any;
}
