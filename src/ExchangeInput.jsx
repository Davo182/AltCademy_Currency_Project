import React from "react";

class ExchangeInput extends React.Component {
    

    render() {
        const {currencyList, onChangeCurrency, id, curencySelected} = this.props;
        const keys = Object.keys(currencyList);
        return (
            <div className="container rounded shadow d-flex justify-content-center flex-column align-items-center animate__animated animate__fadeIn">
                <h5 className="align-self-center align-self-md-start my-3 m-md-3">💲 Select a Currency</h5>
                <div className="d-flex flex-row mb-4">
                    <div className="mx-3">🏴</div>
                        <select className="form-select" name="currency" value={curencySelected} id={id} size={1} onChange={onChangeCurrency}>
                            <option value="NOPT" disabled>Select a Currency</option>
                            {keys.map((key, idx) => <option key={idx} value={key}>{key} - {currencyList[key]}</option>)}
                        </select>
                        
                </div>
            </div>
        )
    }
}

export default ExchangeInput;