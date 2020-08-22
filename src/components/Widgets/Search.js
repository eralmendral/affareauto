import React, { Component } from 'react'

class Search extends Component {

    handleSearch = (e) => {
        console.log(e.target.value)
    }

    render() {
        return (
            <div>
                <form >
                    <div className="form-group">
                        <input type="text" onChange={this.handleSearch} className="form-control rounded-0 border border-top-0 border-right-0 border-left-0" placeholder="search..." />
                    </div>
                </form>
            </div>
        )
    }
}


export default  Search