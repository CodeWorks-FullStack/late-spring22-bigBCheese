import { ProxyState } from "../AppState.js";
import { Item } from "../Models/Item.js";



class ItemsService {
  addItem(itemData) {
    console.log('add item service', itemData);
    ProxyState.items = [...ProxyState.items, new Item(itemData)]
  }
  
  deleteItem(id) {
    console.log('deleting item', id);
    ProxyState.items = ProxyState.items.filter(it => it.id != id)
  }
}

export const itemsService = new ItemsService()