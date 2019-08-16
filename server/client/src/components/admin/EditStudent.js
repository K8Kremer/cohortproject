import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { editStudent,fetchStudent} from '../../actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';



/******************
 * TODO: If time permits: Figure a way out to populate the redux form Field tags
 * with the correct values from the database.
 */

class EditStudent extends Component {
	
	state = {
		redirectToNewPage: false,
		picture: '',
		resume: ''
	}

	constructor() {
		super();
		this.showImageUploadWidget = this.showImageUploadWidget.bind(this);

	}

  componentDidMount() {
		this.props.fetchStudent(this.props.match.params.studentId);
		this.setState({ picture: '', resume: '', redirectToNewPage: false });
  }
  
  /**TODO: Make the save button update the store */
	onSubmit = formProps => {
		if (this.state.picture !== '') {
			formProps.picture = this.state.picture
		}

		if (this.state.resume !== '') {
			formProps.resume = this.state.resume
		}

		this.props.editStudent(this.props.match.params.studentId, formProps);
		window.alert(`Student ${this.props.initialValues.firstName} updated successfully!`);
		this.props.history.push(`/admin/student/${this.props.match.params.studentId}`);
	};
	
	showImageUploadWidget = (imageUploadWidget) => {
		imageUploadWidget.open()
	}

	checkUploadResult = (resultEvent, uploadType) => {
		if (resultEvent.event === 'success') {

			//we'll need to update our Student object with the URL generated by cloudinary
			if (uploadType === 'image') {
				this.setState({ picture: resultEvent.info.secure_url }, () => {
					console.log('image uploaded successfully!')
				})
			}

			if (uploadType === 'document') {
				this.setState({ resume: resultEvent.info.secure_url }, () => {
					console.log('resume uploaded successfully!')
				})
			}
		}
  }
  
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
  
  renderSelectField({ input, label, type, meta: { touched, error }, children }) {
		return (
		<div>
		  <label>{label}</label>
		  <div>
			<select {...input}>
			  {children}
			</select>
			{touched && error && <div className="text-danger">{error}</div>}
		  </div>
		</div>
		)
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
		const { handleSubmit } = this.props;
		let imageUploadWidget = window.cloudinary.createUploadWidget({
			//we set our cloudName globally within our public/index.html
			// cloudName: '',
			uploadPreset: 'u56bjavm'
		}, (error, result) => { this.checkUploadResult(result, 'image') });

		let resumeUploadWidget = window.cloudinary.createUploadWidget({
			//we set our cloudName globally within our public/index.html
			// cloudName: '',
			uploadPreset: 'u56bjavm'
		}, (error, result) => { this.checkUploadResult(result, 'document') });

		return (
			<div className='row mx-0 pt-3 pb-3' style={{backgroundColor:'#9EAEB8', height: '100%', minHeight: '100vh'}}>
       	<div className='mx-3 px-3 pt-3' style={{backgroundColor:'#FFFFFF', width: '100%'}}>
          <h3 className="mb-4" style={{color: '#3C5A6B'}}>Edit Student</h3>
				  <form onSubmit={handleSubmit(this.onSubmit.bind(this))} initialValues>
					  <fieldset>
						  <label>First Name: </label>
              <Field 
                name="firstName"
                type="text"
                component={this.renderField}
                autoComplete="none"
              />
					  </fieldset>
            <fieldset>
              <label>Last Name: </label>
              <Field 
                name="lastName"
                type="text"
                component={this.renderField}
                autoComplete="none"
              />
            </fieldset>
            <fieldset>
              <label>Address: </label>
              <Field 
                name="address"
                type="text"
                component={this.renderField}
                autoComplete="none"
              />
            </fieldset>
            <fieldset>
              <label>Phone Number: </label>
              <Field 
                name="phone"
                type="tel"
                component={this.renderField}
                autoComplete="none"
              />
            </fieldset>
            <fieldset>
              <label>Email: </label>
              <Field
              name="email"
              type="email"
              component={this.renderField}
              autoComplete="none"
              />
            </fieldset>
            <fieldset>
              <label>Link To Project Repos: </label>
              <Field 
                name="projectRepoLink"
                type="url"
                component={this.renderField}
                autoComplete="none"
              />
            </fieldset>
            <fieldset>
              <label>Job Seeking Status: currently {this.props.initialValues.jobSeekingStatus}</label>
              <Field name="jobSeekingStatus" component={this.renderSelectField}>
                <option />
                <option value = "employed">Employed</option>
                <option value = "seeking-employment">Seeking Employment</option>
                <option value = "open">Open</option>
              </Field>
            </fieldset>
            <fieldset>
              <label>Graduation Date: </label>
              <Field 
                name="graduationDate"
                type="date"
                component={this.renderField}
                autoComplete="none"
              />
            </fieldset>
            <fieldset>
              <label>Work Desired: currently {this.props.initialValues.typeOfWorkDesired} </label>
              <Field name="typeOfWorkDesired" component={this.renderSelectField}>
                <option />
                <option value = "front-end">Front End</option>
                <option value = "back-end">Back End</option>
                <option value = "full-stack">Full Stack</option>
              </Field>
            </fieldset>
            <fieldset>
              <label>Employment Location Preference: currently {this.props.initialValues.employmentLocationPreference}</label>
              <Field name="employmentLocationPreference" component={this.renderSelectField}>
                <option />
                <option value = "local">Local Work Only</option>
                <option value = "remote">Remote Work Only</option>
                <option value = "relocation">Willing to Relocate</option>
              </Field>
            </fieldset>
            <fieldset className='mb-4 mt-4'>
            <label className='mr-3'>Profile Photo: </label>
              {this.state.picture === '' ?
                <button
                  className='btn btn-sm btn-secondary'
                  style={{backgroundColor: '#679AB8'}}
                  onClick={e => {
                    e.preventDefault();
                    this.showImageUploadWidget(imageUploadWidget);
                  }}
                >
                  Upload Photo
                </button> :
                <h6>Photo uploaded!</h6>
              }
            </fieldset>
            <fieldset className='mb-4'>
            <label className='mr-3'>Resume: </label>
              {this.state.resume === '' ?
                <button
                  className='btn btn-sm btn-secondary'
                  style={{backgroundColor: '#679AB8'}}
                  onClick={e => {
                    e.preventDefault();
                    this.showImageUploadWidget(resumeUploadWidget);
                  }}
                >
                  Upload Resume
                  </button> :
                <h6>Resume uploaded!</h6>
              }
            </fieldset>
            <fieldset className='mb-4'>
              <label>Industry Preferred: currently {this.props.initialValues.industriesPreferred} </label>
              <Field name="industriesPreferred" component={this.renderSelectField}>
                <option value = "finance">Finance</option>
                <option value = "healthcare">Healthcare</option>
                <option value = "gaming">Gaming</option>
                <option value = "ecommerce">E-commerce</option>
              </Field>
            </fieldset>
            <fieldset>
              <label>Bio: </label>
              <Field
              name="bio"
              type="text"
              component={this.renderTextArea}
              autoComplete="none"
              />
            </fieldset>
            <button className='mb-4 btn btn-sm btn-secondary'
              style={{backgroundColor: '#679AB8'}}
              type='submit'>Save</button>
				  </form>
				</div>
      </div>
		)
	}
}

function mapStateToProps(state) {
  return {initialValues: state.current_student}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ editStudent, fetchStudent }, dispatch);
}

const editStudentForm = reduxForm({
  form: 'editStudent',
  keepDirtyOnReinitialize: true,
  enableReinitialize: true
})(EditStudent);

export default connect(mapStateToProps, mapDispatchToProps)(editStudentForm);