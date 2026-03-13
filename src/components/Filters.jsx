import React, {useState} from 'react';

export default function Filters({brands, onFilter}){
  const [brand,setBrand] = useState('All');
  const [trans,setTrans] = useState('Any');
  const [query,setQuery] = useState('');

  function apply(){
    onFilter({brand,trans,query});
  }

  return (
    <div className="filters">
      <select className="input" value={brand} onChange={e=>setBrand(e.target.value)}>
        <option>All</option>
        {brands.map(b => <option key={b}>{b}</option>)}
      </select>
      <select className="input" value={trans} onChange={e=>setTrans(e.target.value)}>
        <option>Any</option>
        <option>Automatic</option>
        <option>Manual</option>
      </select>
      <input className="input" placeholder="Search model or brand" value={query} onChange={e=>setQuery(e.target.value)} />
      <button className="btn" onClick={apply}>Apply</button>
    </div>
  )
}
