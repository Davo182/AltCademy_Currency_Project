import React from "react";

class ExchangeList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { rates } = this.props;
        if (rates) {
            const ratesList = Object.keys(rates);

            return (
                <div className="exchange-list mt-4 mb-2 d-flex flex-column align-items-center">
                    {ratesList.map((el, idx) => <div key={idx} className=" exchange-list-item w-75 rounded shadow py-3 my-3 text-center animate__animated animate__backInLeft">🏴 {el} - {rates[el]}</div>)}
                </div>
            )
        }

        return (<div className="exchange-list m-3 p-5 shadow d-flex justify-content-center align-items-center text-black-50">➕ Please Select a Currency</div>)

    }
}

export default ExchangeList;