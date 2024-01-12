import React, { useState, useEffect } from 'react';
import './App.css';
import check from './images/check.png';
import exclamation from './images/exclamation.png';

const cards = [
  {
    percentage: '',
    percentageRest: '',
    restMXN: '',
    restUSD: '',
    restEUR: '',
    currentPaymentMXN: '',
    currentPaymentUSD: '',
    currentPaymentEUR: '',
  },
];

function App() {
  const [data, setData] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState('');
  const [dataCards, setDataCard] = useState(false);
  const [dataCurrency, setDataCurrency] = useState([]);
  const [allDataCards, setAllDataCards] = useState(cards);

  useEffect(() => {
    fetch('http://localhost:3001/datos')
      .then(response => response.json())
      .then(data => (setData(data), setDataFiltered(data)))
      .catch(error => console.error('Error al obtener datos:', error));
  }, []);

  const changeValueHandler = event => {
    const selectedOfficeValue = event.target.value;
    setSelectedOffice(selectedOfficeValue);
    if (selectedOfficeValue === 'All') {
      setDataFiltered(data);
    } else {
      const filteredData = data.filter(
        item => item.office === selectedOfficeValue
      );
      setDataFiltered(filteredData);
    }
  };

  const visualCards = (data, currency, currentPayment) => {
    const dataConverted = parseFloat(data);
    const dataPaymentConverted = parseFloat(currentPayment);

    if (isNaN(dataConverted) || isNaN(dataPaymentConverted)) {
      console.error('Error: Los datos no son números válidos');
      return;
    }

    let MXN, USD, EUR, restMXN, restUSD, restEUR;

    if (currency === 'MXN') {
      USD = dataConverted * 0.055;
      EUR = dataConverted * 0.045;
      restMXN = data - dataPaymentConverted;
      restUSD = USD - currentPayment * 0.055;
      restEUR = EUR - currentPayment * 0.045;
      setDataCurrency([dataConverted, USD, EUR]);
    } else if (currency === 'USD') {
      MXN = dataConverted * 18;
      EUR = dataConverted * 0.91;
      restMXN = MXN - currentPayment * 18;
      restUSD = data - dataPaymentConverted;
      restEUR = EUR - currentPayment * 0.91;
      setDataCurrency([MXN, dataConverted, EUR]);
    } else if (currency === 'EUR') {
      USD = dataConverted * 1.1;
      MXN = dataConverted * 22;
      restMXN = MXN - currentPayment * 22;
      restUSD = USD - currentPayment * 1.1;
      restEUR = data - dataPaymentConverted;
      setDataCurrency([MXN, USD, dataConverted]);
    }

    const percentage = (currentPayment / dataConverted) * 100;
    const percentageRest = 100 - percentage;

    setAllDataCards([
      {
        percentage: percentage,
        percentageRest: percentageRest,
        restMXN: restMXN,
        restUSD: restUSD,
        restEUR: restEUR,
        currentPaymentMXN: dataPaymentConverted,
        currentPaymentUSD: dataPaymentConverted / 18,
        currentPaymentEUR: dataPaymentConverted / 22,
      },
    ]);

    setDataCard(true);
    console.log(allDataCards);
  };

  return (
    <div className="App">
      <header className="header">
        <h1 className="title">Prima por cobrar</h1>
      </header>
      <div className="select-container">
        <select
          className="select"
          value={selectedOffice}
          onChange={changeValueHandler}
        >
          {data.map(item => (
            <option key={item.office} value={item.office}>
              {item.office}
            </option>
          ))}
        </select>
      </div>

      <div className="cards-container">
        {dataCards && (
          <div className="cards">
            <div className="card">
              <h2>Pesos</h2>
              <h3>$ {dataCurrency[0].toFixed(2)}</h3>
              <div className="dataCard">
                <div className="currentpay">
                  <img src={check} className="image" />
                  <p>{allDataCards[0].percentage.toFixed(2)}%</p>
                  {/*por alguna razon esto no esta funcionando*/}
                  <p>{allDataCards[0].currentPaymentMXN.toFixed(2)}</p>
                </div>
                <div className="rest">
                  <img src={exclamation} className="image" />
                  <p>{allDataCards[0].percentageRest.toFixed(2)}%</p>
                  <p>{allDataCards[0].restMXN.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div className="card">
              <h2>Dólares</h2>
              <h3>$ {dataCurrency[1].toFixed(2)}</h3>
              <div className="dataCard">
                <div className="currentpay">
                  <img src={check} className="image" />
                  <p>{allDataCards[0].percentage.toFixed(2)}%</p>
                  {/*por alguna razon esto no esta funcionando*/}
                  <p>{allDataCards[0].currentPaymentUSD.toFixed(2)}</p>
                </div>
                <div className="rest">
                  <img src={exclamation} className="image" />
                  <p>{allDataCards[0].percentageRest.toFixed(2)}%</p>
                  <p>{allDataCards[0].restUSD.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div className="card">
              <h2>Euros</h2>
              <h3>€ {dataCurrency[2].toFixed(2)}</h3>
              <div className="dataCard">
                <div className="currentpay">
                  <img src={check} className="image" />
                  <p>{allDataCards[0].percentage.toFixed(2)}%</p>
                  {/*por alguna razon esto no esta funcionando*/}
                  <p>{allDataCards[0].currentPaymentEUR.toFixed(2)}</p>
                </div>
                <div className="rest">
                  <img src={exclamation} className="image" />
                  <p>{allDataCards[0].percentageRest.toFixed(2)}%</p>
                  <p>{allDataCards[0].restEUR.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Fianza</th>
              <th>Movimientos</th>
              <th>Fiado</th>
              <th>Antigüedad</th>
              <th>Días de vencimiento</th>
              <th>Importe</th>
            </tr>
          </thead>
          <tbody>
            {dataFiltered.map(
              item =>
                item.fianza !== undefined && (
                  <tr
                    key={item.id}
                    className={
                      item.vencimiento > 35
                        ? 'danger'
                        : item.vencimiento > 0
                        ? 'warning'
                        : ''
                    }
                    onClick={() => {
                      visualCards(
                        item.importe,
                        item.currency,
                        item.currentPayment
                      );
                    }}
                  >
                    <td>{item.fianza}</td>
                    <td>{item.movimiento}</td>
                    <td>{item.fiado}</td>
                    <td>{item.antiguedad}</td>
                    <td>{item.vencimiento}</td>
                    <td>{item.importe}</td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
