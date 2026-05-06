const API_URL = import.meta.env.VITE_API_URL;

export const getChanges = async () => {

    const response = await fetch(`${API_URL}/Change`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
    });

    return await response.json();
};