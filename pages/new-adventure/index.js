import NewAdventureForm from "@/components/adventures/new-adventure-form.js";

export default function NewAdventure() {

  function addHandler(data) {
    console.log(data)
  }
  
  return (
    <NewAdventureForm onAddAdventure={addHandler} />
  );
}