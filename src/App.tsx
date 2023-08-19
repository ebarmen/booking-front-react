import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import MainLayout from './components/layouts/MainLayout'
import SignInPage from './modules/Auth/SignInPage'
import DashboardPage from './modules/Dashboard/pages/DashboardPage'
import RolesPage from './modules/Role/RolesPage'
import UsersPage from './modules/User/UsersPage'
import LabelsPage from './modules/Label/LabelsPage'
import DepartmentsPage from './modules/Department/DepartmentsPage'
import HospitalsPage from './modules/Hospital/HospitalsPage'
import CompaniesPage from './modules/Company/CompaniesPage'
import RatesPage from './modules/Rate/RatesPage'
import ApplicationSettingsPage from './modules/Application/ApplicationSettingsPage'
import RoomsListPage from './modules/Room/pages/RoomsListPage'
import RoomDetailPage from './modules/Room/pages/RoomDetailPage'
import BookingPage from './modules/Booking/BookingPage'

const App: React.FC = () => {
  return (
     //@ts-ignore*
    <BrowserRouter>
      <Switch>
        <Route path="/signin" component={SignInPage} exact />
        <MainLayout>
          <Route path="/" exact>
            {localStorage.getItem('auth') ? (
              <Redirect to="/dashboard" />
            ) : (
              <Redirect to="/signin" />
            )}
          </Route>
          <Route path="/dashboard" component={DashboardPage} exact />
          <Route path="/roles" component={RolesPage} exact />
          <Route path="/users" component={UsersPage} exact />
          <Route path="/labels" component={LabelsPage} exact />
          <Route path="/departments" component={DepartmentsPage} exact />
          <Route path="/hospitals" component={HospitalsPage} exact />
          <Route path="/companies" component={CompaniesPage} exact />
          <Route path="/rates" component={RatesPage} exact />
          <Route path="/rooms" component={RoomsListPage} exact />
          <Route path="/rooms/:id" component={RoomDetailPage} exact />
          <Route path="/booking" component={BookingPage} exact />
          <Route
            path="/application"
            component={ApplicationSettingsPage}
            exact
          />
        </MainLayout>
      </Switch>
    </BrowserRouter>
  )
}

export default App
