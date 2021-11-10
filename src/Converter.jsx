import React from "react";
import ExchangeInput from "./ExchangeInput";

import Chart from 'chart.js/auto';

class Converter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currencieOne: "NOPT",
            currencieTwo: "NOPT",
            currencies: {},
            amount: 1.0,
            result: {},
            amountConverted: 0.0,
            chart: undefined
        }

        this.chartRef = React.createRef();
        //this.chart = undefined;

        this.changeInput = this.changeInput.bind(this);
        this.convert = this.convert.bind(this);
        this.swap = this.swap.bind(this);
        this.getHistoricalRates = this.getHistoricalRates.bind(this);
        this.buildChart = this.buildChart.bind(this);
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
        if (e.target.id === "amount") this.setState({ amount: e.target.value });
    }

    convert() {
        const { currencieOne, currencieTwo, amount } = this.state;
        if (currencieOne !== "NOPT" && currencieTwo !== "NOPT") {

            fetch(`https://altexchangerateapi.herokuapp.com/latest?amount=${amount}&from=${currencieOne}&to=${currencieTwo}`)
                .then(resp => {
                    if (resp.ok) return resp.json();
                    throw new Error('SW');
                })
                .then(data => {
                    this.setState({ result: data.rates });
                    this.setState({ amountConverted: data.rates[currencieTwo] });
                    this.getHistoricalRates();
                })
                .catch(error => window.alert("Please, select a valid Currency"));
        } else window.alert("Please select a currency");
    }

    swap() {
        const { currencieOne, currencieTwo, amountConverted, amount } = this.state;
        this.setState({ amount: amountConverted, amountConverted: amount });
        this.setState({ currencieOne: currencieTwo, currencieTwo: currencieOne });
    }

    getHistoricalRates() {
        const { currencieOne, currencieTwo } = this.state;
        const endDate = new Date().toISOString().split("T")[0];
        const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
        fetch(`https://altexchangerateapi.herokuapp.com/${startDate}..${endDate}?from=${currencieOne}&to=${currencieTwo}`)
            .then(resp => {
                if (resp.ok) return resp.json();
                throw new Error('SW');
            })
            .then(data => {
                console.log(data);
                const chartLabels = Object.keys(data.rates);
                const chartData = Object.values(data.rates).map(rate => rate[currencieTwo]);
                const chartLabel = `${currencieOne}/${currencieTwo}`;
                this.buildChart(chartLabels, chartData, chartLabel);
            })
            .catch((error) => console.log(error));
    }

    buildChart(labels, data, label) {
        if (this.state.chart !== undefined) this.chart.destroy();
        this.setState({chart: new Chart(this.chartRef.current.getContext("2d"), {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: label,
                        data,
                        fill: false,
                        tension: 0,
                        borderColor: '#157347',
                    }
                ]
            },
            options: {
                responsive: true,
            }
        })})
    }

    render() {
        const { currencies, amount, amountConverted, currencieOne, currencieTwo } = this.state;
        return (
            <div>
                <div className=" container d-flex flex-column align-items-center mt-4 shadow">
                    <h2 className="align-self-center align-self-md-start p-3">💱 Converter</h2>
                    <div className="row w-100">
                        <div className="col-12 col-md-5">
                            <ExchangeInput currencyList={currencies} curencySelected={currencieOne !== "" ? currencieOne : "NOPT"} id={"currency1"} onChangeCurrency={this.changeInput} />
                            <div className="p-3 shadow mt-3">
                                <label htmlFor="amount">Amount</label>
                                <input className="form-control" type="number" placeholder="Amount" id="amount" value={amount} onChange={this.changeInput} />
                            </div>
                        </div>
                        <div className="col-12 col-md-2 d-flex flex-column justify-content-center align-items-center">
                            <h3 className="my-4 text-center">To</h3>
                            <button className="btn btn-outline-success mb-3" onClick={this.swap}><i class="bi bi-arrow-left-right"></i></button>
                        </div>
                        <div className="col-12 col-md-5">
                            <ExchangeInput currencyList={currencies} curencySelected={currencieTwo !== "" ? currencieTwo : "NOPT"} id={"currency2"} onChangeCurrency={this.changeInput} />
                            <div className="p-3 shadow mt-3">
                                <label htmlFor="amountResult">Result</label>
                                <input className="form-control" type="number" id="amountResult" placeholder="Amount" disabled value={amountConverted} />
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-success m-4 w-25 text-white" onClick={this.convert}><i class="bi bi-currency-exchange"></i> Convert</button>
                </div>
                <div className={`my-3 shadow ${this.state.chart !== undefined ? 'd-block' : 'd-none'}`}>
                    <canvas ref={this.chartRef} />
                </div>
            </div>
        )
    }
}

export default Converter;