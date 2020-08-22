import React, { Component } from 'react'

class Filter extends Component {
    render() {
        return (
            <div className="text-center  ">
                <div className="card p-3">
                    <div className="form">
                        <div className="form-group">
                            <input type="submit" className="btn btn-danger rounded-0 w-75" value="Apply"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="condition"><small>Condition</small></label>
                            <select name="fuel_type" id="" className="btn d-inline-block w-100 rounded-0 btn-outline-danger mb-3">
                                <option value="" selected disabled></option>
                                <option value="">Diesel</option>
                                <option value="">LPG</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="condition"><small>Condition</small></label>
                            <select name="fuel_type" id="" className="btn d-inline-block w-100 rounded-0 btn-outline-danger mb-3">
                                <option value="" selected disabled></option>
                                <option value="">Diesel</option>
                                <option value="">LPG</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="condition"><small>Condition</small></label>
                            <select name="fuel_type" id="" className="btn d-inline-block w-100 rounded-0 btn-outline-danger mb-3">
                                <option value="" selected disabled></option>
                                <option value="">Diesel</option>
                                <option value="">LPG</option>
                            </select>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default Filter;