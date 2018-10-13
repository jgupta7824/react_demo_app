import React, { Component } from 'react';

class ItemDetails extends Component {
    constructor(){
       super();
       this.state = {quantity :0}
    }
    updateQuantityValue(){
        setTimeout(() =>{
           this.setState({quantity : this.props.itemData.quantity ? this.props.itemData.quantity :0 })
        },0)
        
    }
    render() {
        return (
            <div>
                <div className='row'>
                    <div className="col-xs-12 ">
                        <img
                            src={this.props.itemData.imageUrl}
                            className="img-responsive img" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <h1>{this.props.itemData.itemName}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <p className="list-group-item-text">{this.props.itemData.itemDetails}</p>
                    </div>
                </div>

                {this.props.itemData && Object.keys(this.props.itemData).length > 0 ? <div> <div className="row">
                    <div className="col-xs-12">
                        <h1>Ingridents : </h1>
                    </div>
                </div> <div className="row">
                        <div className="col-xs-12">
                            <ul className="list-group">
                                {this.props.itemData.itemIngridents.map((item, index) => {
                                    return (
                                        <li className="list-group-item">{item}</li>
                                    )
                                })}

                            </ul>
                        </div>
                    </div> </div> : ''
                }
                {this.props.itemData.itemName ?   <div className="input-group">
                    <span className="input-group-btn">
                        <button type="button" className="btn btn-default btn-number" disabled={this.state.quantity === 0} data-type="minus" data-field="quant[1]" onClick = {
                            () =>{
                                this.state.quantity--;
                                 this.props.quantityChanged(this.props.itemData.itemPrice, 'remove',this.state.quantity)
                            }
                        }>
                            <span className="glyphicon glyphicon-minus"></span>
                        </button>
                    </span>
                    <input type="text" name="quant[1]" className="form-control input-number" value={this.state.quantity} min="1" max="10"  ></input>
                    <span className="input-group-btn">
                        <button type="button" className="btn btn-default btn-number" data-type="plus" data-field="quant[1]" onClick = {
                            () =>{
                                this.state.quantity++
                                 this.props.quantityChanged(this.props.itemData.itemPrice ,'add',this.state.quantity)
                            }
                        }>
                            <span className="glyphicon glyphicon-plus"></span>
                        </button>
                    </span>
                </div>: ''
                }
            </div>
        )
    }
}

export default ItemDetails