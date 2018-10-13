import { ObservableArray } from "tns-core-modules/data/observable-array";
import { ChangedData } from "tns-core-modules/data/observable-array";
import { RadChartBase } from "../../ui-chart.common";
import { ViewBase, Property, AddArrayFromBuilder } from "tns-core-modules/ui/core/view";
export declare class Palette extends ViewBase implements AddArrayFromBuilder {
    protected _owner: RadChartBase;
    entries: ObservableArray<PaletteEntry>;
    seriesName: string;
    seriesState: string;
    constructor();
    static entriesProperty: Property<Palette, ObservableArray<PaletteEntry>>;
    static seriesNameProperty: Property<Palette, string>;
    static seriesStateProperty: Property<Palette, string>;
    _addArrayFromBuilder(name: string, value: Array<any>): void;
    private onEntriesPropertyChanged(oldValue, newValue);
    protected onEntriesChanged(oldValue: ObservableArray<PaletteEntry>, newValue: ObservableArray<PaletteEntry>): void;
    protected entriesCollectionChangedInternal(data: ChangedData<any>): void;
    private seriesNamePropertyChanged(oldValue, newValue);
    protected onSeriesNamePropertyChanged(oldValue: string, newValue: string): void;
    private seriesStatePropertyChanged(oldValue, newValue);
    protected onSeriesStatePropertyChanged(oldValue: string, newValue: string): void;
    updateOwner(): void;
    owner: RadChartBase;
}
export declare class PaletteEntry extends ViewBase {
    protected _owner: Palette;
    fillColor: string;
    strokeWidth: number;
    strokeColor: string;
    static fillColorProperty: Property<PaletteEntry, string>;
    static strokeWidthProperty: Property<PaletteEntry, number>;
    static strokeColorProperty: Property<PaletteEntry, string>;
    private fillColorPropertyChanged(oldValue, newValue);
    private strokeWidthPropertyChanged(oldValue, newValue);
    private strokeColorPropertyChanged(oldValue, newValue);
    protected onFillColorChanged(oldValue: string, newValue: string): void;
    protected onStrokeWidthChanged(oldValue: number, newValue: number): void;
    protected onStrokeColorChanged(oldValue: string, newValue: string): void;
    updateOwner(): void;
    ownerPalette: Palette;
}
