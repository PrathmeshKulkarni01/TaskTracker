import PropTypes from "prop-types"

const Button = ({text, color, onClick}) => {
  return (
    <button 
    onClick={onClick}
    style = {{color}} 
    className='btn'>
        {text}</button>
  )
}

Button.propTypes = {
    text: PropTypes.string,
    color:PropTypes.string,
    onCLick:PropTypes.func,
}
export default Button