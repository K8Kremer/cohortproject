import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { createStudent} from '../../actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';




class CreateStudent extends Component {
	
	// onSubmit = formProps => {
	// 	this.props.createStudent(formProps, () => {
	// 		this.props.history.push('/');
	// 		console.log("submit button clicked")
	// 	});
	// };

	render() {
		// const { handleSubmit } = this.props;
		
		return (
				<form>
					<fieldset>
						<label>Name: </label>
						<Field 
							name="name"
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
						<label>Phone Number: </label>
						<Field 
							name="Phone Number"
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
						<label>Link To Project Repos: </label>
						<Field 
							name="link to project repos"
							type="url"
							component="input"
							autoComplete="none"
						/>
					</fieldset>
					<fieldset>
						<label>Job Seeking Status: </label>
						<select>
							<option value = "employed">Employed</option>
							<option value = "actively-seeking-employment">Seeking Employment</option>
							<option value = "not-seeking-employment">Not Actively Seeking Employment</option>
						</select>
					</fieldset>
					<fieldset>
						<label>Graduation Date: </label>
						<Field 
							name="graduation date"
							type="date"
							component="input"
							autoComplete="none"
						/>
					</fieldset>
					<fieldset>
						<label>Work Desired: </label>
						<select>
							<option value = "front-end">Front End</option>
							<option value = "back-end">Back End</option>
							<option value = "full-stack">Full Stack</option>
						</select>
					</fieldset>
					<fieldset>
						<label>Employment Location Preference: </label>
						<select>
							<option value = "local">Local Work Only</option>
							<option value = "remote">Remote Work Only</option>
							<option value = "relocation">Willing to Relocate</option>
						</select>
					</fieldset>
					<fieldset>
						<label>Upload Photo: </label>
						<Field 
							name="upload photo"
							type="file"
							accept="image/png, image/jpeg"
							component="input"
							autoComplete="none"
						/>
					</fieldset>
					<fieldset>
						<label>Upload Resume: </label>
						<Field 
							name="upload resume"
							type="file"
							accept=".doc, .pdf"
							component="input"
							autoComplete="none"
						/>
					</fieldset>
					<fieldset>
						<legend>Industries Preferred</legend>
						<div>
							<input type="checkbox" id="finance" name="interest" value="finance"/>
							<label for="finance">Finance</label>
						</div>
						<div>
							<input type="checkbox" id="healthcare" name="interest" value="healthcare"/>
							<label for="healthcare">Healthcare</label>
						</div>
						<div>
							<input type="checkbox" id="gaming" name="interest" value="gaming"/>
							<label for="gaming">Gaming</label>
						</div>
						<div>
							<input type="checkbox" id="ecommerce" name="interest" value="ecommerce"/>
							<label for="ecommerce">E-commerce</label>
						</div>
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
					<button onClick >Save</button>
				</form>
		)
	}
}

function validate (values) {
	const errors = {};
	if ( !values.name ) {
		errors.name = 'Required'
	} 
	console.log(errors)
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ createStudent }, dispatch);
}

const createStudentForm = reduxForm({
	validate,
	form: 'createStudent'
})(CreateStudent);

export default connect(null, mapDispatchToProps)(createStudentForm);


