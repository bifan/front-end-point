class DBTool {
  constructor(dbName = "dbNameTemp1", storeName = "storeNameTemp1") {
    this.dbName = dbName;
    this.storeName = storeName;
  }
  openStore() {
    const curObj = this;
    return new Promise(function (resolve, reject) {
      if (!("indexedDB" in window)) {
        return reject("don't support indexedDB");
      }
      const request = indexedDB.open(curObj.dbName, 1);
      request.onerror = reject;
      request.onsuccess = e => resolve(e.target.result);
      request.onupgradeneeded = function (e) {
        const db = e.srcElement.result;
        if (
          e.oldVersion === 0 &&
          !db.objectStoreNames.contains(curObj.storeName)
        ) {
          const store = db.createObjectStore(curObj.storeName, {
            keyPath: "tag"
          });
          store.createIndex(curObj.storeName + "Index", "tag", {
            unique: false
          });
        }
      };
    });
  }
  saveData(db, data) {
    const curObj = this;
    return new Promise(function (resolve, reject) {
      const tx = db.transaction(curObj.storeName, "readwrite");
      const store = tx.objectStore(curObj.storeName);
      const request = store.put({ tag: curObj.dbName, data });
      request.onsuccess = () => resolve(db);
      request.onerror = reject;
    });
  }
  query(db) {
    const curObj = this;
    return new Promise(function (resolve, reject) {
      try {
        const tx = db.transaction(curObj.storeName, "readonly");
        const store = tx.objectStore(curObj.storeName);
        const dbRequest = store.get(curObj.dbName);
        dbRequest.onsuccess = e => resolve(e.target.result);
        dbRequest.onerror = reject;
      } catch (err) {
        reject(err);
      }
    });
  }
}
export { DBTool };
