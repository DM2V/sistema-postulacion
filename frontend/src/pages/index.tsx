import Navbar from "@/components/Layout/Navbar";
import HomePage from '../pages/Public/Home';
import Campus from './Public/Campus';
import Schedule from "./Public/Schedule";
import Offer from "./Public/Offer";
import Signup from "./Public/Signup";
import PersonalDataPage from "./Private/PersonalData";

import Pocketbase from 'pocketbase';
import { useEffect } from "react";

export default function Home() {
  
  const records = [
    {
      "CODIGO": "SE",
      "DESCRIPCION": "SUECIA"
    },
    {
      "CODIGO": "SR",
      "DESCRIPCION": "SURINAM"
    },
    {
      "CODIGO": "TW",
      "DESCRIPCION": "TAIWAN"
    },
    {
      "CODIGO": "TJ",
      "DESCRIPCION": "TAYIKISTAN"
    },
    {
      "CODIGO": "IO",
      "DESCRIPCION": "TERRITORIO BRITANICO DEL OCEANO INDICO"
    },
    {
      "CODIGO": "TO",
      "DESCRIPCION": "TONGA"
    },
    {
      "CODIGO": "TN",
      "DESCRIPCION": "TUNEZ"
    },
    {
      "CODIGO": "TM",
      "DESCRIPCION": "TURKMENISTAN"
    },
    {
      "CODIGO": "UG",
      "DESCRIPCION": "UGANDA"
    },
    {
      "CODIGO": "VU",
      "DESCRIPCION": "VANUATU"
    },
    {
      "CODIGO": "VN",
      "DESCRIPCION": "VIETNAM"
    },
    {
      "CODIGO": "WF",
      "DESCRIPCION": "WALLIS Y FUTUNA"
    },
    {
      "CODIGO": "AF",
      "DESCRIPCION": "AFGANISTAN"
    },
    {
      "CODIGO": "AL",
      "DESCRIPCION": "ALBANIA"
    },
    {
      "CODIGO": "DZ",
      "DESCRIPCION": "ARGELIA"
    },
    {
      "CODIGO": "AD",
      "DESCRIPCION": "ANDORRA"
    },
    {
      "CODIGO": "AO",
      "DESCRIPCION": "ANGOLA"
    },
    {
      "CODIGO": "AG",
      "DESCRIPCION": "ANTIGUA Y BARBUDA"
    },
    {
      "CODIGO": "AZ",
      "DESCRIPCION": "AZERBAIYAN"
    },
    {
      "CODIGO": "AR",
      "DESCRIPCION": "ARGENTINA"
    },
    {
      "CODIGO": "AU",
      "DESCRIPCION": "AUSTRALIA"
    },
    {
      "CODIGO": "AT",
      "DESCRIPCION": "AUSTRIA"
    },
    {
      "CODIGO": "BS",
      "DESCRIPCION": "BAHAMAS"
    },
    {
      "CODIGO": "BH",
      "DESCRIPCION": "BAREIN"
    },
    {
      "CODIGO": "BD",
      "DESCRIPCION": "BANGLADES"
    },
    {
      "CODIGO": "AM",
      "DESCRIPCION": "ARMENIA"
    },
    {
      "CODIGO": "BB",
      "DESCRIPCION": "BARBADOS"
    },
    {
      "CODIGO": "BE",
      "DESCRIPCION": "BELGICA"
    },
    {
      "CODIGO": "BM",
      "DESCRIPCION": "BERMUDAS"
    },
    {
      "CODIGO": "BT",
      "DESCRIPCION": "BUTAN"
    },
    {
      "CODIGO": "BO",
      "DESCRIPCION": "BOLIVIA"
    },
    {
      "CODIGO": "BA",
      "DESCRIPCION": "BOSNIA Y HERZEGOVINA"
    },
    {
      "CODIGO": "BW",
      "DESCRIPCION": "BOTSUANA"
    },
    {
      "CODIGO": "BV",
      "DESCRIPCION": "ISLA BOUVET"
    },
    {
      "CODIGO": "BR",
      "DESCRIPCION": "BRASIL"
    },
    {
      "CODIGO": "BZ",
      "DESCRIPCION": "BELICE"
    },
    {
      "CODIGO": "SB",
      "DESCRIPCION": "ISLAS SALOMON"
    },
    {
      "CODIGO": "VG",
      "DESCRIPCION": "ISLAS VIRGENES BRITANICAS"
    },
    {
      "CODIGO": "BN",
      "DESCRIPCION": "BRUNEI"
    },
    {
      "CODIGO": "BG",
      "DESCRIPCION": "BULGARIA"
    },
    {
      "CODIGO": "MM",
      "DESCRIPCION": "BIRMANIA"
    },
    {
      "CODIGO": "BI",
      "DESCRIPCION": "BURUNDI"
    },
    {
      "CODIGO": "BY",
      "DESCRIPCION": "BIELORRUSIA"
    },
    {
      "CODIGO": "KH",
      "DESCRIPCION": "CAMBOYA"
    },
    {
      "CODIGO": "CM",
      "DESCRIPCION": "CAMERUN"
    },
    {
      "CODIGO": "CA",
      "DESCRIPCION": "CANADA"
    },
    {
      "CODIGO": "CV",
      "DESCRIPCION": "CABO VERDE"
    },
    {
      "CODIGO": "KY",
      "DESCRIPCION": "ISLAS CAIMAN"
    },
    {
      "CODIGO": "CF",
      "DESCRIPCION": "REPUBLICA CENTROAFRICANA"
    },
    {
      "CODIGO": "TD",
      "DESCRIPCION": "CHAD"
    },
    {
      "CODIGO": "CL",
      "DESCRIPCION": "CHILE"
    },
    {
      "CODIGO": "CN",
      "DESCRIPCION": "CHINA"
    },
    {
      "CODIGO": "CX",
      "DESCRIPCION": "ISLA DE NAVIDAD"
    },
    {
      "CODIGO": "CC",
      "DESCRIPCION": "ISLAS COCOS"
    },
    {
      "CODIGO": "CO",
      "DESCRIPCION": "COLOMBIA"
    },
    {
      "CODIGO": "KM",
      "DESCRIPCION": "COMORAS"
    },
    {
      "CODIGO": "YT",
      "DESCRIPCION": "MAYOTTE"
    },
    {
      "CODIGO": "CG",
      "DESCRIPCION": "REPUBLICA DEL CONGO"
    },
    {
      "CODIGO": "CD",
      "DESCRIPCION": "REP. DEM. DEL CONGO"
    },
    {
      "CODIGO": "CK",
      "DESCRIPCION": "ISLAS COOK"
    },
    {
      "CODIGO": "CR",
      "DESCRIPCION": "COSTA RICA"
    },
    {
      "CODIGO": "HR",
      "DESCRIPCION": "CROACIA"
    },
    {
      "CODIGO": "CU",
      "DESCRIPCION": "CUBA"
    },
    {
      "CODIGO": "CY",
      "DESCRIPCION": "CHIPRE"
    },
    {
      "CODIGO": "CZ",
      "DESCRIPCION": "REPUBLICA CHECA"
    },
    {
      "CODIGO": "BJ",
      "DESCRIPCION": "BENIN"
    },
    {
      "CODIGO": "DK",
      "DESCRIPCION": "DINAMARCA"
    },
    {
      "CODIGO": "DM",
      "DESCRIPCION": "DOMINICA"
    },
    {
      "CODIGO": "SV",
      "DESCRIPCION": "EL SALVADOR"
    },
    {
      "CODIGO": "GQ",
      "DESCRIPCION": "GUINEA ECUATORIAL"
    },
    {
      "CODIGO": "ET",
      "DESCRIPCION": "ETIOPIA"
    },
    {
      "CODIGO": "ER",
      "DESCRIPCION": "ERITREA"
    },
    {
      "CODIGO": "EE",
      "DESCRIPCION": "ESTONIA"
    },
    {
      "CODIGO": "FO",
      "DESCRIPCION": "ISLAS FEROE"
    },
    {
      "CODIGO": "FK",
      "DESCRIPCION": "ISLAS MALVINAS"
    },
    {
      "CODIGO": "GS",
      "DESCRIPCION": "ISLAS GEORGIAS DEL SUR Y SANDWICH DEL SUR"
    },
    {
      "CODIGO": "FJ",
      "DESCRIPCION": "FIYI"
    },
    {
      "CODIGO": "FI",
      "DESCRIPCION": "FINLANDIA"
    },
    {
      "CODIGO": "AX",
      "DESCRIPCION": "ÅLAND"
    },
    {
      "CODIGO": "FR",
      "DESCRIPCION": "FRANCIA"
    },
    {
      "CODIGO": "GF",
      "DESCRIPCION": "GUAYANA FRANCESA"
    },
    {
      "CODIGO": "PF",
      "DESCRIPCION": "POLINESIA FRANCESA"
    },
    {
      "CODIGO": "TF",
      "DESCRIPCION": "TERRITORIOS AUSTRALES FRANCESES"
    },
    {
      "CODIGO": "DJ",
      "DESCRIPCION": "YIBUTI"
    },
    {
      "CODIGO": "GA",
      "DESCRIPCION": "GABON"
    },
    {
      "CODIGO": "GE",
      "DESCRIPCION": "GEORGIA"
    },
    {
      "CODIGO": "GM",
      "DESCRIPCION": "GAMBIA"
    },
    {
      "CODIGO": "PS",
      "DESCRIPCION": "AUTORIDAD NACIONAL PALESTINA"
    },
    {
      "CODIGO": "DE",
      "DESCRIPCION": "ALEMANIA"
    },
    {
      "CODIGO": "GH",
      "DESCRIPCION": "GHANA"
    },
    {
      "CODIGO": "GI",
      "DESCRIPCION": "GIBRALTAR"
    },
    {
      "CODIGO": "KI",
      "DESCRIPCION": "KIRIBATI"
    },
    {
      "CODIGO": "GR",
      "DESCRIPCION": "GRECIA"
    },
    {
      "CODIGO": "GL",
      "DESCRIPCION": "GROENLANDIA"
    },
    {
      "CODIGO": "GD",
      "DESCRIPCION": "GRANADA"
    },
    {
      "CODIGO": "GP",
      "DESCRIPCION": "GUADALUPE"
    },
    {
      "CODIGO": "GU",
      "DESCRIPCION": "GUAM"
    },
    {
      "CODIGO": "GT",
      "DESCRIPCION": "GUATEMALA"
    },
    {
      "CODIGO": "GN",
      "DESCRIPCION": "GUINEA"
    },
    {
      "CODIGO": "GY",
      "DESCRIPCION": "GUYANA"
    },
    {
      "CODIGO": "HT",
      "DESCRIPCION": "HAITI"
    },
    {
      "CODIGO": "HM",
      "DESCRIPCION": "ISLAS HEARD Y MCDONALD"
    },
    {
      "CODIGO": "VA",
      "DESCRIPCION": "CIUDAD DEL VATICANO"
    },
    {
      "CODIGO": "HN",
      "DESCRIPCION": "HONDURAS"
    },
    {
      "CODIGO": "HK",
      "DESCRIPCION": "HONG KONG"
    },
    {
      "CODIGO": "HU",
      "DESCRIPCION": "HUNGRIA"
    },
    {
      "CODIGO": "IS",
      "DESCRIPCION": "ISLANDIA"
    },
    {
      "CODIGO": "IN",
      "DESCRIPCION": "INDIA"
    },
    {
      "CODIGO": "ID",
      "DESCRIPCION": "INDONESIA"
    },
    {
      "CODIGO": "IR",
      "DESCRIPCION": "IRAN"
    },
    {
      "CODIGO": "IQ",
      "DESCRIPCION": "IRAK"
    },
    {
      "CODIGO": "IE",
      "DESCRIPCION": "IRLANDA"
    },
    {
      "CODIGO": "IL",
      "DESCRIPCION": "ISRAEL"
    },
    {
      "CODIGO": "IT",
      "DESCRIPCION": "ITALIA"
    },
    {
      "CODIGO": "CI",
      "DESCRIPCION": "COSTA DE MARFIL"
    },
    {
      "CODIGO": "JM",
      "DESCRIPCION": "JAMAICA"
    },
    {
      "CODIGO": "JP",
      "DESCRIPCION": "JAPON"
    },
    {
      "CODIGO": "KZ",
      "DESCRIPCION": "KAZAJISTAN"
    },
    {
      "CODIGO": "JO",
      "DESCRIPCION": "JORDANIA"
    },
    {
      "CODIGO": "KE",
      "DESCRIPCION": "KENIA"
    },
    {
      "CODIGO": "KP",
      "DESCRIPCION": "COREA DEL NORTE"
    },
    {
      "CODIGO": "KR",
      "DESCRIPCION": "COREA DEL SUR"
    },
    {
      "CODIGO": "KW",
      "DESCRIPCION": "KUWAIT"
    },
    {
      "CODIGO": "KG",
      "DESCRIPCION": "KIRGUISTAN"
    },
    {
      "CODIGO": "LA",
      "DESCRIPCION": "LAOS"
    },
    {
      "CODIGO": "LB",
      "DESCRIPCION": "LIBANO"
    },
    {
      "CODIGO": "LS",
      "DESCRIPCION": "LESOTO"
    },
    {
      "CODIGO": "LV",
      "DESCRIPCION": "LETONIA"
    },
    {
      "CODIGO": "LR",
      "DESCRIPCION": "LIBERIA"
    },
    {
      "CODIGO": "LY",
      "DESCRIPCION": "LIBIA"
    },
    {
      "CODIGO": "LI",
      "DESCRIPCION": "LIECHTENSTEIN"
    },
    {
      "CODIGO": "LT",
      "DESCRIPCION": "LITUANIA"
    },
    {
      "CODIGO": "LU",
      "DESCRIPCION": "LUXEMBURGO"
    },
    {
      "CODIGO": "MO",
      "DESCRIPCION": "MACAO"
    },
    {
      "CODIGO": "MG",
      "DESCRIPCION": "MADAGASCAR"
    },
    {
      "CODIGO": "MW",
      "DESCRIPCION": "MALAUI"
    },
    {
      "CODIGO": "MY",
      "DESCRIPCION": "MALASIA"
    },
    {
      "CODIGO": "MV",
      "DESCRIPCION": "MALDIVAS"
    },
    {
      "CODIGO": "ML",
      "DESCRIPCION": "MALI"
    },
    {
      "CODIGO": "MT",
      "DESCRIPCION": "MALTA"
    },
    {
      "CODIGO": "MQ",
      "DESCRIPCION": "MARTINICA"
    },
    {
      "CODIGO": "MR",
      "DESCRIPCION": "MAURITANIA"
    },
    {
      "CODIGO": "MU",
      "DESCRIPCION": "MAURICIO"
    },
    {
      "CODIGO": "MX",
      "DESCRIPCION": "MEXICO"
    },
    {
      "CODIGO": "MC",
      "DESCRIPCION": "MONACO"
    },
    {
      "CODIGO": "MN",
      "DESCRIPCION": "MONGOLIA"
    },
    {
      "CODIGO": "MD",
      "DESCRIPCION": "MOLDAVIA"
    },
    {
      "CODIGO": "ME",
      "DESCRIPCION": "MONTENEGRO"
    },
    {
      "CODIGO": "MS",
      "DESCRIPCION": "MONTSERRAT"
    },
    {
      "CODIGO": "MA",
      "DESCRIPCION": "MARRUECOS"
    },
    {
      "CODIGO": "MZ",
      "DESCRIPCION": "MOZAMBIQUE"
    },
    {
      "CODIGO": "OM",
      "DESCRIPCION": "OMAN"
    },
    {
      "CODIGO": "NA",
      "DESCRIPCION": "NAMIBIA"
    },
    {
      "CODIGO": "NR",
      "DESCRIPCION": "NAURU"
    },
    {
      "CODIGO": "NP",
      "DESCRIPCION": "NEPAL"
    },
    {
      "CODIGO": "NL",
      "DESCRIPCION": "PAISES BAJOS"
    },
    {
      "CODIGO": "AN",
      "DESCRIPCION": "ANTILLAS NEERLANDESAS"
    },
    {
      "CODIGO": "AW",
      "DESCRIPCION": "ARUBA"
    },
    {
      "CODIGO": "NC",
      "DESCRIPCION": "NUEVA CALEDONIA"
    },
    {
      "CODIGO": "NZ",
      "DESCRIPCION": "NUEVA ZELANDA"
    },
    {
      "CODIGO": "NI",
      "DESCRIPCION": "NICARAGUA"
    },
    {
      "CODIGO": "NE",
      "DESCRIPCION": "NIGER"
    },
    {
      "CODIGO": "NG",
      "DESCRIPCION": "NIGERIA"
    },
    {
      "CODIGO": "NU",
      "DESCRIPCION": "NIUE"
    },
    {
      "CODIGO": "NF",
      "DESCRIPCION": "NORFOLK"
    },
    {
      "CODIGO": "NO",
      "DESCRIPCION": "NORUEGA"
    },
    {
      "CODIGO": "MP",
      "DESCRIPCION": "ISLAS MARIANAS DEL NORTE"
    },
    {
      "CODIGO": "FM",
      "DESCRIPCION": "MICRONESIA"
    },
    {
      "CODIGO": "MH",
      "DESCRIPCION": "ISLAS MARSHALL"
    },
    {
      "CODIGO": "PW",
      "DESCRIPCION": "PALAOS"
    },
    {
      "CODIGO": "PK",
      "DESCRIPCION": "PAKISTAN"
    },
    {
      "CODIGO": "PA",
      "DESCRIPCION": "PANAMA"
    },
    {
      "CODIGO": "PG",
      "DESCRIPCION": "PAPUA NUEVA GUINEA"
    },
    {
      "CODIGO": "PY",
      "DESCRIPCION": "PARAGUAY"
    },
    {
      "CODIGO": "PE",
      "DESCRIPCION": "PERU"
    },
    {
      "CODIGO": "PH",
      "DESCRIPCION": "FILIPINAS"
    },
    {
      "CODIGO": "PN",
      "DESCRIPCION": "ISLAS PITCAIRN"
    },
    {
      "CODIGO": "PT",
      "DESCRIPCION": "PORTUGAL"
    },
    {
      "CODIGO": "GW",
      "DESCRIPCION": "GUINEA-BISSAU"
    },
    {
      "CODIGO": "TL",
      "DESCRIPCION": "TIMOR ORIENTAL"
    },
    {
      "CODIGO": "QA",
      "DESCRIPCION": "CATAR"
    },
    {
      "CODIGO": "RE",
      "DESCRIPCION": "REUNION"
    },
    {
      "CODIGO": "RO",
      "DESCRIPCION": "RUMANIA"
    },
    {
      "CODIGO": "RU",
      "DESCRIPCION": "RUSIA"
    },
    {
      "CODIGO": "RW",
      "DESCRIPCION": "RUANDA"
    },
    {
      "CODIGO": "BL",
      "DESCRIPCION": "SAN BARTOLOME"
    },
    {
      "CODIGO": "KN",
      "DESCRIPCION": "SAN CRISTOBAL Y NIEVES"
    },
    {
      "CODIGO": "AI",
      "DESCRIPCION": "ANGUILA"
    },
    {
      "CODIGO": "LC",
      "DESCRIPCION": "SANTA LUCIA"
    },
    {
      "CODIGO": "MF",
      "DESCRIPCION": "SAN MARTIN"
    },
    {
      "CODIGO": "VC",
      "DESCRIPCION": "SAN VICENTE Y LAS GRANADINAS"
    },
    {
      "CODIGO": "ST",
      "DESCRIPCION": "SANTO TOME Y PRINCIPE"
    },
    {
      "CODIGO": "SA",
      "DESCRIPCION": "ARABIA SAUDITA"
    },
    {
      "CODIGO": "SN",
      "DESCRIPCION": "SENEGAL"
    },
    {
      "CODIGO": "RS",
      "DESCRIPCION": "SERBIA"
    },
    {
      "CODIGO": "SL",
      "DESCRIPCION": "SIERRA LEONA"
    },
    {
      "CODIGO": "SG",
      "DESCRIPCION": "SINGAPUR"
    },
    {
      "CODIGO": "SK",
      "DESCRIPCION": "ESLOVAQUIA"
    },
    {
      "CODIGO": "SI",
      "DESCRIPCION": "ESLOVENIA"
    },
    {
      "CODIGO": "SO",
      "DESCRIPCION": "SOMALIA"
    },
    {
      "CODIGO": "ZA",
      "DESCRIPCION": "SUDAFRICA"
    },
    {
      "CODIGO": "ZW",
      "DESCRIPCION": "ZIMBABUE"
    },
    {
      "CODIGO": "ES",
      "DESCRIPCION": "ESPAÑA"
    },
    {
      "CODIGO": "SS",
      "DESCRIPCION": "SUDAN DEL SUR"
    },
    {
      "CODIGO": "SJ",
      "DESCRIPCION": "SVALBARD Y JAN MAYEN"
    },
    {
      "CODIGO": "SZ",
      "DESCRIPCION": "SUAZILANDIA"
    },
    {
      "CODIGO": "CH",
      "DESCRIPCION": "SUIZA"
    },
    {
      "CODIGO": "TH",
      "DESCRIPCION": "TAILANDIA"
    },
    {
      "CODIGO": "TG",
      "DESCRIPCION": "TOGO"
    },
    {
      "CODIGO": "TK",
      "DESCRIPCION": "TOKELAU"
    },
    {
      "CODIGO": "TT",
      "DESCRIPCION": "TRINIDAD Y TOBAGO"
    },
    {
      "CODIGO": "AE",
      "DESCRIPCION": "EMIRATOS ARABES UNIDOS"
    },
    {
      "CODIGO": "TR",
      "DESCRIPCION": "TURQUIA"
    },
    {
      "CODIGO": "TC",
      "DESCRIPCION": "ISLAS TURCAS Y CAICOS"
    },
    {
      "CODIGO": "TV",
      "DESCRIPCION": "TUVALU"
    },
    {
      "CODIGO": "UA",
      "DESCRIPCION": "UCRANIA"
    },
    {
      "CODIGO": "MK",
      "DESCRIPCION": "REPUBLICA DE MACEDONIA"
    },
    {
      "CODIGO": "EG",
      "DESCRIPCION": "EGIPTO"
    },
    {
      "CODIGO": "GB",
      "DESCRIPCION": "REINO UNIDO"
    },
    {
      "CODIGO": "GG",
      "DESCRIPCION": "GUERNSEY"
    },
    {
      "CODIGO": "JE",
      "DESCRIPCION": "JERSEY"
    },
    {
      "CODIGO": "IM",
      "DESCRIPCION": "ISLA DE MAN"
    },
    {
      "CODIGO": "TZ",
      "DESCRIPCION": "TANZANIA"
    },
    {
      "CODIGO": "US",
      "DESCRIPCION": "ESTADOS UNIDOS"
    },
    {
      "CODIGO": "VI",
      "DESCRIPCION": "ISLAS VIRGENES DE LOS ESTADOS UNIDOS"
    },
    {
      "CODIGO": "BF",
      "DESCRIPCION": "BURKINA FASO"
    },
    {
      "CODIGO": "UY",
      "DESCRIPCION": "URUGUAY"
    },
    {
      "CODIGO": "UZ",
      "DESCRIPCION": "UZBEKISTAN"
    },
    {
      "CODIGO": "VE",
      "DESCRIPCION": "VENEZUELA"
    },
    {
      "CODIGO": "YE",
      "DESCRIPCION": "YEMEN"
    },
    {
      "CODIGO": "ZM",
      "DESCRIPCION": "ZAMBIA"
    },
    {
      "CODIGO": "HL",
      "DESCRIPCION": "HOLANDA"
    },
    {
      "CODIGO": "OT",
      "DESCRIPCION": "OTROS"
    },
    {
      "CODIGO": "99",
      "DESCRIPCION": "NO DEFINIDO"
    }
  
  ];
  

  useEffect(() => {
    const createRecords = async () => {
      const pocketbase = new Pocketbase('http://localhost:8080');
  
      try {
        // Assuming records is defined somewhere in your component
        await pocketbase.records.createRecords('Country', records);
        console.log('Records created successfully!');
      } catch (error) {
        console.error('Error creating records:', error);
      }
    };
  
    createRecords();
  
  }, [records]);
  return (
    <div className="">

      {/* <Navbar />
      <PersonalDataPage/>
      <Campus />
      <Signup />
      <HomePage />
      <Schedule />
      <Offer />
       */}
    </div>
  );
}

