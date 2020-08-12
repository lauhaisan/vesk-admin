import React, { Component, Suspense } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Loading } from "carbon-components-react";
import routes from "./config/router.config";
import history from "./history";

class App extends Component {
  render() {
    const AppRoute = ({ component: Component, layout: Layout, ...rest }) => {
      return (
        <Route
          {...rest}
          render={props => (
            <Layout {...props}>
              <Suspense fallback={<Loading withOverlay={false} />}>
                <Component {...props} />
              </Suspense>
            </Layout>
          )}
        ></Route>
      );
    };

    return (
      <Router history={history}>
        <Switch>
          {routes.map(route => (
            <AppRoute
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.component}
              layout={route.layout}
            />
          ))}
        </Switch>
      </Router>
    );
  }
}

export default App;
