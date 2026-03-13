import React, {useMemo, useState} from 'react';
import CarCard from './CarCard';
import Filters from './Filters';

export default function CarList({cars, onView, onRent}){
  const brands = useMemo(()=>Array.from(new Set(cars.map(c=>c.brand))),[cars]);
  const [filtered, setFiltered] = useState(cars);

  function handleFilter({brand,trans,query}){
    let out = cars;
    if(brand && brand!=='All') out = out.filter(c=>c.brand===brand);
    if(trans && trans!=='Any') out = out.filter(c=>c.transmission===trans);
    if(query) out = out.filter(c=> (c.model + ' ' + c.brand).toLowerCase().includes(query.toLowerCase()));
    setFiltered(out);
  }

  return (
    <div>
      <Filters brands={brands} onFilter={handleFilter} />
      <div className="grid">
        {filtered.map(car => (
          <CarCard key={car.id} car={car} onView={onView} onRent={onRent} />
        ))}
      </div>
      {filtered.length === 0 && <div style={{marginTop:20,color:'#bdb6ac'}}>No cars found for selected filters.</div>}
    </div>
  )
}
