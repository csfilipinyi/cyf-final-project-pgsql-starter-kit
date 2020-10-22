import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import CreateProfile from "./pages/CreateProfile";
import ViewProfile from "./pages/ViewProfile";
import EditProfile from "./pages/EditProfile";
import NotEligible from './pages/NotEligible'

import { ProtectedRoute } from './authentication/ProtectedRoute'

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/viewdetail' component={ViewProfile} />
				<Route path='/createprofile' component={CreateProfile} />
				<Route path='/viewprofile' component={ViewProfile} />
				<Route path='/editprofile' component={EditProfile} />
				<Route path='/notfound' component={NotEligible} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;