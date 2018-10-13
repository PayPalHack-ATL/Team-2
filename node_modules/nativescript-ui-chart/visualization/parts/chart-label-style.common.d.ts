import { ViewBase, Property } from "tns-core-modules/ui/core/view";
export declare class PointLabelStyle extends ViewBase {
    textColor: string;
    strokeColor: string;
    fillColor: string;
    textSize: number;
    margin: number;
    textFormat: string;
    fontName: string;
    fontStyle: string;
    static strokeColorProperty: Property<PointLabelStyle, string>;
    static fillColorProperty: Property<PointLabelStyle, string>;
    static textColorProperty: Property<PointLabelStyle, string>;
    static textSizeProperty: Property<PointLabelStyle, number>;
    static marginProperty: Property<PointLabelStyle, string>;
    static textFormatProperty: Property<PointLabelStyle, string>;
    static fontNameProperty: Property<PointLabelStyle, string>;
    static fontStyleProperty: Property<PointLabelStyle, string>;
}
