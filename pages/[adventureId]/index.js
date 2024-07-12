import AdventureDetail from "@/components/adventures/adventure-detail.js";
import { DUMMY_DATA } from "../index.js";

export default function Details({adventure}) {
    return <AdventureDetail {...adventure} />
}

export async function getStaticProps(context) {
    const adventureId = context.params.adventureId;

    console.log(adventureId);
    const adventure = DUMMY_DATA.find(adv => adv.id === adventureId);

    return {
        props: {
            adventure
        },
        revalidate: 300
    }
}

export async function getStaticPaths() {

    return {
        fallback: false,
        paths: [
            {
                params: {adventureId: 'ad_1'}
            },
            {
                params: {adventureId: 'ad_2'}
            }
        ]
    }
}