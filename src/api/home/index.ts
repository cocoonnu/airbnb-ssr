import { http } from '@/utils/http'
import mockRequests from '@/mock/mockRequests'


// 获取房屋列表
export const reqgetRoomList = function (params: any) {
    return http.httpRequestGet('/api/room/room/getRoomList', params)
}


// mock 接口
export const reqgetRoomListMock = function () {
    return mockRequests.get('/roomList');
}
