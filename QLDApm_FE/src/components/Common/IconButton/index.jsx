import './IconButton.scss'

const IconButton = ({ children, onClick, className }) => {
  return (
    <div className={`icon-button ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}
export default IconButton
