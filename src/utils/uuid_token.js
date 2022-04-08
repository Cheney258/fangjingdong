import { v4 as uuidv4 } from 'uuid'

// 要生成一个随机的唯一的字符串，当作游客ID 持久存储
export const getUUID = ()=>{
    // 先从本地存储获取uuid（看一下本地存储里面是否有）
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    // 如果没有
    if (!uuid_token) {
        // 生成一个游客临时ID
        uuid_token = uuidv4()
        // 本地存储一次
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    // 切记要有返回值，没有返回值就是undefined
    return uuid_token
}