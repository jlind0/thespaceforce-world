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
    });
});
var ApplyViewModel = (function () {
    function ApplyViewModel(data) {
        this.Categories = ko.observableArray();
        for (var i = 0; i < data.length; i++) {
            this.Categories.push(new CategoryViewModel(data[i], i == 0));
        }
    }
    return ApplyViewModel;
}());
export { ApplyViewModel };
var CategoryViewModel = (function () {
    function CategoryViewModel(data, isSelected) {
        var _this = this;
        this.Id = ko.observable(data.id);
        this.Description = ko.observable(data.description);
        this.Name = ko.observable(data.name);
        this.Selected = ko.observable(isSelected);
        this.IdHash = ko.computed(function () {
            return "#" + _this.Id();
        });
        this.TabId = ko.computed(function () {
            return "tab-" + _this.Id();
        });
        this.ApplyActive = ko.pureComputed(function () {
            return _this.Selected() ? "active" : "";
        });
        this.ApplyShow = ko.pureComputed(function () {
            return _this.Selected() ? "show active" : "";
        });
    }
    return CategoryViewModel;
}());
export { CategoryViewModel };
//# sourceMappingURL=ApplyViewModel.js.map