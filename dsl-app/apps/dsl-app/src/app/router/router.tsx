import './router.module.css';
import { Switch, Route } from 'react-router-dom';
import SignIn from '../pages/sign-in/sign-in';
import Classes from '../pages/classes/classes';
import CreateCode from '../pages/code/create-code/create-code';
import SubmitCode from '../pages/code/submit-code/submit-code';
import Attendance from '../pages/attendance/attendance';
import Error from '../pages/error/error';

/* eslint-disable-next-line */
export interface RouterProps {}

function Router(props: RouterProps) {
  return (
    <Switch>
      <Route exact path="/" component={SignIn}/>
      <Route exact path="/classes" component={Classes}/>
      <Route exact path="/attendance" component={Attendance}/>
      <Route exact path="/check-attendance" component={CreateCode}/>
      <Route exact path="/submit-attendance" component={SubmitCode}/> 
      <Route exact path="/*" component={Error}/>
    </Switch>
  );
}

export default Router;