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
  const defaultData = { default: 'value' }

  beforeEach(() => {
    vi.clearAllMocks()
    service = new LocalStorageService('testKey', defaultData, mockLocalStorage)
  })

  it('saves data to localStorage', () => {
    const value = { test: 'data' }
    service.save(value)
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'testKey',
      JSON.stringify(value)
    )
  })

  it('loads data from localStorage', () => {
    const storedValue = { test: 'data' }
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(storedValue))

    const result = service.load()

    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('testKey')
    expect(result).toEqual(storedValue)
  })

  it('returns and saves default data if no data is found in localStorage', () => {
    mockLocalStorage.getItem.mockReturnValueOnce(null)

    const result = service.load()

    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('testKey')
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'testKey',
      JSON.stringify(defaultData)
    )
    expect(result).toEqual(defaultData)
  })

  it('checks if the stored data is equal to defaultData', () => {
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(defaultData))

    const result = service.is_empty()

    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('testKey')
    expect(result).toBe(true)
  })

  it('returns false if the stored data is not equal to defaultData', () => {
    const storedValue = { test: 'data' }
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(storedValue))

    const result = service.is_empty()

    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('testKey')
    expect(result).toBe(false)
  })

  it('removes data from localStorage', () => {
    service.remove()
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('testKey')
  })

  it('clears all data from localStorage using the static method', () => {
    LocalStorageService.clear(mockLocalStorage)
    expect(mockLocalStorage.clear).toHaveBeenCalled()
  })
})
