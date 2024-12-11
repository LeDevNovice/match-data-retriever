import { fetchEventsData } from './utils/fetchData/fetchEventsData';
import { fetchInjuriesData } from './utils/fetchData/fetchInjuriesData';
import { fetchLineupData } from './utils/fetchData/fetchLineupData';
import { fetchMatchId } from './utils/fetchData/fetchMatchId';
import { fetchPlayersData } from './utils/fetchData/fetchPlayersData';
import { fetchStatisticsData } from './utils/fetchData/fetchStatisticsData';

export default async function retrieveMatchData(
  teamId: number,
  leagueId: number,
  year: string | null,
  date: string,
) {
  const matchId = await fetchMatchId(teamId, leagueId, Number(year), date);

  const [lineupData, injuriesData, statisticsData, eventsData, playersData] = await Promise.all([
    fetchLineupData(matchId),
    fetchInjuriesData(matchId),
    fetchStatisticsData(matchId),
    fetchEventsData(matchId),
    fetchPlayersData(matchId),
  ]);

  return {
    matchId,
    lineupData,
    injuriesData,
    statisticsData,
    eventsData,
    playersData,
  };
}
