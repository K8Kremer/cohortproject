import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { createPackage} from '../../actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './FormStyle.css';

class CreatePackage extends Component {
  state = {
    redirect: false
  }

  renderRedirect = () => {
    if( this.state.redirect ){
      this.props.history.push(`/admin/package/${this.props.currentPackage._id}`)
    }
  }

	componentDidUpdate = (prevProps) => {
  
		if (this.props.currentPackage._id !== prevProps.currentPackage._id && this.props.valid == true) {
			this.setState({ redirect: true }, () => {
        window.alert(`Package ${this.props.currentPackage._id} created successfully!`)
        this.renderRedirect();
			});
		}
	}


onSubmit = formProps => {
  this.props.createPackage(formProps)
};

renderField( {input, label, type, meta: { touched, error, warning}}) {
  return (
    <div className='mb-4' style={{width: 250}}>
      <div>
        <input {...input} type={type} className='form-control' />
          {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div> 
  );
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


  return (
    

    <div className='row mx-0 pt-3 pb-3' style={{backgroundColor:'#9EAEB8', height: '100%', minHeight: '100vh'}}>
    <div className='mx-3 px-3 pt-3' style={{backgroundColor:'#FFFFFF', width: '100%'}}>
    <h3 className="mb-4" style={{color: '#3C5A6B'}}>Create New Package</h3>
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
      
          <fieldset>
            <label>Package Name: </label>
            <Field 
              name="packageName"
              type="text"
              component ={this.renderField}
              autoComplete="none"
              className="form-control"
            />
          </fieldset>
         
       
      
          <fieldset>
            <label>Recipient Name: </label>
            <Field 
              name="employerName"
              type="text"
              component={this.renderField}
              autoComplete="none"
              className="form-control "
            />
          </fieldset>
   
          <label>Recipient Email: </label>
        
          <Field 
            name="employerEmail"
            type="text"
            component={this.renderField}
            autoComplete="none"
            className="form-control "
          />
   
          <label>Recipient Company: </label>
      
          <Field 
            name="companyName"
            type="text"
            component={this.renderField}
            autoComplete="none"
            className="form-control "
          />
   
          <label>Project Shift Employee Name: </label>
          
          <Field 
            name="replyName"
            type="text"
            component={this.renderField}
            autoComplete="none"
            className="form-control "
          />
    
     
          <label>Project Shift Email: </label>
       
          <Field 
            name="replyEmail"
            type="email"
            component={this.renderField}
            autoComplete="none"
            className="form-control "
          />
    
     
          <fieldset>
            <label>Package Notes: </label>
           
            <Field
            name="packageNotes"
            type="text"
            component={this.renderTextArea}
            autoComplete="none"
            className="form-control form-control-lg"
            />
          </fieldset>
        <button type='submit'
          className='btn btn-sm btn-secondary mb-4'
          style={{backgroundColor: '#679AB8'}}>Create</button>
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
if ( !values.employerName ) {
  errors.employerName = 'Required'
}

if ( !values.companyName ) {
  errors.companyName = 'Required'
} 

if ( !values.replyName ) {
  errors.replyName = 'Required'
} 

if ( !values.employerEmail ) {
  errors.employerEmail = "Required"
} else if ( !values.employerEmail.includes("@") || !values.employerEmail.includes('.') ) {
  errors.employerEmail = "Please enter a valid email"
}
//check if the email field is empty
if ( !values.replyEmail ) {
  errors.replyEmail = "Required"

  //check if the email is valid
}  else if ( !values.replyEmail.includes("@") || !values.replyEmail.includes('.') ) {
  errors.replyEmail = "Please enter a valid email"
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


