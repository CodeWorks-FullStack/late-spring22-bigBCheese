import { ProxyState } from "../AppState.js"
import { generateId } from "../Utils/generateId.js"


export class Party{
  constructor(partyData){
    // NOTE the || here allows the party to keep it's id if it has one, or generate one if it does not
    this.id = partyData.id || generateId() 
    this.name = partyData.name,
    // NOTE this date object allows up to formate the date in other ways that just a string date doesn't allow.
    this.date = new Date(partyData.date),
    this.size = partyData.size,
    this.accommodations = partyData.accommodations,
    this.hasRat = partyData.hasRat
  }

  get Template(){
    return `
    <div class="col-md-6 my-2">
      <div class="card p-3 shadow">
        <h4 class="d-flex justify-content-between">${this.name} <span>party size: ${this.size}</span><i
            class="mdi mdi-close selectable" onclick="app.partiesController.deleteParty('${this.id}')"></i></h4>
            <h5 class="text-muted"> ${this.date.toDateString()}</h5>

            ${this.Items}

            <form class="item-form" onsubmit="app.itemsController.addItem('${this.id}')">
            <select name="type" id="type">
              <option value="staff">🚻 staff</option>
              <option value="catering">🍕 catering</option>
              <option value="misc"> 🎫 misc</option>
            </select>
            <input type="text" name="body" id="body" placeholder="body">
            <input type="number" name="price" id="price" placeholder="price">
            <button class="btn btn-primary" title="add item"> + </button>
          </form>
          <textarea onblur="app.partiesController.updateParty('${this.id}')" class="border-0"> ${this.accommodations}</textarea>
        <h4 class="text-end">Total : $${this.Total}</h4>
      </div>
    </div>
    `
  }

  // NOTE these templates return a value instead of injecting into the HTML directly cause they are part of the get Template above, their returns will be put into the Template above, then that Template will be injected in.

// NOTE get the items for this party, then inject them into the middle
  get Items(){
    let items = ProxyState.items.filter(it => it.partyId == this.id)
    let template = ''
    items.forEach( it => template += it.Template)
    return template
  }

  // NOTE get the items for this party and add their prices up, then inject near the bottom
  get Total(){
    let items = ProxyState.items.filter(it => it.partyId == this.id)
    let subTotal = 0
    // NOTE parseInt turns it from a string number (thanks forms) into an integer we can add
    items.forEach(it => subTotal += parseInt(it.price))
    return subTotal
  }
}