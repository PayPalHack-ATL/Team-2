import * as trackBallModule from "./chart-track-ball.common";
export declare class Trackball extends trackBallModule.Trackball {
    private _customProviderImpl;
    android: com.telerik.widget.chart.visualization.behaviors.ChartTrackBallBehavior;
    constructor();
    private unwireContentProviderCallback();
    private wireContentProviderCallback();
    protected onSnapModeChanged(oldValue: string, newValue: string): void;
    protected onShowIntersectionPointsChanged(oldValue: boolean, newValue: boolean): void;
    private updateShowIntrsectionPoints(value);
    private updateTrackballSnapMode(snapMode);
}
