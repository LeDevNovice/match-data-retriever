# Match Data Retriever
*This repository is a Node.js-based application that scrapes football match data, including match odds and statistics, and stores the data in Elasticsearch for analysis. The primary goal of this project is to automate the collection of match information for betting or sports analysis purposes.*

## Features
- Scrape football matches.
- Retrieve match odds, lineups, injuries, statistics, events, and players' data
- Store collected data in Elasticsearch for easy searching and analysis

## Technologies Used

- Node.js: Backend runtime for server-side logic
- Puppeteer: Headless browser automation for web scraping
- Elasticsearch: Data storage and searching
- API-SPORTS: Provides additional match data (lineups, injuries, statistics)
- TypeScript: Used to add strong typing to JavaScript

## Installation
### Prerequisites
- Node.js (>=22.3)
- pnpm (>=9.4)
- Elasticsearch (>=8.9)
- API-SPORTS account with valid API keys

### Steps to Install
- Clone the repository:
- Install the dependencies:
- Configure environment variables by creating a .env file in the root directory
- Ensure Elasticsearch is running on your local machine or accessible at the specified URL in the .env file.

## Contributing
Feel free to submit a pull request or create an issue for any bugs or feature requests.

## Future Improvements
- Add support for more leagues and competitions.


