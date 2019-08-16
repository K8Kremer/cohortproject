import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { editPackage, fetchPackage } from '../../actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import './FormStyle.css';

class EditPackage extends Component {
  state = {
    redirect: false
  }
  componentDidMount() {
    this.props.fetchPackage(this.props.packageId);
  }

  onSubmit = formProps => {
    //tried Error checking here, but it didn't like the initialValues property
    
    //grab our current values for student Objects array
    let updatedStudentsArray = this.props.packageStudents;
    //snag the keys for our notes within the formProps object
    let notesArray = Object.keys(formProps).filter(formPropKey => formPropKey.includes('studentNotes'));
    
    //iterate through our current Students array using lodash
    _.forEach(updatedStudentsArray,(studentObject) => {
      //we'll rely upon the student ID to get the specific key within our notes Array
      let myNoteKey = notesArray.filter(studentNotesKey => studentNotesKey.includes(studentObject.student._id));
      if(formProps[myNoteKey] !== undefined){
        studentObject.studentNotes = formProps[myNoteKey];
      }
      else if (studentObject.studentNotes === undefined)  {
        studentObject.studentNotes = '';
      }
      else if (studentObject.studentNotes === ' ') {
        studentObject.studentNotes = '';
      }

    });

    formProps.students = updatedStudentsArray;
    
    //remove our studentNotes-Id
    let cleanedFormProps = _.omit(formProps, notesArray )
    // if(this.props.valid){
    this.props.editPackage(this.props.packageId, cleanedFormProps);
    window.alert(`Package ${this.props.initialValues.packageName} updated successfully!`);
    this.props.history.push(`/admin/package/${this.props.packageId}`);
    // } else {
    //   window.alert(`Package ${this.props.initialValues.packageName} still has validation issues, please update and try again.`);
    // }
  };

  renderField( {input, label, type, meta: { touched, error, warning}}) {
		return (
		  <div className="mb-4" style={{width: 250}}>
        <div>
			    <input {...input} type={type} className='form-control' />
            {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
			  </div>
      </div>
		);
  }
  
  renderTextArea( {input, label, type, meta: { touched, error, warning}}) {
		return (
		  <div className="mb-4" style={{width:500}}>
        <div>
			<textarea rows='5' cols='20' {...input} type={type} className='form-control' />
      {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
			</div>
      </div>
		  
		);
	}

  render() {
    const { handleSubmit, packageStudents } = this.props;

    if (this.props.initialValues._id !== this.props.packageId){
      return(
        <div>
          One moment, loading your craft, small-batch Package...
        </div>
      )
    }

    return (
      <div className='row mx-0 pt-3 pb-3' style={{backgroundColor:'#9EAEB8', height: '100%', minHeight: '100vh'}}>
       	<div className='mx-3 px-3 pt-3' style={{backgroundColor:'#FFFFFF', width: '100%'}}>
          <h3 className="mb-4" style={{color: '#3C5A6B'}}>Edit Package</h3>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))} initialValues>
            

              <fieldset>
                <label>Package Name: </label>
                  <Field
                    name="packageName"
                    type="text"
                    component={this.renderField}
                    autoComplete="none"
                  />
              </fieldset>
              
            
              <fieldset>
                <label>Recipient Name: </label>
                  <Field
                    name="employerName"
                    type="text"
                    component={this.renderField}
                    autoComplete="none"
                  />
              </fieldset>


              <fieldset>
                <label>Recipient Email: </label>
                  <Field
                    name="employerEmail"
                    type="text"
                    component={this.renderField}
                    autoComplete="none"
                  />
              </fieldset>


              <fieldset>
                <label>Recipient Company: </label>
                  <Field
                    name="companyName"
                    type="text"
                    component={this.renderField}
                    autoComplete="none"
                  />
              </fieldset>

              <fieldset>
                <label>Project Shift Employee Name: </label>
                  <Field
                    name="replyName"
                    type="text"
                    component={this.renderField}
                    autoComplete="none"
                  />
              </fieldset>

              <fieldset>
                <label>Project Shift Email: </label>
                  <Field
                    name="replyEmail"
                    type="email"
                    component={this.renderField}
                    autoComplete="none"
                  />
              </fieldset>

              <fieldset>
                <label>Package Notes: </label>
                  <Field
                    name="packageNotes"
                    type="text"
                    component={this.renderTextArea}
                    autoComplete="none"
                  />
              </fieldset>

            <div className='form-group row'>
              <label className='col-sm-2 col-form-label'>Student Notes: </label>
              <div className='col-md-6'>
                {packageStudents.map(studentObject => {
                  return (
                      <fieldset>
                        <label>
                          {studentObject.student.firstName} {studentObject.student.lastName}
                        </label>
                        <Field
                          name={`studentNotes-${studentObject.student._id}`}
                          type="text"
                          component={this.renderTextArea}
                          placeholder={studentObject.studentNotes}
                          autoComplete="none"
                        />
                      </fieldset>
                  );
                })
                }
              </div>
            </div>
            <button type='submit' className='mb-4 btn btn-sm btn-secondary'
              style={{backgroundColor: '#679AB8'}}>Update</button>
          </form>
        </div>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};
  
  //check if name field is empty
  if (!values.packageName) {
    errors.packageName = 'Required'
  }

  //check if address field is entered
  if (!values.recipientName) {
    errors.recipientName = 'Required'
  }

  if (!values.company) {
    errors.company = 'Required'
  }

  if (!values.employeeName) {
    errors.employeeName = 'Required'
  }

  //check if the email field is empty
  if (!values.email) {
    errors.email = "Required"

    //check if the email is valid
  } else if (!values.email.includes("@") || !values.email.includes('.')) {
    errors.email = "Please enter a valid email"
  }



  return errors;
}

function mapStateToProps(state, ownProps) {
  return {
    packageId: ownProps.match.params.packageId,
    initialValues: state.current_package,
    packageStudents: state.current_package.students
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ editPackage, fetchPackage }, dispatch);
}

const editPackageForm = reduxForm({
  validate,
  form: 'editPackage',
  keepDirtyOnReinitialize: true,
  enableReinitialize: true
})(EditPackage);

export default connect(mapStateToProps, mapDispatchToProps)(editPackageForm);


