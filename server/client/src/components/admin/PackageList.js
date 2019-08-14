import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchPackages } from '../../actions';
import { bindActionCreators } from 'redux';
import PackageRow from './PackageRow';

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
      <>
      <div className='row'>
      <div className='col-2'style={{backgroundColor:'#9EAEB8'}}>

      </div>
      <div className='col-8'>
      <table className='shadow p-3 mb-5 bg-white rounded'style={{tableLayout: 'fixed'}}className='table table-hover'>
        <tr style={{backgroundColor:'#679AB8'}}>
          <th style={{width:'20%'}}>Package</th>
          <th style={{width:'20%'}}>Recipient</th>
          <th style={{width:'10%'}}>Status</th>
          <th style={{width:'20%'}}>Date Created</th>
          <th style={{textAlign: 'center', width:'10%'}}></th>
          <th style={{textAlign: 'center', width:'10%'}}></th>
        </tr>
        <tbody style={{backgroundColor: 'white'}}>
      {packagesArray.map((currentPackage) => {
        return (
            <PackageRow key={currentPackage._id} currentPackage={currentPackage}/>
        )
      })}
          </tbody>
      </table>
      </div>
      <div className='col-2'style={{backgroundColor:'#9EAEB8'}}> </div>
      
      </div>
      </>
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