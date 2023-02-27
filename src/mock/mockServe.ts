import Mock from 'mockjs'

// 引入 json 数据
import roomList from './data/roomList.json'

// 设置响应
Mock.mock('/mock/roomList', {
    code: '000000',
    data: roomList,
})