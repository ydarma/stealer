type StealerOptions = {
    ttl: number;
    unref: boolean;
};
declare class Stealer<K, V> {
    readonly keyValues: Map<K, {
        marked: boolean;
        value: V;
    }>;
    readonly options: StealerOptions;
    private readonly stealerInterval;
    constructor(options?: Partial<StealerOptions>);
    destroy(): void;
    set(key: K, value: V): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    private steal;
    private stealOrMark;
}
export { Stealer };
