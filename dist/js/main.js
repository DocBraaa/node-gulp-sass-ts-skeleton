System.register("app", [], function (exports_1, context_1) {
    "use strict";
    var App;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            App = /** @class */ (function () {
                function App() {
                }
                return App;
            }());
            exports_1("App", App);
        }
    };
});
System.register("main", ["app"], function (exports_2, context_2) {
    "use strict";
    var app_1;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (app_1_1) {
                app_1 = app_1_1;
            }
        ],
        execute: function () {
            new app_1.App();
            console.log('Update 4');
        }
    };
});
