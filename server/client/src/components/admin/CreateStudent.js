import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { createStudent} from '../../actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';


class CreateStudent extends Component {
	onSubmit = formProps => {
		this.props.createStudent(formProps, () => {
			this.props.history.push('/');
			console.log("submit button clicked")
		});
	};

	render() {
		const { handleSubmit } = this.props;
		
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
							component="input"
							autoComplete="none"
						/>
					</fieldset>
					<fieldset>
						<label>Address: </label>
						<Field 
							name="address"
							type="text"
							component="input"
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
							component="input"
							autoComplete="none"
						/>
					</fieldset>
					<fieldset>
						<label>Email: </label>
						<Field
						name="email"
						type="email"
						component="input"
						autoComplete="none"
						/>
					</fieldset>
					<fieldset>
						<label>LinkedIn Profile: </label>
						<Field 
							name="linkedIn"
							type="url"
							component="input"
							autoComplete="none"
						/>
					</fieldset>
					<fieldset>
						<label>Job Seeking Status: </label>
						<Field name="jobSeekingStatus" component="select">
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
							component="input"
							autoComplete="none"
						/>
					</fieldset>
					<fieldset>
						<label>Work Desired: </label>
						<Field name="typeOfWorkDesired" component="select">
							<option value = "front-end">Front End</option>
							<option value = "back-end">Back End</option>
							<option value = "full-stack">Full Stack</option>
						</Field>
					</fieldset>
					<fieldset>
						<label>Employment Location Preference: </label>
						<Field name="employmentLocationPreference" component="select">
							<option value = "local">Local Work Only</option>
							<option value = "remote">Remote Work Only</option>
							<option value = "relocation">Willing to Relocate</option>
						</Field>
					</fieldset>
					<fieldset>
						<label>Upload Photo: </label>
						<Field 
							name="picture"
							type="file"
							accept="image/png, image/jpeg"
							component="input"
							autoComplete="none"
						/>
					</fieldset>
					<fieldset>
						<label>Upload Resume: </label>
						<Field 
							name="resume"
							type="file"
							accept=".doc, .pdf"
							component="input"
							autoComplete="none"
						/>
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
						component="input"
						autoComplete="none"
						/>
					</fieldset>
					<button>Save</button>
				</form>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ createStudent }, dispatch);
}

const createStudentForm = reduxForm({
	form: 'createStudent'
})(CreateStudent);

export default connect(null, mapDispatchToProps)(createStudentForm);


