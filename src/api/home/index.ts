import { http } from '@/utils/http'
import mockRequests from '@/mock/mockRequests'


// 获取房屋列表
export const reqgetRoomList = function (params) {
    return http.httpRequestGet('http://110.42.184.111/api/room/room/getRoomList', params)
}


// mock 接口
export const reqgetRoomListMock = function () {
    return mockRequests.get('/roomList');
}
