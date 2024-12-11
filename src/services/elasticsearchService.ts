import { Client } from '@elastic/elasticsearch';

const ELASTICSEARCH_NODE = process.env.ELASTICSEARCH_NODE || 'http://localhost:9200';

const client = new Client({
  node: ELASTICSEARCH_NODE,
});

/**
 * Sends data to Elasticsearch.
 */
export async function sendDataToElasticsearch(data: any): Promise<void> {
  try {
    const response = await client.index({
      index: 'fixtures-4',
      document: data,
    });

    console.log(`Data sent to Elasticsearch:`, response);
  } catch (error) {
    console.error(`Error sending data to Elasticsearch:`, error);
  }
}
