import { ProxyState } from "../AppState.js";
import { partiesService } from "../Services/PartiesService.js";
import { loadState, saveState } from "../Utils/LocalStorage.js";

function _drawParties(){
  let parties = ProxyState.parties
  let template = ''
  parties.forEach(p => template += p.Template)
  document.getElementById('parties').innerHTML = template
}


export class PartiesController{
  constructor(){
    console.log('Time to party', ProxyState.parties);
    ProxyState.on('parties', _drawParties)
    ProxyState.on('items', _drawParties)
    ProxyState.on('parties', saveState)
    ProxyState.on('items', saveState)
    loadState()
    _drawParties()
  }

  bookParty(){
    window.event.preventDefault()
    console.log('booking a party');
    let form = window.event.target
    let partyData = {
      name: form.name.value,
      size: form.size.value,
      date: form.date.value,
      hasRat: form.hasRat.checked, //NOTE for checkbox bool, use 'checked' instead of 'value'
      accommodations: form.accommodations.value
    }
    console.log('partyData', partyData);
    partiesService.bookParty(partyData)
  }

  deleteParty(id){
    partiesService.deleteParty(id)
  }
}