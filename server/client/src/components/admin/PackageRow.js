import React, {Component} from 'react';
import { Link } from 'react-router-dom';
//each contact is own component when rendered into contact list to eventually make deletion and editing easier with key but I probably won't make it to the extensions :)
class PackageRow extends Component {
  formatDate = (date) => {
    let newDate = new Date(date);
     return newDate.toLocaleDateString();
     
  }
  render(){
    const { currentPackage } = this.props;
    console.log(currentPackage)
    return(
      <tr style={{backgroundColor: this.props.backgroundColor}}>
        <td>{currentPackage.packageName}</td>
        <td>{currentPackage.employerName}</td>
        <td style={{ textAlign: 'left' }}>{currentPackage.seenByEmployer ? 'Viewed' : 'Unopened'}</td>
        <td>{this.formatDate(currentPackage.created_at)}</td>
      
        <td>
          <Link to={`/admin/package/${currentPackage._id}`}><span className='badge badge-secondary mr-1' style={{backgroundColor: '#679AB8'}}>View</span></Link>
          <Link to={`/admin/editpackage/${currentPackage._id}`}><span className='badge badge-secondary mr-1' style={{backgroundColor: '#679AB8'}}>Edit</span></Link>
          <Link to={`/employer/${currentPackage._id}?admin=true`}><span className='badge badge-secondary mr-1' style={{backgroundColor: '#679AB8'}}>Employer View</span></Link>

        </td>
       
      </tr>
    )
  }
}


export default PackageRow