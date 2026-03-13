import React, {useState} from 'react';

export default function PaymentForm({car, onSubmit, onCancel}){
  const [name,setName] = useState('');
  const [upiSet] = useState('luxurycars@upi');
  const [upi,setUpi] = useState(upiSet);
  const [txid,setTxid] = useState('');
  const [amount] = useState(car ? car.pricePerDay : 0);
  const [screenshot,setScreenshot] = useState(null);

  function submit(e){
    e.preventDefault();
    const booking = {id:Date.now(), carId:car.id, carName:car.brand + ' ' + car.model, name, upi, txid, amount, screenshot, status:'pending'};
    onSubmit(booking);
  }

  return (
    <div className="pay-wrap">
      <div className="pay-left">
        <h3 style={{marginTop:0}}>Pay via UPI</h3>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <div className="qr" />
          <div>
            <div className="small" style={{color:'#bdb6ac'}}>UPI ID</div>
            <strong>{upiSet}</strong>
          </div>
        </div>
        <div style={{marginTop:12}} className="small">Scan QR or use the above UPI ID to pay. Then enter transaction ID and upload screenshot.</div>
      </div>

      <div className="pay-right">
        <form className="pay-form" onSubmit={submit}>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full Name" required />
          <input value={upi} onChange={e=>setUpi(e.target.value)} placeholder="UPI ID (eg: you@upi)" required />
          <input value={txid} onChange={e=>setTxid(e.target.value)} placeholder="UPI Transaction ID" required />
          <input value={amount} readOnly />
          <input type="file" onChange={e=>setScreenshot(e.target.files[0])} />
          <div style={{display:'flex',gap:8}}>
            <button className="submit" type="submit">Submit Payment</button>
            <button className="btn secondary" type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
