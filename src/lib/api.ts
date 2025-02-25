export const fetchUserSensors = async (userId: string) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/sensors/user/${userId}`
    );
    // Vérifie si la réponse est du JSON
    const text = await response.text();
    console.log("🔍 Raw response:", text);

    // Vérifie si la réponse est vide ou invalide
    if (!text) {
      throw new Error("Empty response from server");
    }

    // Convertit en JSON
    const data = JSON.parse(text);
    console.log("📊 Parsed JSON:", data);

    if (!Array.isArray(data.sensors)) {
      throw new Error("Invalid response format: sensors should be an array");
    }

    return data.sensors; // Assure-toi que c'est un tableau
  } catch (error) {
    console.error("Error fetching sensors:", error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
};
