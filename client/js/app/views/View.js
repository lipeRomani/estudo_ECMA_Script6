class View {
    constructor(element) 
    {
        this._element = element;
    }

    template(model) {
        throw new Error("This methdo need be implemented.");
    }

    update(model) {
        this._element.innerHTML = this.template(model);
    }
}