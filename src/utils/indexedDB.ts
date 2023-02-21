export default class IndexedDB {
    private dbName: string

    constructor(dbName: string) {
        this.dbName = dbName
    }

    // 打开数据库 参数：对象仓库名称、主键、索引数组（可选） 
    openStore(storeName: string, keyPath: string, indexs?: Array<string>) {
        let request = window.indexedDB.open(this.dbName, 2) // 名称 版本号（不可回退）

        // 数据库打开成功的回调
        request.onsuccess = function(e) {
            console.log('数据库打开成功')
            console.log(e);
        }

        // 数据库打开失败的回调
        request.onerror = function (e) {
            console.log('数据库打开失败')
            console.log(e);
        }

        // 数据库更新成功的回调
        request.onupgradeneeded = function (e) {
            console.log('数据库更新成功')
            const { result } = e.target   

            // 创建对象仓库
            const store = result.createObjectStore(storeName, {
                autoIncrement: true, keyPath
            })

            // 创建该对象仓库属性的索引
            if(indexs && indexs.length > 0) {
                indexs.map(function(i: string) {
                    store.createIndex(i, i, { unique: true })
                })
            }

            // 对象仓库创建成功的回调
            store.transaction.oncomplete = function(e) {
                console.log('对象仓库创建成功');
                console.log(e);
            }
        }
        
    }
}