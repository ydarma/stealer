type StealerOptions = {
  ttl: number;
  unref: boolean;
}

const defaultOptions: StealerOptions = {
  ttl: 3600,
  unref: false,
};

export class Stealer<K,V> {
  readonly keyValues = new Map<K, {marked: boolean, value: V}>();
  readonly options: StealerOptions;
  private readonly stealerInterval: NodeJS.Timer;
  
  constructor(options: Partial<StealerOptions> = {}) {
    this.options = {...defaultOptions, ...options }
    this.stealerInterval = setInterval(() => {
      this.steal();
    }, this.options.ttl * 1000);
    if(this.options.unref && typeof this.stealerInterval.unref == "function")
      this.stealerInterval.unref();
  }
  
  destroy(): void {
    this.stealerInterval.unref
    clearInterval(this.stealerInterval);
  }
  
  set(key: K, value: V): void {
    this.keyValues.set(key, { marked: false, value });
  }
  
  get(key: K): V | undefined {
    const wrapper = this.keyValues.get(key);
    if(typeof wrapper == "undefined") return undefined;
    wrapper.marked = false;
    return wrapper.value;
  }
  
  has(key: K): boolean {
    return typeof this.get(key) != "undefined";
  }
  
  delete(key: K) {
    this.keyValues.delete(key);
  }
  
  private steal(): void {
    for(const [k, v] of this.keyValues.entries()) {
      this.stealOrMark(v, k);
    }
  }

  private stealOrMark(v: { marked: boolean; value: V; }, k: K) {
    if (v.marked)
      this.keyValues.delete(k);
    else
      v.marked = true
  }
}