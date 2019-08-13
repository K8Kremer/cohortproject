import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { editStudent,fetchStudent} from '../../actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class EditStudent extends Component {
  componentDidMount() {
    this.props.fetchStudent("5d52d7ca9c840b774c6b7e5f");  
  }
	onSubmit = formProps => {
		this.props.editStudent(formProps, () => {
			this.props.history.push('/');
			console.log("save button clicked")
		});
	};

	render() {
		const { handleSubmit } = this.props;
		
		return (
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
							<label htmlFor="finance">Finance</label>
						</div>
						<div>
							<input type="checkbox" id="healthcare" name="interest" value="healthcare"/>
							<label htmlFor="healthcare">Healthcare</label>
						</div>
						<div>
							<input type="checkbox" id="gaming" name="interest" value="gaming"/>
							<label htmlFor="gaming">Gaming</label>
						</div>
						<div>
							<input type="checkbox" id="ecommerce" name="interest" value="ecommerce"/>
							<label htmlFor="ecommerce">E-commerce</label>
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
					<button>Save</button>
				</form>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ editStudent, fetchStudent }, dispatch);
}

const editStudentForm = reduxForm({
	form: 'editStudent'
})(EditStudent);

export default connect(null, mapDispatchToProps)(editStudentForm);