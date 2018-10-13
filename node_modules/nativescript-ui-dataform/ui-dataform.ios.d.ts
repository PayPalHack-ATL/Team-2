import * as commonModule from "./ui-dataform.common";
export * from './ui-dataform.common';
export declare class TKDataFormCustomEditorDelegateImplementation extends NSObject implements TKDataFormCustomEditorDelegate {
    static ObjCProtocols: {
        prototype: TKDataFormCustomEditorDelegate;
    }[];
    static new(): TKDataFormCustomEditorDelegateImplementation;
    private _owner;
    initWithOwner(owner: CustomPropertyEditor): TKDataFormCustomEditorDelegateImplementation;
    editorWillCreateView(editor: TKDataFormCustomEditor): UIView;
    editorShouldApplyValueEditorView(editor: TKDataFormCustomEditor, value: NSObject, view: UIView): void;
    editorWillReturnValueEditorView(editor: TKDataFormCustomEditor, view: UIView): NSObject;
}
export declare class RadDataForm extends commonModule.RadDataForm {
    private _nativeDelegate;
    private _dataSource;
    private _initialized;
    _validateResolve: any;
    _commitResolve: any;
    private _ios;
    constructor();
    createNativeView(): TKDataForm;
    disposeNativeView(): void;
    private isEnabledChanged(data);
    onLoaded(): void;
    onUnloaded(): void;
    notifyValidated(propertyName: string, result: boolean): void;
    readonly editedObject: string;
    private _reset();
    _applyGroupTitleStyle(groupView: TKEntityPropertyGroupView, titleStyle: commonModule.GroupTitleStyle): void;
    _updateGroupLayout(propertyGroup: any, nativeGroup: any): void;
    private onGroupPropertyChanged(data);
    private _onLayoutPropertyChanged(group);
    private _updateLayout(group);
    private getNativeGroup(name);
    private onGroupTitleStylePropertyChanged(data);
    private _onGroupLayoutPropertyChanged(group);
    private onPropertyPropertyChanged(data);
    private _initDataForm();
    _createPropertyFromNative(nativeProperty: TKEntityProperty): EntityProperty;
    private _updateNativeProperty(entityProperty);
    protected _onSourcePropertyChanged(oldValue: any, newValue: any): void;
    protected _onMetadataPropertyChanged(oldValue: any, newValue: any): void;
    protected _onIsReadOnlyPropertyChanged(oldValue: boolean, newValue: boolean): void;
    protected _onCommitModePropertyChanged(oldValue: string, newValue: string): void;
    protected _onValidationModePropertyChanged(oldValue: string, newValue: string): void;
    protected _onGroupsPropertyChanged(oldValue: Array<PropertyGroup>, newValue: Array<PropertyGroup>): void;
    validateAll(): Promise<Boolean>;
    validateAndCommitAll(): Promise<Boolean>;
    commitAll(): void;
    reload(): void;
    hasValidationErrors(): boolean;
    static getFontWithProperties(fontName: string, size: number, style: string): UIFont;
}
export declare class PropertyGroup extends commonModule.PropertyGroup {
    constructor();
    protected onNameChanged(oldValue: string, newValue: string): void;
    protected onHiddenChanged(oldValue: boolean, newValue: boolean): void;
    protected onCollapsibleChanged(oldValue: boolean, newValue: boolean): void;
    protected onTitleStyleChanged(oldValue: commonModule.GroupTitleStyle, newValue: commonModule.GroupTitleStyle): void;
    protected onPropertiesChanged(oldValue: Array<EntityProperty>, newValue: Array<EntityProperty>): void;
}
export declare class EntityProperty extends commonModule.EntityProperty {
    private _shouldSkipEditorUpdate;
    private _ios;
    readonly ios: TKEntityProperty;
    readonly isValid: boolean;
    readonly value: any;
    readonly valueCandidate: any;
    constructor();
    _linkPropertyWithNative(value: TKEntityProperty): void;
    _updateNativeEditor(nativeEditor: TKDataFormEditor): void;
    _createEditorFromNative(nativeEditor: any): void;
    private _onNativeSet();
    protected onEditorTypeChanged(): void;
    protected updateNativeEditorParams(value: commonModule.PropertyEditor): void;
    protected updateNativeEditor(value: commonModule.PropertyEditor): void;
    protected updateNativeValidators(value: Array<commonModule.PropertyValidator>): void;
    protected updateNativeValuesProvider(value: Array<any>): void;
    protected updateNativeAutoCompleteDisplayMode(value: string): void;
    protected updateNativeImageResource(value: any): void;
    protected updateNativeDisplayName(value: string): void;
    protected updateNativeIndex(value: number): void;
    protected updateNativeConverter(value: commonModule.PropertyConverter): void;
    protected updateNativeColumnIndex(value: number): void;
    protected updateNativeHidden(value: boolean): void;
    protected updateNativeReadOnly(value: boolean): void;
    protected updateNativeRequired(value: boolean): void;
    protected updateNativeHintText(value: string): void;
}
export declare class PropertyEditor extends commonModule.PropertyEditor {
    _ios: TKDataFormEditor;
    readonly ios: TKDataFormEditor;
    private _editorClass;
    readonly editorClass: any;
    protected onStylePropertyChanged(propertyName: String): void;
    protected onParamsChanged(oldValue: commonModule.PropertyEditorParams, newValue: commonModule.PropertyEditorParams): void;
    protected onParamsPropertyChanged(propertyName: String): void;
    protected onTypeChanged(oldValue: string, newValue: string): void;
    private _updateEditorClass();
    static _getNativeEditorType(nativeEditor: any): "Phone" | "Text" | "MultilineText" | "Email" | "Password" | "Decimal" | "Number" | "Switch" | "Stepper" | "Slider" | "SegmentedEditor" | "DatePicker" | "TimePicker" | "Picker" | "List" | "AutoCompleteInline" | "Label";
}
export declare class CustomPropertyEditor extends commonModule.CustomPropertyEditor {
    _nativeDelegate: TKDataFormCustomEditorDelegateImplementation;
    _ios: TKDataFormCustomEditor;
    readonly ios: TKDataFormCustomEditor;
    private _editorClass;
    readonly editorClass: any;
    protected onStylePropertyChanged(propertyName: String): void;
    protected onParamsChanged(oldValue: commonModule.PropertyEditorParams, newValue: commonModule.PropertyEditorParams): void;
    protected onParamsPropertyChanged(propertyName: String): void;
    protected onTypeChanged(oldValue: string, newValue: string): void;
    constructor();
    notifyValueChanged(): void;
}
export declare class PropertyEditorHelper {
    static _linkEditorWithNative(editor: commonModule.PropertyEditor, value: TKDataFormEditor): void;
    static _onNativeSet(editor: commonModule.PropertyEditor): void;
    static _updateLabelTextColor(editor: any, labelTextColor: any): void;
    static _updateLabelFont(editor: any, labelFontName: any, labelTextSize: any, labelFontStyle: any): void;
    static _updateLabelOffset(editor: any, labelHorizontalOffset: any, labelVerticalOffset: any): void;
    static _updateEditorOffset(editor: any, editorHorizontalOffset: any, editorVerticalOffset: any): void;
    static _updateEditorFillColor(editor: any, editorFillColor: any): void;
    static _updateEditorStroke(editor: any, editorStrokeColor: any, editorStrokeWidth: any): void;
    static _updateLabelHidden(editor: any, labelHidden: any): void;
    static _updateLabelPosition(editor: any, labelPosition: any): void;
    static _updateLabelWidth(editor: any, labelWidth: any): void;
    static _updateSeparatorColor(editor: any, separatorColor: any): void;
    static _applyParams(editor: any): void;
    static _updateNativeRange(editor: commonModule.PropertyEditor, range: TKRange): void;
    static _updateNativeStep(editor: commonModule.PropertyEditor, step: any): void;
    static applyStyle(editor: commonModule.PropertyEditor): void;
    static setNeedsDisplay(editor: commonModule.PropertyEditor): void;
    static setNeedsLayout(editor: commonModule.PropertyEditor): void;
    static applyStyleForProperty(editor: commonModule.PropertyEditor, propertyName: String): void;
}
export declare class PropertyValidator extends commonModule.PropertyValidator {
    private _ios;
    private _nativeDelegate;
    readonly ios: TKDataFormManualValidator;
    constructor();
    validate(value: any, propertyName: string): boolean;
}
export declare class MinimumLengthValidator extends commonModule.MinimumLengthValidator {
    private _ios;
    readonly ios: TKDataFormMinimumLengthValidator;
    constructor();
    protected onLengthChanged(oldValue: number, newValue: number): void;
}
export declare class MaximumLengthValidator extends commonModule.MaximumLengthValidator {
    private _ios;
    readonly ios: TKDataFormMaximumLengthValidator;
    constructor();
    protected onLengthChanged(oldValue: number, newValue: number): void;
}
export declare class EmailValidator extends commonModule.EmailValidator {
    private _ios;
    readonly ios: TKDataFormEmailValidator;
    constructor();
}
export declare class NonEmptyValidator extends commonModule.NonEmptyValidator {
    private _ios;
    readonly ios: TKDataFormNonEmptyValidator;
    constructor();
}
export declare class RangeValidator extends commonModule.RangeValidator {
    private _ios;
    readonly ios: TKDataFormRangeValidator;
    constructor();
    protected onMinimumChanged(oldValue: number, newValue: number): void;
    protected onMaximumChanged(oldValue: number, newValue: number): void;
}
export declare class PhoneValidator extends commonModule.PhoneValidator {
    private _ios;
    readonly ios: TKDataFormPhoneValidator;
    constructor();
}
export declare class RegExValidator extends commonModule.RegExValidator {
    private _ios;
    readonly ios: TKDataFormRegExValidator;
    constructor();
    protected onRegExChanged(oldValue: string, newValue: string): void;
}
export declare class IsTrueValidator extends commonModule.IsTrueValidator {
    private _ios;
    readonly ios: TKDataFormIsTrueValidator;
    constructor();
}
export declare class StringToDateConverter extends commonModule.StringToDateConverter {
    private _ios;
    readonly ios: TKDataFormStringToDateConverter;
    constructor();
}
export declare class StringToTimeConverter extends commonModule.StringToTimeConverter {
    private _ios;
    readonly ios: TKDataFormStringToTimeConverter;
    constructor();
}
