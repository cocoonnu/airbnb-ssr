import { resolve } from "path"

export default class IndexedDB {
    private dbName: string
    private db: any // 数据库实例

    constructor(dbName: string) {
        this.dbName = dbName
    }

    // 打开数据库 参数：对象仓库名称、主键、索引数组（可选） 
    openStore(storeName: string, keyPath: string, indexs?: Array<string>) {

        // 名称 版本号（不可回退）
        let request = window.indexedDB.open(this.dbName, 2) 

        // 数据库更新成功的回调
        request.onupgradeneeded = function (e) {
            console.log('数据库更新成功')
            const { result } = e.target

            // 创建对象仓库
            const store = result.createObjectStore(storeName, {
                autoIncrement: true, keyPath
            })

            // 创建该对象仓库属性的索引
            if (indexs && indexs.length > 0) {
                indexs.map(function (i: string) {
                    store.createIndex(i, i, { unique: true })
                })
            }

            // 对象仓库创建成功的回调
            store.transaction.oncomplete = function (e) {
                console.log('对象仓库创建成功');
                console.log(e);
            }
        }

        // 返回一个异步 打开成功才能执行之后的代码
        return new Promise((resolve, reject) => {
            // 数据库打开成功的回调
            request.onsuccess = (e) => {
                console.log(`${storeName} 仓库打开成功`)

                // 赋值数据库实例
                this.db = e.target.result

                // 返回成功态
                resolve(true)
            }

            // 数据库打开失败的回调
            request.onerror = (e) => {
                console.log('数据库打开失败')

                // 返回失败态
                reject(false)
            }

        })        
    }


    // 新增、修改对象仓库数据  参数：仓库名、数据
    updateItem(storeName: string, data: any) {
        // 打开对象仓库
        const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)

        // 仓库写入数据 updateTime：使数据唯一化
        let request = store.put({
            ...data, updateTime: new Date().getTime()
        })

        return new Promise((resolve, reject) => {

            // 写入成功的回调
            request.onsuccess = function (e) {
                resolve(true)
            }

            // 写入失败的回调
            request.onerror = function (e) {
                reject(false)
            }

        })

    }

    deleteItem(storeName: string, keyPath: string | number) {
        // 打开对象仓库
        const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)

        let request = store.delete(keyPath)

        request.onsuccess = function (e) {
            console.log('数据删除成功');
        }

        request.onerror = function (e) {
            console.log('数据删除失败');
        }
    }

    // 查询所有数据
    getList(storeName: string) {
        const store = this.db.transaction(storeName).objectStore(storeName)
        
        const request = store.getAll()

        // 返回异步函数结果
        return new Promise((resolve, reject) => {
            request.onsuccess = (event: any) => {
                // console.log('查询所有数据成功')

                // 成功得到数据并返回
                resolve(event.target.result) // 成功态
            }

            request.onerror = (event: any) => {
                // console.log('查询所有数据失败')

                // 返回失败结果
                reject(false) // 失败态
            }
        })
    }

    // 查询单条数据
    getItem(storeName: string, key: number | string) {
        const store = this.db.transaction(storeName).objectStore(storeName)

        const request = store.get(key)

        // 返回异步函数结果
        return new Promise((resolve, reject) => {
            request.onsuccess = (event: any) => {
                
                // 得到数据并返回 也可能为 undefine
                resolve(event.target.result) // 成功态
            }

            request.onerror = (event: any) => {
                reject(false)
            }
        })
    }
}