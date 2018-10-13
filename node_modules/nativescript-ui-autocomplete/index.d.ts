import { View, Property } from "tns-core-modules/ui/core/view";
import { EventData } from "tns-core-modules/data/observable";
import { ObservableArray } from "tns-core-modules/data/observable-array";

/**
* Defines the possible values for the {@link displayMode} property
* applied to the {@link RadAutoCompleteTextView}.
*/
export enum DisplayMode {
    /**
    * Selected items are shown as tokens. Multiple selection is allowed.
    */
    Tokens,
    /**
    * Only one item can be selected. The selected item is shown as plain text.
    */
    Plain
}

/**
* Defines the possible values for the {@link suggestMode} property
* applied to the {@link RadAutoCompleteTextView}.
*/
export enum SuggestMode {
    /**
    * Shows suggestions as a drop down below the RadAutoCompleteTextView.
    */
    Suggest,
    /**
    * Shows only one suggestion as text appended directly to the input.
    */
    Append,

    /**
    * Applies both suggest and append mode.
    */
    SuggestAppend
}

/**
* Defines the possible values for the {@link layoutMode} property
* applied to the {@link RadAutoCompleteTextView}.
*/
export enum LayoutMode {
    /**
    * Horizontal layout.
    */
    Horizontal,
    /**
    * Wrap layout.
    */
    Wrap
}

/**
* Defines the possible values for the {@link completionMode} property
* applied to the {@link RadAutoCompleteTextView}.
*/
export enum CompletionMode {
    /**
    * Suggestions are filtered by matching the first letters with the typed text.
    */
    StartsWith,
    /**
    * Suggestions are filtered by matching the containing letters with the typed text.
    */
    Contains
}

/**
 * The view holder in which suggestions are displayed in Suggest mode.
 */
export class SuggestionView {
    /**
     * The native android object.
     */
    android: any;
    /**
     * The native ios object.
     */
    ios: any;
    /**
     * The height of the suggestion view.
     */
    suggestionViewHeight: number;
    /**
     * Suggestion template used to display each suggestion in the drop dow.
     */
    suggestionItemTemplate: string;
}

/**
 * Data model describing the object which represents a single suggestion item.
 */
export class TokenModel {

    /**
     * Default constructor.
     */
    constructor(text: string, image: string);

    /**
     * Item image.
     */
    image: string;
    /**
     * Item text.
     */
    text: string;
    /**
     * Native ios object.
     */
    ios: any;
    /**
     * Native android object.
     */
    android: any;
}

/**
 * Generic scheme for event arguments provided to handlers of events exposed
 * by a {@link RadListView}.
 */
export class CollectionViewEventData implements EventData {

    /**
    *Returns the name of the event that has been fired.
    */
    eventName: string;

    /**
    * The object that fires the event.
    */
    object: any;

    /**
    * Gets the index of the item in the source to which the event relates.
    */
    index: number;

    /**
    * Gets the index of the data group (if present) to which the event relates.
    * Returns -1 if there is no group.
    */
    groupIndex: number;

    /**
    * Might point to an object related to a specific event.
    */
    data: any;

    /**
    * Returns a boolean value which is interpreted in the context with the event.
    */
    returnValue: any;

    /**
    * The NativeScript object that raised the event.
    */
    view: View;

    /**
    * The native object that raised the event.
    */
    android: any;

    /**
    * The native object that raised the event
    */
    ios: any;
}

/**
* Instances of this class are exposed by the data property of the
* {@link AutoCompleteEventData} coming when the events are
* fired.
*/
export class AutoCompleteEventData implements EventData {
    /**
     * The name of the event.
     */
    eventName: string;
    /**
    * The object that fires the event.
    */
    object: any;
    /**
    * The token associated with this event.
    */
    token: TokenModel;
    /**
    * The text associated with this event.
    */
    text: string;
}

/**
 * Defines the different view types that {@link RadAutoCompleteTextView} can display in various scenarios.
 */
export namespace AutoCompleteViewTypes {
    export const ItemView: string;
}

/**
 * RadAutoCompleteTextView provides means to perform easy
 * filtering of data and completion suggestion's according to typed text by the user.
 * Provides tokens, layouts, completion modes.
 */
export class RadAutoCompleteTextView extends View {
    /**
     * The event fired when token is removed.
     */
    static tokenRemovedEvent: string;
    /**
     * The event fired when token is added.
     */
    static tokenAddedEvent: string;
    /**
     * The event fired when token is selected.
     */
    static tokenSelectedEvents: string;
    /**
     * The event fired when token is deselected.
     */
    static tokenDeselectedEvent: string;
    /**
     * The event fired when an item is chosen from the suggestions list.
     */
    static didAutoCompleteEvent: string;
    /**
     * The event fired when the text of {@link RadAutoCompleteTextView} is changed.
     */
    static textChangedEvent: string;
    /**
     * The event fired when suggestion view has become visible.
     */
    static suggestionViewBecameVisibleEvent: string;

    /**
     * The event fired when the suggestion view is being populated.
     */
    static itemLoadingEvent: string;

    /**
    * Identifies the {@link itemTemplate} dependency property.
    */
    static loadSuggestionsAsyncProperty: Property<RadAutoCompleteTextView, any>;

    /**
     * Items used to provide suggestions.
     */
    items: ObservableArray<TokenModel>;
    /**
     * The suggestion view holding suggestion items in Suggest mode.
     */
    suggestionView: any;
    /**
     * Defines how selected items are shown. Default value is Plain.
     */
    displayMode: string;
    /**
     * Defines the criteria on which suggestions are being filtered.
     */
    completionMode: string;
    /**
     * Defines the layout of the tokens.
     */
    layoutMode: string;
    /**
     * Defines how suggestion are presented.
     */
    suggestMode: string;
    /**
     * Sets a hint for the {@link RadAutoCompleteTextView}. That is the text that is displayed when no text is typed.
     */
    hint: string;
    /**
     * Gets/sets the current text for the {@link RadAutoCompleteTextView}.
     */
    text: string;
    /**
     * Sets the minimal count of typed characters for the  {@link RadAutoCompleteTextView} to start filtering.
     */
    minimumCharactersToSearch: number;

    /**
     * Sets the text displayed when there are no matches for the current input.
     */
    noResultsText: string;

    /**
     * Sets if the 'close' button in the text area of the {@link RadAutoCompleteTextView} is shown.
     */
    showCloseButton: boolean;

    /**
     * Sets the source of the Image for the 'close' button in the text area of the {@link RadAutoCompleteTextView}.
     */
    closeButtonImageSrc: string;

    /**
     * Sets or gets a function that is used by the {@link RadAutoCompleteTextView} to retrieve its items.
     */
    loadSuggestionsAsync: any;

    /**
     * Sets or gets if the {@link RadAutoCompleteTextView} will be enabled or disabled.
     */
    readOnly: boolean;

    /**
     * Gets a list of the items filtered by the {@link RadAutoCompleteTextView}'s current input.
     */
    filteredItems: Array<TokenModel>;

    /**
     * Adds  token.
     */
    addToken(token: TokenModel);
    /**
     * Inserts token at specified index.
     */
    insertTokenAtIndex(token: TokenModel, index: number);
    /**
     * Removes specified token.
     */
    removeToken(token: TokenModel);
    /**
     * Removes token at specified index.
     */
    removeTokenAtIndex(index: number);
    /**
     * Removes all tokens.
     */
    removeAllTokens();
    /**
     * Returns all tokens.
     */
    tokens();
    /**
     * Returns token at specified index.
     */
    tokenAtIndex(index: number);

    /**
     * Resets the RadAutoCompleteTextView component.
     */
    resetAutocomplete();

    /**
     * Gets or sets the item view loaded used by the @link RadListView} when creating its item views.
     */
    itemViewLoader: (viewType) => View;
}