import { ProxyState } from "../AppState.js";
import { Item } from "../Models/Item.js";
import { Party } from "../Models/Party.js";





export function saveState(){
  console.log('saving');
  let data = {
    parties : ProxyState.parties,
    items: ProxyState.items
  }
  // NOTE bigBCheese is name this data will be stored under in local storage.
  window.localStorage.setItem('bigBCheese', JSON.stringify(data))
}

export function loadState(){
  console.log('loading');
  // NOTE collect the data from where we saved it in save and check if there was any.
  let data = window.localStorage.getItem('bigBCheese')
  if(data){
    let obj = JSON.parse(data)
    // NOTE when data is saved into local storage it looses it's class, so it much be turned back into the class it was before saving
    ProxyState.parties = obj.parties.map(pd => new Party(pd))
    ProxyState.items = obj.items.map(itd => new Item(itd))
  }
}