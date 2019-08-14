import React, { Component } from "react";
import { connect } from "react-redux";
// import {retrieveStudentDetails} from './API/studentsDetailsAPI';
import * as actionCreator from "../store/action/StudentDetailsAction";
import { Card, Input, Button, Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import "../styles/student.css";
import "antd/dist/antd.css";
var changeAlpha = true;
var changeAsec = true;
const { Search } = Input;
class StudentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: []
    };
  }
  componentDidMount() {
    if (this.props.studentRecords.length === 0) {
      this.props.getStudentRecords().then(() => {
        this.initialRun();
      });
    } else {
      this.initialRun();
    }
  }
  initialRun = () => {
    var studentDetailArray = [];
    var netTotal = [];
    var total = 0;
    var index = 0;
    var data = Object.values(this.props.studentRecords);
    data.forEach(element => {
      studentDetailArray.push(element);
      index = studentDetailArray.indexOf(element);
      total = 0;
      Object.values(element.marks).map(mark => {
        return (total += mark);
      });
      var addMark = { ...studentDetailArray[index], total: total };
      netTotal.push(addMark);
    });
    this.setState({ records: netTotal });
  };

  handleSearch = studentDetails => {
    var searchResult = [];
    if (studentDetails.length !== 0) {
      Object.values(this.props.studentRecords).forEach(element => {
        if (element.name.toLowerCase() === studentDetails.toLowerCase()) {
          searchResult.push(element);
        }
      });
      this.setState({ records: searchResult });
    } else {
      this.initialRun();
    }
  };
  asecDesec = studentDetails => {
    if (changeAsec === true) {
      changeAsec = false;
      studentDetails.sort(function(a, b) {
        var nameA = a.total;
        var nameB = b.total;
        if (nameA > nameB) {
          return 1;
        } else if (nameA < nameB) {
          return -1;
        }
        return 0;
      });
    } else {
      changeAsec = true;
      studentDetails.sort(function(a, b) {
        var nameA = a.total;
        var nameB = b.total;
        if (nameA < nameB) {
          return 1;
        } else if (nameA > nameB) {
          return -1;
        }
        return 0;
      });
    }
    this.setState({ records: studentDetails });
  };
  alphaReverse = studentDetails => {
    if (changeAlpha === true) {
      changeAlpha = false;
      studentDetails.sort(function(a, b) {
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();
        if (nameA > nameB) {
          return 1;
        } else if (nameA < nameB) {
          return -1;
        }
        return 0;
      });
    } else {
      changeAlpha = true;
      studentDetails.sort(function(a, b) {
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return 1;
        } else if (nameA > nameB) {
          return -1;
        }
        return 0;
      });
    }
    this.setState({ records: studentDetails });
  };
  goToStudentMarks = (details, rollNo) => {
    this.props.history.push(`/${rollNo}`, {
      data: details
    });
  };
  render() {
    return (
      <div>
        <div className="header">
          <Row>
            <Col className="student_details">Student Details</Col>
            <Col>
              <div className="button">
                <div>
                  <Button onClick={() => this.asecDesec(this.state.records)}>
                    Increase/Decrease
                  </Button>
                </div>
                <div>
                  <Search
                    placeholder="input search text"
                    onChange={value => this.handleSearch(value)}
                    enterButton
                    className="search"
                  />
                </div>
                <div>
                  <Button onClick={() => this.alphaReverse(this.state.records)}>
                    Alphabetic/ReverseAlpha
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="card">
          {this.state.records.length > 0 &&
            this.state.records.map(item => {
              return (
                <Col
                  key={item.rollNo}
                  sm={{ offset: 1, span: 3 }}
                  md={{ offset: 2, span: 4 }}
                  lg={{ offset: 2, span: 6 }}
                >
                  <Card
                    title={item.name}
                    key={item.rollNo}
                    className="cardStyle"
                    onClick={() => this.goToStudentMarks(item, item.rollNo)}
                  >
                    <div>Roll Number: {item.rollNo} </div>
                    <div>Total Mark: {item.total} </div>
                  </Card>
                </Col>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStoreToProps = state => {
  return {
    studentRecords: state.studentData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStudentRecords: () => dispatch(actionCreator.getStudentData())
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(withRouter(StudentDetails));
