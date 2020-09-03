import { connect } from "react-redux";
import { ADVANCE_LEVEL, FINISH_EXAM } from "./redux/actionTypes";
import Result from "./components/Result";
import Section from "./components/Section";
import { Router } from "./components/Router";
import PersonalForm from "./components/PersonalForm";
import db from "./db";

const mapStateToPropsResult = state => {
  return {
    currentLink: state.currentLink,
    level: state.level,
    externo: state.info.external,
    code: state.code
  };
};

const VisibleResult = connect(mapStateToPropsResult)(Result);

const VisibleRouter = connect(state => {
  let props = {
    route: state.route,
    meetLink: state.meetLinks.currentLink
  };
  return props;
})(Router);

const mapDispatchToPropsPersonal = dispatch => {
  return {
    handleSubmit: (values, route) => {
      db.ref("/onlineUsers")
        .once("value")
        .then(snapshot => db.ref("onlineUsers").set(snapshot.val() + 1));
      dispatch({ type: "route", payload: "test" });
      dispatch({ type: "info", payload: values });
    }
  };
};
const VisiblePersonalForm = connect(
  null,
  mapDispatchToPropsPersonal
)(PersonalForm);

const mapDispatchToPropsSection = dispatch => {
  return {
    handleGiveUp: () => dispatch({ type: FINISH_EXAM }),
    nextLevel: pass =>
      pass ? dispatch({ type: ADVANCE_LEVEL }) : dispatch({ type: FINISH_EXAM })
  };
};

const mapStateToPropsSection = state => {
  return { currentSection: state.level, curso: state.info.curso };
};

const VisibleSection = connect(
  mapStateToPropsSection,
  mapDispatchToPropsSection
)(Section);

export { VisibleSection, VisiblePersonalForm, VisibleResult, VisibleRouter };
