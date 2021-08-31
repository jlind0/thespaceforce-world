///<reference path="../node_modules/@types/jquery/index.d.ts"/>
///<reference path="../node_modules/@types/knockout/index.d.ts"/>
declare global{
    interface JQuery{
        carousel(): void;
    }
    interface Event{
        from?: number,
        to?: number;
    }
}
export interface Categories{
    categories: Category[]
}

export interface Category{
    id: string,
    description: string,
    name: string,
    positions?: Position[];
}
export interface Position{
    name: string;
    description: string;
    rank: string,
    type: RankType,
    insignia: RankInsignia[],
    careerFields: CareerFields[],
    availableSlots: number,
    requiredFields?: CareerFields[]

}
export interface CareerFieldData{
    careerFields: CareerField[]
}
export interface CareerField{
    name: string,
    id: CareerFields,
    color: string,
    forecolor: string,
    description: string
}
export const enum RankType{
    nato = "nato",
    un = "un"
}
export const enum RankInsignia{
    gold ="gold",
    black = "black"
}
export const enum CareerFields{
    command = "command",
    tactical = "tactical",
    engineering = "engineering",
    operations = "operations",
    science = "science",
    medical = "medical",
    communications = "communications",
    intelligence = "intelligence",
    diplomatic = "diplomatic",
    marine = "marine"
}
type FetchParams = Parameters<typeof window.fetch>;
const fetchJson = <T>(...params: FetchParams) : Promise<T> => window.fetch(...params).then((resp) => resp.json() as Promise<T>);

document.addEventListener('DOMContentLoaded', () =>{
  fetchJson<Categories>("files/positions.json").then(data =>{
    var fields = fetchJson<CareerFieldData>("files/careerFields.json").then((cfData) =>{
        var vm = new ApplyViewModel(data.categories, cfData);
        ko.applyBindings(vm);
        vm.addClickEvent();
        $('.carousel').carousel();
        $(".carousel").each((i,e) =>{
            e.addEventListener("slide.bs.carousel", (evt) =>{
                var ctx = <CategoryViewModel> ko.dataFor(e);
                var positions = ctx.Positions();
                for(let j = 0; j < positions.length; j++){
                    positions[j].Selected(j === evt.to);
                }
            });
        });
    });
   
   });
});
export class ApplyViewModel{
    public Categories : KnockoutObservableArray<CategoryViewModel>;
    constructor(data: Category[], public careerFields: CareerFieldData){
        this.Categories = ko.observableArray();
         for(let i = 0; i< data.length; i++){
            this.Categories.push(new CategoryViewModel(this, data[i], i == 0));
         }
    }
    public addClickEvent(){
        var cats = this.Categories();
        for(let i =0; i < cats.length; i++){
            $(cats[i].TabIdHash()).on('click', () => this.changeSelection(cats[i].TabId()));
        }
    }
    public changeSelection(tabId: string){
        var cats = this.Categories();
        for(let i = 0; i < cats.length; i++){
            cats[i].Selected(cats[i].TabId() === tabId);
        }
    }
}
export class CareerFieldViewModel {
    public Name: KnockoutObservable<string>;
    public Id: KnockoutObservable<string>;
    public Color: KnockoutObservable<string>;
    public ForeColor: KnockoutObservable<string>;
    public Description: KnockoutObservable<string>;
    public IsRequired: KnockoutObservable<boolean>;
    constructor(careerField: CareerField, isRequired = false) {
        this.Name = ko.observable(careerField.name);
        this.Id = ko.observable(careerField.id);
        this.Color = ko.observable(careerField.color);
        this.ForeColor = ko.observable(careerField.forecolor);
        this.Description = ko.observable(careerField.description);
        this.IsRequired = ko.observable(isRequired);
    }
}
export class CategoryViewModel{
    public Id: KnockoutObservable<string>;
    public Description: KnockoutObservable<string>;
    public Name: KnockoutObservable<string>;
    public Selected: KnockoutObservable<boolean>;
    public IdHash: KnockoutComputed<string>;
    public TabId: KnockoutComputed<string>;
    public ApplyActive: KnockoutComputed<string>;
    public ApplyShow: KnockoutComputed<string>;
    public TabIdHash: KnockoutComputed<string>;
    public Positions: KnockoutObservableArray<PositionViewModel>;
    public CarouselId: KnockoutComputed<string>;
    public CarouselIdHash: KnockoutComputed<string>;
    
    constructor(protected parent: ApplyViewModel, data : Category, isSelected: boolean){
        this.Id = ko.observable(data.id);
        this.Description = ko.observable(data.description);
        this.Name = ko.observable(data.name);
        this.Selected = ko.observable(isSelected);
        this.IdHash = ko.pureComputed<string>(
            () =>{
                return "#"+this.Id();
            }
        );
        this.CarouselId = ko.pureComputed(() =>{
            return "carousel-" + this.Id();
        });
        this.CarouselIdHash = ko.pureComputed(()=>{
            return "#" + this.CarouselId();
        });
        this.TabId = ko.pureComputed(() =>{
            return "tab-" + this.Id();
        });
        this.ApplyActive = ko.pureComputed(()=>{
            return this.Selected() ? "active" : "";
        });
        this.ApplyShow = ko.pureComputed(() =>{
            return this.Selected() ? "show active" :"";
        });
        this.TabIdHash = ko.pureComputed(() =>{
            return "#" + this.TabId();
        });
        this.Positions = ko.observableArray();
        if(data.positions !== undefined){
            for(let i = 0; i < data.positions.length; i++){
                this.Positions.push(new PositionViewModel(this, data.positions[i], i));
            }
        }
    }
    
    }
    export class PositionViewModel {
        public Name: KnockoutObservable<string>;
        public Description: KnockoutObservable<string>;
        public Type: KnockoutObservable<RankType>;
        public RankInsignia: KnockoutObservableArray<RankInsignia>;
        public RankInsigniaDisplay: KnockoutObservableArray<string>;
        public CareerFields: KnockoutObservableArray<CareerFields>;
        public RequiredFields: KnockoutObservableArray<CareerFields>;
        public AvailableSlots: KnockoutObservable<number>;
        public Index: KnockoutObservable<number>;
        public ApplyActive: KnockoutComputed<string>;
        public Selected: KnockoutObservable<boolean>;
        constructor(protected parent: CategoryViewModel,protected position: Position, protected index: number) {
            this.Selected = ko.observable(this.index === 0);
            this.ApplyActive = ko.computed(() =>{
                return this.Selected() ? "active" : "";
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
            for(let i = 0; i < position.insignia.length; i++){
                switch(position.insignia[i]){
                    case RankInsignia.black: this.RankInsigniaDisplay.push("img/ranks/black-pip.png"); break;
                    case RankInsignia.gold: this.RankInsigniaDisplay.push("img/ranks/gold-pip.png"); break;
                }
            }
        }
}