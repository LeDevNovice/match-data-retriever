import * as dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_SPORTS_KEY;

if (!API_KEY) {
  throw new Error(
    'API Sports key is missing. Please set API_SPORTS_KEY in your environment variables.',
  );
}

const headers = {
  'x-apisports-key': API_KEY,
};

export async function fetchMatchId(
  team: number,
  league: number,
  season: number,
  date: string,
): Promise<number> {
  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?team=${team}&date=${date}&league=${league}&season=${season}`,
      { headers },
    );
    const data = await response.json();

    if (!data.response || data.response.length === 0) {
      throw new Error('No match data found for the given parameters.');
    }

    return data.response[0].fixture.id;
  } catch (error: any) {
    console.error(`Error fetching match ID: ${error.message}`);
    throw error;
  }
}
