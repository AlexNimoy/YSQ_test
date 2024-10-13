class LocalStorageService {
  private key: string
  private storage: Storage

  // Инициализация класса с ключом и localStorage по умолчанию
  constructor(key: string, storage: Storage = localStorage) {
    this.key = key
    this.storage = storage
  }

  // Метод для сохранения данных в localStorage
  save(value: any): void {
    this.storage.setItem(this.key, JSON.stringify(value))
  }

  // Метод для загрузки данных из localStorage
  load(): any {
    let data = this.storage.getItem(this.key)

    // Если данных нет, создаем объект по умолчанию и сохраняем его
    if (!data) {
      const defaultData = {}
      this.storage.setItem(this.key, JSON.stringify(defaultData))
      return defaultData
    }

    return JSON.parse(data)
  }

  // Метод для удаления данных из localStorage
  remove(): void {
    this.storage.removeItem(this.key)
  }

  // Статический метод для очистки всего localStorage
  static clear(storage: Storage = localStorage): void {
    storage.clear()
  }
}

export default LocalStorageService
