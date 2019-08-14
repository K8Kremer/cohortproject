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
  
  /**TODO: Make the save button update the store */
	onSubmit = formProps => {
		this.props.editStudent(this.props.match.params.studentId, formProps)
		this.props.history.push(`/admin/student/${this.props.match.params.studentId}`);
  };
  
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
							type="text"
							component="input"
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
						<label>Industry Preferred: currently {this.props.initialValues.industriesPreferred} </label>
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