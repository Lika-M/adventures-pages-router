import { useRouter } from "next/router";

import AdventureDetail from "@/components/adventures/adventure-detail.js";
import { DUMMY_DATA } from "../index.js";

export default function Details() {
    const router = useRouter();
    const itemId = router.query.adventureId;

    const adventure = DUMMY_DATA.find(adv => adv.id === itemId);
    
    return <AdventureDetail {...adventure} />
}