import { http } from '@/utils/http'


// 获取房屋详情页
export const reqgetRoomDetail = function (params) {
    return http.httpRequestGet('/api/room/room/getRoomDetail', params)
}