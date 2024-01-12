const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

const datos = [
  {
    office: 'All',
    
  },

  {
    fianza: '1954-0000',
    movimiento: 'Expedicion',
    fiado: 'AGROGEN S.A DE C.V',
    antiguedad: '200',
    vencimiento: '92',
    importe: '200000',
    currency: 'MXN',
    office: 'CDMX',
    currentPayment: '100000'
  },

  {
    fianza: '8524-0000',
    movimiento: 'Expedicion',
    fiado: 'DOMANI S.A DE C.V',
    antiguedad: '150',
    vencimiento: '61',
    importe: '150000',
    currency: 'USD',
    office: 'SONORA',
    currentPayment: '100000'
  },

  {
    fianza: '1585-0000',
    movimiento: 'Ampliacion',
    fiado: 'AUTO SERVICIO COAHUILA S.A DE C.V',
    antiguedad: '98',
    vencimiento: '31',
    importe: '20000',
    currency: 'MXN',
    office: 'COAHUILA',
    currentPayment: '5000'
  },

  {
    fianza: '1845-0000',
    movimiento: 'Prorroga',
    fiado: 'BARCO QUIREZA FRANCISCO',
    antiguedad: '63',
    vencimiento: '33',
    importe: '980000',
    currency: 'EUR',
    office: 'YUCATAN',
    currentPayment: '800000'
  },

  {
    fianza: '9711-0457',
    movimiento: 'Ampliacion',
    fiado: 'CASA GALLARDO S.A DE C.V',
    antiguedad: '20',
    vencimiento: '0',
    importe: '1000000',
    currency: 'USD',
    office: 'SINAOA',
    currentPayment: '700000'
  },

  {
    fianza: '6587-0457',
    movimiento: 'Prorroga',
    fiado: 'ARROGEN S.A DE C.V',
    antiguedad: '15',
    vencimiento: '0',
    importe: '80000',
    currency: 'MXN',
    office: 'JALISCO',
    currentPayment: '50000'
  },
];

app.get('/datos', (req, res) => {
  res.json(datos);
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
