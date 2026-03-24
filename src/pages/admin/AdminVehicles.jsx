import React, { useState } from 'react';

const EMPTY = { brand: '', model: '', type: '', price: '', status: 'available' };

const AdminVehicles = () => {
  const [cars, setCars] = useState([
    { id: 1, brand: 'BMW',    model: 'M5',      type: 'Luxury',   price: 10000, status: 'available' },
    { id: 2, brand: 'Audi',   model: 'R8',      type: 'Sports',   price: 20000, status: 'available' },
    { id: 3, brand: 'Tesla',  model: 'Model S', type: 'Electric', price: 13000, status: 'rented' },
    { id: 4, brand: 'Lamborghini', model: 'Urus', type: 'SUV',    price: 25000, status: 'available' },
  ]);
  const [modal, setModal] = useState(null); // null | 'add' | 'edit' | 'view'
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const openAdd  = () => { setForm(EMPTY); setModal('add'); };
  const openEdit = (c) => { setSelected(c); setForm({ ...c }); setModal('edit'); };
  const openView = (c) => { setSelected(c); setModal('view'); };
  const close    = () => { setModal(null); setSelected(null); };

  const handleAdd = () => {
    if (!form.brand || !form.model || !form.price) return;
    setCars([...cars, { ...form, id: Date.now(), price: +form.price }]);
    close();
  };

  const handleEdit = () => {
    setCars(cars.map(c => c.id === form.id ? { ...form, price: +form.price } : c));
    close();
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this vehicle?')) setCars(cars.filter(c => c.id !== id));
  };

  const Field = ({ label, name, type = 'text', children }) => (
    <div className="form-group">
      <label>{label}</label>
      {children || (
        <input className="form-input" type={type} value={form[name]} onChange={e => setForm({ ...form, [name]: e.target.value })} />
      )}
    </div>
  );

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Vehicles</h1>
          <p>Manage your fleet</p>
        </div>
        <button className="btn btn-gold" onClick={openAdd}>+ Add Vehicle</button>
      </div>

      <div className="table-card">
        <div className="table-card-header">
          <h2>All Vehicles ({cars.length})</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Type</th>
              <th>Price/Day</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((c, i) => (
              <tr key={c.id}>
                <td style={{ color: '#555' }}>{i + 1}</td>
                <td><div className="cell-name">{c.brand}</div></td>
                <td>{c.model}</td>
                <td>{c.type}</td>
                <td style={{ color: '#d4af37', fontWeight: 700 }}>₹{c.price}</td>
                <td><span className={`badge badge-${c.status}`}>{c.status}</span></td>
                <td>
                  <div className="action-btns">
                    <button className="btn-icon btn-view"   onClick={() => openView(c)} title="View">👁</button>
                    <button className="btn-icon btn-edit"   onClick={() => openEdit(c)} title="Edit">✏</button>
                    <button className="btn-icon btn-delete" onClick={() => handleDelete(c.id)} title="Delete">🗑</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD / EDIT MODAL */}
      {(modal === 'add' || modal === 'edit') && (
        <div className="modal-backdrop" onClick={close}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{modal === 'add' ? 'Add Vehicle' : 'Edit Vehicle'}</h2>
              <button className="btn-icon btn-delete" onClick={close}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <Field label="Brand" name="brand" />
                <Field label="Model" name="model" />
                <Field label="Type" name="type">
                  <select className="form-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option value="">Select</option>
                    {['Luxury','Sports','SUV','Electric','Sedan'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Price/Day (₹)" name="price" type="number" />
                <Field label="Status" name="status">
                  <select className="form-input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                    <option value="available">Available</option>
                    <option value="rented">Rented</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </Field>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={close}>Cancel</button>
              <button className="btn btn-gold" onClick={modal === 'add' ? handleAdd : handleEdit}>
                {modal === 'add' ? 'Add Vehicle' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {modal === 'view' && selected && (
        <div className="modal-backdrop" onClick={close}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Vehicle Details</h2>
              <button className="btn-icon btn-delete" onClick={close}>✕</button>
            </div>
            <div className="modal-body">
              {[['Brand', selected.brand], ['Model', selected.model], ['Type', selected.type],
                ['Price/Day', `₹${selected.price}`], ['Status', selected.status], ['ID', `#${selected.id}`]
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #1a1a1a' }}>
                  <span style={{ color: '#666', fontSize: 13 }}>{k}</span>
                  <span style={{ color: '#eee', fontWeight: 600, fontSize: 14 }}>{v}</span>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button className="btn btn-gold" onClick={close}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminVehicles;
