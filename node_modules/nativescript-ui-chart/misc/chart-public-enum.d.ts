/**
 * Font styles
 */
export declare namespace FontStyles {
    const Normal = "Normal";
    const Bold = "Bold";
    const Italic = "Italic";
    const BoldItalic = "BoldItalic";
}
export declare namespace DateTimeComponent {
    const Second = "Second";
    const Minute = "Minute";
    const Hour = "Hour";
    const Day = "Day";
    const Week = "Week";
    const Month = "Month";
    const Year = "Year";
}
/**
 * Defines whether a single or multiple items (series or points) can be selected in chart.
 */
export declare namespace ChartSelectionMode {
    /**
     *  Only a single item (series or point) can be selected at a time.
     */
    const Single = "Single";
    /**
     * Multiple series/points can be selected.
     */
    const Multiple = "Multiple";
    /**
     * Selection disabled.
     */
    const None = "None";
}
export declare namespace ChartAnnotationZPosition {
    /**
    * The annotation is rendered below the series (default).
    */
    const BelowSeries = "BelowSeries";
    /**
    * The annotation is rendered above the series.
    */
    const AboveSeries = "AboveSeries";
}
export declare namespace PaletteEntryUseState {
    /**
     * The palette entry will be used when the series is not selected
     */
    const Normal = "Normal";
    /**
     * The palette entry will be used when the series is selected
     */
    const Selected = "Selected";
}
export declare namespace TrackballSnapMode {
    /**
     Only the closest point is selected.
     */
    const ClosestPoint = "ClosestPoint";
    /**
     All points within the specified range are selected.
     */
    const AllClosestPoints = "AllClosestPoints";
}
export declare namespace AxisLabelFitMode {
    const None = "None";
    const Multiline = "Multiline";
    const Rotate = "Rotate";
}
export declare namespace AxisLabelLayoutMode {
    const Outer = "Outer";
    const Inner = "Inner";
}
export declare namespace AxisHorizontalLocation {
    const Left = "Left";
    const Right = "Right";
}
export declare namespace AxisVerticalLocation {
    const Top = "Top";
    const Bottom = "Bottom";
}
export declare namespace AxisPlotMode {
    const BetweenTicks = "BetweenTicks";
    const OnTicks = "OnTicks";
}
export declare namespace ChartLegendPosition {
    const Left = "Left";
    const Right = "Right";
    const Top = "Top";
    const Bottom = "Bottom";
    const Floating = "Floating";
}
export declare namespace ChartLegendOffsetOrigin {
    const TopLeft = "TopLeft";
    const TopRight = "TopRight";
    const BottomLeft = "BottomLeft";
    const BottomRight = "BottomRight";
}
export declare namespace knownCollections {
    const series = "series";
    const entries = "entries";
    const palettes = "palettes";
    const annotations = "annotations";
}
export declare const seriesName = "seriesName";
export declare namespace AxisLabelVisibility {
    const Visible = "Visible";
    const Hidden = "Hidden";
    const Clip = "Clip";
}
