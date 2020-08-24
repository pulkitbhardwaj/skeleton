import { Environment, Network, RecordSource, Store } from 'relay-runtime'

const __GRAPHQL_API__ =
	'https://us-central1-blog-dc4ad.cloudfunctions.net/graphQL'

/**
 *
 *
 **************************Implement your own data caching*****************************
 *
 * 																(In-memory Cache)
 * const oneMinute = 60 * 1000;
 * const cache = new QueryResponseCache({ size: 250, ttl: oneMinute });
 *
 *
 */

/**
 * Create Data Store
 */
const store = new Store(new RecordSource())

/**
 * Create Network Layer
 */
const network = Network.create((operation, variables, cacheConfig) =>
	fetch(__GRAPHQL_API__, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			query: operation.text,
			variables
		})
	}).then(response => {
		return response.json()
	})
)

/**
 * Create Relay Environment
 */
export default new Environment({
	network,
	store
})
