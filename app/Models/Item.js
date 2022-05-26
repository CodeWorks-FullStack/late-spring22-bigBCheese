import { generateId } from "../Utils/generateId.js";


export class Item{
  constructor(data){
    this.id = data.id || generateId(),
    this.partyId = data.partyId
    this.type = data.type,
    this.body = data.body,
    this.price = data.price
  }

  get Template(){
    return `
    <p class="d-flex justify-content-between"> ${this.type} <span> ${this.body}</span><span>${this.price}</span>
    <i class="mdi mdi-delete selectable px-3" onclick="app.itemsController.deleteItem('${this.id}')"></i>
    </p>
    `
  }
}