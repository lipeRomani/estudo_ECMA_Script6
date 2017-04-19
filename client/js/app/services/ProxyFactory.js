class ProxyFactory {
    constructor() {
        throw new Error("this class can`t be instantiate");
    }

    static create(objeto, props, action) {
        return new Proxy(objeto, {
			get(target, prop, receiver){
				if (props.includes(prop) && ProxyFactory._isFunction(target[prop])) {
					return function() {
						Reflect.apply(target[prop], target, arguments);
					    return action(objeto);
					}
				}
				return Reflect.get(target, prop, receiver);
			},

            set(target, prop, value, receiver) {
                if (props.includes(prop)) {
                    target[prop] = value;
                    action(target);
                } 
                return Reflect.set(target, prop, value, receiver);
            }
		});
    }

    static _isFunction(func) {
        return typeof(func) == typeof(Function);
    }
}