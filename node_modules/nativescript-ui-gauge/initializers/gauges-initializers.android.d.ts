import * as commonInitilizers from "./gauges-initializers.common";
import * as commonModule from "../ui-gauge.common";
import { ObservableArray } from "tns-core-modules/data/observable-array";
export declare class RadGaugeValueMapper implements commonInitilizers.RadGaugeValueMapper {
    onTitleChanged(oldValue: string, newValue: string, gauge: commonModule.RadGauge): void;
    onSubtitleChanged(oldValue: string, newValue: string, gauge: commonModule.RadGauge): void;
    onTitleStyleChanged(oldValue: commonModule.TitleStyle, newValue: commonModule.TitleStyle, gauge: commonModule.RadGauge): void;
    onSubtitleStyleChanged(oldValue: commonModule.SubtitleStyle, newValue: commonModule.SubtitleStyle, gauge: commonModule.RadGauge): void;
    updateNativeObject(gauge: commonModule.RadGauge): void;
    private applySubtitleStyles(gauge);
    private applyTitleStyles(gauge);
    private updateTitles(gauge);
}
export declare class GaugeScaleValueMapper implements commonInitilizers.GaugeScaleValueMapper {
    onMinimumChanged(oldValue: number, newValue: number, scale: commonModule.GaugeScale): void;
    onMaximumChanged(oldValue: number, newValue: number, scale: commonModule.GaugeScale): void;
    onIndicatorsChange(oldValue: ObservableArray<commonModule.GaugeIndicator>, newValue: ObservableArray<commonModule.GaugeIndicator>, scale: commonModule.GaugeScale): void;
    onScaleStyleChanged(oldValue: commonModule.ScaleStyle, newValue: commonModule.ScaleStyle, scale: commonModule.GaugeScale): void;
    private applyStylesToScale(style, scale);
    reloadIndicators(scale: commonModule.GaugeScale): void;
    updateNativeObject(scale: commonModule.GaugeScale): void;
    private updateNativeMinimum(min, scale);
    private updateNativeMaximum(max, scale);
    private updateNativeIndicators(indicators, scale);
    private updateNativeStyle(style, scale);
}
export declare class NeedleIndicatorValueMapper implements commonInitilizers.NeedleIndicatorValueMapper {
    onNeedleStyleChanged(oldValue: commonModule.NeedleStyle, newValue: commonModule.NeedleStyle, needle: commonModule.RadialNeedle): void;
    onIsAnimatedChanged(oldValue: boolean, newValue: boolean, indicator: commonModule.GaugeIndicator): void;
    onAnimationDurationChanged(oldValue: number, newValue: number, indicator: commonModule.GaugeIndicator): void;
    updateNativeObject(needle: commonModule.RadialNeedle): void;
    private updateAnimationDuration(value, indicator);
    private updateIsAnimated(value, indicator);
    private applyStyles(style, needle);
}
export declare class BarIndicatorValueMapper implements commonInitilizers.BarIndicatorValueMapper {
    onMinimumValueChanged(oldValue: number, newValue: number, indicator: commonModule.BarIndicator): void;
    onMaximumValueChanged(oldValue: number, newValue: number, indicator: commonModule.BarIndicator): void;
    onIndicatorStyleChanged(oldValue: commonModule.BarIndicatorStyle, newValue: commonModule.BarIndicatorStyle, indicator: commonModule.BarIndicator): void;
    onLocationChanged(oldValue: number, newValue: number, indicator: commonModule.BarIndicator): void;
    onIsAnimatedChanged(oldValue: boolean, newValue: boolean, indicator: commonModule.GaugeIndicator): void;
    onAnimationDurationChanged(oldValue: number, newValue: number, indicator: commonModule.GaugeIndicator): void;
    private updateAnimationDuration(value, indicator);
    private updateIsAnimated(value, indicator);
    private applyStyles(style, indicator);
    private updateMinimum(newMinimum, indicator);
    private updateMaximum(newMaximum, indicator);
    private updateLocation(newLocation, indicator);
    updateNativeObject(barIndicator: commonModule.BarIndicator): void;
}
