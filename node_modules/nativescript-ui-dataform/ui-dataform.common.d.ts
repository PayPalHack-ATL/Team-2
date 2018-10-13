import { View, Property, ViewBase } from "tns-core-modules/ui/core/view";
import { AddArrayFromBuilder } from "tns-core-modules/ui/core/view";
import * as observable from "tns-core-modules/data/observable";
export declare namespace knownCollections {
    const properties = "properties";
    const groups = "groups";
    const validators = "validators";
}
export declare namespace CommitMode {
    const Immediate = "Immediate";
    const OnLostFocus = "OnLostFocus";
    const Manual = "Manual";
}
export declare namespace AutoCompleteDisplayMode {
    const Plain = "Plain";
    const Tokens = "Tokens";
}
export declare namespace ValidationMode {
    const Immediate = "Immediate";
    const OnLostFocus = "OnLostFocus";
    const Manual = "Manual";
}
export declare namespace DataFormLabelPosition {
    const Left = "Left";
    const Top = "Top";
}
export declare namespace EditorType {
    const Text = "Text";
    const MultilineText = "MultilineText";
    const Email = "Email";
    const Password = "Password";
    const Phone = "Phone";
    const Decimal = "Decimal";
    const Number = "Number";
    const Switch = "Switch";
    const Stepper = "Stepper";
    const Slider = "Slider";
    const SegmentedEditor = "SegmentedEditor";
    const DatePicker = "DatePicker";
    const TimePicker = "TimePicker";
    const Picker = "Picker";
    const List = "List";
    const AutoCompleteInline = "AutoCompleteInline";
    const Label = "Label";
}
/**
 * Font styles
 */
export declare namespace FontStyles {
    const Normal = "Normal";
    const Bold = "Bold";
    const Italic = "Italic";
    const BoldItalic = "BoldItalic";
}
/**
 * A class that provides common arguments of {@link RadDataForm} events.
 */
export declare class DataFormEventData implements observable.EventData {
    eventName: string;
    object: any;
    editor: any;
    entityProperty: any;
    propertyName: string;
    group: any;
    groupName: string;
    returnValue: any;
}
/**
 * A class that provides common arguments of {@link CustomPropertyEditor} events.
 */
export declare class DataFormCustomPropertyEditorEventData implements observable.EventData {
    eventName: string;
    object: any;
    view: any;
    context: any;
    value: any;
}
export declare class RadDataForm extends View implements AddArrayFromBuilder {
    protected entityPropertyChangedHandler: (propertyChangeData: observable.PropertyChangeData) => void;
    protected groupPropertyChangedHandler: (propertyChangeData: observable.PropertyChangeData) => void;
    protected groupTitleStylePropertyChangedHandler: (propertyChangeData: observable.PropertyChangeData) => void;
    protected groupLayoutPropertyChangedHandler: (propertyChangeData: observable.PropertyChangeData) => void;
    static editorSelectedEvent: string;
    static editorDeselectedEvent: string;
    static propertyEditedEvent: string;
    static propertyValidateEvent: string;
    static propertyValidatedEvent: string;
    static editorSetupEvent: string;
    static editorUpdateEvent: string;
    static groupUpdateEvent: string;
    static propertyCommitEvent: string;
    static propertyCommittedEvent: string;
    static groupExpandedEvent: string;
    static groupCollapsedEvent: string;
    isReadOnly: boolean;
    commitMode: string;
    validationMode: string;
    source: any;
    metadata: any;
    groups: Array<PropertyGroup>;
    properties: Array<EntityProperty>;
    constructor();
    disposeNativeView(): void;
    notifyValidated(propertyName: string, result: boolean): void;
    static isReadOnlyProperty: Property<RadDataForm, boolean>;
    static commitModeProperty: Property<RadDataForm, string>;
    static validationModeProperty: Property<RadDataForm, string>;
    static sourceProperty: Property<RadDataForm, any>;
    static metadataProperty: Property<RadDataForm, any>;
    static groupsProperty: Property<RadDataForm, PropertyGroup[]>;
    private onIsReadOnlyPropertyChanged(oldValue, newValue);
    private onValidationModePropertyChanged(oldValue, newValue);
    private onCommitModePropertyChanged(oldValue, newValue);
    private onSourcePropertyChanged(oldValue, newValue);
    private onMetadataPropertyChanged(oldValue, newValue);
    private onGroupsPropertyChanged(oldValue, newValue);
    private onPropertiesPropertyChanged(oldValue, newValue);
    private bindingContextChanged(data);
    _attachEntityPropertyPropertyChangeListener(property: EntityProperty): void;
    _attachGroupLayoutChangeListener(oldValue: DataFormLayout, newValue: DataFormLayout): void;
    _attachGroupTitleStyleChangeListener(oldValue: GroupTitleStyle, newValue: GroupTitleStyle): void;
    _attachGroupChangeListener(group: PropertyGroup): void;
    protected _onIsReadOnlyPropertyChanged(oldValue: boolean, newValue: boolean): void;
    protected _onCommitModePropertyChanged(oldValue: string, newValue: string): void;
    protected _onValidationModePropertyChanged(oldValue: string, newValue: string): void;
    protected _onSourcePropertyChanged(oldValue: any, newValue: any): void;
    protected _onMetadataPropertyChanged(oldValue: any, newValue: any): void;
    protected _onGroupsPropertyChanged(oldValue: Array<PropertyGroup>, newValue: Array<PropertyGroup>): void;
    protected _onPropertiesPropertyChanged(oldValue: Array<EntityProperty>, newValue: Array<EntityProperty>): void;
    readonly editedObject: any;
    static propertiesProperty: Property<RadDataForm, EntityProperty[]>;
    _addArrayFromBuilder(name: string, value: Array<any>): void;
    getPropertyByName(propertyName: string): EntityProperty;
    getGroupByName(groupName: string): PropertyGroup;
    reload(): void;
    validateAll(): Promise<Boolean>;
    validateAndCommitAll(): Promise<Boolean>;
    commitAll(): void;
}
export declare class PropertyGroup extends ViewBase implements AddArrayFromBuilder {
    name: string;
    hidden: boolean;
    titleHidden: boolean;
    collapsible: boolean;
    collapsed: boolean;
    titleStyle: GroupTitleStyle;
    properties: Array<EntityProperty>;
    layout: DataFormLayout;
    static nameProperty: Property<PropertyGroup, string>;
    static hiddenProperty: Property<PropertyGroup, boolean>;
    static titleHiddenProperty: Property<PropertyGroup, boolean>;
    static collapsibleProperty: Property<PropertyGroup, boolean>;
    static collapsedProperty: Property<PropertyGroup, boolean>;
    static titleStyleProperty: Property<PropertyGroup, GroupTitleStyle>;
    static propertiesProperty: Property<PropertyGroup, EntityProperty[]>;
    static layoutProperty: Property<PropertyGroup, DataFormLayout>;
    _addArrayFromBuilder(name: string, value: Array<any>): void;
    private onNamePropertyChanged(oldValue, newValue);
    private onHiddenPropertyChanged(oldValue, newValue);
    private onTitleHiddenPropertyChanged(oldValue, newValue);
    private onCollapsiblePropertyChanged(oldValue, newValue);
    private onCollapsedPropertyChanged(oldValue, newValue);
    private onTitleStylePropertyChanged(oldValue, newValue);
    private onPropertiesPropertyChanged(oldValue, newValue);
    private onLayoutPropertyChanged(oldValue, newValue);
    protected onNameChanged(oldValue: string, newValue: string): void;
    protected onHiddenChanged(oldValue: boolean, newValue: boolean): void;
    protected onTitleHiddenChanged(oldValue: boolean, newValue: boolean): void;
    protected onCollapsibleChanged(oldValue: boolean, newValue: boolean): void;
    protected onCollapsedChanged(oldValue: boolean, newValue: boolean): void;
    protected onTitleStyleChanged(oldValue: GroupTitleStyle, newValue: GroupTitleStyle): void;
    protected onPropertiesChanged(oldValue: Array<EntityProperty>, newValue: Array<EntityProperty>): void;
    protected onLayoutChanged(oldValue: DataFormLayout, newValue: DataFormLayout): void;
}
export declare class PropertyEditorParams extends ViewBase {
    minimum: number;
    maximum: number;
    step: number;
    static minimumProperty: Property<PropertyEditorParams, number>;
    static maximumProperty: Property<PropertyEditorParams, number>;
    static stepProperty: Property<PropertyEditorParams, number>;
    private onMinimumPropertyChanged(oldValue, newValue);
    private onMaximumPropertyChanged(oldValue, newValue);
    private onStepPropertyChanged(oldValue, newValue);
    protected onMinimumChanged(oldValue: number, newValue: number): void;
    protected onMaximumChanged(oldValue: number, newValue: number): void;
    protected onStepChanged(oldValue: number, newValue: number): void;
}
export declare class DataFormStyleBase extends ViewBase {
    separatorColor: string;
    strokeColor: string;
    fillColor: string;
    strokeWidth: number;
    labelTextColor: string;
    labelTextSize: number;
    labelFontName: string;
    labelFontStyle: string;
    static strokeColorProperty: Property<DataFormStyleBase, string>;
    static strokeWidthProperty: Property<DataFormStyleBase, number>;
    static fillColorProperty: Property<DataFormStyleBase, string>;
    static separatorColorProperty: Property<DataFormStyleBase, string>;
    static labelTextColorProperty: Property<DataFormStyleBase, string>;
    static labelTextSizeProperty: Property<DataFormStyleBase, number>;
    static labelFontNameProperty: Property<DataFormStyleBase, string>;
    static labelFontStyleProperty: Property<DataFormStyleBase, string>;
    private onStrokeColorPropertyChanged(oldValue, newValue);
    protected onStrokeColorChanged(oldValue: string, newValue: string): void;
    private onStrokeWidthPropertyChanged(oldValue, newValue);
    protected onStrokeWidthChanged(oldValue: number, newValue: number): void;
    private onFillColorPropertyChanged(oldValue, newValue);
    protected onFillColorChanged(oldValue: string, newValue: string): void;
    private onSeparatorColorPropertyChanged(oldValue, newValue);
    protected onSeparatorColorChanged(oldValue: string, newValue: string): void;
    private onLabelTextColorPropertyChanged(oldValue, newValue);
    protected onLabelTextColorChanged(oldValue: string, newValue: string): void;
    private onLabelTextSizePropertyChanged(oldValue, newValue);
    protected onLabelTextSizeChanged(oldValue: number, newValue: number): void;
    private onLabelFontNamePropertyChanged(oldValue, newValue);
    protected onLabelFontNameChanged(oldValue: string, newValue: string): void;
    private onLabelFontStylePropertyChanged(oldValue, newValue);
    protected onLabelFontStyleChanged(oldValue: string, newValue: string): void;
}
export declare class GroupTitleStyle extends DataFormStyleBase {
}
export declare class PropertyEditorStyle extends DataFormStyleBase {
    editorHorizontalOffset: number;
    editorVerticalOffset: number;
    labelHorizontalOffset: number;
    labelVerticalOffset: number;
    labelHidden: boolean;
    labelPosition: string;
    labelWidth: number;
    static editorHorizontalOffsetProperty: Property<PropertyEditorStyle, number>;
    static editorVerticalOffsetProperty: Property<PropertyEditorStyle, number>;
    static labelHorizontalOffsetProperty: Property<PropertyEditorStyle, number>;
    static labelVerticalOffsetProperty: Property<PropertyEditorStyle, number>;
    static labelHiddenProperty: Property<PropertyEditorStyle, boolean>;
    static labelPositionProperty: Property<PropertyEditorStyle, string>;
    static labelWidthProperty: Property<PropertyEditorStyle, number>;
    private onEditorHorizontalOffsetPropertyChanged(oldValue, newValue);
    protected onEditorHorizontalOffsetChanged(oldValue: number, newValue: number): void;
    private onEditorVerticalOffsetPropertyChanged(oldValue, newValue);
    protected onEditorVerticalOffsetChanged(oldValue: number, newValue: number): void;
    private onLabelHorizontalOffsetPropertyChanged(oldValue, newValue);
    protected onLabelHorizontalOffsetChanged(oldValue: number, newValue: number): void;
    private onLabelVerticalOffsetPropertyChanged(oldValue, newValue);
    protected onLabelVerticalOffsetChanged(oldValue: number, newValue: number): void;
    private onLabelHiddenPropertyChanged(oldValue, newValue);
    protected onLabelHiddenChanged(oldValue: boolean, newValue: boolean): void;
    private onLabelPositionPropertyChanged(oldValue, newValue);
    protected onLabelPositionChanged(oldValue: string, newValue: string): void;
    private onLabelWidthPropertyChanged(oldValue, newValue);
    protected onLabelWidthChanged(oldValue: number, newValue: number): void;
}
export declare class EntityProperty extends ViewBase implements AddArrayFromBuilder {
    private namePropertySilentUpdate;
    editor: PropertyEditor;
    validators: Array<PropertyValidator>;
    converter: PropertyConverter;
    valuesProvider: any;
    autoCompleteDisplayMode: string;
    name: string;
    displayName: string;
    index: number;
    columnIndex: number;
    hidden: boolean;
    readOnly: boolean;
    required: boolean;
    hintText: string;
    imageResource: any;
    errorMessage: string;
    successMessage: string;
    protected valuesProviderArray: Array<any>;
    readonly isValid: boolean;
    readonly value: any;
    readonly valueCandidate: any;
    readonly android: any;
    readonly ios: any;
    static editorProperty: Property<EntityProperty, PropertyEditor>;
    static validatorsProperty: Property<EntityProperty, PropertyValidator[]>;
    static converterProperty: Property<EntityProperty, PropertyConverter>;
    static valuesProviderProperty: Property<EntityProperty, any>;
    static autoCompleteDisplayModeProperty: Property<EntityProperty, string>;
    static nameProperty: Property<EntityProperty, string>;
    static displayNameProperty: Property<EntityProperty, string>;
    static indexProperty: Property<EntityProperty, number>;
    static columnIndexProperty: Property<EntityProperty, number>;
    static hiddenProperty: Property<EntityProperty, boolean>;
    static readOnlyProperty: Property<EntityProperty, boolean>;
    static requiredProperty: Property<EntityProperty, boolean>;
    static hintTextProperty: Property<EntityProperty, string>;
    static imageResourceProperty: Property<EntityProperty, any>;
    private onEditorPropertyChanged(oldValue, newValue);
    protected onEditorTypeChanged(): void;
    private onValidatorsPropertyChanged(oldValue, newValue);
    private onConverterPropertyChanged(oldValue, newValue);
    private onValuesProviderPropertyChanged(oldValue, newValue);
    private onAutoCompleteDisplayModePropertyChanged(oldValue, newValue);
    private onNamePropertyChanged(oldValue, newValue);
    private onDisplayNamePropertyChanged(oldValue, newValue);
    private onIndexPropertyChanged(oldValue, newValue);
    private onColumnIndexPropertyChanged(oldValue, newValue);
    private onHiddenPropertyChanged(oldValue, newValue);
    private onReadOnlyPropertyChanged(oldValue, newValue);
    private onRequiredPropertyChanged(oldValue, newValue);
    private onHintTextPropertyChanged(oldValue, newValue);
    private onImageResourcePropertyChanged(oldValue, newValue);
    _addArrayFromBuilder(name: string, value: Array<any>): void;
    protected onEditorChanged(oldValue: PropertyEditor, newValue: PropertyEditor): void;
    protected onValidatorsChanged(oldValue: Array<PropertyValidator>, newValue: Array<PropertyValidator>): void;
    protected onConverterChanged(oldValue: PropertyConverter, newValue: PropertyConverter): void;
    protected onValuesProviderChanged(oldValue: any, newValue: any): void;
    protected _setupConverterWith(key: string, label: string, items: any): void;
    private _containsItemsArray(value);
    private _isKeyLabelsArray(value);
    private _getKeyProperty(value);
    private _getLabelProperty(value);
    protected onAutoCompleteDisplayModeChanged(oldValue: string, newValue: string): void;
    protected onNameChanged(oldValue: string, newValue: string): void;
    protected onDisplayNameChanged(oldValue: string, newValue: string): void;
    protected onIndexChanged(oldValue: number, newValue: number): void;
    protected onColumnIndexChanged(oldValue: number, newValue: number): void;
    protected onHiddenChanged(oldValue: boolean, newValue: boolean): void;
    protected onReadOnlyChanged(oldValue: boolean, newValue: boolean): void;
    protected onRequiredChanged(oldValue: boolean, newValue: boolean): void;
    protected onHintTextChanged(oldValue: string, newValue: string): void;
    protected onImageResourceChanged(oldValue: any, newValue: any): void;
    protected updateNativeEditor(value: PropertyEditor): void;
    protected updateNativeValidators(value: Array<PropertyValidator>): void;
    protected updateNativeConverter(value: PropertyConverter): void;
    protected updateNativeValuesProvider(value: Array<any>): void;
    protected updateNativeAutoCompleteDisplayMode(value: string): void;
    protected updateNativeDisplayName(value: string): void;
    protected updateNativeIndex(value: number): void;
    protected updateNativeColumnIndex(value: number): void;
    protected updateNativeHidden(value: boolean): void;
    protected updateNativeReadOnly(value: boolean): void;
    protected updateNativeRequired(value: boolean): void;
    protected updateNativeHintText(value: string): void;
    protected updateNativeImageResource(value: any): void;
}
export declare class PropertyEditor extends ViewBase {
    type: string;
    propertyEditorStyle: PropertyEditorStyle;
    params: PropertyEditorParams;
    readonly android: any;
    readonly ios: any;
    static typeProperty: Property<PropertyEditor, string>;
    static propertyEditorStyleProperty: Property<PropertyEditor, PropertyEditorStyle>;
    static paramsProperty: Property<PropertyEditor, PropertyEditorParams>;
    private onTypePropertyChanged(oldValue, newValue);
    private onPropertyEditorStylePropertyChanged(oldValue, newValue);
    private onParamsPropertyInternalChanged(oldValue, newValue);
    protected onStylePropertyChanged(propertyName: String): void;
    protected onParamsPropertyChanged(propertyName: String): void;
    protected onTypeChanged(oldValue: string, newValue: string): void;
    protected onPropertyEditorStyleChanged(oldValue: PropertyEditorStyle, newValue: PropertyEditorStyle): void;
    protected onParamsChanged(oldValue: PropertyEditorParams, newValue: PropertyEditorParams): void;
}
export declare class CustomPropertyEditor extends PropertyEditor {
    static editorNeedsViewEvent: string;
    static editorHasToApplyValueEvent: string;
    static editorNeedsValueEvent: string;
    readonly android: any;
    readonly ios: any;
    notifyValueChanged(): void;
}
export declare class PropertyValidator extends ViewBase {
    errorMessage: string;
    successMessage: string;
    readonly android: any;
    readonly ios: any;
    static errorMessageProperty: Property<PropertyValidator, string>;
    static successMessageProperty: Property<PropertyValidator, string>;
    private onErrorMessagePropertyChanged(oldValue, newValue);
    private onSuccessMessagePropertyChanged(oldValue, newValue);
    protected onErrorMessageChanged(oldValue: string, newValue: string): void;
    protected onSuccessMessageChanged(oldValue: string, newValue: string): void;
    validate(value: any, propertyName: string): boolean;
}
export declare class LengthValidator extends PropertyValidator {
    length: number;
    static lengthProperty: Property<LengthValidator, number>;
    private onLengthPropertyChanged(oldValue, newValue);
    protected onLengthChanged(oldValue: number, newValue: number): void;
}
export declare class MinimumLengthValidator extends LengthValidator {
}
export declare class MaximumLengthValidator extends LengthValidator {
}
export declare class EmailValidator extends PropertyValidator {
}
export declare class NonEmptyValidator extends PropertyValidator {
}
export declare class RangeValidator extends PropertyValidator {
    maximum: number;
    minimum: number;
    static minimumProperty: Property<RangeValidator, number>;
    static maximumProperty: Property<RangeValidator, number>;
    private onMinimumPropertyChanged(oldValue, newValue);
    private onMaximumPropertyChanged(oldValue, newValue);
    protected onMinimumChanged(oldValue: number, newValue: number): void;
    protected onMaximumChanged(oldValue: number, newValue: number): void;
}
export declare class PhoneValidator extends PropertyValidator {
}
export declare class RegExValidator extends PropertyValidator {
    regEx: string;
    static regExProperty: Property<RegExValidator, string>;
    private onRegExPropertyChanged(oldValue, newValue);
    protected onRegExChanged(oldValue: string, newValue: string): void;
}
export declare class IsTrueValidator extends PropertyValidator {
}
export interface PropertyConverter {
    convertFrom(value: any): any;
    convertTo(value: any): any;
}
export declare class StringToDateConverter implements PropertyConverter {
    convertFrom(value: any): any;
    convertTo(value: any): any;
}
export declare class StringToTimeConverter implements PropertyConverter {
    convertFrom(value: any): any;
    convertTo(value: any): any;
}
export declare class ValuesProviderArrayConverter implements PropertyConverter {
    private _key;
    private _label;
    private _items;
    constructor(key: any, label: any, items: any);
    convertFrom(source: any): any;
    convertTo(source: any): number;
}
export declare class ValuesProviderMapConverter implements PropertyConverter {
    private _items;
    constructor(items: any);
    convertFrom(source: any): any;
    convertTo(source: any): number;
}
export declare class DataFormLayout extends ViewBase {
}
export declare class DataFormStackLayout extends DataFormLayout {
    orientation: any;
    static orientationProperty: Property<DataFormStackLayout, any>;
    private onOrientationPropertyChanged(oldValue, newValue);
    protected onOrientationChanged(oldValue: any, newValue: any): void;
}
export declare class DataFormGridLayout extends DataFormLayout {
}
