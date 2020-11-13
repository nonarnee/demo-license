import React, {useState} from "react";
import './App.css';

function App() {
  const [userInfo, setUserInfo] = useState({
    company: 'wavecoders.ca',
    street: '123 licenseKey ave',
    city: 'city/town',
    state: 'State/Province',
    zip: 'postal/zip'
  });
  const [prodCode, setProdCode] = useState('LEN100120');
  const [appVersion, setAppVersion] = useState('1.5');
  const [osType, setOsType] = useState('IOS8');
  const [rstCreate, setRstCreate] = useState({});
  const [rstValidate, setRstValidate] = useState({});
  const [rstLicense, setRstLicense] = useState('');

  const licenseKey = require('licensekey');
  const userLicenseForCreate = {
    info: userInfo,
    prodCode: prodCode,
    appVersion: appVersion,
    osType: osType
  };
  const userLicenseForValidate = {
    info: userInfo,
    prodCode: prodCode,
    appVersion: appVersion,
    osLock: true,
    osType: osType,
  };

  const createLicense = () => {
    try {
      const rst = licenseKey.createLicense(userLicenseForCreate);
      console.log(rst);
      setRstLicense(rst.license);
      setRstCreate(rst);
    } catch(err) {
      console.log(err);
      setRstCreate(err);
    }
  };
  const validateLicense = () => {
    try {
      console.log(rstLicense);
      const rst = licenseKey.validateLicense(userLicenseForValidate, rstLicense);
      console.log(rst);
      setRstValidate(rst);
    } catch(err) {
      console.log(err);
      setRstValidate(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={createLicense}>CREATE</button>
        <p>{JSON.stringify(rstCreate)}</p>
        <button onClick={validateLicense}>VALIDATE</button>
        <p>{JSON.stringify(rstValidate)}</p>
      </header>
    </div>
  );
}

export default App;
