import * as observable from "tns-core-modules/data/observable";
import { Property, View } from "tns-core-modules/ui/core/view";
import * as colorModule from "tns-core-modules/color";
export declare const FadeTransitionString: string;
export declare const PushTransitionString: string;
export declare const RevealTransitionString: string;
export declare const ReverseSlideOutTransitionString: string;
export declare const ScaleDownPusherTransitionString: string;
export declare const ScaleUpTransitionString: string;
export declare const SlideAlongTransitionString: string;
export declare const SlideInOnTopTransitionString: string;
export declare namespace SideDrawerLocation {
    const Left = "Left";
    const Right = "Right";
    const Top = "Top";
    const Bottom = "Bottom";
}
export declare class DrawerTransitionBase {
    getNativeContent(): any;
}
export declare class DrawerStateChangingEventArgs implements observable.EventData {
    /**
   *Returns the name of the event that has been fired.
   */
    eventName: string;
    /**
    * The object that fires the event.
    */
    object: any;
    /**
    * Indicates whether the event should be canceled if possible.
    */
    returnValue: boolean;
}
export declare class DrawerStateChangedEventArgs implements observable.EventData {
    /**
   *Returns the name of the event that has been fired.
   */
    eventName: string;
    /**
    * The object that fires the event.
    */
    object: any;
}
export declare class RadSideDrawer extends View {
    static drawerOpeningEvent: string;
    static drawerOpenedEvent: string;
    static drawerClosingEvent: string;
    static drawerClosedEvent: string;
    static drawerPanEvent: string;
    drawerTransition: DrawerTransitionBase;
    drawerContentSize: number;
    drawerLocation: string;
    drawerContent: View;
    mainContent: View;
    gesturesEnabled: boolean;
    allowEdgeSwipe: boolean;
    shadowColor: colorModule.Color;
    protected _isOpen: boolean;
    static gesturesEnabledProperty: Property<RadSideDrawer, boolean>;
    private onGesturesEnabledPropertyChanged(oldValue, newValue);
    static allowEdgeSwipeProperty: Property<RadSideDrawer, boolean>;
    private onAllowEdgeSwipePropertyChanged(oldValue, newValue);
    static drawerTransitionProperty: Property<RadSideDrawer, DrawerTransitionBase>;
    private onDrawerTransitionChanged(oldValue, newValue);
    static drawerContentSizeProperty: Property<RadSideDrawer, number>;
    private onDrawerContentSizeChanged(oldValue, newValue);
    static drawerLocationProperty: Property<RadSideDrawer, string>;
    private onDrawerLocationPropertyChanged(oldValue, newValue);
    static shadowColorProperty: Property<RadSideDrawer, colorModule.Color>;
    private onShadowColorPropertyChanged(oldValue, newValue);
    static mainContentProperty: Property<RadSideDrawer, View>;
    private _onMainContentPropertyChanged(oldValue, newValue);
    static drawerContentProperty: Property<RadSideDrawer, View>;
    private _onDrawerContentPropertyChanged(oldValue, newValue);
    protected _onMainContentChanged(oldValue: View, newValue: View): void;
    protected _onDrawerContentChanged(oldValue: View, newValue: View): void;
    protected _onDrawerLocationChanged(oldValue: string, newValue: string): void;
    protected _onShadowColorChanged(oldValue: colorModule.Color, newValue: colorModule.Color): void;
    protected _onDrawerTransitionChanged(oldValue: DrawerTransitionBase, newValue: DrawerTransitionBase): void;
    protected _onDrawerContentSizeChanged(oldValue: number, newValue: number): void;
    protected _onGesturesEnabledChanged(oldValue: boolean, newValue: boolean): void;
    protected _onAllowEdgeSwipeChanged(oldValue: boolean, newValue: boolean): void;
    showDrawer(): void;
    closeDrawer(): void;
    getIsOpen(): boolean;
    readonly _isRootView: boolean;
    toggleDrawerState(): void;
    readonly _childrenCount: number;
    eachChildView(callback: (child: View) => boolean): void;
}
