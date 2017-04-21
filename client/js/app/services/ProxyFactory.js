class ProxyFactory {
    constructor() {
        throw new Error("this class can`t be instantiate");
    }

    static create(objeto, props, action) {
        return new Proxy(objeto, {
			get(target, prop, receiver){
				if (props.includes(prop) && ProxyFactory._isFunction(target[prop])) {
					return function() {
						let retorno = Reflect.apply(target[prop], target, arguments);
					    action(objeto);
                        return retorno;
					}
				}
				return Reflect.get(target, prop, receiver);
			},

            set(target, prop, value, receiver) {
                let retorno = Reflect.set(target, prop, value, receiver);
                if (props.includes(prop)) {
                    action(target);
                } 
                return  retorno;
            }
		});
    }

    static _isFunction(func) {
        return typeof(func) == typeof(Function);
    }
}