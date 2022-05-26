import { ProxyState } from "../AppState.js";
import { itemsService } from "../Services/ItemsService.js";
import { Pop } from "../Utils/Pop.js";

// NOTE looking for the draw item? it's not here,  That is because drawing items is handled in the party template.

export class ItemsController{
  constructor(){
    console.log('items loaded', ProxyState.items);
  }


  // NOTE add Item takes in a party id, so it can know which party it belongs to.
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

  // NOTE need async and await to use the pop confirm
  async deleteItem(id){
    if(await Pop.confirm('are you sure you want to delete this?')){
      itemsService.deleteItem(id)
    }
  }
}