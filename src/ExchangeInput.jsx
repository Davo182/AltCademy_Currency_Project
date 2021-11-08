import React from "react";

class ExchangeInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {currencyList, onChangeCurrency, id } = this.props;
        const keys = Object.keys(currencyList);
        return (
            <div className="exchange-input container rounded shadow d-flex justify-content-center flex-column align-items-center animate__animated animate__fadeIn">
                <h5 className="align-self-center align-self-md-start my-3 m-md-3">💲 Select a Currency</h5>
                <div className="d-flex flex-row mb-4">
                    <div className="mx-3">🏴</div>
                    <form action="">
                        <select className="form-select" name="currency" id={id} size={1} onChange={onChangeCurrency}>
                            <option value="">Select a Currency</option>
                            {keys.map((key, idx) => <option key={idx} value={key}>{key} - {currencyList[key]}</option>)}
                        </select>
                    </form>
                </div>
            </div>
        )
    }
}

export default ExchangeInput;