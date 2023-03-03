import { http } from '@/utils/http'


// 获取房屋详情页
export const reqgetRoomDetail = function (params) {
    return http.httpRequestGet('http://110.42.184.111/api/room/room/getRoomDetail', params)
}