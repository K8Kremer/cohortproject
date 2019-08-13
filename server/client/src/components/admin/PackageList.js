import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchPackages } from '../../actions';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router-dom';

class PackageList extends Component {

  componentDidMount = () => {
    super();
    this.props.fetchPackages();
    this.wrapPackages = this.wrapPackages.bind(this);
  }

  wrapPackages = (packagesObject) => {
    return packagesObject.map(package => {
      return (
        <li>
          <Link to='/packages/{package._id}'> {package.packageName}</Link> 
        </li>
      )
    })
  }

  render(){
    if(packages == {}){
      return(
        <div>
          No Packages here just yet! Please make one from our friendly action bar above.
        </div>
      )
    }

    return (
      <div>
        <ul>
          {this.wrapPackages(packages)}
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