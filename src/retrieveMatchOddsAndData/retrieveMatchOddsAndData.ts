import scrollToBottom from '../common/scrollToBottom';
import launchBrowser from '../config/puppeteerConfig';
import { leagueIdMap } from '../models/mappings/leagues.mapping';
import { teamIdMap } from '../models/mappings/teams.mapping';
import retrieveMatchData from './retrieveMatchData/retrieveMatchData';
import { convertDateFormat } from './utils/extractFromUrl/convertDateFormat';
import { extractLeagueFromUrl } from './utils/extractFromUrl/extractLeagueFromUrl';
import { extractYearFromUrl } from './utils/extractFromUrl/extractYearFromUrl';
import retrieveMatchOdds from './retrieveMatchOdds/retrieveMatchOdds';
import { sendDataToElasticsearch } from '../services/elasticsearchService';

export default async function retrieveMatchOddsAndData(matchUrl: string): Promise<void> {
  try {
    const browser = await launchBrowser();
    const page = await browser.newPage();
    await page.goto(matchUrl);

    await scrollToBottom(page);

    const oddsData = await retrieveMatchOdds(page, matchUrl);

    if (!oddsData) {
      throw new Error('Failed to scrape odds data.');
    }

    const year = extractYearFromUrl(matchUrl);
    const leagueName = extractLeagueFromUrl(matchUrl);
    const leagueId = leagueIdMap[leagueName.toLowerCase()];
    const teamId = teamIdMap[oddsData.homeTeam.toLowerCase()];
    const date = convertDateFormat(oddsData.date);

    const matchData = await retrieveMatchData(teamId, leagueId, year, date);

    const combinedData = {
      // Root-level properties
      day: oddsData.day,
      date: date,
      time: oddsData.time,
      homeTeam: oddsData.homeTeam,
      awayTeam: oddsData.awayTeam,
      score: oddsData.score,
      league: leagueName,
      season: `${year}-${Number(year) + 1}`,
      // Odds data
      odds: oddsData.odds,
      // Additional data
      lineup: matchData.lineupData,
      injuries: matchData.injuriesData,
      statistics: matchData.statisticsData,
      events: matchData.eventsData,
      players: matchData.playersData,
    };

    // Send data to Elasticsearch
    await sendDataToElasticsearch(combinedData);

    await browser.close();
  } catch (error) {
    console.error(`Error retrieving data for match: ${matchUrl}`, error);
  }
}
