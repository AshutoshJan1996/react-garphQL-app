import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import LogInContainer from '@containers/LogIn/Loadable';
import SignUpContainer from '@containers/SignUp/Loadable';
import PetsContainer from '@containers/Pets/Loadable';
import routeConstants from '@utils/routeConstants';
export const routeConfig = {
  repos: {
    component: LogInContainer,
    ...routeConstants.repos
  },
  signup: {
    component: SignUpContainer,
    route: '/signup',
    exact: true
  },
  pets: {
    component: PetsContainer,
    route: '/pets',
    exact: true
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
