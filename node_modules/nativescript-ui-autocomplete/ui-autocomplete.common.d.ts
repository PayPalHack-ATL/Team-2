import * as observableArray from "tns-core-modules/data/observable-array";
import { Property, View } from "tns-core-modules/ui/core/view";
import * as observableModule from "tns-core-modules/data/observable";
export declare namespace DisplayMode {
    const Tokens: string;
    const Plain: string;
}
export declare namespace SuggestMode {
    const Suggest: string;
    const Append: string;
    const SuggestAppend: string;
}
export declare namespace LayoutMode {
    const Horizontal: string;
    const Wrap: string;
}
export declare namespace CompletionMode {
    const StartsWith: string;
    const Contains: string;
}
export declare namespace AutoCompleteViewTypes {
    const ItemView = "itemview";
}
export declare class SuggestionView extends View {
    private _owner;
    suggestionViewHeight: number;
    suggestionItemTemplate: string;
    constructor();
    readonly android: any;
    readonly _nativeView: any;
    owner: RadAutoCompleteTextView;
    protected updateView(): void;
    static suggestionViewHeightProperty: Property<SuggestionView, number>;
    private onSuggestionViewHeightPropertyChanged(oldValue, newValue);
    protected onSuggestionViewHeightChanged(oldValue: number, newValue: number): void;
    static suggestionItemTemplateProperty: Property<SuggestionView, string>;
    private onSuggestionItemTemplatePropertyChanged(oldValue, newValue);
    protected onSuggestionItemTemplateChanged(oldValue: string, newValue: string): void;
}
export declare class TokenModel {
    image: string;
    text: string;
    constructor(text: string, image: string);
    readonly android: any;
    readonly ios: any;
}
export declare class CollectionViewEventData implements observableModule.EventData {
    private _eventName;
    private _object;
    private _index;
    private _groupIndex;
    private _data;
    private _returnValue;
    private _view;
    private _android;
    private _ios;
    constructor();
    android: any;
    ios: any;
    eventName: string;
    object: any;
    index: number;
    groupIndex: number;
    data: any;
    returnValue: any;
    view: View;
}
export declare class AutoCompleteEventData implements observableModule.EventData {
    private _eventName;
    private _object;
    private _token;
    private _text;
    constructor(object: any, eventName: string, text: string, token: TokenModel);
    eventName: string;
    text: string;
    token: TokenModel;
    object: any;
}
export declare class RadAutoCompleteTextView extends View {
    static textChangedEvent: string;
    static tokenRemovedEvent: string;
    static tokenAddedEvent: string;
    static tokenSelectedEvent: string;
    static tokenDeselectedEvent: string;
    static didAutoCompleteEvent: string;
    static suggestionViewBecameVisibleEvent: string;
    static itemLoadingEvent: string;
    loadSuggestionsAsync: any;
    items: observableArray.ObservableArray<TokenModel>;
    displayMode: string;
    completionMode: string;
    layoutMode: string;
    suggestMode: string;
    hint: string;
    text: string;
    minimumCharactersToSearch: number;
    noResultsText: string;
    showCloseButton: boolean;
    closeButtonImageSrc: string;
    suggestionView: SuggestionView;
    private _itemViewLoader;
    readOnly: boolean;
    constructor();
    itemViewLoader: (viewType) => View;
    readonly filteredItems: Array<TokenModel>;
    static loadSuggestionsAsyncProperty: Property<RadAutoCompleteTextView, any>;
    private onLoadSuggestionsAsyncPropertyChanged(oldValue, newValue);
    protected onLoadSuggestionsAsyncChanged(oldValue: any, newValue: any): void;
    protected onItemViewLoaderChanged(): void;
    protected resolveTemplateView(template: string): View;
    getViewForViewType(viewType: any): any;
    static itemsProperty: Property<RadAutoCompleteTextView, observableArray.ObservableArray<TokenModel>>;
    private onItemsPropertyChanged(oldValue, newValue);
    protected onItemsChanged(oldValue: observableArray.ObservableArray<TokenModel>, newValue: observableArray.ObservableArray<TokenModel>): void;
    static suggestionViewProperty: Property<RadAutoCompleteTextView, SuggestionView>;
    private onSuggestionViewPropertyChanged(oldValue, newValue);
    protected onSuggestionViewChanged(oldValue: SuggestionView, newValue: SuggestionView): void;
    static displayModeProperty: Property<RadAutoCompleteTextView, string>;
    private onDisplayModePropertyChanged(oldValue, newValue);
    protected onDisplayModeChanged(oldValue: string, newValue: string): void;
    static completionModeProperty: Property<RadAutoCompleteTextView, string>;
    private onCompletionModePropertyChanged(oldValue, newValue);
    protected onCompletionModeChanged(oldValue: string, newValue: string): void;
    static layoutModeProperty: Property<RadAutoCompleteTextView, string>;
    private onLayoutModePropertyChanged(oldValue, newValue);
    protected onLayoutModeChanged(oldValue: string, newValue: string): void;
    static suggestModeProperty: Property<RadAutoCompleteTextView, string>;
    private onSuggestModePropertyChanged(oldValue, newValue);
    protected onSuggestModeChanged(oldValue: string, newValue: string): void;
    static hintProperty: Property<RadAutoCompleteTextView, string>;
    private onHintPropertyChanged(oldValue, newValue);
    protected onHintChanged(oldValue: string, newValue: string): void;
    static textProperty: Property<RadAutoCompleteTextView, string>;
    private onTextPropertyChanged(oldValue, newValue);
    protected onTextChanged(oldValue: string, newValue: string): void;
    static minimumCharactersToSearchProperty: Property<RadAutoCompleteTextView, number>;
    private onMinimumCharactersToSearchPropertyChanged(oldValue, newValue);
    protected onMinimumCharactersToSearchChanged(oldValue: number, newValue: number): void;
    static noResultsTextProperty: Property<RadAutoCompleteTextView, string>;
    private onNoResultsTextPropertyChanged(oldValue, newValue);
    protected onNoResultsTextChanged(oldValue: string, newValue: string): void;
    static showCloseButtonProperty: Property<RadAutoCompleteTextView, boolean>;
    private onShowCloseButtonPropertyChanged(oldValue, newValue);
    protected onShowCloseButtonChanged(oldValue: boolean, newValue: boolean): void;
    static closeButtonImageSrcProperty: Property<RadAutoCompleteTextView, string>;
    private onCloseButtonImageSrcPropertyChanged(oldValue, newValue);
    protected onCloseButtonImageSrcChanged(oldValue: string, newValue: string): void;
    static readOnlyProperty: Property<RadAutoCompleteTextView, boolean>;
    private onReadOnlyPropertyChanged(oldValue, newValue);
    protected onReadOnlyChanged(oldValue: boolean, newValue: boolean): void;
    resetAutocomplete(): void;
    addToken(token: TokenModel): void;
    insertTokenAtIndex(token: TokenModel, index: number): void;
    removeToken(token: TokenModel): void;
    removeTokenAtIndex(index: number): void;
    removeAllTokens(): void;
    tokens(): void;
    tokenAtIndex(index: number): any;
}
