export var RankType;
(function (RankType) {
    RankType["nato"] = "nato";
    RankType["un"] = "un";
})(RankType || (RankType = {}));
export var RankInsignia;
(function (RankInsignia) {
    RankInsignia["gold"] = "gold";
    RankInsignia["black"] = "black";
})(RankInsignia || (RankInsignia = {}));
export var CareerFields;
(function (CareerFields) {
    CareerFields["command"] = "command";
    CareerFields["tactical"] = "tactical";
    CareerFields["engineering"] = "engineering";
    CareerFields["operations"] = "operations";
    CareerFields["science"] = "science";
    CareerFields["medical"] = "medical";
    CareerFields["communications"] = "communications";
    CareerFields["intelligence"] = "intelligence";
    CareerFields["diplomatic"] = "diplomatic";
    CareerFields["marine"] = "marine";
})(CareerFields || (CareerFields = {}));
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
        $('.carousel').carousel();
        $(".carousel").each(function (i, e) {
            e.addEventListener("slide.bs.carousel", function (evt) {
                var ctx = ko.dataFor(e);
                var positions = ctx.Positions();
                for (var j = 0; j < positions.length; j++) {
                    positions[j].Selected(j === evt.to);
                }
            });
        });
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
        this.CarouselId = ko.pureComputed(function () {
            return "carousel-" + _this.Id();
        });
        this.CarouselIdHash = ko.pureComputed(function () {
            return "#" + _this.CarouselId();
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
        this.Positions = ko.observableArray();
        if (data.positions !== undefined) {
            for (var i = 0; i < data.positions.length; i++) {
                this.Positions.push(new PositionViewModel(data.positions[i], i));
            }
        }
    }
    return CategoryViewModel;
}());
export { CategoryViewModel };
var PositionViewModel = (function () {
    function PositionViewModel(position, index) {
        var _this = this;
        this.position = position;
        this.index = index;
        this.Selected = ko.observable(this.index === 0);
        this.ApplyActive = ko.computed(function () {
            return _this.Selected() ? "active" : "";
        });
        this.Index = ko.observable(index);
        this.Name = ko.observable(position.name);
        this.Description = ko.observable(position.description);
        this.Type = ko.observable(position.type);
        this.RankInsignia = ko.observableArray(position.insignia);
        this.CareerFields = ko.observableArray(position.careerFields);
        this.RequiredFields = position.requiredFields !== null ? ko.observableArray(position.requiredFields) : ko.observableArray();
        this.AvailableSlots = ko.observable(position.availableSlots);
        this.RankInsigniaDisplay = ko.observableArray();
        for (var i = 0; i < position.insignia.length; i++) {
            switch (position.insignia[i]) {
                case "black":
                    this.RankInsigniaDisplay.push("img/ranks/black-pip.png");
                    break;
                case "gold":
                    this.RankInsigniaDisplay.push("img/ranks/gold-pip.png");
                    break;
            }
        }
    }
    return PositionViewModel;
}());
export { PositionViewModel };
//# sourceMappingURL=ApplyViewModel.js.map