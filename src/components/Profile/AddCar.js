import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import { Link, Redirect } from 'react-router-dom';
import MyCars from './MyCars';
import MyProfileInfo from './MyProfileInfo';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

class AddCar extends Component {

    state = {
        cars: [],
        cardetails: {
            carmodel: '',
            carbrand: '',
            cartransmission: '',
            carfueltype: '',
            carcondition: '',
            carcolor: '',
            cardoors: '',
            carmileage: '',
            carenginesize: '',
            carprice: '',
            cardescription: '',
            carsold: false,
            carthumbimage: "",
        },
        carbrands: [],
        cartransmissions: [],
        carfueltypes: [],
        page: 'page title',
        images: [],
        inputKey: Date.now()
    }

    componentDidMount() {
        var self = this;

        axios.get('/carsapi/cars/')
            .then(function (response) {
                var data = response.data;
                self.setState({ cars: data })
            })
            .catch(function (error) {
                console.log(error);
            });

        this.fetchcarbrands();
        this.fetchcartransmissions();
        this.fetchcarfueltypes();
    }

    // fetchbrand
    fetchcarbrands = () => {
        var self = this;
        axios.get('/carsapi/carsbrands/')
            .then(response => {
                var data = response.data;
                self.setState({ carbrands: data })

            })
            .catch(err => {
                console.log(err);
            })
    }

    // fetch transmission  http://localhost:8000/carsapi/cartransmissions/
    fetchcartransmissions = () => {
        var self = this;
        axios.get('/carsapi/cartransmissions/')
            .then(response => {
                var data = response.data;
                self.setState({ cartransmissions: data })
                console.log("Tranissmiosafasf")
            })
            .catch(err => {
                console.log(err);
            })
    }

    // fetch fueltype : http://localhost:8000/carsapi/carfueltypes/
    fetchcarfueltypes = () => {
        var self = this;
        axios.get('/carsapi/carfueltypes/')
            .then(response => {
                var data = response.data;
                self.setState({ carfueltypes: data })
            })
            .catch(err => {
                console.log(err);
            })
    }



    //handleinputchange 
    handleInputChange = (event) => {
        const cardetails = { ...this.state['cardetails'] };
        cardetails[event.target.name] = event.target.value;
        this.setState({ cardetails: cardetails });

    }

    // handle image change
    handleImageChange = (event) => {
        const cardetails = { ...this.state['cardetails'] };
        cardetails['carthumbimage'] = event.target.files[0];
        this.setState({ cardetails: cardetails });
    }

    //handle multiple image change for images model
    handleImagesChange = (e) => {
        var images = []

        for (var i = 0; i < e.target.files.length; i++) {
            images.push(e.target.files[i])
        }

        this.setState({
            images: images
        })

    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted", this.state);
        let form_data = new FormData();
        form_data.append('carseller', this.props.authentication.user.profile.user); //change this later
        form_data.append('carthumbimage', this.state.cardetails.carthumbimage, this.state.cardetails.carthumbimage.name);
        form_data.append('carmodel', this.state.cardetails.carmodel);
        form_data.append('carbrand', this.state.cardetails.carbrand);
        form_data.append('cartransmission', this.state.cardetails.cartransmission);
        form_data.append('carfueltype', this.state.cardetails.carfueltype);
        form_data.append('carcondition', this.state.cardetails.carcondition);
        form_data.append('carcolor', this.state.cardetails.carcolor);
        form_data.append('cardoors', this.state.cardetails.cardoors);
        form_data.append('carmileage', this.state.cardetails.carmileage);
        form_data.append('carenginesize', this.state.cardetails.carenginesize);
        form_data.append('cardescription', this.state.cardetails.cardescription);
        form_data.append('carprice', this.state.cardetails.carprice);
        form_data.append('carsold', this.state.cardetails.carsold);

        let url = '/carsapi/cars/';
        let imageurl = '/carsapi/images/';


        console.log(this.state.cardetails);
        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log("Success" + res.data.id)
                console.log("Number of images: " + this.state.images.length)
                var images_data = this.state.images;
                var car_id = res.data.id;

                for (var i = 0; i < images_data.length; i++) {
                    let form_data = new FormData();
                    form_data.append('car', car_id);
                    form_data.append('position', i);
                    form_data.append('file', images_data[i], images_data[i].name);


                    axios.post(imageurl, form_data, {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    }).then(res => {
                        console.log("Image uploaded")
                    })
                        .catch(err => {
                            console.log(err)
                        })
                }  //endfor

                //   clear form

                this.setState({
                    cardetails: {
                        carmodel: '',
                        carbrand: '',
                        cartransmission: '',
                        carfueltype: '',
                        carcondition: '',
                        carcolor: '',
                        cardoors: '',
                        carmileage: '',
                        carenginesize: '',
                        carprice: '',
                        cardescription: '',
                        carsold: false,
                        carthumbimage: "",
                    },
                    images: []
                })


                this.notify();
                this.setState({
                    inputKey: Date.now()
                });

                
            })
            .catch(err => {
                console.log(err);
            })

    };



    notify = () => {
        toast.success("Successfully Added !", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    //capitalize function
    capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    render() {

        var carbrands = this.state.carbrands.map((brand, i) => {
            return (
                <option value={brand.id} key={brand.id}>
                    {this.capitalize(brand.carbrand)}
                </option>
            )
        });

        var cartransmissions = this.state.cartransmissions.map((transmission, i) => {
            return (
                <option value={transmission.id} key={transmission.id}>{this.capitalize(transmission.cartransmissions)}</option>
            )
        });

        var carfueltypes = this.state.carfueltypes.map((fueltype, i) => {
            return (
                <option value={fueltype.id} key={fueltype.id}>{this.capitalize(fueltype.carfueltype)}</option>
            )
        });




        if (this.props.authentication.user) {

            const { user, user_id } = this.props.authentication;

            if (!this.props.authentication.user.profile) {
                return <Redirect to="profile/edit" />
            }
            else {
                console.log(this.props.authentication);
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <MyProfileInfo user={user} />
                            </div>
                            <div className="col-md-8 my-3">
                                <form onSubmit={this.handleFormSubmit} className="col s8 offset-s2">
                                    <div className="row">
                                        <div className="form-group col-sm-12">
                                            <label htmlFor="car_model">Model</label>
                                            <input name="carmodel" onChange={this.handleInputChange} value={this.state.cardetails.carmodel} placeholder="Toyota" id="car_model" type="text" className="validate form-control" required />
                                        </div>

                                        <div className="form-group col-sm-12">
                                            <label htmlFor="carfuel">Brand</label> <br></br>
                                            <select className="btn btn-default border border-info" value={this.state.cardetails.carbrand} name="carbrand" onChange={this.handleInputChange} id="car_brand" required>
                                                <option value="" disabled selected></option>
                                                {carbrands}
                                            </select>

                                        </div>

                                        <div className="form-group col-sm-12">
                                            <label htmlFor="car_transmission">Transmission</label> <br></br>
                                            <select className="btn btn-default border border-info" value={this.state.cardetails.cartransmission} name="cartransmission" id="car_transmission" onChange={this.handleInputChange} required>
                                                <option value="" disabled selected></option>
                                                {cartransmissions}
                                            </select>
                                        </div>

                                        <div className="form-group col-sm-12">
                                            <label htmlFor="carfuel">Fuel Type</label> <br></br>
                                            <select className="btn btn-default border border-info" value={this.state.cardetails.carfueltype} name="carfueltype" id="carfuel" onChange={this.handleInputChange} required>
                                                <option value="" disabled selected></option>
                                                {carfueltypes}
                                            </select>

                                        </div>

                                        <div className="form-group col-sm-12">
                                            <label htmlFor="carcondition">Condition</label> <br></br>
                                            <select className="btn btn-default border border-info" value={this.state.cardetails.carcondition} name="carcondition" id="carcondition" onChange={this.handleInputChange} required>
                                                <option value="" disabled selected></option>
                                                <option value="used">Used</option>
                                                <option value="new">New</option>
                                            </select>

                                        </div>

                                        <div className="form-group col-sm-12">
                                            <label htmlFor="carcolor">Color</label>
                                            <input name="carcolor" placeholder="Black" id="carcolor" value={this.state.cardetails.carcolor} type="text" className="validate form-control" onChange={this.handleInputChange} required/>
                                        </div>

                                        <div className="form-group col-sm-12">
                                            <label htmlFor="cardoors">No. of Doors</label>
                                            <input name="cardoors" placeholder="4" id="cardoors" type="text" value={this.state.cardetails.cardoors} className="validate form-control" onChange={this.handleInputChange} required/>
                                        </div>

                                        <div className="form-group col-sm-12">
                                            <label htmlFor="carmileage">Mileage (km)</label>
                                            <input name="carmileage" placeholder="24000" id="carmileage" type="text" value={this.state.cardetails.carmileage} className="validate form-control" onChange={this.handleInputChange} required />
                                        </div>

                                        <div className="form-group col-sm-12">
                                            <label htmlFor="carengine">Engine Size (Liters)</label>
                                            <input name="carenginesize" placeholder="1.5" id="carengine" type="text" value={this.state.cardetails.carenginesize} className="validate form-control" onChange={this.handleInputChange} required />
                                        </div>

                                        <div className="form-group col-sm-12">
                                            <label htmlFor="carprice">Price (Peso)</label>
                                            <input name="carprice" placeholder="250000" id="carprice" type="text" value={this.state.cardetails.carprice} className="validate form-control" onChange={this.handleInputChange} required />
                                        </div>

                                        <div className="form-group col-sm-12">
                                            <label htmlFor="cardescription">Description</label>
                                            <textarea className="form-control" placeholder="Description" value={this.state.cardetails.cardescription} name="cardescription" id="cardescription" onChange={this.handleInputChange}></textarea>
                                        </div>

                                        <div className="form-group col-sm-12">
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <label htmlFor="image">Thumbnail:</label>
                                                    <input className="btn btn-info btn-sm" type="file"
                                                        id="image"
                                                        key={this.state.inputKey}
                                                        accept="image/png, image/jpeg" onChange={this.handleImageChange} required />
                                                       
                                                </div>
                                            </div>

                                        </div>
                                        <br></br>

                                        <div className="form-group col-sm-12">
                                            <label htmlFor="image">Images: (Select Multiple}</label> <br></br>
                                            <input
                                                className="btn btn-primary btn-sm"
                                                type="file"
                                                multiple
                                                id="images"
                                                key={this.state.inputKey}
                                                accept="image/png, image/jpeg" onChange={this.handleImagesChange} 
                                                required/>

                                        </div>
                                        <br />
                                        <br />
                                        <br />

                                        <div className="input-field col-sm-4 my-5">
                                            <input type="submit" className="btn btn-large btn-danger  shadow " id="addbtn" value="Submit" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        } else {
            return (
                <p>loading ...</p>
            )
        }

    }
}

const mapStateToProps = state => ({
    authentication: state.authReducer
})


export default connect(mapStateToProps, { loadUser })(AddCar);