import React, {Component} from 'react';
import {connect} from 'react-redux';

//each contact is own component when rendered into contact list to eventually make deletion and editing easier with key but I probably won't make it to the extensions :)
class StudentRow extends Component {
   
        handleClick = () =>{
         
          // this.props.history.push(`/${student.id}`)
        }

        render(){
          const { student } = this.props;
          return(
         <tr onClick={this.handleClick()}>
          <td><input type='radio' value='addToPackage' /></td>
          <td>{student.firstName}</td>
          <td>{student.lastName}</td>
          <td>{student.cohort}</td>
          <td>{student.jobSeekingStatus}</td>
        
        </tr>
          )
        }
}


export default StudentRow