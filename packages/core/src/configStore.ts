export interface ConfigStore {
  get<T>(key: string): T;
  set<T>(key: string, value: T): void;
  clear(): void;
}

export class MemoryConfigStore implements ConfigStore {
  protected map!: Map<string, any>;

  constructor() {
    this._restore();
  }

  protected _restore() {
    this.map = new Map([
      ["apiBaseUrl", "https://dev-api-iap-v2.orderly.org"],
      ["klineDataUrl", "https://dev-api-iap-v2.orderly.org"],
      ["publicWsUrl", "wss://dev-ws-v2.orderly.org"],
      ["publicWebsocketKey", "OqdphuyCtYWxwzhxyLLjOWNdFP7sQt8RPWzmb5xY"],
      ["privateWsUrl", "wss://dev-ws-private-v2.orderly.org"],
      ["env", "dev-evm"],
    ]);
  }

  get<T>(key: string): T {
    return this.map.get(key);
  }

  set<T>(key: string, value: T): void {
    this.map.set(key, value);
  }

  clear(): void {}
}

// export const memoryConfigStoreInstance = new MemoryConfigStore();

/**
 *
 */
export class BaseConfigStore extends MemoryConfigStore {
  constructor(private readonly configMap: Record<string, any>) {
    super();
  }

  protected _restore() {
    const arr = Object.entries(this.configMap);
    this.map = new Map(arr);
  }
}

// export class DefaultJsonConfigStore extends BaseConfigStore {
//   constructor() {
//     //
//     super(configMap);
//   }
// }
