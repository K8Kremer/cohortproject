import React from 'react'
import { fetchStudents, fetchPackages, updateSearch } from '../../actions';
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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.updateSearchFlag == true) {
      if(this.props.searchType === 'students'){
        this.props.fetchStudents(1, this.state.searchTerm)
      } else if (this.props.searchType === 'packages'){
        this.props.fetchPackages(this.state.searchTerm, this.props.dropdownFilter)
      }
    }
  }
  
  //we'll need to include our dropdownFilter prop as part of this execution
  sendSearch(e) {
    this.setState({searchTerm: e.target.value}, () => {
      if(this.props.searchType === 'students'){
        this.props.fetchStudents(1, this.state.searchTerm)
      } else if (this.props.searchType === 'packages'){
        this.props.fetchPackages(this.state.searchTerm, this.props.dropdownFilter)
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
function mapStateToProps(state) {
  return {
    updateSearchFlag: state.updateSearchFlag
  }
}
function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fetchStudents, fetchPackages, updateSearch }, dispatch)
}

export default connect ( mapStateToProps, mapDispatchToProps)( SearchBar);