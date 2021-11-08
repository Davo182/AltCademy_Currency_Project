import React from "react";
import ExchangeInput from "./ExchangeInput";
import ExchangeList from "./ExchangeList";

class Exchanger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currency: "USD",
            currencies: {},
            search: {}
        }

        this.changeCurrency = this.changeCurrency.bind(this);
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
    changeCurrency(e) {
        this.setState({ currency: e.target.value })
        fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${this.state.currency}`)
            .then(resp => {
                if (resp.ok) return resp.json();
                throw new Error('SW');
            })
            .then(data => this.setState({ search: data }))
            .catch(error => console.log(error));
    }

    render() {
        const { base } = this.state.search;
        const { currencies } = this.state;
        const { search } = this.state;
        return (
            <div className=" exchanger container d-flex flex-column align-items-center mt-4 shadow">
                <h2 className="align-self-center align-self-md-start p-3">💱 Exchanger</h2>
                <ExchangeInput currencyList={currencies} onChangeCurrency={this.changeCurrency} id={"currency1"} />
                <ExchangeList rates={search.rates} />
            </div>
        )
    }
}

export default Exchanger;