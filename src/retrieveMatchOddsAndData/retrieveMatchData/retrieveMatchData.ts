import { MatchOddsData } from '../../models/interfaces/matchOddsData.interface';
import { leagueIdMap } from '../../models/mappings/leagues.mapping';
import { teamIdMap } from '../../models/mappings/teams.mapping';
import { convertDateFormat } from './utils/convertDateFormat';
import { extractLeagueFromUrl } from './utils/extractLeagueFromUrl';
import { extractYearFromUrl } from './utils/extractYearFromUrl';

export default async function retrieveMatchData(matchUrl: string, oddsData: MatchOddsData) {
  const year = extractYearFromUrl(matchUrl);
  const leagueName = extractLeagueFromUrl(matchUrl);
  const leagueId = leagueIdMap[leagueName.toLowerCase()];
  const teamId = teamIdMap[oddsData.homeTeam.toLowerCase()];
  const date = convertDateFormat(oddsData.date);
}
