import React, {Component} from 'react';
import { Link } from 'react-router-dom';
//each contact is own component when rendered into contact list to eventually make deletion and editing easier with key but I probably won't make it to the extensions :)
class StudentRow extends Component {
  render(){
    const { student } = this.props;
    return(
      <tr>
        <td style={{textAlign: 'center'}}><input 
          type='checkbox' 
          value='addToPackage' 
          onClick={ e=> e.target.checked ? this.props.handleStudentClick(student, true) : this.props.handleStudentClick(student, false) }/></td>
        <td>{student.firstName}</td>
        <td>{student.lastName}</td>
        <td style={{textAlign: 'left'}}>{student.cohort}</td>
        <td>{student.jobSeekingStatus}</td>
      
        <Link to={`/admin/student/${student._id}`}> <td><span className='badge badge-secondary'>View</span></td></Link>
        <Link to={`/admin/editstudent/${student._id}`}> <td><span className='badge badge-secondary'>Edit</span></td></Link>
      </tr>
    )
  }
}


export default StudentRow