var fetchJson = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    return window.fetch.apply(window, params).then(function (resp) { return resp.json(); });
};
document.addEventListener('DOMContentLoaded', function () {
    var cats = fetchJson("files/positions.json").then(function (data) {
        var vm = new ApplyViewModel(data.categories);
        ko.applyBindings(vm);
        vm.addClickEvent();
    });
});
var ApplyViewModel = (function () {
    function ApplyViewModel(data) {
        this.Categories = ko.observableArray();
        for (var i = 0; i < data.length; i++) {
            this.Categories.push(new CategoryViewModel(this, data[i], i == 0));
        }
    }
    ApplyViewModel.prototype.addClickEvent = function () {
        var _this = this;
        var cats = this.Categories();
        var _loop_1 = function (i) {
            $(cats[i].TabIdHash()).on('click', function () { return _this.changeSelection(cats[i].TabId()); });
        };
        for (var i = 0; i < cats.length; i++) {
            _loop_1(i);
        }
    };
    ApplyViewModel.prototype.changeSelection = function (tabId) {
        var cats = this.Categories();
        for (var i = 0; i < cats.length; i++) {
            cats[i].Selected(cats[i].TabId() === tabId);
        }
    };
    return ApplyViewModel;
}());
export { ApplyViewModel };
var CategoryViewModel = (function () {
    function CategoryViewModel(parent, data, isSelected) {
        var _this = this;
        this.parent = parent;
        this.Id = ko.observable(data.id);
        this.Description = ko.observable(data.description);
        this.Name = ko.observable(data.name);
        this.Selected = ko.observable(isSelected);
        this.IdHash = ko.pureComputed(function () {
            return "#" + _this.Id();
        });
        this.TabId = ko.pureComputed(function () {
            return "tab-" + _this.Id();
        });
        this.ApplyActive = ko.pureComputed(function () {
            return _this.Selected() ? "active" : "";
        });
        this.ApplyShow = ko.pureComputed(function () {
            return _this.Selected() ? "show active" : "";
        });
        this.TabIdHash = ko.pureComputed(function () {
            return "#" + _this.TabId();
        });
    }
    return CategoryViewModel;
}());
export { CategoryViewModel };
//# sourceMappingURL=ApplyViewModel.js.map