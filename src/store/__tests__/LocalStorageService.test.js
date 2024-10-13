import { describe, it, expect, vi, beforeEach } from 'vitest'
import LocalStorageService from '../LocalStorageService'

const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

describe('LocalStorageService', () => {
  let service

  beforeEach(() => {
    vi.clearAllMocks()
    service = new LocalStorageService('testKey', mockLocalStorage)
  })

  it('сохраняет данные в localStorage', () => {
    const value = { test: 'data' }
    service.save(value)
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'testKey',
      JSON.stringify(value)
    )
  })

  it('загружает данные из localStorage', () => {
    const storedValue = { test: 'data' }
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(storedValue))

    const result = service.load()

    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('testKey')
    expect(result).toEqual(storedValue)
  })

  it('возвращает и сохраняет объект по умолчанию, если данных нет', () => {
    mockLocalStorage.getItem.mockReturnValueOnce(null)

    const result = service.load()

    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('testKey')
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'testKey',
      JSON.stringify({})
    )
    expect(result).toEqual({})
  })

  it('удаляет данные из localStorage', () => {
    service.remove()
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('testKey')
  })

  it('очищает весь localStorage через статический метод', () => {
    LocalStorageService.clear(mockLocalStorage)
    expect(mockLocalStorage.clear).toHaveBeenCalled()
  })
})
