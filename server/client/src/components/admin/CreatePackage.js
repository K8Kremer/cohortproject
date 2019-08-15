import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { createPackage} from '../../actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './FormStyle.css';

class CreatePackage extends Component {
  state = {
    redirectToNewPage: false
  }
	componentDidUpdate = (prevProps) => {
    /**
     * this.props.currentStudent is being changed to a boolean true when the form validation fails BUT WHY
     * this.props.valid returns true when form validation is successful
     */
		if (this.props.currentPackage._id !== prevProps.currentPackage._id && this.props.valid == true) {
			this.setState({ redirectToNewPage: true }, () => {
				window.alert(`Package ${this.props.currentPackage._id} created successfully!`)
			});
		}
	}


onSubmit = formProps => {
  this.props.createPackage(formProps, () =>{
  });


};

render() {
  const { handleSubmit } = this.props;
 
  
  return (
    <div className='background row'>
      <div className='col-md-2'></div>
      <div className='col-md-8'>
      
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
      <div className='form-group row'>
         
          <label className='col-sm-2 col-form-label'>Package Name: </label>
        
          <div className='col-md-6'>
          <Field 
            name="packageName"
            type="text"
            component ="input"
            autoComplete="none"
            className="form-control "
          />
          </div>
         </div>
       <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>Recipient Name: </label>
          <div className='col-md-6'>
          <Field 
            name="employerName"
            type="text"
            component="input"
            autoComplete="none"
            className="form-control "
          />
      </div>
      </div>
      <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>Recipient Email: </label>
          <div className='col-md-6'>
          <Field 
            name="employerEmail"
            type="text"
            component="input"
            autoComplete="none"
            className="form-control "
          />
      </div>
      </div>
      <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>Recipient Company: </label>
          <div className='col-md-6'>
          <Field 
            name="companyName"
            type="text"
            component="input"
            autoComplete="none"
            className="form-control "
          />
      </div>
      </div>
      <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>Project Shift Employee Name: </label>
          <div className='col-md-6'>
          <Field 
            name="replyName"
            type="text"
            component="input"
            autoComplete="none"
            className="form-control "
          />
       </div>
      </div>
      <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>Project Shift Email: </label>
          <div className='col-md-6'>
          <Field 
            name="replyEmail"
            type="email"
            component="input"
            autoComplete="none"
            className="form-control "
          />
      </div>
      </div>
      <div className='form-group row'>
          <label className='col-sm-2 col-form-label'>Package Notes: </label>
          <div className='col-md-6'>
          <Field
          name="text"
          type="text"
          component="textarea"
          autoComplete="none"
          className="form-control form-control-lg"
          />
          </div>
      </div>
        <button className='btn btn-primary'>Save</button>
      </form>
      </div>
      </div>
  )
}
}

function validate (values) {
const errors = {};

//check if name field is empty
if ( !values.packageName ) {
  errors.packageName = 'Required'
} 

//check if address field is entered
if ( !values.recipientName ) {
  errors.recipientName = 'Required'
}

if ( !values.company ) {
  errors.company = 'Required'
} 

if ( !values.employeeName ) {
  errors.employeeName = 'Required'
} 

//check if the email field is empty
if ( !values.email ) {
  errors.email = "Required"

  //check if the email is valid
}  else if ( !values.email.includes("@") || !values.email.includes('.') ) {
  errors.email = "Please enter a valid email"
}



return  errors;
}

function mapStateToProps(state) {
return {
  currentPackage : state.current_package
}
}

function mapDispatchToProps(dispatch) {
return bindActionCreators({ createPackage }, dispatch);
}

const createPackageForm = reduxForm({
validate,
form: 'createPackage'
})(CreatePackage);

export default connect(mapStateToProps, mapDispatchToProps)(createPackageForm);


