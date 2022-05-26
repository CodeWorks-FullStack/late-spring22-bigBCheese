import { ProxyState } from "../AppState.js";
import { Party } from "../Models/Party.js";




class PartiesService{
  bookParty(partyData) {
    console.log('service bookParty', partyData);
    ProxyState.parties = [...ProxyState.parties, new Party(partyData)]
  }
  updateParty(newText, id) {
    // NOTE use the id of the party from the onblur, to find which party we were typing in, then change the value of it's accommodations to the the newly typed one.
    let party = ProxyState.parties.find(p => p.id == id)
    console.log('upating party service',newText, party);
    party.accommodations = newText
    ProxyState.parties = ProxyState.parties
    // NOTE then trick the listener to trigger the save to local
  }
  deleteParty(id) {
    console.log('deleteing', id);
    ProxyState.parties = ProxyState.parties.filter(p => p.id != id)
  }

}

export const partiesService = new PartiesService()