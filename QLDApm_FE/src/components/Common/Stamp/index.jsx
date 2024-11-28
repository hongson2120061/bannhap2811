import './Stamp.scss'

const Stamp = (props) => {
  return (
    <span className={`stamp ${props.type}`} style={{ fontSize: props.fontSize }}>
      {props.content}
    </span>
  )
}

export default Stamp
