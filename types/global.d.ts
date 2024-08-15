declare global {
  interface Window {
    VConsole?: () => void
    fullscreenMode: boolean;
    vliveJSBridge: any
    // vliveJSBridge: JSBridge
    G_callbacks: {
      _id: number
      _getId: () => number
    }
    clientApi: any
    xla: Array<
      {
        type: 'event';
        category: string;
        action: string;
        extdata?: any;
      } | {
        type: 'config';
        appid: string;
        secret: string;
      } | {
        type: 'globalExtData';
        data: {
          '@user_id': string;
          '@distinct_id': string;
          os: string;
        };
      }
    >;
  }
  let __VUE_PROD_DEVTOOLS__: boolean
}

export { }

