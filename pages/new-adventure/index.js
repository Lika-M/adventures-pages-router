import { useRouter } from "next/router.js";

import NewAdventureForm from "@/components/adventures/new-adventure-form.js";
import { createAdventure } from "@/db-lib/util.js";

export default function NewAdventure() {
  const router = useRouter();

  function addHandler(data) {
    createAdventure(data);
    router.push('/')
  }
  
  return (
    <NewAdventureForm onAddAdventure={addHandler} />
  );
}