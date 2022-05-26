import { ProxyState } from "../AppState.js";
import { Party } from "../Models/Party.js";




class PartiesService{
  bookParty(partyData) {
    console.log('service bookParty', partyData);
    ProxyState.parties = [...ProxyState.parties, new Party(partyData)]
  }
  deleteParty(id) {
    console.log('deleteing', id);
    ProxyState.parties = ProxyState.parties.filter(p => p.id != id)
  }

}

export const partiesService = new PartiesService()