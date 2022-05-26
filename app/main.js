import { ItemsController } from "./Controllers/ItemsController.js";
import { PartiesController } from "./Controllers/PartiesController.js";

class App {
  // valuesController = new ValuesController();
  partiesController = new PartiesController()

  itemsController = new ItemsController()
}

window["app"] = new App();
