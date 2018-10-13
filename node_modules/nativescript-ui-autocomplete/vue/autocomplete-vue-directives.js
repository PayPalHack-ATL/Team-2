Object.defineProperty(exports, "__esModule", { value: true });
var Vue = require("nativescript-vue");
var __1 = require("./..");
Vue.registerElement("RadAutoCompleteTextView", function () { return __1.RadAutoCompleteTextView; });
Vue.registerElement("SuggestionView", function () { return __1.SuggestionView; });
Vue.directive("suggestionItemTemplate", {
    inserted: function (el, binding, vnode) {
        Vue.nextTick(function () {
            // get the autocomplete View
            var autocomplete = el.parentNode.parentNode.nativeView;
            // listen for the itemLoading event, and patch the template
            autocomplete.on('itemLoading', function (args) {
                var index = args.index;
                var item = args.data;
                var oldVnode = args.view['__vueVNodeRef__'];
                el.$templates.patchTemplate('default', { item: item }, oldVnode);
            });
            // set the itemViewLoader to use the default template
            autocomplete.itemViewLoader = function (viewType) {
                switch (viewType) {
                    case "itemview":
                        return el.$templates.patchTemplate('default', { item: {} });
                }
            };
        });
    }
});
