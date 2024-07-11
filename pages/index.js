import AdventuresList from "@/components/adventures/adventures-list.js";

export default function Home() {
  const DUMMY_DATA = [
    {
      id: 'ad_1',
      image: 'https://s2-casavogue.glbimg.com/jW-lo7Q6s_UYw6CZB1YIVFYJ6aU=/0x0:2119x1414/1000x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_d72fd4bf0af74c0c89d27a5a226dbbf8/internal_photos/bs/2024/Y/K/zHmXo1Q0e6dHcRqVeLNQ/04-sagrada-familia-em-barcelona-ganha-nova-data-de-inauguracao.jpg',
      title: 'Basílica de la Sagrada Família',
      address: 'C/ de Mallorca, 401, 08013 Barcelona, Spain'
    },
    {
      id: 'ad_2',
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/f4/bd/08/lunds-allhelgonakyrka.jpg?w=1200&h=-1&s=1',
      title: 'Lund Cathedral',
      address: 'Lunds domkyrka, Kyrkogatan 6, 222 22 Lund, Sweden'
    },

  ]
  return (
    <>
      <AdventuresList adventures={DUMMY_DATA}/>
    </>
  );
}
