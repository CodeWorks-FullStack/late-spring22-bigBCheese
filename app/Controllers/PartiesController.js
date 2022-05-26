import { ProxyState } from "../AppState.js";
import { partiesService } from "../Services/PartiesService.js";
import { loadState, saveState } from "../Utils/LocalStorage.js";
import { Pop } from "../Utils/Pop.js";

function _drawParties(){
  // NOTE this sort only works if the party's date, is a date.  if they are stings this may not give the desired effect. check the party model.
  let parties = ProxyState.parties.sort((a,b)=> a.date - b.date)
  let template = ''
  parties.forEach(p => template += p.Template)
  document.getElementById('parties').innerHTML = template
}


export class PartiesController{
  constructor(){
    console.log('Time to party', ProxyState.parties);
    // NOTE we have on's for both parties and items here cause the party itself is responsible for drawing the items on it, so when items change, we want to draw the parties again.
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

  updateParty(id){
    let textarea = window.event.target
    console.log(textarea.value, id);
    // NOTE in this case it's the textarea that calls the event, so there is not need to collect the data again like we would in the create function, we just grab the value directly
    partiesService.updateParty(textarea.value, id)
    Pop.toast('party updated!')
  }


  deleteParty(id){
    // let choice = confirm('do you want to delete this')
    if(confirm('are you sure you want to delete this?')){
      partiesService.deleteParty(id)
    }
  }
}