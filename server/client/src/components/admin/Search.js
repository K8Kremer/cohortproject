import React from 'react'
import { fetchStudents } from '../../actions';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class SearchBar extends React.Component {
  constructor() {
    super()

    this.state = {
        fullName: ''
    }

    this.sendSearch = this.sendSearch.bind(this)
  }
  

  sendSearch(e) {
    this.setState({fullName: e.target.value}, () => {
      this.props.fetchStudents(1, this.state.fullName)
    });
  }

  render () {
    return (
      <div>
        <input placeholder='Search' onChange={this.sendSearch}></input>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fetchStudents }, dispatch)
}

export default connect ( null, mapDispatchToProps)( SearchBar);