import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchCars } from '../../actions/carsAction';

import Carthumb from './Carthumb';

class Carlist extends Component {
    componentDidMount() {
        this.props.fetchCars();
    }

    render() {

        const cars = this.props.cars.filter(car => {
            return car.carsold === false
        })

        const carsthumb = cars.map(car => {
            return (
                <Carthumb key={car.id} id={car.id} model={car.carmodel} brand={car.carbrand} thumbnail={car.carthumbimage} price={car.carprice} mileage={car.carmileage} fuel={car.carfueltype} transmission={car.cartransmission} />
            )
        })
      if(carsthumb){
        return (
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-6 offset-3">
                        {/* <Search /> */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        {/* <Filter/> */}
                    </div>
                    <div className="col-md-10">
                        <div className="row">
                            {carsthumb}
                        </div>
                    </div>
                </div>
            </div>
        )
      }
      else{
          return(
              <h3>loading...</h3>
          )
      }
    }
}


const mapStateToProps = state => ({
    cars: state.carReducer.cars
})


export default connect(mapStateToProps, { fetchCars })(Carlist);