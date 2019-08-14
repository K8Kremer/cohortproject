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
  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.studentId);
  }
  
	onSubmit = formProps => {
		this.props.editStudent(this.props.match.params.studentId, formProps)
		this.props.history.push('/');
	};

	render() {
		const { handleSubmit } = this.props;
		
		return (
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))} initialValues>
					<fieldset>
						<label>First Name: </label>
						<Field 
							name="firstName"
							type="text"
							component="input"
							defaultValue="MegaStar"
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
						<label>Phone Number: </label>
						<Field 
							name="phoneNumber"
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
							name="projectRepos"
							type="url"
							component="input"
							autoComplete="none"
						/>
					</fieldset>
					<fieldset>
						<label>Job Seeking Status: </label>
            <br /><label>current: </label>
            <Field 
              name="jobSeekingStatus"
              type="text"
              component="input"
              autoComplete="none"
              disabled={true}
              />
            <br /><label>edit: </label>
						<select name="jobSeekingStatus">
							<option value = "employed">Employed</option>
							<option value = "actively-seeking-employment">Searching</option>
							<option value = "not-seeking-employment">Not Actively Seeking Employment</option>
						</select> 
					</fieldset>
					<fieldset>
						<label>Graduation Date: </label>
						<Field 
							name="graduationDate"
							type="text"
							component="input"
              autoComplete="none"
						/>
					</fieldset>
					<fieldset>
						<label>Work Desired: </label>
            <br /><label>current: </label>
            <Field 
							name="typeOfWorkDesired"
							type="text"
							component="input"
              autoComplete="none"
              disabled={true}
						/>
            <br /><label>edit: </label>
						<select>
							<option value = "front-end">Front End</option>
							<option value = "back-end">Back End</option>
							<option value = "full-stack">Full Stack</option>
						</select>
					</fieldset>
					<fieldset>
						<label>Employment Location Preference: </label>
            <br /><label>current: </label>
            <Field 
							name="employmentLocationPreference"
							type="text"
							component="input"
              autoComplete="none"
              disabled={true}
						/>
            <br /><label>edit: </label>
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
						<legend>Industries Preferred <br></br></legend>
            <Field 
							name="industriesPreferred"
							type="text"
							component="input"
              autoComplete="none"
              disabled={true}
						/>
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