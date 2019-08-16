import React from 'react'
import { fetchStudents, fetchPackages } from '../../actions';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        searchTerm: ''
    }

    this.sendSearch = this.sendSearch.bind(this)
  }
  

  sendSearch(e) {
    this.setState({searchTerm: e.target.value}, () => {
      if(this.props.searchType === 'students'){
        this.props.fetchStudents(1, this.state.searchTerm)
      } else if (this.props.searchType === 'packages'){
        this.props.fetchPackages(this.state.searchTerm)
      }
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
  return bindActionCreators({ fetchStudents, fetchPackages }, dispatch)
}

export default connect ( null, mapDispatchToProps)( SearchBar);