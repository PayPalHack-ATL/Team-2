import { RadChartBase } from "../../ui-chart.common";
import * as initializersCommon from "../../initializers/chart-initializers.common";
import { CartesianAxis } from "./chart-axis.common";
import { ViewBase, Property } from "tns-core-modules/ui/core/view";
/**
 * Defines the selection modes of series.
 */
export declare namespace SeriesSelectionMode {
    const None = "None";
    const NotSet = "NotSet";
    const Series = "Series";
    const DataPoint = "DataPoint";
    const DataPointMultiple = "DataPointMultiple";
}
export declare namespace SeriesStackMode {
    const None = "None";
    const Stack = "Stack";
    const Stack100 = "Stack100";
}
export declare class ChartSeries extends ViewBase {
    private _owner;
    seriesName: string;
    protected _initializer: initializersCommon.ChartSeriesValueMapper;
    selectionMode: string;
    labelStyle: any;
    showLabels: boolean;
    legendTitle: string;
    valueProperty: any;
    items: any;
    static selectionModeProperty: Property<ChartSeries, string>;
    static labelStyleProperty: Property<ChartSeries, any>;
    static showLabelsProperty: Property<ChartSeries, boolean>;
    static legendTitleProperty: Property<ChartSeries, string>;
    static valuePropertyProperty: Property<ChartSeries, any>;
    static itemsProperty: Property<ChartSeries, any>;
    protected readonly initializer: initializersCommon.ChartSeriesValueMapper;
    owner: RadChartBase;
    updateOwnerChart(): void;
    readonly android: any;
    ios: any;
    private onLegendTitlePropertyChanged(oldValue, newValue);
    private onItemsPropertyChanged(oldValue, newValue);
    private onValuePropertyPropertyChanged(oldValue, newValue);
    private onShowLabelsPropertyChanged(oldValue, newValue);
    private onLabelStylePropertyChanged(oldValue, newValue);
    private onSelectionModePropertyChanged(oldValue, newValue);
    protected onSelectionModeChanged(oldValue: string, newValue: string): void;
    protected onLabelStyleChanged(oldValue: any, newValue: any): void;
    protected onShowLabelsChanged(oldValue: boolean, newValue: boolean): void;
    protected onLegendTitleChanged(oldValue: string, newValue: string): void;
    protected onItemsChanged(oldValue: any, newValue: any): void;
    protected ItemsCollectionChangedInternal(data: any): void;
    getItemAtIndex(index: any): any;
    protected onValuePropertyChanged(oldValue: any, newValue: any): void;
}
export declare class CartesianSeries extends ChartSeries {
    horizontalAxis: CartesianAxis;
    verticalAxis: CartesianAxis;
    static horizontalAxisProperty: Property<CartesianSeries, CartesianAxis>;
    static verticalAxisProperty: Property<CartesianSeries, CartesianAxis>;
    protected readonly initializer: initializersCommon.CartesianSeriesValueMapper;
    private onHorizontalAxisPropertyChanged(oldValue, newValue);
    private onVerticalAxisPropertyChanged(oldValue, newValue);
    protected onHorizontalAxisChanged(oldValue: CartesianAxis, newValue: CartesianAxis): void;
    protected onVerticalAxisChanged(oldValue: CartesianAxis, newValue: CartesianAxis): void;
    private updateAxisBindingContext(oldValue, newValue);
}
export declare class CategoricalSeries extends CartesianSeries {
    stackMode: string;
    categoryProperty: string;
    static categoryPropertyProperty: Property<CategoricalSeries, string>;
    static stackModeProperty: Property<CategoricalSeries, string>;
    private onStackModePropertyChanged(oldValue, newValue);
    private onCategoryPropertyChanged(oldValue, newValue);
    protected readonly initializer: initializersCommon.CategoricalSeriesValueMapper;
    protected onStackModeChanged(oldValue: string, newValue: string): void;
    private onCategoryChanged(oldValue, newValue);
}
export declare class BarSeries extends CategoricalSeries {
    minBarSize: number;
    maxBarSize: number;
    static minBarSizeProperty: Property<BarSeries, number>;
    protected onMinBarSizeChanged(oldValue: any, newValue: any): void;
    static maxBarSizeProperty: Property<BarSeries, number>;
    protected onMaxBarSizeChanged(oldValue: any, newValue: any): void;
    protected readonly initializer: initializersCommon.BarSeriesValueMapper;
}
export declare class RangeBarSeries extends CategoricalSeries {
    lowPropertyName: string;
    highPropertyName: string;
    static highPropertyNameProperty: Property<RangeBarSeries, string>;
    private onHighPropertyNamePropertyChanged(oldValue, newValue);
    static lowPropertyNameProperty: Property<RangeBarSeries, string>;
    private onLowPropertyNamePropertyChanged(oldValue, newValue);
    protected onLowPropertyNameChanged(oldValue: string, newValue: string): void;
    protected onHighPropertyNameChanged(oldValue: string, newValue: string): void;
}
export declare class OhlcSeries extends CategoricalSeries {
    lowPropertyName: string;
    highPropertyName: string;
    closePropertyName: string;
    openPropertyName: string;
    static openPropertyNameProperty: Property<OhlcSeries, string>;
    private onOpenPropertyNamePropertyChanged(oldValue, newValue);
    static closePropertyNameProperty: Property<OhlcSeries, string>;
    private onClosePropertyNamePropertyChanged(oldValue, newValue);
    static highPropertyNameProperty: Property<OhlcSeries, string>;
    private onHighPropertyNamePropertyChanged(oldValue, newValue);
    static lowPropertyNameProperty: Property<OhlcSeries, string>;
    private onLowPropertyNamePropertyChanged(oldValue, newValue);
    protected onLowPropertyNameChanged(oldValue: string, newValue: string): void;
    protected onHighPropertyNameChanged(oldValue: string, newValue: string): void;
    protected onClosePropertyNameChanged(oldValue: string, newValue: string): void;
    protected onOpenPropertyNameChanged(oldValue: string, newValue: string): void;
}
export declare class CandleStickSeries extends OhlcSeries {
}
export declare class BubbleSeries extends CategoricalSeries {
    bubbleScale: number;
    bubbleSizeProperty: string;
    static bubbleScaleProperty: Property<BubbleSeries, number>;
    static bubbleSizePropertyProperty: Property<BubbleSeries, string>;
    private onBubbleScalePropertyChanged(oldValue, newValue);
    protected onBubbleScaleChanged(oldValue: number, newValue: number): void;
    private onBubbleSizePropertyPropertyChanged(oldValue, newValue);
    protected onBubbleSizePropertyChanged(oldValue: string, newValue: string): void;
}
export declare class PieSeries extends ChartSeries {
    legendLabel: any;
    expandRadius: number;
    outerRadiusFactor: number;
    startAngle: number;
    endAngle: number;
    showPercentage: boolean;
    protected readonly initializer: initializersCommon.PieSeriesValueMapper;
    readonly android: any;
    ios: any;
    static legendLabelProperty: Property<PieSeries, any>;
    static expandRadiusProperty: Property<PieSeries, number>;
    static outerRadiusFactorProperty: Property<PieSeries, number>;
    static startAngleProperty: Property<PieSeries, number>;
    static endAngleProperty: Property<PieSeries, number>;
    static showPercentageProperty: Property<PieSeries, boolean>;
    private onLegendLabelPropertyChanged(oldValue, newValue);
    private onExpandRadiusPropertyChanged(oldValue, newValue);
    private onOuterRadiusFactorPropertyChanged(oldValue, newValue);
    private onStartAnglePropertyChanged(oldValue, newValue);
    private onEndAnglePropertyChanged(oldValue, newValue);
    private onShowPercentagePropertyChanged(oldValue, newValue);
    protected onLegendLabelChanged(oldValue: string, newValue: string): void;
    protected onExpandRadiusChanged(oldValue: number, newValue: number): void;
    protected onOuterRadiusFactorChanged(oldValue: number, newValue: number): void;
    protected onStartAngleChanged(oldValue: number, newValue: number): void;
    protected onEndAngleChanged(oldValue: number, newValue: number): void;
    protected onShowPercentageChanged(oldValue: boolean, newValue: boolean): void;
}
export declare class DonutSeries extends PieSeries {
    innerRadiusFactor: any;
    static innerRadiusFactorProperty: Property<DonutSeries, any>;
    private onInnerRadiusFactorPropertyChanged(oldValue, newValue);
    protected readonly initializer: initializersCommon.DonutSeriesValueMapper;
    protected onInnerRadiusFactorChanged(oldValue: any, newValue: any): void;
}
export declare class ScatterSeries extends CartesianSeries {
    xProperty: string;
    yProperty: string;
    static xPropertyProperty: Property<ScatterSeries, string>;
    static yPropertyProperty: Property<ScatterSeries, string>;
    private onXPropertyPropertyChanged(oldValue, newValue);
    private onYPropertyPropertyChanged(oldValue, newValue);
    protected onXPropertyChanged(oldValue: string, newValue: string): void;
    protected onYPropertyChanged(oldValue: string, newValue: string): void;
    protected onValuePropertyChanged(oldValue: string, newValue: string): void;
    protected readonly initializer: initializersCommon.ScatterSeriesValueMapper;
}
export declare class ScatterBubbleSeries extends ScatterSeries {
    bubbleScale: number;
    bubbleSizeProperty: string;
    static bubbleScaleProperty: Property<ScatterBubbleSeries, number>;
    static bubbleSizePropertyProperty: Property<ScatterBubbleSeries, string>;
    private onBubbleScalePropertyChanged(oldValue, newValue);
    protected onBubbleScaleChanged(oldValue: number, newValue: number): void;
    private onBubbleSizePropertyPropertyChanged(oldValue, newValue);
    protected onBubbleSizePropertyChanged(oldValue: string, newValue: string): void;
    readonly initializer: initializersCommon.ScatterBubbleSeriesValueMapper;
}
