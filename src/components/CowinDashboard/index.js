import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    last7DaysVaccinationList: [],
    vaccinationByAgeList: [],
    vaccinationByGenderList: [],
    apiState: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCowinData()
  }

  getCowinData = async () => {
    this.setState({apiState: apiStatusConstants.inProgress})
    // console.log('getting vaccination')
    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(covidVaccinationDataApiUrl)
    if (response.ok === true) {
      const data = await response.json()
      console.log('madhavi', data)
      const getLast7DaysVaccination = data.last_7_days_vaccination.map(
        eachVaccinationDay => ({
          vaccineDate: eachVaccinationDay.vaccine_date,
          dose1: eachVaccinationDay.dose_1,
          dose2: eachVaccinationDay.dose_2,
        }),
      )
      // console.log('lastestData', getLast7DaysVaccination)
      // const vaccinationByAge = data.vaccination_by_age.map(each => ({
      //   age: each.age,
      //   count: each.count,
      // }))
      // or
      // const vaccinationByAge = data.vaccination_by_age
      // console.log('updatedone', vaccinationByAge)

      // const vaccinationByGender = data.vaccination_by_gender
      // console.log('updated data', vaccinationByGender)
      this.setState({
        apiState: apiStatusConstants.success,
        last7DaysVaccinationList: getLast7DaysVaccination,
        vaccinationByGenderList: data.vaccination_by_gender,
        vaccinationByAgeList: data.vaccination_by_age,
      })
    } else {
      this.setState({apiState: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderCowinApp = () => {
    const {
      last7DaysVaccinationList,
      vaccinationByGenderList,
      vaccinationByAgeList,
    } = this.state
    console.log(
      'ajay',
      last7DaysVaccinationList,
      vaccinationByGenderList,
      vaccinationByAgeList,
    )
    return (
      <div>
        <VaccinationCoverage
          last7DaysVaccinationList={last7DaysVaccinationList}
        />
        <VaccinationByGender
          vaccinationByGenderList={vaccinationByGenderList}
        />
        <VaccinationByAge vaccinationByAgeList={vaccinationByAgeList} />
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <div className="image-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
          className="failure-image"
        />
      </div>
      <h1 className="failure-msg">Something went wrong</h1>
    </div>
  )

  renderStatus = () => {
    const {apiState} = this.state
    switch (apiState) {
      case apiStatusConstants.success:
        return this.renderCowinApp()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="website-logo"
          />
          <h1 className="heading-cowin">Co-WIN</h1>
        </div>
        <h1 className="main-heading">CoWin Vaccination in India</h1>
        {this.renderStatus()}
      </div>
    )
  }
}

export default CowinDashboard
