import * as trackBallModule from "./chart-track-ball.common";
export declare class Trackball extends trackBallModule.Trackball {
    ios: TKChartTrackball;
    constructor();
    protected onSnapModeChanged(oldValue: string, newValue: string): void;
    protected onShowIntersectionPointsChanged(oldValue: boolean, newValue: boolean): void;
    private updateShowIntersectionPoints(value);
    private updateNativeSnapMode(snapMode);
}
