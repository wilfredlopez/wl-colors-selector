import { StorageSingleton } from './StorageSingleton'

const newLen = 3

describe('StorageSingleton', () => {
  it('has properties', () => {
    expect(new StorageSingleton().name).toBeDefined()
    expect(new StorageSingleton().data).toBeDefined()
  })
  it('returns the same object all the time', () => {
    const I1 = new StorageSingleton()
    const newName = 'MMG'
    I1.name = newName
    const I2 = new StorageSingleton()
    expect(I1.data.length).toBe(0)
    for (let i = 0; i < newLen; i++) {
      I2.data.push('A' + i)
    }
    expect(I2.name).toBe(newName)
    expect(I1).toBe(I2)
  })
  it('retains the data from previews updates', () => {
    const I3 = new StorageSingleton()
    expect(I3.data.length).toBe(newLen)
  })
})
