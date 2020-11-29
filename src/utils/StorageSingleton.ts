// let Storage: StorageSingleton

// class StorageSingleton {
//   name: string
//   data: string[]
//   constructor() {
//     this.name = 'StorageSingleton'
//     this.data = []

//     if (Storage) {
//       return Storage
//     }
//     if (!Storage) {
//       Storage = this
//     }
//     return Storage
//   }
//   sayHi() {
//     return `Hello`
//   }
// }

// interface StorageSingleton {
//     data: string[]
//     name: string
//     prototype: StorageSingleton
//     sayHi(): string
//   }

//Using Iffi
//@ts-ignore
// const StorageSingleton: {
//   new (): StorageSingleton
//   prototype: StorageSingleton
// } = (function () {
//   let Storage: StorageSingleton
//   function StorageSingleton(this: StorageSingleton) {
//     this.data = []
//     this.name = ''

//     if (typeof Storage !== 'undefined') {
//       return Storage
//     } else {
//       Storage = this
//     }

//     return Storage
//   }
//   StorageSingleton.prototype.sayHi = function () {
//     return `Hello, my name is ${this.name}`
//   }
//   return StorageSingleton
// })()

//Using iifi in order to keep innerScope variables.
const StorageSingleton = (function () {
  let Storage: StorageSingleton
  class StorageSingleton {
    data: string[]
    name: string
    constructor() {
      this.data = []
      this.name = ''
      if (typeof Storage !== 'undefined') {
        return Storage
      } else {
        Storage = this
      }
      return Storage
    }
    sayHi() {
      return `Hello, my name is ${this.name}`
    }
  }
  return StorageSingleton
})()

export { StorageSingleton }

// const someClass = class<T> {
//   content: T
//   constructor(value: T) {
//     this.content = value
//   }
// }
