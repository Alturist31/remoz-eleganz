import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function BulkCounter({ initialQty = 100, basePrice = 450, productName = "Product", availableColors = [], productDesc = "", categoryName = "", productImage = "" }) {
  const [quantity, setQuantity] = useState(initialQty);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [formError, setFormError] = useState('');
  
  const [selectedColor, setSelectedColor] = useState(() => {
    if (Array.isArray(availableColors) && availableColors.length > 0) {
      return availableColors;
    }
    return typeof availableColors === 'string' ? availableColors : "";
  });
  
  const totalCost = quantity * basePrice;
  const corporateContactEmail = "remoz2306@gmail.com"; 
  const whatsappNumber = "917972319483"; 

  const safeColorString = typeof selectedColor === 'string' ? selectedColor : "";
  const variantText = safeColorString ? `• Chosen Variant: ${safeColorString.toUpperCase()}` : "• Chosen Variant: Default/Standard";
  
  // Computes the absolute URL address link of the product photo asset
  const fullProductImageLink = productImage.startsWith('http') ? productImage : `https://venturesolutions.in${productImage}`;

  const waMessage = `Hello! I would like to request a bulk quote for "${productName}".\n• Quantity: ${quantity} units\n${variantText}\n• Estimated Base Value: ₹${totalCost.toLocaleString()}\nPlease share details on custom branding options.`;
  const whatsappUrl = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(waMessage);

  // 🚀 PHOTO LINK INTEGRATION: Automatically embeds the absolute image file link into the email text body
  const emailSubject = `Corporate RFQ Request: ${productName} (${quantity} Units)`;
  const emailBody = `Dear Remoz Eleganz Team,\n\nI would like to request a formal business quotation for the following catalog item:\n\nProduct Name: ${productName}\nQuantity Required: ${quantity} units\nSelected Color/Variant: ${safeColorString.toUpperCase() || 'Default'}\nEstimated Base Value: ₹${totalCost.toLocaleString()}\nProduct Photo Link: ${fullProductImageLink}\n\nClient Contact Details:\n• Name: ${clientName || '[Not Provided]'}\n• Company Name: ${companyName || '[Not Provided]'}\n• Email Address: ${clientEmail}\n\nPlease share your corporate pricing slabs and custom logo branding options with us.\n\nRegards.`;
  const mailtoUrl = `mailto:${corporateContactEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const handleEmailSubmission = (e) => {
    if (!clientEmail.trim() || !clientEmail.includes('@')) {
      e.preventDefault();
      setFormError('⚠️ A valid business email address is required to submit a formal quote inquiry.');
    } else {
      setFormError('');
    }
  };

  const cleanDescription = productDesc && typeof productDesc === 'object' 
    ? productDesc.children?.map(c => c.children?.map(t => t.text).join('')).join('\n') 
    : productDesc;

  const handleQuantityEnforcement = (value) => {
    const numericValue = Number(value);
    if (!numericValue || numericValue <= initialQty) {
      setQuantity(initialQty);
    } else {
      const roundedMultiples = Math.ceil(numericValue / initialQty) * initialQty;
      setQuantity(roundedMultiples);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      setFormError('');
    } else {
      document.body.style.overflow = '';
      setClientName('');
      setCompanyName('');
      setClientEmail('');
      setFormError('');
      setQuantity(initialQty);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen]);
  return (
    <div style={{ marginTop: '15px' }}>
       <button 
        type="button" 
        onClick={() => setIsModalOpen(true)}
        style={{ display: 'block', width: '100%', background: '#E31E24', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', marginBottom: '12px' }}
      >
        🔎 View Details & Estimate
      </button>

      {isModalOpen && typeof document !== 'undefined' && ReactDOM.createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999999, padding: '16px', backdropFilter: 'blur(4px)', boxSizing: 'border-box' }} onClick={() => setIsModalOpen(false)}>
          
          {/* 🚀 RESPONSIVE MOBILE STYLES INJECTION HUB */}
          <style dangerouslySetInnerHTML={{__html: `
            .modal-window-card {
              background: white; width: 100%; max-width: 940px; height: 580px; border-radius: 16px;
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3); overflow: hidden; position: relative;
              display: flex; flex-direction: column; box-sizing: border-box;
            }
            .modal-split-row { display: flex; flex-direction: row; flex-wrap: nowrap; width: 100%; height: 100%; align-items: stretch; }
            .modal-img-col { flex: 0 0 45%; width: 45%; background: #f8fafc; display: flex; align-items: center; justify-content: center; padding: 30px; border-right: 1px solid #e2e8f0; box-sizing: border-box; }
            .modal-form-col { flex: 0 0 55%; width: 55%; padding: 35px; display: flex; flex-direction: column; justify-content: space-between; height: 100%; box-sizing: border-box; }
            .modal-scroll-desc { overflow-y: auto; padding-right: 5px; flex-grow: 1; margin-bottom: 15px; }
            .modal-action-row { display: flex; flex-direction: column; border-top: 1px solid #e2e8f0; padding-top: 12px; gap: 10px; box-sizing: border-box; }

            /* 📱 FIXED ORIENTATION OVERRIDES FOR PORTRAIT & LANDSCAPE MOBILE ORIENTATION */
            @media (max-width: 768px), (max-height: 600px) {
              .modal-window-card { height: auto !important; max-height: 92vh !important; overflow-y: auto !important; }
              .modal-split-row { flex-direction: column !important; flex-wrap: wrap !important; height: auto !important; }
              .modal-img-col { flex: 1 1 100% !important; width: 100% !important; border-right: none !important; border-bottom: 1px solid #e2e8f0 !important; padding: 20px !important; }
              .modal-img-col img { max-height: 180px !important; }
              .modal-form-col { flex: 1 1 100% !important; width: 100% !important; padding: 20px !important; height: auto !important; }
              .modal-scroll-desc { overflow-y: visible !important; height: auto !important; flex-grow: 0 !important; }
              .modal-action-row { width: 100% !important; }
            }
          `}} />

          <div className="modal-window-card" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: '#f3f4f6', border: 'none', width: '32px', height: '32px', borderRadius: '50%', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', color: '#4b5563', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>✕</button>

            <div className="modal-split-row">
              <div className="modal-img-col">
                <img src={productImage} alt={productName} style={{ width: '100%', height: 'auto', maxHeight: '100%', objectFit: 'contain', borderRadius: '12px' }} />
              </div>

              <div className="modal-form-col">
                <div className="modal-scroll-desc">
                  <span style={{ background: '#E6F0EE', color: '#E31E24', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>{categoryName}</span>
                  <h2 style={{ margin: '12px 0 10px 0', fontSize: '24px', color: '#111827', fontWeight: '800', lineHeight: '1.2' }}>{productName}</h2>
                  <div style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.5', whiteSpace: 'pre-wrap', borderLeft: '3px solid #E31E24', paddingLeft: '15px' }}>
                    <strong>Product Specification Details:</strong><br />{cleanDescription || "Custom logo options available."}
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', flexShrink: 0, boxSizing: 'border-box' }}>
                  {availableColors && availableColors.length > 0 && (
                    <div style={{ marginBottom: '10px' }}>
                      <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px' }}>Select Color Variant: <span style={{ color: '#E31E24' }}>{safeColorString.toUpperCase()}</span></label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {availableColors.map((color) => {
                          const hexColor = color === "tan" ? "#d2b48c" : color;
                          const isSelected = selectedColor === color;
                          return <button key={color} type="button" onClick={() => setSelectedColor(color)} style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: hexColor, border: isSelected ? '2px solid #E31E24' : '1px solid #d1d5db', transform: isSelected ? 'scale(1.15)' : 'scale(1)', cursor: 'pointer', padding: 0 }} />;
                        })}
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Order Qty: </label>
                    <input type="number" value={quantity} min={initialQty} step={initialQty} onChange={(e) => setQuantity(Number(e.target.value))} onBlur={(e) => handleQuantityEnforcement(e.target.value)} style={{ padding: '6px', width: '95px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: 'bold' }} />
                    <span style={{ fontSize: '12px', color: '#64748b' }}>(Multiples of {initialQty} only)</span>
                  </div>

                  <div style={{ background: 'white', padding: '12px', borderRadius: '8px', border: '1px dashed #cbd5e1', marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '8px', boxSizing: 'border-box' }}>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Corporate Email RFQ Parameters (Email is Required):</span>
                    <input type="email" placeholder="Business Email ID *" value={clientEmail} onChange={(e) => { setClientEmail(e.target.value); setFormError(''); }} style={{ width: '100%', padding: '8px 12px', fontSize: '12px', borderRadius: '6px', border: clientEmail ? '1px solid #E31E24' : '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }} required />
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input type="text" placeholder="Your Name" value={clientName} onChange={(e) => setClientName(e.target.value)} style={{ width: '50%', padding: '8px 12px', fontSize: '12px', borderRadius: '6px', border: '1px solid #e2e8f0', outline: 'none', boxSizing: 'border-box' }} />
                      <input type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} style={{ width: '50%', padding: '8px 12px', fontSize: '12px', borderRadius: '6px', border: '1px solid #e2e8f0', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    {formError && <div style={{ fontSize: '11px', fontWeight: '600', color: '#ef4444', marginTop: '2px' }}>{formError}</div>}
                  </div>

                  <div className="modal-action-row">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', width: '100%' }}>
                      <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Estimated Value:</span>
                      <span style={{ fontSize: '22px', color: '#059669', fontWeight: '800', wordBreak: 'break-all' }}>₹{totalCost.toLocaleString()}</span>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                      <a href={mailtoUrl} onClick={handleEmailSubmission} style={{ flex: '1', background: '#0F172A', color: 'white', textDecoration: 'none', padding: '10px 8px', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', whiteSpace: 'nowrap', textAlign: 'center', boxSizing: 'border-box' }}>✉️ Email RFQ</a>
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ flex: '1', background: '#25D366', color: 'white', textDecoration: 'none', padding: '10px 8px', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', whiteSpace: 'nowrap', textAlign: 'center', boxSizing: 'border-box' }}>💬 WhatsApp</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
