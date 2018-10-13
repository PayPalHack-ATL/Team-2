Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Font styles
 */
/**
 * Font styles
 */
var FontStyles;
/**
 * Font styles
 */
(function (FontStyles) {
    FontStyles.Normal = "Normal";
    FontStyles.Bold = "Bold";
    FontStyles.Italic = "Italic";
    FontStyles.BoldItalic = "BoldItalic";
})(FontStyles = exports.FontStyles || (exports.FontStyles = {}));
/*
* Lists the possible ways a DateTime value can be interpreted
* in the context of an axis.
*/
/*
* Lists the possible ways a DateTime value can be interpreted
* in the context of an axis.
*/
var DateTimeComponent;
/*
* Lists the possible ways a DateTime value can be interpreted
* in the context of an axis.
*/
(function (DateTimeComponent) {
    DateTimeComponent.Second = "Second";
    DateTimeComponent.Minute = "Minute";
    DateTimeComponent.Hour = "Hour";
    DateTimeComponent.Day = "Day";
    DateTimeComponent.Week = "Week";
    DateTimeComponent.Month = "Month";
    DateTimeComponent.Year = "Year";
})(DateTimeComponent = exports.DateTimeComponent || (exports.DateTimeComponent = {}));
/**
 * Defines whether a single or multiple items (series or points) can be selected in chart.
 */
/**
 * Defines whether a single or multiple items (series or points) can be selected in chart.
 */
var ChartSelectionMode;
/**
 * Defines whether a single or multiple items (series or points) can be selected in chart.
 */
(function (ChartSelectionMode) {
    ChartSelectionMode.Single = "Single";
    ChartSelectionMode.Multiple = "Multiple";
    ChartSelectionMode.None = "None";
})(ChartSelectionMode = exports.ChartSelectionMode || (exports.ChartSelectionMode = {}));
var ChartAnnotationZPosition;
(function (ChartAnnotationZPosition) {
    ChartAnnotationZPosition.BelowSeries = "BelowSeries";
    ChartAnnotationZPosition.AboveSeries = "AboveSeries";
})(ChartAnnotationZPosition = exports.ChartAnnotationZPosition || (exports.ChartAnnotationZPosition = {}));
/*
* Lists the possible use cases for palette entries.
*/
/*
* Lists the possible use cases for palette entries.
*/
var PaletteEntryUseState;
/*
* Lists the possible use cases for palette entries.
*/
(function (PaletteEntryUseState) {
    PaletteEntryUseState.Normal = "Normal";
    PaletteEntryUseState.Selected = "Selected";
})(PaletteEntryUseState = exports.PaletteEntryUseState || (exports.PaletteEntryUseState = {}));
var TrackballSnapMode;
(function (TrackballSnapMode) {
    TrackballSnapMode.ClosestPoint = "ClosestPoint";
    TrackballSnapMode.AllClosestPoints = "AllClosestPoints";
})(TrackballSnapMode = exports.TrackballSnapMode || (exports.TrackballSnapMode = {}));
/*
* Lists the possible values for label fit modes
*/
/*
* Lists the possible values for label fit modes
*/
var AxisLabelFitMode;
/*
* Lists the possible values for label fit modes
*/
(function (AxisLabelFitMode) {
    AxisLabelFitMode.None = "None";
    AxisLabelFitMode.Multiline = "Multiline";
    AxisLabelFitMode.Rotate = "Rotate";
})(AxisLabelFitMode = exports.AxisLabelFitMode || (exports.AxisLabelFitMode = {}));
/*
* Lists the possible axis label layout  modes.
*/
/*
* Lists the possible axis label layout  modes.
*/
var AxisLabelLayoutMode;
/*
* Lists the possible axis label layout  modes.
*/
(function (AxisLabelLayoutMode) {
    AxisLabelLayoutMode.Outer = "Outer";
    AxisLabelLayoutMode.Inner = "Inner";
})(AxisLabelLayoutMode = exports.AxisLabelLayoutMode || (exports.AxisLabelLayoutMode = {}));
/*
* Lists the possible location for a horizontal axis.
*/
/*
* Lists the possible location for a horizontal axis.
*/
var AxisHorizontalLocation;
/*
* Lists the possible location for a horizontal axis.
*/
(function (AxisHorizontalLocation) {
    AxisHorizontalLocation.Left = "Left";
    AxisHorizontalLocation.Right = "Right";
})(AxisHorizontalLocation = exports.AxisHorizontalLocation || (exports.AxisHorizontalLocation = {}));
/*
* Lists the possible locations for a vertical axis.
*/
/*
* Lists the possible locations for a vertical axis.
*/
var AxisVerticalLocation;
/*
* Lists the possible locations for a vertical axis.
*/
(function (AxisVerticalLocation) {
    AxisVerticalLocation.Top = "Top";
    AxisVerticalLocation.Bottom = "Bottom";
})(AxisVerticalLocation = exports.AxisVerticalLocation || (exports.AxisVerticalLocation = {}));
/*
* Lists the possible axis plot modes.
*/
/*
* Lists the possible axis plot modes.
*/
var AxisPlotMode;
/*
* Lists the possible axis plot modes.
*/
(function (AxisPlotMode) {
    AxisPlotMode.BetweenTicks = "BetweenTicks";
    AxisPlotMode.OnTicks = "OnTicks";
})(AxisPlotMode = exports.AxisPlotMode || (exports.AxisPlotMode = {}));
/*
* Defines the different places where the legend can be positioned.
*/
/*
* Defines the different places where the legend can be positioned.
*/
var ChartLegendPosition;
/*
* Defines the different places where the legend can be positioned.
*/
(function (ChartLegendPosition) {
    ChartLegendPosition.Left = "Left";
    ChartLegendPosition.Right = "Right";
    ChartLegendPosition.Top = "Top";
    ChartLegendPosition.Bottom = "Bottom";
    ChartLegendPosition.Floating = "Floating";
})(ChartLegendPosition = exports.ChartLegendPosition || (exports.ChartLegendPosition = {}));
/*
* Defines the offset origin in case of Floating legend position.
*/
/*
* Defines the offset origin in case of Floating legend position.
*/
var ChartLegendOffsetOrigin;
/*
* Defines the offset origin in case of Floating legend position.
*/
(function (ChartLegendOffsetOrigin) {
    ChartLegendOffsetOrigin.TopLeft = "TopLeft";
    ChartLegendOffsetOrigin.TopRight = "TopRight";
    ChartLegendOffsetOrigin.BottomLeft = "BottomLeft";
    ChartLegendOffsetOrigin.BottomRight = "BottomRight";
})(ChartLegendOffsetOrigin = exports.ChartLegendOffsetOrigin || (exports.ChartLegendOffsetOrigin = {}));
/*
* Defines the known properties that are collections. This is used by the XML parser.
*/
/*
* Defines the known properties that are collections. This is used by the XML parser.
*/
var knownCollections;
/*
* Defines the known properties that are collections. This is used by the XML parser.
*/
(function (knownCollections) {
    knownCollections.series = "series";
    knownCollections.entries = "entries";
    knownCollections.palettes = "palettes";
    knownCollections.annotations = "annotations";
})(knownCollections = exports.knownCollections || (exports.knownCollections = {}));
exports.seriesName = "seriesName";
/*
* Lists the possible last label visibility options.
*/
/*
* Lists the possible last label visibility options.
*/
var AxisLabelVisibility;
/*
* Lists the possible last label visibility options.
*/
(function (AxisLabelVisibility) {
    AxisLabelVisibility.Visible = "Visible";
    AxisLabelVisibility.Hidden = "Hidden";
    AxisLabelVisibility.Clip = "Clip";
})(AxisLabelVisibility = exports.AxisLabelVisibility || (exports.AxisLabelVisibility = {}));
