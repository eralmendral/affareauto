import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchCars } from '../../actions/carsAction';
import axios from 'axios';

import Currency from 'react-currency-formatter';
import { Link } from 'react-router-dom'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class MyCars extends Component {

    state = {
        mycars: []
    }

    componentDidMount() {
        this.props.fetchCars();
    }



    handleDelete = (id, sellerid) => {

        var result = window.confirm("Are you sure to delete?");
        if (result) {
            if (this.props.user === sellerid) {
                axios.delete(`/carsapi/cars/${id}/`)
                    .then(res => {
                        this.notify();
                        //    window.location.reload();
                    })
                    .catch((err => {
                        console.log(err)
                    }))

                console.log("allowed");
            }
        }
    }


    notify = () => {
        toast.success("Successfully Deleted !", {
            position: toast.POSITION.TOP_RIGHT
        });

        setTimeout(() => {
            window.location.reload();
        }, 1000)
    }

    handleUpdateSold = (id) => {


        axios.patch(`/carsapi/cars/${id}/`, {
            carsold: true
        }).then(res => {
            console.log("Success", res)
            toast.success("Successfully Updated !", {
                position: toast.POSITION.TOP_RIGHT
            });

            setTimeout(() => {
                window.location.reload();
            }, 1000)
        }).catch(err => {
            console.log("Error err")
        })
    }

    handleUpdateNotSold = (id) => {


        axios.patch(`/carsapi/cars/${id}/`, {
            carsold: false
        }).then(res => {
            console.log("Success", res)
            toast.success("Successfully Updated To Not Sold!", {
                position: toast.POSITION.TOP_RIGHT
            });
            setTimeout(() => {
                window.location.reload();
            }, 1000)

        }).catch(err => {
            console.log("Error err")
        })
    }


    render() {

        const columns = ["Image", "Brand", "Model", "Price", "Status"];
        const options = {
            filterType: "dropdown",
            responsive: "scroll"
        };

        var mycars = this.props.cars.filter(car => {
            return car.carseller === this.props.userid;
        })
        mycars = mycars.map(car => {
            return (
                <tr key={car.id}>
                    <td className="text-center"><img src={car.carthumbimage} alt={car.carbrand + ' ' + car.carmodel} width="70px" height="50px" /></td>
                    <td className="text-center"> {car.carbrand}</td>
                    <td className="text-center">  {car.carmodel}</td>
                    <td className="text-center"> <Currency
                        quantity={car.carprice}
                        currency="PHP"
                        decimal="."
                        group=","
                    /></td>
                    <td className="text-center"> {car.carsold ? <b className="text-danger"> Sold</b> : <b className="text-success">Not Sold</b>}</td>
                    <td className="text-center">

                        {car.carsold ?
                            <i className="fa fa-chevron-circle-left text-warning fa-lg mx-2" title="Update Car as Not Sold" onClick={() => this.handleUpdateNotSold(car.id)}></i>
                            :
                            <i className="fas fa-check-circle text-primary fa-lg mx-2" title="Update Car as Sold" onClick={() => this.handleUpdateSold(car.id)}></i>
                        }

                        <a href={`/cars/${car.id}`}>  <i className="fas fa-eye text-success mx-2 fa-lg"  ></i></a>
                        <i className="fas fa-trash text-danger mx-2 fa-lg" onClick={() => { this.handleDelete(car.id, car.carseller) }}></i>

                    </td>


                </tr>
            )
        })


        return (
            <div>
                <table className="table mt-3 ">
                    <thead>
                        <tr>
                            <th className="text-center">Image</th>
                            <th className="text-center">Brand</th>
                            <th className="text-center">Model</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mycars}
                    </tbody>
                </table>



            </div>
        )
    }
}


const mapStateToProps = state => ({
    cars: state.carReducer.cars,
    user: state.authReducer.user.profile.user
})


export default connect(mapStateToProps, { fetchCars })(MyCars);