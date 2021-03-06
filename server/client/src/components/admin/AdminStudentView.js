import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchStudent,
  fetchPackage,
  fetchPackages,
  editPackage
} from "../../actions";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { Dropdown, Button } from "react-bootstrap";

class AdminStudentView extends Component {
  state = {
    addedStudentArray: []
  };

  //loads with student Id provided from URL
  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.studentId);
    this.props.fetchPackages();
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentPackage !== prevProps.currentPackage) {
      let currStudent = { student: this.props.student, studentNotes: "" };
      this.setState({ addedStudentArray: [] }, () => {
        console.log(this.props.addedStudentList);
        this.setState({
          addedStudentArray: [...this.props.addedStudentList, currStudent]
        });
      });
      // this.setState({addedStudentArray: this.props.addedStudentList.concat({currStudent}, {currNotes})})
    }
    // if ( this.props.currentPackage.packageName !== prevProps.currentPackage.packageName ) {
    //   ;
    // }
  }

  handlePackageSubmit = (pckg, student) => {
    if (Object.keys(pckg).length==0) {
      alert('Please select a package')
      return null;
    }
    
    if (pckg) {
      this.props.editPackage(pckg._id, { students: student });
    }
    this.setState({ addedStudentArray: [] });
    alert(
      `${this.props.student.firstName} ${
        this.props.student.lastName
      } added to ${this.props.currentPackage.packageName}`
    );
  };

  formatDate = date => {
    let newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  render() {
    return (
      <div
        className="row mx-0 pt-3 pb-3"
        style={{
          backgroundColor: "#9EAEB8",
          height: "100%",
          minHeight: "100vh"
        }}
      >
        <div className="mx-auto card shadow p-3 mb-5 bg-white rounded col-10">
          <div className="card-header text-center">
            {/* no functionality yet in buttons or dropdown and there is a prettier bootstrap dropdown version if anyone wants to play with that*/}
            <Link to={`/admin/editstudent/${this.props.current_student._id}`}>
              <button
                type="button"
                className="btn btn-sm"
                style={{
                  backgroundColor: "#679AB8",
                  color: "#fff",
                  position: "absolute",
                  right: 150
                }}
              >
                Edit
              </button>
            </Link>
            {/* we would place a View As Employer button here */}
            {/* <Link to="/employer/:packageId/student/:studentId" target='_blank'>
              <button
                type="button"
                className="btn btn-sm"
                style={{
                  backgroundColor: "#679AB8",
                  color: "#fff",
                  position: "absolute",
                  right: 20
                }}
              >
                View as Employer
              </button>
            </Link> */}
            <Dropdown style={{ position: "absolute", top: 100, right: 270 }}>
              <span>Choose a package: </span>
              <Dropdown.Toggle
                variant="primary"
                id="dropdown-basic"
                style={{ backgroundColor: "#679AB8", borderColor: "#679AB8" }}
              >
                {this.props.currentPackage.packageName
                  ? this.props.currentPackage.packageName
                  : "Packages"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {this.props.packages.map(pckg => {
                  return (
                    <Dropdown.Item
                      key={pckg.id}
                      href="#"
                      onClick={e => {
                        this.props.fetchPackage(pckg._id);
                      }}
                    >
                      {pckg.packageName}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
            <Button
              className="submit-students"
              style={{
                position: "absolute",
                top: 100,
                right: 30,
                backgroundColor: "#679AB8",
                borderColor: "#679AB8"
              }}
              onClick={e =>
                this.handlePackageSubmit(
                  this.props.currentPackage,
                  this.state.addedStudentArray
                )
              }
            >
              Submit Student To Package
            </Button>

            <img
              className="img-thumbnail rounded float-left"
              style={{ height: 100, width: 100 }}
              src={this.props.current_student.picture}
            />
            <h2
              style={{ textAlign: "center", marginTop: 30, marginRight: 100 }}
            >
              {this.props.current_student.firstName}{" "}
              {this.props.current_student.lastName}
            </h2>
          </div>
          <div className="card-body text-center">
            <p>
              <em> {this.props.current_student.bio}</em>
            </p>
          </div>
          <p>
            <b>Job Seeking Status:</b>{" "}
            {this.props.current_student.jobSeekingStatus}
          </p>
          <p>
            <b>Project Repos: </b>
            {this.props.current_student.projectRepoLink !== undefined ? (
              <a
                href={this.props.current_student.projectRepoLink}
                target="_blank"
              >
                Repo Link
              </a>
            ) : (
              <span>No Repos Added.</span>
            )}
          </p>
          <p>
            <b>Resume:</b>{" "}
            {this.props.current_student.resume !== undefined ? (
              <a
                href={this.props.current_student.resume}
                target="_blank"
                rel="nofollow noreferrer"
              >
                View {this.props.student.firstName}'s Resume
              </a>
            ) : (
              <span>No Resume Uploaded.</span>
            )}
          </p>
          <p>
            <b>Location Preference:</b>{" "}
            {this.props.current_student.employmentLocationPreference}
          </p>
          <p>
            <b>Type of Work Desired: </b>
            {this.props.current_student.typeOfWorkDesired}
          </p>
          <p>
            <b>Graduation Date: </b>
            {this.formatDate(this.props.current_student.graduationDate)}
          </p>
          <p>
            <b>Email: </b>
            {this.props.current_student.email}
          </p>
          <p>
            <b>Phone: </b>
            {this.props.current_student.phone}
          </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    current_student: state.current_student,
    packages: state.packages,
    currentPackage: state.current_package,
    student: state.current_student,
    addedStudentList: state.current_package.students
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchStudent, fetchPackages, fetchPackage, editPackage },
    dispatch
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminStudentView);
