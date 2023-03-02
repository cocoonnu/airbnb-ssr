import { http } from '@/utils/http'
import mockRequests from '@/mock/mockRequests'

// let city = 'hz'
// let url = `http://110.42.184.111/api/room/room/getRoomList?pageNo=2&pageSize=6&cityCode=${city}`


// 真实接口
export const reqgetRoomList = function (params) {
    return http.httpRequestGet('http://110.42.184.111/api/room/room/getRoomList', params)
}


// mock 接口
// export const reqgetRoomList = function () {
//     return mockRequests.get('/roomList');
// }
