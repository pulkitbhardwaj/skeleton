import React from 'react'
import { createUseStyles } from 'react-jss'
import graphql from 'babel-plugin-relay/macro'
import { QueryRenderer } from 'react-relay'
import environment from './environment'

/**
 * Query for the QueryRenderer
 *
 * (relay-compiler enforces the query to be named as <FileName>Query)
 *
 */
const query = graphql`
	query AppQuery {
		posts {
			id
			title
			content
		}
	}
`

const useStyles = createUseStyles({
	'@global': {
		'*': {
			margin: 0
		},
		body: {
			fontFamily:
				'-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
			'-webkit-font-smoothing': 'antialiased',
			'-moz-osx-font-smoothing': 'grayscale'
		},
		code: {
			fontFamily:
				'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace'
		}
	},
	app: {
		height: '100vh',
		width: '100%'
	}
})

const App = () => {
	const styles = useStyles()
	return (
		<div className={styles.app}>
			<h1>Hello</h1>
			<QueryRenderer
				environment={environment}
				query={query}
				variables={{}}
				render={({ error, props }) => {
					if (error) {
						return <div>Error!</div>
					}
					if (!props) {
						return <div>Loading...</div>
					}
					return (
						<div>
							{props.posts.map(post => (
								<div>
									<h6>id: {post.id}</h6>
									<h1>title: {post.title}</h1>
									<p>content: {post.content}</p>
								</div>
							))}
						</div>
					)
				}}
			/>
		</div>
	)
}

export default App
