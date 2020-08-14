import { connect } from "react-redux";
import Result from './components/Result';
import Section from './components/Section';
import {Router} from './components/Router';
import PersonalForm from './components/PersonalForm';


const mapStateToPropsResult = state => {
  return {
    code: state.code,
    currentLink: state.currentLink
  }
}

const VisibleResult = connect(
  mapStateToPropsResult
)(Result);

const VisibleRouter = connect(state => {
  let props = {
    route: state.route,
    meetLink: state.meetLinks.currentLink
  }
  return props
})(Router);

const mapDispatchToPropsPersonal = dispatch => {
  return {
    handleSubmit: (values, route) => {
      dispatch({ type: "route", payload: "test" });
      dispatch({ type: "info", payload: values });
    }
  };
};
const VisiblePersonalForm = connect(
  state => {
    return { none: 0 };
  },
  mapDispatchToPropsPersonal
)(PersonalForm);

const mapDispatchToPropsSection = dispatch => {
  return {
    handleGiveUp: () => dispatch({ type: "FINISH_EXAM" }),
    nextLevel: pass =>
      pass
        ? dispatch({ type: "ADVANCE_LEVEL" })
        : dispatch({ type: "FINISH_EXAM" })
  };
};

const mapStateToPropsSection = state => {
  return { currentSection: state.level, applicantCode: state.code };
};

const VisibleSection = connect(
  mapStateToPropsSection,
  mapDispatchToPropsSection
)(Section);

export {
  VisibleSection, VisiblePersonalForm, VisibleResult, VisibleRouter
}
