/**
 * LocalStorageService class provides an interface for interacting with the browser's localStorage.
 * It allows saving, loading, and removing data, as well as clearing all data in localStorage.
 */

class LocalStorageService {
  private key: string
  private storage: Storage
  private defaultData: any

  /**
   * Initializes the class with a specified key, default data, and storage (defaults to localStorage).
   * @param key - The key under which data will be stored.
   * @param defaultData - The default data to use when no data is found in localStorage.
   * @param storage - Optional storage mechanism (defaults to localStorage).
   */
  constructor(
    key: string,
    defaultData: any = {},
    storage: Storage = localStorage
  ) {
    this.key = key
    this.storage = storage
    this.defaultData = defaultData
  }

  /**
   * Saves data to localStorage under the specified key.
   * @param value - The data to save.
   */
  save(value: any): void {
    this.storage.setItem(this.key, JSON.stringify(value))
  }

  /**
   * Loads data from localStorage by the specified key.
   * If no data exists, initializes with the default object and saves it.
   * @returns {any} - The loaded data or default object.
   */
  load(): any {
    let data = this.storage.getItem(this.key)

    // If no data exists, create a default object and save it
    if (!data) {
      this.storage.setItem(this.key, JSON.stringify(this.defaultData))
      return this.defaultData
    }

    return JSON.parse(data)
  }

  /**
   * Removes data from localStorage by the specified key.
   */
  remove(): void {
    this.storage.removeItem(this.key)
  }

  /**
   * Clears all data from the provided storage (defaults to localStorage).
   * @param storage - Optional storage mechanism (defaults to localStorage).
   */
  static clear(storage: Storage = localStorage): void {
    storage.clear()
  }
}

export default LocalStorageService
