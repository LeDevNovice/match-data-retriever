import scrollToBottom from '../common/scrollToBottom';
import launchBrowser from '../config/puppeteerConfig';
import retrieveMatchOdds from './retrieveMatchOdds/retrieveMatchOdds';

export default async function retrieveMatchOddsAndData(matchUrl: string): Promise<void> {
  try {
    const browser = await launchBrowser();
    const page = await browser.newPage();
    await page.goto(matchUrl);

    await scrollToBottom(page);

    // Scrape the odds match
    const oddsData = await retrieveMatchOdds(page, matchUrl);

    if (!oddsData) {
      throw new Error('Failed to scrape match odds data.');
    }

    const year = extractYearFromUrl(matchUrl) || new Date().getFullYear().toString();
    const leagueName = oddsData.league || extractLeagueFromUrl(matchUrl);
    const leagueId = leagueIdMap[leagueName.toLowerCase()];
    const teamId = teamIdMap[oddsData.homeTeam.toLowerCase()];
    const date = convertDateFormat(oddsData.date);

    // Fetch data from APIs
    const matchId = await fetchMatchId(teamId, Number(leagueId), Number(year), date); // Extract match ID

    // Fetch other data in parallel
    const [lineupData, injuriesData, statisticsData, eventsData, playersData] = await Promise.all([
      fetchLineupData(matchId),
      fetchInjuriesData(matchId),
      fetchStatisticsData(matchId),
      fetchEventsData(matchId),
      fetchPlayersData(matchId),
    ]);

    // Assemble all data
    const combinedData = {
      // Root-level properties
      day: oddsData.day,
      date: date, // Use converted date format
      time: oddsData.time,
      homeTeam: oddsData.homeTeam,
      awayTeam: oddsData.awayTeam,
      score: oddsData.score,
      league: leagueName,
      round: oddsData.round,
      season: `${year}-${Number(year) + 1}`,
      // Odds data
      odds: oddsData.odds,
      // Additional data
      lineup: lineupData,
      injuries: injuriesData,
      statistics: statisticsData,
      events: eventsData,
      players: playersData,
    };

    console.log(JSON.stringify(combinedData, null, 2));

    // Save data to JSON
    await saveDataToJSON(combinedData);

    // Send data to Elasticsearch
    await sendDataToElasticsearch(combinedData);

    await browser.close();
  } catch (error) {
    console.error(`Error retrieving data for match: ${matchUrl}`, error);
  }
}
