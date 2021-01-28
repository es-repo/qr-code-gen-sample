import './App.css';
import QrCard from './qr-card/qr-card';
import {useState} from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

export default function App() {

  const [content, setContent] = useState('');

  return (
    <div className="App">
      <form className="form">
        <textarea id="contentInput" rows="5" cols="60" onChange={(e) => {setContent(e.target.value);} } placeholder="Enter QR-code content here..." ></textarea>   
      </form>
      <div className="result">
        <QrCard content={content} id="qr-card" />
        <div>
          <button type="button" onClick={exportToPng}>Export to PNG</button>
          <button type="button" onClick={print}>Print</button>
        </div>
      </div>
    </div>
  );
}

function exportToPng(){
  domtoimage.toBlob(document.querySelector('.qr-card'))
    .then(function (blob) {
        saveAs(blob, 'qr-card.png');
    });
}

function print(){
  domtoimage.toSvg(document.querySelector('.qr-card'))
  .then(function (svg) {
    svg = svg.replace('data:image/svg+xml;charset=utf-8,', '')
    const popup = window.open('', '_blank', 'width=1000,height=1000,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popup.document.open();
    popup.document.write('<html><head><style></style></head><body onload="window.print()">' + svg + '</html>');
    popup.document.close();
  });
}
