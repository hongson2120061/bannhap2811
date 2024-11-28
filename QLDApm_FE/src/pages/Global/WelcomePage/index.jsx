import './WelcomePage.scss'
import React from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from './rdWelcomePage'

function WelcomePage(props) {
  return <div className="WelcomePage container"></div>
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage)
