import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IndexedDBService {
  db!: IDBDatabase;
  constructor() {}

  async initializeApp() {
    this.db = await new Promise((resolve, reject) => {
      const request = indexedDB.open('EventHubDB', 1);
      request.onupgradeneeded = function (event: IDBVersionChangeEvent) {
        const db: IDBDatabase = (event.target as any).result;
        db.createObjectStore('user', { keyPath: 'id' });
        db.createObjectStore('events', { keyPath: 'id' });
        db.createObjectStore('eventsTotalCount', { keyPath: 'count' });
      };
      request.onerror = (event) => {
        console.error(event);
      };
      request.onsuccess = () => {
        resolve(request.result as IDBDatabase);
      };
    });
  }

  async addValue(name: string, value): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const transaction = this.db.transaction(name, 'readwrite');
      transaction.oncomplete = (event) => {
        resolve();
      };
      transaction.onerror = (event) => {
        reject(event);
      };
      const store = transaction.objectStore(name);
      store.add(value);
    });
  }

  async deleteValue(name: string, key: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const transaction = this.db.transaction(name, 'readwrite');
      transaction.onerror = (event) => {
        reject(event);
      };
      transaction.oncomplete = (event) => {
        resolve();
      };
      const store = transaction.objectStore(name);
      store.delete(key);
    });
  }

  async clearCollection(name: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open('EventHubDB', 1);
      request.onsuccess = function () {
        const db = request.result;
        const transaction = db.transaction(name, 'readwrite');
        transaction.onerror = (event) => {
          reject(event);
        };
        transaction.oncomplete = (event) => {
          resolve();
        };
        const store = transaction.objectStore(name);
        store.clear();
      };
    });
  }

  getAllValues(storeName: string) {
    return new Promise<[any]>((resolve, reject) => {
      if (!this.db) {
        reject();
      }
      const transaction = this.db.transaction(storeName, 'readwrite');
      transaction.onerror = (event) => {
        reject(event);
      };
      const store = transaction.objectStore(storeName);
      store.getAll().onsuccess = (event: any) => {
        resolve(event.target.result);
      };
    });
  }

  get(storeName: string, id: number): Promise<[]> {
    return new Promise<[]>((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readwrite');
      transaction.onerror = (event) => {
        reject(event);
      };
      const store = transaction.objectStore(storeName);
      store.get(id).onsuccess = (event: any) => {
        resolve(event.target.result);
      };
    });
  }
}
