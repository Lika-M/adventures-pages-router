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
        throw new Error({ message: 'Unfortunately something went wrong, please try again later.' })
    }
    console.log(data)
    return data;
}

export async function createUser(userData) {
    const response = await fetch('/api/auth/register', {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    if(!response.ok){
        throw new Error({message: 'User registration failed'})
    }

    return data;
}