import React, { useReducer } from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(theme => ({
	default: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		margin: 0,
		padding: 20,
		height: 20,
		width: 60
	},
	primary: {},
	secondary: {},
	tertiary: {},
	hover: {},
	focus: {},
	button: ({ type, state }) => ({
		extend: [
			'default',
			type,
			state.isHovered && 'hover',
			state.isFocussed && 'focus'
		]
	})
}))

const Button = ({
	type = 'primary',
	onClick,
	onFocus,
	onHover,
	renderLeading,
	renderTrailing,
	children,
	...props
}) => {
	const [state, dispatch] = useReducer(
		(state, action) => {
			switch (action.type) {
				case 'FOCUS':
					return {
						...state,
						isFocussed: true
					}

				case 'HOVER':
					return {
						...state,
						isHovered: true
					}

				default:
					return state
			}
		},
		{
			isFocussed: false,
			isHovered: false
		}
	)

	const styles = useStyles({ type, state })

	return (
		<button
			type="button"
			className={styles.button}
			onClick={onClick}
			onFocus={() => {
				dispatch({ type: 'FOCUS' })
				onFocus()
			}}
			onMouseOver={() => {
				dispatch({ type: 'HOVER' })
				onHover()
			}}
			{...props}>
			<span>{renderLeading}</span>
			{children}
			<span>{renderTrailing}</span>
		</button>
	)
}

export default Button
