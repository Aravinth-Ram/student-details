import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreator from "../store/action/StudentDetailsAction";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
var value = [];
var markValues = [];
var index = [];
class StudentMarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
			barValue : []
		};
  }
  componentWillMount() {
    markValues = [];
    value = [];
  }
  componentDidMount() {
    if (this.props.studentRecords.length === 0) {
      this.props.getStudentRecords().then(() => {
        index = this.props.location.pathname.split("/");
        for (var key in Object.values(this.props.studentRecords[index[1]])) {
          value.push(Object.values(this.props.studentRecords[index[1]])[key]);
        }
        for (key in value[3]) {
          markValues.push({ key: key, marks: value[3][key] });
				}
        this.setState({ barValue : markValues });
      });
    } else {
      for (var key in Object.values(this.props.location.state.data)) {
        value.push(Object.values(this.props.location.state.data)[key]);
      }
      for (key in value[3]) {
        markValues.push({ key: key, marks: value[3][key] });
      }
      this.setState({ barValue : markValues });
    }
  }
  render() {
    return (
      <div>
        <BarChart data={this.state.barValue} height={300} width={420}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="key" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="marks" fill="#8884d8" />
        </BarChart>
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
)(StudentMarks);
