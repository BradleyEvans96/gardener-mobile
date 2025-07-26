export const getHighscores = async () => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/highscores`);
  if (!response.ok) {
    throw new Error("Failed to fetch highscores");
  }
  return response.json();
};
