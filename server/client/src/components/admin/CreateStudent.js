import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { createStudent} from '../../actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'


class CreateStudent extends Component {
	state = {
		redirectToNewPage: false,
		picture: '',
		resume: ''
	}

	constructor(){
		super();
		this.showImageUploadWidget = this.showImageUploadWidget.bind(this);
		
	}

	componentDidMount(){
		this.setState({ picture: '', resume: '', redirectToNewPage: false });
	} 

	componentDidUpdate = (prevProps) => {
    /**
     * this.props.currentStudent is being changed to a boolean true when the form validation fails BUT WHY
     * this.props.valid returns true when form validation is successful
     */
		if (this.props.currentStudent.firstName !== prevProps.currentStudent.firstName && this.props.valid == true) {
			this.setState({ picture: '', resume: '', redirectToNewPage: true }, () => {
				window.alert(`Student ${this.props.currentStudent.firstName} created successfully!`)
			});
		}
	}

	onSubmit = formProps => {
		
		if(this.state.picture !== ''){
			formProps.picture = this.state.picture
		}

		if (this.state.resume !== '') {
			formProps.resume = this.state.resume
		}

		// console.log(formProps);
		this.props.createStudent(formProps);

	};

	dismissModal = () => {
    this.props.toggle()
	}
	
	showImageUploadWidget = (imageUploadWidget) => {
		imageUploadWidget.open()
	}

	checkUploadResult = (resultEvent, uploadType) => {
		if (resultEvent.event === 'success') {

			//we'll need to update our Student object with the URL generated by cloudinary
			if(uploadType === 'image'){
				this.setState({ picture: resultEvent.info.secure_url}, () => {
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
		
		// const className = `form-group ${touched && error ? 'has-danger' : ''}`;
	
		return (
		  <div className="mb-4" style={{width: 250}}>
        <div>
			<input {...input} type={type} className='form-control' />
      {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
			</div>
      </div>
		  
		);
	}

	renderUploadField(field) {
		const { meta: { touched, error } } = field;
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;

		return (
			<div className={className}>
				<label>{field.label}</label>
				<button
					className='btn btn-sm btn-secondary'
					onClick={this.showImageUploadWidget}
				>
					Upload Photo
								</button>
				<div className='text-help errors text-danger'>
					{touched ? error : ''}
				</div>
			</div>
		);
	}

	renderSelectField({ input, label, type, meta: { touched, error }, children }) {
		return (
		<div className="mb-4">
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
		
		// const className = `form-group ${touched && error ? 'has-danger' : ''}`;
	
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

		if (this.state.redirectToNewPage) {
			return (
			<Redirect to={`/admin/student/${this.props.currentStudent._id}`}/>
			)
		}
		
		return (
			<div className='row mx-0 pt-3 pb-3' style={{backgroundColor:'#9EAEB8', height: '100%', minHeight: '100vh'}}>
       	 		<div className='mx-3 px-3 pt-3' style={{backgroundColor:'#FFFFFF', width: '100%'}}>
              <h3 className="mb-4" style={{color: '#3C5A6B'}}>Create Student</h3>
					<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					
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
								component= {this.renderField}
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
							<label>Cohort Number: </label>
							<Field 
								name="cohort"
								type="number"
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
							<label>LinkedIn Profile: </label>
							<Field 
								name="linkedIn"
								type="url"
								component={this.renderField}
								autoComplete="none"
							/>
						</fieldset>
						<fieldset>
							<label>Job Seeking Status: </label>
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
							<label>Work Desired: </label>
							<Field name="typeOfWorkDesired" component={this.renderSelectField}>
								<option />
								<option value = "front-end">Front End</option>
								<option value = "back-end">Back End</option>
								<option value = "full-stack">Full Stack</option>
							</Field>
						</fieldset>
						<fieldset>
							<label>Employment Location Preference: </label>
							<Field name="employmentLocationPreference" component={this.renderSelectField}>
								<option />
								<option value = "local">Local Work Only</option>
								<option value = "remote">Remote Work Only</option>
								<option value = "relocation">Willing to Relocate</option>
							</Field>
						</fieldset>
						<fieldset className="mb-4">
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
						<fieldset className="mb-4">
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
						<fieldset className="mb-4">
							<label>Industry Preferred: </label>
							<Field name="industriesPreferred" component="select">
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
					
					<button className='btn btn-sm btn-secondary mb-4'
          style={{backgroundColor: '#679AB8'}} type='submit'>Save</button>
					</form>
					</div>
					</div>
					
		)
	}
}

function validate (values) {
  const errors = {};


	//check if name field is empty
	if ( !values.firstName ) {
		errors.firstName = 'Required'
  } 
  
  if (!values.lastName) {
		errors.lastName = 'Required'
	}
	
	//check if address field is entered
	if ( !values.address ) {
		errors.address = 'Required'
  }
  
  if (!values.cohort) {
		errors.cohort = 'Required'
	}

	//check that the phoneNumber field is not empty
	if ( !values.phoneNumber ) {
		errors.phoneNumber = 'Required'
	} else {
		let testPhoneNumber = values.phoneNumber.replace(/-/g,'');
		
		//check if the phoneNumber value entered is a number
		if (!Number(testPhoneNumber)) {
			errors.phoneNumber = "Enter a number"
		
		//check if the phoneNumber value contains 10 digits
		} else if ( testPhoneNumber.length < 10 ) {
			errors.phoneNumber = "Phone Number must be 10 digits"
		}
	} 

	//check if the email field is empty
	if ( !values.email ) {
		errors.email = "Required"

		//check if the email is valid
	}  else if ( !values.email.includes("@") || !values.email.includes('.') ) {
		errors.email = "Please enter a valid email"
	}

	//check if the graduation date is empty
	if ( !values.graduationDate ) {
		errors.graduationDate = "Required"
	}

	//check if work desired is empty
	if ( !values.typeOfWorkDesired ) {
		errors.typeOfWorkDesired = "Required"
	}

	//check if employment location preference is empty
	if ( !values.employmentLocationPreference ) {
		errors.employmentLocationPreference = "Required"
	}

	//check if job seeking status is empty
	if ( !values.jobSeekingStatus ) {
		errors.jobSeekingStatus = "Required"
	}

	//check if the upload photo is empty (CURRENTLY NOT REQUIRED)
	// if ( !values.uplodatPhoto ) {
	// 	errors.uploadPhoto = "Required"
	// }

	//check if the upload Resume is empty
	if ( !values.uploadResume ) {
		errors.uploadResume = "Required"
	}

	//check if the bio is empty
	if ( !values.bio ) {
		errors.bio = "Required"
	}

	return  errors;
}

function mapStateToProps(state) {
	return {
		currentStudent : state.current_student
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ createStudent }, dispatch);
}

const createStudentForm = reduxForm({
  form: 'createStudent',
	validate,
})(CreateStudent);

export default connect(mapStateToProps, mapDispatchToProps)(createStudentForm);


