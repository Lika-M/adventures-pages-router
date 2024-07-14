import NewAdventureForm from "@/components/adventures/new-adventure-form.js";
import { createAdventure } from "@/db-lib/util.js";

export default function NewAdventure() {

  function addHandler(data) {
    createAdventure(data);
  }
  
  return (
    <NewAdventureForm onAddAdventure={addHandler} />
  );
}