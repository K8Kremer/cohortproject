import React, {Component} from 'react';
import { Link } from 'react-router-dom';
//each contact is own component when rendered into contact list to eventually make deletion and editing easier with key but I probably won't make it to the extensions :)
class PackageRow extends Component {
  render(){
    const { currentPackage } = this.props;
    return(
      <tr>
        <td>{currentPackage.packageName}</td>
        <td>{currentPackage.companyName}</td>
        <td style={{ textAlign: 'left' }}>{currentPackage.seenByEmployer ? 'Viewed' : 'Unopened'}</td>
        <td>{currentPackage.created_at}</td>
      
        <Link to={`/admin/package/${currentPackage._id}`}> <td><span className='badge badge-secondary'>View</span></td></Link>
       <Link to={`/admin/editpackage/${currentPackage._id}`}> <td><span className='badge badge-secondary'>Edit</span></td></Link> 
      </tr>
    )
  }
}


export default PackageRow