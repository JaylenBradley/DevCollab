const API_URL = `${import.meta.env.VITE_DEV_BACKEND_URL}/users`;

export const createUser = async (userData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }

        return response.json()
    } catch (err) {
        console.error('Error creating user:', err);
        throw err;
    }
};