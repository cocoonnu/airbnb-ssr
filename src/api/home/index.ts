import { http } from '@/utils/http'
import mockRequests from '@/mock/mockRequests'


// 真实接口
// export const reqgetRoomList = function () {
//     return http.httpRequestGet(`http://110.42.184.111/api/room/room/getRoomList?pageNo=10&pageSize=25`, {});
// }


// mock 接口
export const reqgetRoomList = function () {
    return mockRequests.get('/roomList');
}
