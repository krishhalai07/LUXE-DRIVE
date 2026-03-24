import React, { useState } from 'react';
import AdminCarDetail from './AdminCarDetail';
import './vehicleForm.css';

const EMPTY_ADD  = { name: '', subtitle: '', category: 'Luxury', price: '', imageUrl: '', acc: '', topSpeed: '', horsepower: '', mileage: '', description: '' };
const EMPTY_EDIT = { brand: '', model: '', subtitle: '', type: 'Luxury', price: '', imageUrl: '', acc: '', topSpeed: '', horsepower: '', mileage: '', description: '', status: 'available' };
const STATUSES   = ['available', 'unavailable', 'rented'];

const AdminVehicles = () => {
  const [cars, setCars] = useState([
    { id: 1, brand: 'BMW',         model: 'M5',      type: 'Luxury',   price: 10000, status: 'available',   img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800' },
    { id: 2, brand: 'Audi',        model: 'R8',      type: 'Sports',   price: 20000, status: 'available',   img: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800' },
    { id: 3, brand: 'Tesla',       model: 'Model S', type: 'Electric', price: 13000, status: 'rented',      img: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800' },
    { id: 4, brand: 'Lamborghini', model: 'Urus',    type: 'SUV',      price: 25000, status: 'available',   img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800' },
  ]);

  const [addOpen,   setAddOpen]   = useState(false);
  const [addForm,   setAddForm]   = useState(EMPTY_ADD);
  const [editModal, setEditModal] = useState(false);
  const [editForm,  setEditForm]  = useState(EMPTY_EDIT);
  const [viewModal, setViewModal] = useState(false);
  const [viewCar,   setViewCar]   = useState(null);
  const [detailCar, setDetailCar] = useState(null);

  const setA = (k, v) => setAddForm(f => ({ ...f, [k]: v }));
  const setE = (k, v) => setEditForm(f => ({ ...f, [k]: v }));

  const handleAdd = () => {
    if (!addForm.name || !addForm.price) return;
    const [brand, ...rest] = addForm.name.trim().split(' ');
    setCars(prev => [...prev, {
      id: Date.now(), brand, model: rest.join(' ') || brand,
      type: addForm.category, price: +addForm.price,
      status: 'available', img: addForm.imageUrl || undefined,
      subtitle: addForm.subtitle, acc: addForm.acc,
      topSpeed: addForm.topSpeed, horsepower: addForm.horsepower,
      mileage: addForm.mileage, description: addForm.description,
    }]);
    setAddForm(EMPTY_ADD); setAddOpen(false);
  };

  const openEdit = (c) => {
    setEditForm({
      ...EMPTY_EDIT, ...c,
      name: `${c.brand} ${c.model}`,
      imageUrl: c.img || '',
    });
    setEditModal(true);
  };

  const handleEdit = () => {
    if (!editForm.brand || !editForm.model || !editForm.price) return;
    setCars(prev => prev.map(c => c.id === editForm.id
      ? { ...c, ...editForm, price: +editForm.price, img: editForm.imageUrl || c.img }
      : c
    ));
    setEditModal(false);
  };

  const openView = (c) => { setViewCar(c); setViewModal(true); };

  const handleDelete = (id) => {
    if (window.confirm('Delete this vehicle?')) setCars(prev => prev.filter(c => c.id !== id));
  };

  if (detailCar) return <AdminCarDetail car={detailCar} onBack={() => setDetailCar(null)} />;

  return (
    <>
      <div className="page-header">
        <div><h1>Vehicles</h1><p>Manage your fleet</p></div>
      </div>

      {/* ── COLLAPSIBLE ADD FORM CARD ── */}
      <div className={`add-form-card ${addOpen ? 'open' : ''}`}>
        <div className="add-form-header" onClick={() => setAddOpen(o => !o)}>
          <div className="add-form-header-left">
            <div className="add-form-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </div>
            <div>
              <div className="add-form-title">Add New Vehicle</div>
              <div className="add-form-subtitle">Click to expand and fill in vehicle details</div>
            </div>
          </div>
          <div className="add-form-chevron">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>

        <div className="add-form-body">
          <div className="add-form-inner">
            <div className={`af-img-preview ${addForm.imageUrl ? 'has-img' : ''}`}>
              {!addForm.imageUrl
                ? <div className="af-img-placeholder">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    <span>Paste an image URL below to preview</span>
                  </div>
                : <img src={addForm.imageUrl} alt="preview" className="visible" onError={e => e.target.style.display='none'} />
              }
            </div>

            <div className="af-g4">
              <div className="af-group">
                <label>Vehicle Name <span className="af-req">*</span></label>
                <input className="af-input" placeholder="e.g. BMW M5" value={addForm.name} onChange={e => setA('name', e.target.value)} />
              </div>
              <div className="af-group">
                <label>Sub Title</label>
                <input className="af-input" placeholder="e.g. Competition · 2024" value={addForm.subtitle} onChange={e => setA('subtitle', e.target.value)} />
              </div>
              <div className="af-group">
                <label>Category</label>
                <select className="af-input" value={addForm.category} onChange={e => setA('category', e.target.value)}>
                  <option value="Luxury">🏅 Luxury</option>
                  <option value="Sports">⚡ Sports</option>
                  <option value="SUV">🚙 SUV</option>
                  <option value="Electric">🔋 Electric</option>
                  <option value="Sedan">🚗 Sedan</option>
                </select>
              </div>
              <div className="af-group">
                <label>Price / Day <span className="af-req">*</span></label>
                <input className="af-input" placeholder="e.g. 10000" type="number" value={addForm.price} onChange={e => setA('price', e.target.value)} />
              </div>
            </div>

            <div className="af-group">
              <label>Image URL</label>
              <input className="af-input" placeholder="https://images.unsplash.com/..." value={addForm.imageUrl} onChange={e => setA('imageUrl', e.target.value)} />
            </div>

            <div className="af-divider">Performance Specs</div>

            <div className="af-g4">
              <div className="af-group">
                <label><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> 0–100 km/h</label>
                <input className="af-input" placeholder="e.g. 3.5s" value={addForm.acc} onChange={e => setA('acc', e.target.value)} />
              </div>
              <div className="af-group">
                <label><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/><path d="M12 6v6l4 2"/></svg> Top Speed</label>
                <input className="af-input" placeholder="e.g. 305 km/h" value={addForm.topSpeed} onChange={e => setA('topSpeed', e.target.value)} />
              </div>
              <div className="af-group">
                <label><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg> Horsepower</label>
                <input className="af-input" placeholder="e.g. 600 HP" value={addForm.horsepower} onChange={e => setA('horsepower', e.target.value)} />
              </div>
              <div className="af-group">
                <label>Mileage</label>
                <input className="af-input" placeholder="e.g. 12 km/l" value={addForm.mileage} onChange={e => setA('mileage', e.target.value)} />
              </div>
            </div>

            <div className="af-group">
              <label>Description</label>
              <textarea className="af-input af-textarea" placeholder="Tell customers about this vehicle..." value={addForm.description} onChange={e => setA('description', e.target.value)} />
            </div>

            <div className="af-footer">
              <button className="af-btn-reset" onClick={() => setAddForm(EMPTY_ADD)}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/></svg>
                Reset
              </button>
              <button className="af-btn-submit" onClick={handleAdd}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Add Vehicle
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── VEHICLES TABLE ── */}
      <div className="table-card">
        <div className="table-card-header"><h2>All Vehicles ({cars.length})</h2></div>
        <table>
          <thead>
            <tr><th>#</th><th>Vehicle</th><th>Type</th><th>Price/Day</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {cars.map((c, i) => (
              <tr key={c.id}>
                <td style={{ color: '#555' }}>{i + 1}</td>
                <td>
                  <div className="cell-avatar">
                    {c.img
                      ? <img src={c.img} alt={c.brand} style={{ width: 40, height: 32, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />
                      : <div className="avatar-sm">{c.brand.charAt(0)}</div>
                    }
                    <div>
                      <div className="cell-name">{c.brand} {c.model}</div>
                      <div className="cell-sub">{c.subtitle || c.type}</div>
                    </div>
                  </div>
                </td>
                <td>{c.type}</td>
                <td style={{ color: '#d4af37', fontWeight: 700 }}>₹{c.price.toLocaleString()}</td>
                <td>
                  <select value={c.status}
                    onChange={e => setCars(prev => prev.map(x => x.id === c.id ? { ...x, status: e.target.value } : x))}
                    className={`status-dropdown status-${c.status}`}>
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                    <option value="rented">Rented</option>
                  </select>
                </td>
                <td>
                  <div className="action-btns">
                    <button className="btn-icon btn-view"   onClick={() => openView(c)}        title="View">👁</button>
                    <button className="btn-icon btn-edit"   onClick={() => openEdit(c)}        title="Edit">✏</button>
                    <button className="btn-icon btn-delete" onClick={() => handleDelete(c.id)} title="Delete">🗑</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── VIEW MODAL ── */}
      {viewModal && viewCar && (
        <div className="modal-overlay" onClick={() => setViewModal(false)}>
          <div className="view-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setViewModal(false)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <div className="view-modal-body">
              <div className="view-image-wrap">
                {viewCar.img
                  ? <img src={viewCar.img} alt={viewCar.brand} />
                  : <div className="view-img-placeholder"><span>No Image</span></div>
                }
                <span className="view-cat-badge">{viewCar.type}</span>
              </div>
              <div className="view-details">
                <div className="view-meta">{viewCar.subtitle || `${viewCar.type} · Premium Fleet`}</div>
                <div className="view-name-row">
                  <h2>{viewCar.brand} {viewCar.model}</h2>
                  <span className="view-price">₹{viewCar.price.toLocaleString()}<small>/day</small></span>
                </div>
                <div className="view-specs-row">
                  {[['⚡', viewCar.acc || '—', '0–100'],['🔝', viewCar.topSpeed || '—', 'Top Speed'],['🐎', viewCar.horsepower || '—', 'Power'],['⛽', viewCar.mileage || '—', 'Mileage']].map(([icon, val, lbl]) => (
                    <div className="view-spec-item" key={lbl}>
                      <span className="view-spec-icon">{icon}</span>
                      <span className="view-spec-val">{val}</span>
                      <span className="view-spec-lbl">{lbl}</span>
                    </div>
                  ))}
                </div>
                <div className="view-divider" />
                <div className="view-section-title">About This Car</div>
                <p className="view-desc">{viewCar.description || 'No description available.'}</p>
                <div className="view-actions">
                  <button className="btn-view-detail" onClick={() => { setViewModal(false); setDetailCar(viewCar); }}>View Full Detail</button>
                  <button className="btn-back-modal" onClick={() => setViewModal(false)}>← Back</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── EDIT MODAL ── */}
      {editModal && (
        <div className="modal-overlay" onClick={() => setEditModal(false)}>
          <div className="edit-modal" onClick={e => e.stopPropagation()}>
            <div className="edit-modal-header">
              <h3>{editForm.brand} {editForm.model}</h3>
              <button className="modal-close-btn" onClick={() => setEditModal(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="edit-modal-body">

              {/* Row 1: Name · Subtitle */}
              <div className="em-row two-col">
                <div className="em-group">
                  <label>Vehicle Name</label>
                  <input className="em-input" placeholder="e.g. BMW M5" value={`${editForm.brand} ${editForm.model}`}
                    onChange={e => { const [b, ...r] = e.target.value.split(' '); setE('brand', b); setE('model', r.join(' ')); }} />
                </div>
                <div className="em-group">
                  <label>Sub Title</label>
                  <input className="em-input" placeholder="e.g. Competition · 2024 Model" value={editForm.subtitle || ''} onChange={e => setE('subtitle', e.target.value)} />
                </div>
              </div>

              {/* Row 2: Category · Price */}
              <div className="em-row two-col">
                <div className="em-group">
                  <label>Category</label>
                  <select className="em-input" value={editForm.type} onChange={e => setE('type', e.target.value)}>
                    <option value="Luxury">Luxury</option>
                    <option value="Sports">Sports</option>
                    <option value="SUV">SUV</option>
                    <option value="Electric">Electric</option>
                    <option value="Sedan">Sedan</option>
                  </select>
                </div>
                <div className="em-group">
                  <label>Price / Day</label>
                  <input className="em-input" placeholder="e.g. 10000" type="number" value={editForm.price} onChange={e => setE('price', e.target.value)} />
                </div>
              </div>

              {/* Row 3: Acc · Speed · HP */}
              <div className="em-row three-col">
                <div className="em-group">
                  <label>0–100 km/h</label>
                  <input className="em-input" placeholder="e.g. 3.5s" value={editForm.acc || ''} onChange={e => setE('acc', e.target.value)} />
                </div>
                <div className="em-group">
                  <label>Top Speed</label>
                  <input className="em-input" placeholder="e.g. 305 km/h" value={editForm.topSpeed || ''} onChange={e => setE('topSpeed', e.target.value)} />
                </div>
                <div className="em-group">
                  <label>Horsepower</label>
                  <input className="em-input" placeholder="e.g. 600 HP" value={editForm.horsepower || ''} onChange={e => setE('horsepower', e.target.value)} />
                </div>
              </div>

              {/* Row 4: Mileage · Image URL */}
              <div className="em-row two-col">
                <div className="em-group">
                  <label>Mileage</label>
                  <input className="em-input" placeholder="e.g. 12 km/l" value={editForm.mileage || ''} onChange={e => setE('mileage', e.target.value)} />
                </div>
                <div className="em-group">
                  <label>Image URL</label>
                  <input className="em-input" placeholder="https://..." value={editForm.imageUrl || ''} onChange={e => setE('imageUrl', e.target.value)} />
                </div>
              </div>

              {/* Description */}
              <div className="em-group">
                <label>Description</label>
                <textarea className="em-input em-textarea" placeholder="About this car..." value={editForm.description || ''} onChange={e => setE('description', e.target.value)} />
              </div>

              {/* Status */}
              <div className="em-group">
                <label>Status</label>
                <div className="em-status-group">
                  {STATUSES.map(s => (
                    <button key={s} className={`em-status-btn ${editForm.status === s ? `active-${s}` : ''}`} onClick={() => setE('status', s)}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

            </div>
            <div className="edit-modal-footer">
              <button className="btn-cancel" onClick={() => setEditModal(false)}>Cancel</button>
              <button className="btn-save" onClick={handleEdit}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminVehicles;
