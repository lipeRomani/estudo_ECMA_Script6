class Bind {
    constructor(model, view, ...props) {
        let modelProxy = ProxyFactory.create(model, props, (model) => view.update(model) );
        view.update(model);
        return modelProxy;
    }
}