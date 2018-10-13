import { RadCartesianChart } from "../../ui-chart.common";
import { ViewBase, Property } from "tns-core-modules/ui/core/view";
export declare class Trackball extends ViewBase {
    static trackBallContentRequestedEvent: string;
    protected _ios: any;
    protected _android: any;
    snapMode: string;
    showIntersectionPoints: boolean;
    constructor();
    android: any;
    ios: any;
    _owner: RadCartesianChart;
    static snapModeProperty: Property<Trackball, string>;
    private onSnapModePropertyChanged(oldValue, newValue);
    static showIntersectionPointsProperty: Property<Trackball, boolean>;
    private onShowIntersectionPointsPropertyChanged(oldValue, newValue);
    protected onSnapModeChanged(oldValue: string, newValue: string): void;
    protected onShowIntersectionPointsChanged(oldValue: boolean, newValue: boolean): void;
    protected onOwnerChanged(): void;
}
