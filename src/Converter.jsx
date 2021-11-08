import React from "react";
import ExchangeInput from "./ExchangeInput";

class Converter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currencieOne: "",
            currencieTwo: "",
            currencies: {},
            amount: 1.0,
            result: {}
        }

        this.changeInput = this.changeInput.bind(this);
        this.convert = this.convert.bind(this);
    }

    componentDidMount() {
        fetch('https://altexchangerateapi.herokuapp.com/currencies')
            .then(resp => {
                if (resp.ok) return resp.json();
                throw new Error('SW');
            })
            .then(data => this.setState({ currencies: data }))
            .catch(error => console.log(error));
    }

    changeInput(e) {
        const { value } = e.target;
        if (value && e.target.id === "currency1") this.setState({ currencieOne: value });
        if (value && e.target.id === "currency2") this.setState({ currencieTwo: value });
    }

    convert() {
        const {currencieOne, currencieTwo} = this.state;
        fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${currencieOne}&to=${currencieTwo}`)
            .then(resp => {
                if (resp.ok) return resp.json();
                throw new Error('SW');
            })
            .then(data => this.setState({ result: data.rates }))
            .catch(error => console.log(error));
    }

    

    render() {
        const { currencies, amount, result } = this.state;
        console.log(result);
        
        return (
            <div className=" exchanger container d-flex flex-column align-items-center mt-4 shadow">
                <h2 className="align-self-center align-self-md-start p-3">💱 Converter</h2>
                <ExchangeInput currencyList={currencies} id={"currency1"} onChangeCurrency={this.changeInput} />
                <input type="number" placeholder="Amount" value={amount} />
                <h5 className="my-4">To</h5>
                <ExchangeInput currencyList={currencies} id={"currency2"} onChangeCurrency={this.changeInput} />
                <input type="number" placeholder="Amount" disabled value={result[this.state.currencieTwo]} />
                <button className="btn btn-info mb-3" onClick={this.convert}>Convert</button>

            </div>
        )
    }
}

export default Converter;