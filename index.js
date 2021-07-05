'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const defaultOptions = {
    ttl: 3600,
    unref: false,
};
class Stealer {
    constructor(options = {}) {
        this.keyValues = new Map();
        this.options = Object.assign(Object.assign({}, defaultOptions), options);
        this.stealerInterval = setInterval(() => {
            this.steal();
        }, this.options.ttl * 500);
        if (this.options.unref)
            this.stealerInterval.unref();
    }
    destroy() {
        this.stealerInterval.unref;
        clearInterval(this.stealerInterval);
    }
    set(key, value) {
        this.keyValues.set(key, { marked: false, value });
    }
    get(key) {
        const wrapper = this.keyValues.get(key);
        if (typeof wrapper == "undefined")
            return undefined;
        wrapper.marked = false;
        return wrapper.value;
    }
    has(key) {
        return typeof this.get(key) != "undefined";
    }
    steal() {
        for (const [k, v] of this.keyValues.entries()) {
            this.stealOrMark(v, k);
        }
    }
    stealOrMark(v, k) {
        if (v.marked)
            this.keyValues.delete(k);
        else
            v.marked = true;
    }
}

exports.Stealer = Stealer;
