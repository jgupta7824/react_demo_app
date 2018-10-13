import React, { Component } from 'react';
import Items from './items'
import ItemDetails from './itemDetails'


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { foodItemDetails: [] , itemDetail :{},price :0}
        this.child = React.createRef();
    }
    //called when component gets mounted means started .
    componentDidMount() {
        // Get the list of food items 
        // can be use axios for api /ajax calls
        fetch("https://demo6977951.mockable.io/items/get").then(res => res.json()).then(results => {
            this.setState({ foodItemDetails: results })
        });
    }
    finalPrice = (final,type,value) =>{
        let items = this.state.foodItemDetails;
        items[this.selectedKey]['quantity']  = value;
        this.setState({foodItemDetails:items })
        type === 'add' ?  this.setState({price:this.state.price +final}) : this.setState({price:this.state.price -final})
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="row justify-content-md-center">
                            <div className="panel panel-primary">
                                <div className="panel-body">
                                    <div className="col-sm-6 col-md-6 col-lg-6">
                                        <div className="panel panel-primary">
                                            <div className="panel-body">
                                                <div className="panel-heading">
                                                    <div className="container-fluid">
                                                        <div className="row justify-content-md-center">
                                                            <h2 className="text-center">Menu Items</h2>
                                                        </div>
                                                        {/* //iterate a loop for every food item so it can be used later */}
                                                        <div className="row justify-content-md-center">
                                                            {this.state.foodItemDetails.map((item, i) => {
                                                                
                                                                return(<Items 
                                                                key = { i }
                                                                item = { item }
                                                                viewItemDetail={(item) =>{
                                                                    this.setState({itemDetail : item})
                                                                    this.selectedKey = i
                                                                    this.child.current.updateQuantityValue();
                                                                }}
                                                                />)
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-6 col-lg-6">
                                        <div className="panel panel-primary">
                                            <div className="panel-body">
                                                <div className="panel-heading">
                                                    <div className="container-fluid">
                                                        <div className="row justify-content-md-center">
                                                            <h2 className="text-center">Item Details</h2>
                                                        </div>
                                                        <div className="row justify-content-md-center">
                                                            <div className="card-body">
                                                            <ItemDetails itemData = {this.state.itemDetail} quantityChanged = {this.finalPrice} ref={this.child}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col-sm-4 col-lg-4 col-sm-offset-1">
                                        <label className="h1 control-label">Total Items: {this.state.foodItemDetails.length}</label>
                                    </div>
                                    <div className="col-sm-4 col-lg-4 col-sm-offset-1">
                                        <label className="h1 control-label">Price: ${this.state.price}</label>
                                    </div>
                                    <div className="col-sm-2 col-lg-2 margin-top">
                                   <label> <input type="submit" value="Checkout" className="btn btn-success" onClick= {() =>
                                      this.state.price > 0 ? alert('Your order will be delivered in 30 mins . ' ) :alert('Please select a item . ' )
                                   } />
                                   </label>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;