import { fetchMatchId } from './utils/fetchData/fetchMatchId';

export default async function retrieveMatchData(
  teamId: number,
  leagueId: number,
  year: string | null,
  date: string,
) {
  const matchId = await fetchMatchId(teamId, leagueId, Number(year), date);

  return ([lineupData, injuriesData, statisticsData, eventsData, playersData] = await Promise.all([
    fetchLineupData(matchId),
    fetchInjuriesData(matchId),
    fetchStatisticsData(matchId),
    fetchEventsData(matchId),
    fetchPlayersData(matchId),
  ]));
}
