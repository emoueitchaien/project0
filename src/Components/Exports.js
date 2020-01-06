import React,{Component} from "react";
import { CssBaseline } from "@material-ui/core";
import axios from 'axios';

// import Inputs from "./Inputs";
import Inputs from "./Inputs";

const classes = {
  root: {
    marginTop: 80,
    marginLeft: 60
  }
};

class Exports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      Total: 0,
      ProductName: "",
      userName: "",
      userPno: "",
      selectedProduct: [],
      quantity: "",
      radio: "",
      rate: 0
    };
  }
  //handling Data events ------------------------------------------//
  componentDidMount = () => {
    axios.get("http://localhost:5000/products").then((res) => {
      this.setState({ products: res.data });
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const newData = {
      ProductName: this.state.ProductName,
      Total: this.state.Total,
      Customer: this.state.userName,
      Customer_Phone_No: this.state.userPno
    };

    axios
      .post("http://localhost:5000/exports/", newData)
      .then(() => alert("Data is added!"))
      .catch((err) => alert(err));

    this.handleReset();
  };
  handleReset = () => {
    this.setState({
      Total: 0,
      ProductName: "",
      userName: "",
      userPno: "",
      quantity: "",
      selectedProduct: [],
      radio: "",
      rate: 0
    });
  };
  //handling user input events----------------------------------------//
  handleProductChange = (event) => {
    let obj = this.state.products.find(
      (query) => query.ProductName === event.target.value
    );
    this.setState({
      ProductName: event.target.value,
      selectedProduct: obj
    });
  };
  handleRadio = (event) => {
    this.setState({
      radio:event.target.value,
    },()=>{
      let rate =
      this.state.radio === "perkg"
        ? this.state.selectedProduct.PricePerKg
        : this.state.selectedProduct.PricePerBag;
      this.setState({
        rate:rate
      })
    })
  };
  handleQChange =(event) => {
    this.setState({quantity : event.target.value },()=>{
      let total = this.state.rate*this.state.quantity;
      this.setState({
        Total:total
      })
    });
  };
  handleChange=(input)=>(event)=>{
    this.setState({[input]:event.target.value})
  };
  render() {
    return (
      <CssBaseline>
        <div style={classes.root}>
          <h1 align="center">Exports Page</h1>
          <Inputs
            mode={1}
            state={this.state}
            handleSubmit={this.handleSubmit}
            handleReset={this.handleReset}
            handleProductChange={this.handleProductChange}
            handleRadio={this.handleRadio}
            handleQChange={this.handleQChange}
            handleChange={this.handleChange}
          />
        </div>
      </CssBaseline>
    );
  }
}

export default Exports;
