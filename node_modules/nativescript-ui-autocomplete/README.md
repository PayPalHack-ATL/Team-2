# NativeScript UI AutoComplete

- [Overview](#overview)
- [Installation](#installation)
- [Documentation](#documentation)
- [API Reference](#api-reference)
- [Sample Apps](#sample-apps)
- [Release Notes](#release-notes)
- [Get Help](#get-help)


## Overview

**NativeScript UI AutoComplete** is part of [Progress NativeScript UI](https://www.nativescript.org/ui-for-nativescript) - a suite of rich-UI components targeting the NativeScript platform.

Here are some of the features of the **NativeScript UI AutoComplete**:

* Suggest modes - you can choose to show suggestions in a drop-down list, one suggestion at a time in the text input, or a combination of both;
* Completion modes - StartsWith and Contains which differ in whether the input text will be searched in the whole list with acceptable items or only at the start;
* Display modes - Plain - in which only one item can be selected - and Tokens - allowing multiple selection of suggestions (each displayed as a token).

<img src="https://docs.nativescript.org/img/ui-for-nativescript/autocompletetextview-ios.png"><img src="https://docs.nativescript.org/img/ui-for-nativescript/autocompletetextview-android.png">

## Installation

In Command prompt / Terminal navigate to your application root folder and run:

```
tns plugin add nativescript-ui-autocomplete
```

## Documentation

To use the autocomplete plugin, you need to add an instance of `RadAutoCompleteTextView`.
Optionally you can set its `displayMode`, `completionMode` and `suggestMode`.
More information about the plugin features is available in the Guides for [NativeScript Core](http://docs.telerik.com/devtools/nativescript-ui/Controls/NativeScript/AutoCompleteTextView/overview) and [NativeScript with Angular](http://docs.telerik.com/devtools/nativescript-ui/Controls/Angular/AutoCompleteTextView/overview).

## API Reference

[Here](http://docs.telerik.com/devtools/nativescript-ui/api/classes/radautocompletetextview.html) is the API Reference section.

## Sample Apps

The features of the plugin are demonstrated in the Sample apps for [NativeScript Core](https://github.com/telerik/nativescript-ui-samples) and [NativeScript with Angular](https://github.com/telerik/nativescript-ui-samples-angular).

## Release Notes

The release notes are available [here](https://github.com/telerik/nativescript-ui-feedback/blob/master/releases/autocomplete.md).

## Get Help

Please, use [github issues](https://github.com/telerik/nativescript-ui-feedback/issues) strictly for reporting bugs or requesting features.