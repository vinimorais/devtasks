export class StorageService<T> {
  constructor(private key: string) {}

  save(data: T) {
    localStorage.setItem(this.key, JSON.stringify(data))
  }

  load(): T | null {
    const item = localStorage.getItem(this.key)
    return item ? JSON.parse(item) : null
  }

  clear() {
    localStorage.removeItem(this.key)
  }
}