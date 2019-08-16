import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { fetchPackages } from '../../actions';
import { bindActionCreators } from 'redux';
import PackageRow from './PackageRow';
import SearchBar from './Search'
import './FormStyle.css';

class PackageList extends Component {

  constructor(props){
    super(props);
    this.wrapPackages = this.wrapPackages.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    
    this.props.fetchPackages();
  }

  handleClick(){
    this.props.history.push(`/admin/createpackage`)
  }

  wrapPackages(packagesArray){
    // console.log(packagesArray);
    
    return (
      
      <div className='row mx-0 pt-3 pb-3' style={{backgroundColor:'#9EAEB8', height: '100%', minHeight: '100vh'}}>
        <div className='mx-3 px-3' style={{backgroundColor:'#FFFFFF'}}>
       
        <div className ='d-flex justify-content-between flex-row bd-highlight mb-3 mt-3'>
            <h3>Packages</h3>
            <Button className='create-package' style={{backgroundColor: '#679AB8', borderColor: '#679AB8'}}
              onClick={e=> this.props.history.push('/admin/createpackage')}>New Package</Button>
          </div>

     <table className='shadow p-3 mb-5 bg-white rounded'style={{tableLayout: 'fixed'}}className='table table-hover'>
       <tbody>
        <tr style={{backgroundColor:'#9EAEB8'}}>
          <th style={{width:'20%'}}><h1 className='styled-header'>Packages</h1></th>
          <th style={{width:'20%'}}></th>
          <th style={{ width: '20%' }}><SearchBar searchType='packages' dropdownFilter={}/></th>
          <th style={{width:'20%'}}>        </th>
          <th style={{width:'20%'}}><button className='btn btn-primary' id='createPackage' onClick={this.handleClick}>New Package</button></th>
          {/* <th style={{width:'10%'}}></th> */}
        </tr>
        <tr style={{backgroundColor:'#679AB8'}}>
          <th style={{width:'20%'}}>Package</th>
          <th style={{width:'20%'}}>Recipient</th>
          <th style={{width:'20%'}}>Status</th>
          <th style={{width:'20%'}}>Date Created</th>
          <th style={{ textAlign: 'center',width:'20%'}}></th>
          {/* <th style={{textAlign: 'center', width:'10%'}}></th> */}
         </tr>
         </tbody>
        <tbody style={{backgroundColor: 'white'}}>
      {packagesArray.map((currentPackage) => {
        return (
            <PackageRow key={currentPackage._id} currentPackage={currentPackage}/>
        )
      })}
          </tbody>
      </table>
      </div>
      </div>
    
    );
  }
    

  render(){
    
    return (
      <>
          {this.wrapPackages(this.props.packages)}
      </>
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