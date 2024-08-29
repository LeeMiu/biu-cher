import {fetchData} from '@/utils/fetch'

export const fetchThirdGame = (data: any) => {
  // 此处放node服务
  return fetchData({
    baseURL: useRuntimeConfig().public?.appLiveApi,
    url: '/mpgame/get_third_game_uid_token',
    params: data,
  });
}