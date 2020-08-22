import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchCarDetails, fetchFuel, fetchBrand, fetchTransmission } from '../../actions/carsAction';
import axios from 'axios';

import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import Lightbox from 'react-image-lightbox';
import Currency from 'react-currency-formatter';
import { Link } from 'react-router-dom';
import CarSeller from './CarSeller';

class Cardetails extends Component {
    state = {
        images: [],
        lightboximages: null,
        photoIndex: 0,
        isOpen: false,
        carid: '',
    }

    async componentWillMount() {
        await this.props.fetchCarDetails(this.props.match.params.id);
    }

    async componentWillReceiveProps() {
        await this.fetchCarImages();
    }

    // Fetch car images
    async fetchCarImages() {
        axios.get(`/carsapi/images/`)
            .then(res => {
                const car_id = this.props.car.id;
                var imageArray = res.data;
                const newImages = [];
                imageArray.filter(image => {
                    // push image to state
                    if (image.car === car_id) {
                        newImages.push(image.file);
                    }
                    return image.car === car_id
                })

                //add car thumb images to newImages
                newImages.unshift(this.props.car.carthumbimage)
                this.setState({
                    images: newImages
                })

            })
            .catch(err => {
                console.log("FETCH CAR IMAGES FAIL" + err)
            })
    }


    render() {
        var { car, fuel, brand, transmission, auth } = this.props;
        const { photoIndex, isOpen } = this.state;

        if (car.carfueltype) { this.props.fetchFuel(this.props.car.carfueltype); }
        if (car.carbrand) { this.props.fetchBrand(car.carbrand); }
        if (car.cartransmission) { this.props.fetchTransmission(car.cartransmission); }

        var carimg = car.carthumbimage ? car.carthumbimage : 'https://legacytaylorsville.com/wp-content/uploads/2015/07/No-Image-Available1.png';

        if (car) {

            return (
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-sm-8 p-3">
                            <div className="row my-2">
                                <div className="col-8">
                                    <h5 className="text-dark font-weight-bold">{brand} {car.carmodel}</h5>
                                </div>
                                <div className="col-4">
                                    <h5 className=" text-danger">
                                        <Currency
                                            quantity={parseFloat(car.carprice)}
                                            currency="PHP"
                                            decimal="."
                                            group=","
                                        />
                                    </h5>
                                </div>
                            </div>
                            <img src={carimg} alt={car.carmodel} onClick={() => this.setState({ isOpen: true })} width="90%" className="img-fluid mx-auto" />

                            <hr />

                            {this.state.images ? this.state.images.map(image => {
                                return (
                                    <img key={image} src={image} onClick={() => this.setState({ isOpen: true })} width="100px" height="80px" style={{ margin: '0px 5px' }} />
                                )
                            }) : 'null'}
                            {isOpen && (
                                <Lightbox
                                    mainSrc={this.state.images[photoIndex]}
                                    nextSrc={this.state.images[(photoIndex + 1) % this.state.images.length]}
                                    prevSrc={this.state.images[(photoIndex + this.state.images.length - 1) % this.state.images.length]}
                                    onCloseRequest={() => this.setState({ isOpen: false })}
                                    onMovePrevRequest={() =>
                                        this.setState({
                                            photoIndex: (photoIndex + this.state.images.length - 1) % this.state.images.length,
                                        })
                                    }
                                    onMoveNextRequest={() =>
                                        this.setState({
                                            photoIndex: (photoIndex + 1) % this.state.images.length,
                                        })
                                    }
                                />
                            )}
                            <hr />


                            <div className="container">
                                <div className="row mt-2">
                                    <div className="col-sm-4 text-center">
                                        <i className="fas fa-cogs"></i> <br />
                                        <h5 className="font-weight-normal">{transmission ? transmission : 'loading...'}</h5>
                                    </div>

                                    <div className="col-sm-4 text-center">
                                        <i className="fas fa-gas-pump"></i> <br></br>
                                        <h5 className="font-weight-normal"> {fuel ? fuel : 'loading...'}</h5>
                                    </div>

                                    <div className="col-sm-4 text-center">
                                        <i className="fas fa-tachometer-alt"></i> <br />
                                        <h5 className="font-weight-normal">{car.carmileage} km</h5>
                                    </div>

                                </div>
                                <hr />
                            </div>

                            <div className="container">
                                <div className="row">
                                    <div className="col-3 text-center">
                                        <small>condition</small> <br />
                                        <b> {car.carcondition}</b>
                                    </div>
                                    <div className="col-3 text-center">
                                        <small>engine size</small> <br />
                                        <b> {car.carenginesize}</b>
                                    </div>
                                    <div className="col-3 text-center">
                                        <small>doors</small> <br />
                                        <b> {car.cardoors}</b>
                                    </div>

                                    <div className="col-3 text-center">
                                        <small >color</small> <br />
                                        <b>
                                            {car.carcolor ? <div title={car.carcolor} className="d-block mx-auto" style={{ height: '25px', width: '25px', backgroundColor: car.carcolor }}></div> : car.carcolor}
                                        </b>
                                    </div>
                                </div>
                            </div>


                            <hr />
                            <br />
                            <p>Description </p>
                            <pre>
                                {car.cardescription}
                            </pre>
                        </div>

                        <div className="col-sm-4 p-3 ">
                            {auth ? <CarSeller sellerId={car.carseller} /> : <div className="card p-3 text-center">
                                <p className="font-weight-bold text"> <Link to="/login">Login</Link> to view seller contact information.</p>
                                <p>No Account? <Link to="/register">Sign up here</Link></p>
                            </div>}
                        </div>
                    </div>

                </div>
            )
        } else {
            return (
                <h1>loading..</h1>
            )
        }
    }
}



const mapStateToProps = state => ({
    car: state.carReducer.car,
    fuel: state.carReducer.fuel,
    brand: state.carReducer.brand,
    transmission: state.carReducer.transmission,
    auth: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps, { fetchCarDetails, fetchFuel, fetchBrand, fetchTransmission })(Cardetails);