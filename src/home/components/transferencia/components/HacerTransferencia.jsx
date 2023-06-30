import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import Dropdown from "react-bootstrap/Dropdown";
import {
  apiCuenta,
  apiTipoTransferencia,
  valorModificado,
} from "../api/apiDivisas";
import { Transaccion } from "../models/models.transaccion";
import {
  formOptions,
  formTransaccionHelper,
} from "../helpers/formTransaccionHelper";
import { useLocation } from "react-router-dom";

export const HacerTransferencia = () => {
  const [divisaElegina, setDivisaElegina] = useState("");
  const [divisaEleginaR, setDivisaEleginaR] = useState("");
  const [tipoEvento, setTipoEvento] = useState([]);
  const [cuenta, setCuenta] = useState([]);
  const [transferencia, setTransferencia] = useState(Transaccion);
  const [valoresSeleccionados, setValoresSeleccionados] = useState({
    tipo: "",
    cuenta: "",
  });
  let { search } = useLocation();
  let query = new URLSearchParams(search);

  let idUser = query.get('cuenta');
  const abreviacionesMonedas = [
    "JYP",
    "USD",
    "GTQ", // Quetzal guatemalteco
    "AED", // Dirham de los Emiratos Árabes Unidos
    "AFN", // Afghani afgano
    "ALL", // Lek albanés
    "AMD", // Dram armenio
    "ANG", // Florín de las Antillas Neerlandesas
    "AOA", // Kwanza angoleño
    "ARS", // Peso argentino
    "AUD", // Dólar australiano
    "AWG", // Florín de Aruba
    "AZN", // Manat azerbaiyano
    "BAM", // Marco convertible de Bosnia y Herzegovina
    "BBD", // Dólar de Barbados
    "BDT", // Taka de Bangladesh
    "BGN", // Lev búlgaro
    "BHD", // Dinar de Baréin
    "BIF", // Franco burundés
    "BMD", // Dólar de Bermudas
    "BND", // Dólar de Brunéi
    "BOB", // Boliviano boliviano
    "BRL", // Real brasileño
    "BSD", // Dólar de las Bahamas
    "BTN", // Ngultrum de Bután
    "BWP", // Pula botsuano
    "BYN", // Rublo bielorruso
    "BZD", // Dólar de Belice
    "CAD", // Dólar canadiense
    "CDF", // Franco congoleño
    "CHF", // Franco suizo
    "CLP", // Peso chileno
    "CNY", // Yuan chino
    "COP", // Peso colombiano
    "CRC", // Colón costarricense
    "CUC", // Peso convertible cubano
    "CUP", // Peso cubano
    "CVE", // Escudo caboverdiano
    "CZK", // Corona checa
    "DJF", // Franco yibutiano
    "DKK", // Corona danesa
    "DOP", // Peso dominicano
    "DZD", // Dinar argelino
    "EGP", // Libra egipcia
    "ERN", // Nakfa eritreo
    "ETB", // Birr etíope
    "EUR", // Euro
    "FJD", // Dólar de Fiyi
    "FKP", // Libra de las Islas Malvinas
    "GBP", // Libra esterlina británica
    "GEL", // Lari georgiano
    "GHS", // Cedi ghanés
    "GIP", // Libra de Gibraltar
    "GMD", // Dalasi gambiano
    "GNF", // Franco guineano

    "GYD", // Dólar guyanés
    "HKD", // Dólar de Hong Kong
    "HNL", // Lempira hondureño
    "HRK", // Kuna croata
    "HTG", // Gourde haitiano
    "HUF", // Forint húngaro
    "IDR", // Rupia indonesia
    "ILS", // Shekel israelí
    "INR", // Rupia india
    "IQD", // Dinar iraquí
    "IRR", // Rial iraní
    "ISK", // Corona islandesa
    "JMD", // Dólar jamaicano
    "JOD", // Dinar jordano
    "JPY", // Yen japonés
    "KES", // Chelín keniano
    "KGS", // Som kirguís
    "KHR", // Riel camboyano
    "KMF", // Franco comorano
    "KPW", // Won norcoreano
    "KRW", // Won surcoreano
    "KWD", // Dinar kuwaití
    "KYD", // Dólar de las Islas Caimán
    "KZT", // Tenge kazajo
    "LAK", // Kip laosiano
    "LBP", // Libra libanesa
    "LKR", // Rupia de Sri Lanka
    "LRD", // Dólar liberiano
    "LSL", // Loti lesothense
    "LYD", // Dinar libio
    "MAD", // Dírham marroquí
    "MDL", // Leu moldavo
    "MGA", // Ariary malgache
    "MKD", // Denar macedonio
    "MMK", // Kyat birmano
    "MNT", // Tugrik mongol
    "MOP", // Pataca de Macao
    "MRU", // Ouguiya mauritano
    "MUR", // Rupia mauriciana
    "MVR", // Rufiyaa de Maldivas
    "MWK", // Kwacha malauí
    "MXN", // Peso mexicano
    "MYR", // Ringgit malayo
    "MZN", // Metical mozambiqueño
    "NAD", // Dólar namibio
    "NGN", // Naira nigeriano
    "NIO", // Córdoba nicaragüense
    "NOK", // Corona noruega
    "NPR", // Rupia nepalí
    "NZD", // Dólar neozelandés
    "OMR", // Rial omaní
    "PAB", // Balboa panameño
    "PEN", // Sol peruano
    "PGK", // Kina de Papúa Nueva Guinea
    "PHP", // Peso filipino
    "PKR", // Rupia pakistaní
    "PLN", // Zloty polaco
    "PYG", // Guarani paraguayo
    "QAR", // Rial catarí
    "RON", // Leu rumano
    "RSD", // Dinar serbio
    "RUB", // Rublo ruso
    "RWF", // Franco ruandés
    "SAR", // Riyal saudí
    "SBD", // Dólar de las Islas Salomón
    "SCR", // Rupia de Seychelles
    "SDG", // Libra sudanesa
    "SEK", // Corona sueca
    "SGD",

    ,
  ];
  const viewTipoEventoList = async () => {
    const getListTipoEvento = await apiTipoTransferencia();
    setTipoEvento(getListTipoEvento);
  };
  const viewTipoCuentaList = async () => {
    const getListCuenta = await apiCuenta();
    setCuenta(getListCuenta);
  };
  const handleColorChange = (event) => {
    setDivisaElegina(event.target.value);
   
  };
  const handleColorChangeR = (event) => {
    setDivisaEleginaR(event.target.value);
  };

  const handleChangeValor2 = () => {
    valorModificado();

    let inputs = document.getElementsByName("input2")[0].value;
    
    console.log(inputs);
  };

  useEffect(() => {
    viewTipoEventoList();
    viewTipoCuentaList();
  }, []);

  const idTipoTransferencia = (tipo) =>{
    setValoresSeleccionados({...valoresSeleccionados,tipo:tipo.nombre})
    setTransferencia(() => ({
      ...transferencia,
      tipo_de_transaccion: tipo._id,
    }));
  }
    
    
  const idCuenta = (cuenta) =>{
    setValoresSeleccionados({...valoresSeleccionados,cuenta:cuenta.tipo_de_cuenta.nombre})
    setTransferencia(() => ({ ...transferencia, cuenta_origen: cuenta._id }));
  }
   
  

  const {
    
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);
  const crud = async () => {
    let cantidad = document.getElementsByName("input2")[0].value;
    console.log(cantidad);
    await formTransaccionHelper(transferencia, 1,cantidad);
  }
  console.log(transferencia);
  return (
    <MDBContainer className="py-5" fluid>
      <MDBRow className=" d-flex justify-content-center">
        <MDBCol md="10" lg="8" xl="5">
          <MDBCard className="rounded-3">
            <MDBCardBody className="p-4">
              <form className="formulario" onSubmit={handleSubmit(crud)}>
                <div className="text-center mb-4">
                  <h3>Enviar a:</h3>
                </div>
                <div className="container">
                  <p className="fw-bold mb-4 pb-2">Cuenta para Transaccion</p>
                  <Dropdown id="dropdown-variants-Primary">
                    <Dropdown.Toggle
                      variant="success"
                      className="w-100"
                      id="dropdown-variants-Primary"
                    >
                      {valoresSeleccionados.cuenta || "Tipo de transacción"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="w-100">
                      {cuenta.map((c) => {
                        return (
                          <Dropdown.Item
                            {...register("cuenta_origen")}
                            value={transferencia.cuenta_origen}
                            key={c._id}
                            onClick={() => idCuenta(c)}
                          >
                            {c.tipo_de_cuenta.nombre}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>


                 
                </div>
                <div className="d-flex flex-row align-items-center mb-4 pb-1">
                  <div className="flex-fill mx-3">
                    <p className="fw-bold mb-4 pb-2">
                      Ingrese el numero de cuenta:
                    </p>
                    <MDBInput
                      {...register("cuenta_destino")}
                      type="text"
                      className="form-control"
                      value={idUser ===null ? transferencia.cuenta_destino:idUser}
                      onChange={({ target: { value } }) => {
                        setTransferencia(() => ({
                          ...transferencia,
                          cuenta_destino: value,
                        }));
                      }}
                    />
                    <p className="fw-bold mb-4 pb-2">Usted envia:</p>
                    <div className="form-outline">
                      <div className="row">
                        <div className="col-3">
                          <select
                            className="w-100 h-100"
                            value={
                              divisaEleginaR === "" ? "GTQ" : divisaEleginaR
                            }
                            onChange={handleColorChangeR}
                          >
                            {abreviacionesMonedas.map((divisa) => (
                              <option key={divisa} value={divisa}>
                                {divisa === "" ? "GTQ" : divisa}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-9">
                          <MDBInput
                            className="valor"
                            type="number"
                            name={divisaEleginaR}
                            id={divisaEleginaR === "" ? "GTQ" : divisaEleginaR}
                            onChange={handleChangeValor2}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4 pb-1">
                  <div className="flex-fill mx-3">
                    <p className="fw-bold mb-4 pb-2">Lo recibido será:</p>
                    <div>
                      <div className="row">
                        <div className="col-3">
                          <select
                            className="w-100 h-100"
                            value={divisaElegina === "" ? "GTQ" : divisaElegina}
                            onChange={handleColorChange}
                          >
                            {abreviacionesMonedas.map((divisa) => (
                              <option key={divisa} value={divisa}>
                                {divisa === "" ? "GTQ" : divisa}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-9">
                          <MDBInput
                            {...register("monto")}
                            className="valor"
                            type="number"
                            name="input2"
                            id={divisaElegina === "" ? "GTQ" : divisaElegina}
                            
                            readOnly
                          />
                          
                        </div>
                      </div>
                      <p className="fw-bold mt-4 pb-2">Tipo Transaccion:</p>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="success"
                          className="w-100"
                          id="dropdown-basic"
                        >
                            {valoresSeleccionados.tipo || "Tipo de transacción"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="w-100">
                          {tipoEvento.map((t) => {
                            return (
                              <Dropdown.Item
                                {...register("tipo_de_transaccion")}
                                value={transferencia.tipo_de_transaccion}
                                key={t._id}
                                onClick={() => idTipoTransferencia(t)}
                              >
                                {t.nombre}
                              </Dropdown.Item>
                            );
                          })}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={crud}
                >
                  Enviar
                </button>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
