import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchFuel } from '../../actions/carsAction';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Currency from 'react-currency-formatter';

class Carthumb extends Component {
    state = {
        fuel: '',
        transmission: '',
        brand: ''
    }

    componentDidMount() {
        this.fetchFuel(this.props.fuel);
        this.fetchTransmission(this.props.transmission);
        this.fetchbrand(this.props.brand);
    }

    fetchFuel = (id) => {
        axios.get(`/carsapi/carfueltypes/${id}/`)
            .then(res => {
                this.setState({
                    fuel: res.data.carfueltype
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    fetchbrand = (id) => {
        axios.get(`/carsapi/carsbrands/${id}/`)
            .then(res => {
                this.setState({
                    brand: res.data.carbrand
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    fetchTransmission = (id) => {
        axios.get(`/carsapi/cartransmissions/${id}/`)
            .then(res => {
                this.setState({
                    transmission: res.data.cartransmissions
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const src = this.props.thumbnail ? this.props.thumbnail : 'https://legacytaylorsville.com/wp-content/uploads/2015/07/No-Image-Available1.png';
        return (
            <div className="col-md-4 my-1">
                <div className="card rounded-0">
                    <img src={src} alt={this.props.model} width="100%" height="auto" className="img-fluid" />
                    <h5 className="my-2 text-center"> <Link className="text-danger text-bold" to={`/cars/${this.props.id}`}>  {this.state.brand} {this.props.model}</Link></h5>
                    <div className="container">
                        <div className="row mt-2">
                            <div className="col-sm-4 text-center">
                                <i className="fas fa-cogs"></i> <br />
                                <small className="font-weight-normal">{!this.state.transmission ? 'loading...' : this.state.transmission}</small>
                            </div>

                            <div className="col-sm-4 text-center">
                                <i className="fas fa-gas-pump"></i> <br></br>
                                <small className="font-weight-normal"> {!this.state.fuel ? 'loading...' : this.state.fuel}</small>
                            </div>

                            <div className="col-sm-4 text-center">
                                <i className="fas fa-tachometer-alt"></i> <br />
                                <small className="font-weight-normal">{this.props.mileage} km</small>
                            </div>

                        </div>

                        <hr />

                        <div className="row">
                            <div className="col-8">
                                <p className="font-weight-bold">
                                    <Currency
                                        quantity={this.props.price}          
                                        currency="PHP"            
                                        decimal="."              
                                        group=","
                                    />
                                </p>
                            </div>
                            <div className="col-4">
                                <a className="btn btn-outline-danger rounded-0 btn-sm" href={`/cars/${this.props.id}/`}>Details  <i class="fas fa-user-secret"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    carfuel: state.carReducer.fuel
})

export default connect(mapStateToProps, { fetchFuel })(Carthumb);

