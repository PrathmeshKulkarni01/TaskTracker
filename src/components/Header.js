import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'
//props will act as an object that will contain all the properties that we pass to the component
//we can use the name 'title' with curly braces that won't need to use props.title
const Header = ({title, onAdd, showAdd}) => {
    const location = useLocation();
    return (
    <header className='header'>
        <h1>{title}</h1>
        {location.pathname === '/' && (<Button color = {showAdd ? 'tomato': 'orange'} 
            text = {showAdd ?'Close': 'Add-Task'} 
            onClick = {onAdd}
        />)}
    </header>
  )
}

Header.defaultProps = {
    title: 'Task Tracker',
}
Header.prototype = {
    title:PropTypes.string.isRequired,
}

// const headingStyle = {
//     color: 'orange',
//     backgroundColor: 'Black',
// }
//<h1 style = {headingStyle}>{title}</h1>

//Header.propTypes can be use to determine the type of the props
//To use this we have to import PropTypes from 'prop-types'
export default Header