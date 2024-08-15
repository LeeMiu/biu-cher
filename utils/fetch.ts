import type { BasicResponse } from "~/types/apiCommom";

interface FetchDataOptions {
  method?: string;
  url: string;
  params?: any;
  baseURL?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

// const {public: { appBaseApi, appBasegwApi }} = useRuntimeConfig();
export const fetchData = async <T = BasicResponse>({
  method = 'POST',
  url,
  params,
  baseURL,
  onSuccess,
  onError,
}: FetchDataOptions): Promise<T> => {
  try {
    const options: Record<string, any> = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // 允许携带cookie
      timeout: 3000, // 请求超时时间
    };

    if (method.toUpperCase() === 'GET') {
      options.params = params;
    } else {
      options.body = JSON.stringify(params);
    }

    const finalUrl = url.indexOf('http') > -1 ? url : `${baseURL}${url}`

    const fetchedData = await $fetch(finalUrl, options);

    if (fetchedData) {
      if (typeof onSuccess === 'function') {
        onSuccess(fetchedData);
      }
      return fetchedData as T;
    }
    return {
      base: {
        result: -1,
        message: 'unknown',
        reqId: '',
      },
      data: {}
    } as T;
  } catch (error) {
    if (typeof onError === 'function') {
      onError(error);
    }

    return {
      base: {
        result: -1,
        message: 'unknown',
        reqId: '',
      },
      data: {}
    } as T;
  }
};
