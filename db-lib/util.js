export async function createAdventure(adventureData) {
    const response = await fetch('/api/adventures', {
        method: "POST",
        body: JSON.stringify(adventureData),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error({ message: 'Error' })
    }
    console.log(data)
    return data;
}