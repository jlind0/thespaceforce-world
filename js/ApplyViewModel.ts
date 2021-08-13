///<reference path="../node_modules/@types/jquery/index.d.ts"/>
///<reference path="../node_modules/@types/knockout/index.d.ts"/>
export interface Categories{
    categories: Category[]
}
export interface Category{
    id: string,
    description: string,
    name: string
}
type FetchParams = Parameters<typeof window.fetch>;
const fetchJson = <T>(...params: FetchParams) : Promise<T> => window.fetch(...params).then((resp) => resp.json() as Promise<T>);
document.addEventListener('DOMContentLoaded', () =>{
   var cats = fetchJson<Categories>("files/positions.json").then(data =>{
    var vm = new ApplyViewModel(data.categories);
    ko.applyBindings(vm);
    vm.addClickEvent();
   });
});
export class ApplyViewModel{
    Categories : KnockoutObservableArray<CategoryViewModel>;
    constructor(data: Category[]){
        this.Categories = ko.observableArray<CategoryViewModel>();
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
        
    }
}