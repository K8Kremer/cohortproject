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
		// this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount(){
		this.setState({ picture: '', resume: '', redirectToNewPage: false });
		console.log(this.state);
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

			//we'll need to update our form with the URL generate by cloudinary, actually
			// console.log(resultEvent);
			// console.log(resultEvent.info.secure_url);
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

			// this.props.postPhoto({
			// 	user_id: this.props.currentUser.id,
			// 	caption: 'smiling face',
			// 	url: resultEvent.info.secure_url
			// })
		}
	}

	renderField(field) {
		const { meta: { touched, error } } = field;
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;
	
		return (
		  <div className={className}>
			<label>{field.label}</label>
			<input className='form-control' type='text' {...field.input} />
			<div className='text-help errors text-danger'>
			  {touched ? error : ''}
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
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				
					<fieldset>
						<label>First Name: </label>
						<Field 
							name="firstName"
							type="text"
							component="input"
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
							component="input"
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
							<option value = "actively-seeking-employment">Seeking Employment</option>
							<option value = "not-seeking-employment">Not Actively Seeking Employment</option>
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
					<fieldset>
						<label>Profile Photo: </label>
						{this.state.picture === '' ?
						<button
							className='btn btn-sm btn-secondary'
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
					<fieldset>
						<label>Resume: </label>
						{this.state.resume === '' ?
							<button
								className='btn btn-sm btn-secondary'
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
					<fieldset>
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
						component={this.renderField}
						autoComplete="none"
						/>
					</fieldset>
				<button type='submit'
				// onClick={e => {
				// 	// e.preventDefault();
				// 	console.log('fired click!');
					
				// 	handleSubmit(this.onSubmit);
				// }}
				>Save</button>
				</form>
		)
	}
}

function validate (values) {
	const errors = {};

	//check if name field is empty
	if ( !values.name ) {
		errors.name = 'Required'
	} 
	
	//check if address field is entered
	if ( !values.address ) {
		errors.address = 'Required'
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
	if ( !values.workDesired ) {
		errors.workDesired = "Required"
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
	validate,
	form: 'createStudent'
})(CreateStudent);

export default connect(mapStateToProps, mapDispatchToProps)(createStudentForm);


