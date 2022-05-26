import { Party } from "./Models/Party.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Value').Value[]} */
  values = []
/** @type {import('./Models/Party').Party[]} */
  parties = [
    new Party({
      name: 'Richard\'s Big Party',
      date: '3/12/22',
      size: 32,
      accommodations: 'Please keep all the animatronics away from me, I have a sensitive nose and they smell of cheese.',
      hasRat: true
      }),
      new Party({
        name: 'Sarah',
        date: '4/12/22',
        size: 38,
        accommodations: 'BRING THE RAT AND ALL HIS FRIENDS!',
        hasRat: true
        })
  ]
/** @type {import('./Models/Item').Item[]} */
  items = []
}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
