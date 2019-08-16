import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown } from 'react-bootstrap';
import { fetchPackages, updateSearch } from '../../actions';
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

  state = {
    filterChoice : '',
    filterName : ''
  }
  componentDidMount() {
    
    this.props.fetchPackages();
  }

  async componentDidUpdate(prevProps, prevState) {
    let prevChoice = await prevState.filterChoice
    let currChoice = await this.state.filterChoice
    if (prevChoice !== currChoice) {

    }
  }

  handleClick(){
    this.props.history.push(`/admin/createpackage`)
  }

  wrapPackages(packagesArray){
    return (
      
      <div className='row mx-0 pt-3 pb-3' style={{backgroundColor:'#9EAEB8', height: '100%', minHeight: '100vh'}}>
        <div className='mx-3 px-3' style={{backgroundColor:'#FFFFFF'}}>
       

          <div className ='d-flex justify-content-between flex-row bd-highlight mb-3 mt-3'>

            <h3>Packages</h3>
            <Button className='create-package' style={{backgroundColor: '#679AB8', borderColor: '#679AB8'}}
              onClick={e=> this.props.history.push('/admin/createpackage')}>New Package</Button>
          </div>

          <div className ='d-flex justify-content-between flex-row bd-highlight mb-3 mt-3'>
            {/* Currently to get the search to work properly after you filter you need to start typing in the search bar*/}
          <Dropdown
            onSelect={(ekey, e)=> this.props.updateSearch(true)}>
              <span>Filter by Status: </span>
              <Dropdown.Toggle 
                variant="primary" 
                id="dropdown-basic" 
                style={{backgroundColor: '#679AB8', borderColor: '#679AB8'}}
                >
                 {this.state.filterName || 'filters'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                
                <Dropdown.Item
                  onClick={e=> this.setState({filterChoice: 'true', filterName: 'Viewed'})}
                >Viewed</Dropdown.Item>
                <Dropdown.Item
                  onClick={e=> this.setState({filterChoice: 'false', filterName: 'Unopened'})}
                >Unopened</Dropdown.Item>
                <Dropdown.Item
                  onClick={e=> this.setState({filterChoice: null, filterName: 'All'})}
                >All</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>   
            <SearchBar searchType='packages' dropdownFilter={this.state.filterChoice} placeHolder='search'/>
          </div>

          <table className='shadow p-3 mb-5 bg-white rounded'style={{tableLayout: 'fixed'}}className='table table-hover'>
            <tbody>
              <tr style={{backgroundColor:'#679AB8', color: '#ffffff'}}>
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
    updateSearchFlag: state.updateSearchFlag
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPackages, updateSearch }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PackageList);