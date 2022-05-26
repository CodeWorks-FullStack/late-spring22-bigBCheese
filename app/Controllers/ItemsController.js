import { ProxyState } from "../AppState.js";
import { itemsService } from "../Services/ItemsService.js";

export class ItemsController{
  constructor(){
    console.log('items loaded', ProxyState.items);
  }


  addItem(partyId){
    window.event.preventDefault()
    console.log('adding item to party', partyId);
    let form = window.event.target
    let itemData = {
      partyId: partyId,
      type: form.type.value,
      body: form.body.value,
      price: form.price.value
    }
    console.log(itemData);
    itemsService.addItem(itemData)
  }

  deleteItem(id){
    itemsService.deleteItem(id)
  }
}