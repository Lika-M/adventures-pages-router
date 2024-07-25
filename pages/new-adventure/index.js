import Head from "next/head.js";
import { useRouter } from "next/router.js";

import NewAdventureForm from "@/components/adventures/new-adventure-form.js";
import { createAdventure } from "@/db-lib/util.js";

export default function NewAdventure() {
  const router = useRouter();

 async  function addHandler(data) {
    await createAdventure(data);
    router.push('/adventures')
  }

  return (
    <>
     <Head>
        <title>New adventure</title>
        <meta name="description" content="Add your own amazing adventure." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/world-map.ico" />
      </Head>
      <NewAdventureForm onAddAdventure={addHandler} />
    </>
  );
}