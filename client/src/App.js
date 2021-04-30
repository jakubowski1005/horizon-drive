import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { RemindPassword } from './components/auth/RemindPassword';
import { HomePage } from './components/global/HomePage';
import { Error } from './components/global/Error';
import { Terms } from './components/auth/Terms';
import { HorizonDrive } from './components/app/HorizonDrive';
import { Header } from './components/global/Header';
import { Footer } from './components/global/Footer';
import { Logout } from './components/auth/Logout';

export const App = () => {
  return (
    <>
      <Header/>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/remindPassword" component={RemindPassword} />
          <Route path="/terms" component={Terms} />
          <Route path="/logout" component={Logout} />
          <Route path="/app" component={HorizonDrive} />
          <Route path="/" component={Error} />
        </Switch>
      </BrowserRouter>
      <Footer/>
    </>
  )
}

//export default App;
