import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchSellerInfo } from '../../actions/carsAction';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { resolveSoa } from 'dns';


class CarSeller extends Component {

    componentDidMount() {
        this.props.fetchSellerInfo(this.props.sellerId);
    }


    render() {


        const { sellerId } = this.props;

        var seller = this.props.seller;

        if (seller) {
            if (seller.profile) {
                return (
                    <div>
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <h5 className="font-weight-normal">Seller Information</h5>
                                    <div className="card p-3 text-center ">
                                        <img src={seller.profile ? seller.profile.profilepic : 'loading..'} className="my-2 d-block mx-auto rounded-circle" width="100px" height="100px" alt={seller.firstname + '' + seller.last_name} />
                                        <p>{seller.first_name} {seller.last_name}</p>
                                        <p>{seller.email}</p>
                                        <p className='text-success'>{seller.profile ? seller.profile.phone : 'loading...'}</p>
                                        <p>{seller.profile ? <div>{seller.profile.address} , {seller.profile.city} <br /> {seller.profile.country}</div> : 'na'}</p>

                                        <div className="card-footer">
                                            {/* <Link className="btn btn-outline-danger">View Profile</Link> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )
            }
        }
        else {
            return (
                <h3>Loading seller information...</h3>
            )
        }
    }
}




const mapStateToProps = state => ({
    seller: state.carReducer.seller
})

export default connect(mapStateToProps, { fetchSellerInfo })(CarSeller);