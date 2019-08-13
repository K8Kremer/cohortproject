import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchPackages } from '../../actions';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router-dom';

class PackageList extends Component {

  constructor(props){
    super(props);
    this.wrapPackages = this.wrapPackages.bind(this);
  }
  componentDidMount() {
    
    this.props.fetchPackages();
  }

  wrapPackages(packagesArray){
    // console.log(packagesArray);
    return (
      packagesArray.map(currentPackage => {
        return (
          <li>
            <Link to={`/admin/package/${currentPackage._id}`}> {currentPackage.packageName}</Link> 
          </li>
        )
      })
    );
  }

  render(){
    if(this.props.packages.length === 0){
      return(
        <div>
          No Packages here just yet! Please make one from our friendly action bar above.
        </div>
      )
    }

    return (
      <div>
        <ul>
          {this.wrapPackages(this.props.packages)}
        </ul>
      </div>
    )
  }
};


function mapStateToProps(state) {
  return {
    packages: state.packages,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPackages }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PackageList);