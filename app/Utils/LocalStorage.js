import { ProxyState } from "../AppState.js";
import { Item } from "../Models/Item.js";
import { Party } from "../Models/Party.js";





export function saveState(){
  console.log('saving');
  let data = {
    parties : ProxyState.parties,
    items: ProxyState.items
  }
  window.localStorage.setItem('bigBCheese', JSON.stringify(data))
}

export function loadState(){
  console.log('loading');
  let data = window.localStorage.getItem('bigBCheese')
  if(data){
    let obj = JSON.parse(data)
    ProxyState.parties = obj.parties.map(pd => new Party(pd))
    ProxyState.items = obj.items.map(itd => new Item(itd))
  }
}