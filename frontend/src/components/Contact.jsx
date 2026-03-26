import React, { useState } from 'react';
import axios from 'axios';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    firstName: '',
    city: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  // Ton lien Formspree est bien là :
  const FORMSPREE_URL = "https://formspree.io/f/maqlybpo";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    setStatusMessage('');

    try {
      const response = await axios.post(FORMSPREE_URL, formData, {
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.status === 200) {
        setSubmitStatus('success');
        setStatusMessage('Email envoyé avec succès ! Nous vous répondrons très vite.');
        setFormData({ name: '', firstName: '', city: '', email: '', phone: '', message: '' });
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
      setStatusMessage('Erreur lors de l\'envoi du message. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openInstagram = () => {
    window.open('https://www.instagram.com/precycle22/', '_blank');
  };

  return (
    <section id="contact" style={{ padding: '80px 0', background: 'linear-gradient(to bottom, #111827, #000000)', color: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '300', marginBottom: '20px', background: 'linear-gradient(to right, #ffffff, #ef4444)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Nous Contacter
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#d1d5db', maxWidth: '600px', margin: '0 auto 30px', lineHeight: '1.6' }}>
            Une question ? Un devis ? N'hésitez pas à nous contacter !
          </p>
          <div style={{ width: '96px', height: '4px', background: 'linear-gradient(to right, #dc2626, #ef4444)', margin: '0 auto', borderRadius: '2px' }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 1024 ? '1fr 1fr' : '1fr', gap: '60px' }}>
          <div style={{ background: 'rgba(17, 24, 39, 0.5)', border: '1px solid #374151', borderRadius: '12px', padding: '40px', backdropFilter: 'blur(12px)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '30px', color: 'white' }}>
              Envoyez-nous un message
            </h3>

            {submitStatus === 'success' && (
              <div style={{ padding: '15px', marginBottom: '20px', background: 'rgba(34, 197, 94, 0.2)', border: '1px solid rgba(34, 197, 94, 0.5)', borderRadius: '8px', color: '#22c55e' }}>
                ✅ {statusMessage}
              </div>
            )}
            {submitStatus === 'error' && (
              <div style={{ padding: '15px', marginBottom: '20px', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.5)', borderRadius: '8px', color: '#ef4444' }}>
                ❌ {statusMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'white' }}>Nom *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Votre nom" disabled={isSubmitting} style={{ width: '100%', padding: '12px', background: 'rgba(31, 41, 55, 0.5)', border: '1px solid #374151', borderRadius: '8px', color: 'white', fontSize: '16px', outline: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = '#ef4444'} onBlur={(e) => e.target.style.borderColor = '#374151'} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'white' }}>Prénom *</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required placeholder="Votre prénom" disabled={isSubmitting} style={{ width: '100%', padding: '12px', background: 'rgba(31, 41, 55, 0.5)', border: '1px solid #374151', borderRadius: '8px', color: 'white', fontSize: '16px', outline: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = '#ef4444'} onBlur={(e) => e.target.style.borderColor = '#374151'} />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'white' }}>Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="votre@email.com" disabled={isSubmitting} style={{ width: '100%', padding: '12px', background: 'rgba(31, 41, 55, 0.5)', border: '1px solid #374151', borderRadius: '8px', color: 'white', fontSize: '16px', outline: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = '#ef4444'} onBlur={(e) => e.target.style.borderColor = '#374151'} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'white' }}>Téléphone *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="06 XX XX XX XX" disabled={isSubmitting} style={{ width: '100%', padding: '12px', background: 'rgba(31, 41, 55, 0.5)', border: '1px solid #374151', borderRadius: '8px', color: 'white', fontSize: '16px', outline: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = '#ef4444'} onBlur={(e) => e.target.style.borderColor = '#374151'} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'white' }}>Ville *</label>
                  <input type="text" name="city" value={formData.city} onChange={handleInputChange} required placeholder="Votre ville" disabled={isSubmitting} style={{ width: '100%', padding: '12px', background: 'rgba(31, 41, 55, 0.5)', border: '1px solid #374151', borderRadius: '8px', color: 'white', fontSize: '16px', outline: 'none', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = '#ef4444'} onBlur={(e) => e.target.style.borderColor = '#374151'} />
                </div>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'white' }}>Message *</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} required rows="5" placeholder="Décrivez votre demande..." disabled={isSubmitting} style={{ width: '100%', padding: '12px', background: 'rgba(31, 41, 55, 0.5)', border: '1px solid #374151', borderRadius: '8px', color: 'white', fontSize: '16px', outline: 'none', resize: 'none', fontFamily: 'inherit', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = '#ef4444'} onBlur={(e) => e.target.style.borderColor = '#374151'} />
              </div>

              <button type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '15px', background: isSubmitting ? '#6b7280' : 'linear-gradient(to right, #dc2626, #ef4444)', border: 'none', borderRadius: '8px', color: 'white', fontSize: '16px', fontWeight: '600', cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: 'all 0.3s', transform: 'scale(1)', }} onMouseEnter={(e) => { if (!isSubmitting) { e.target.style.transform = 'scale(1.02)'; e.target.style.background = 'linear-gradient(to right, #b91c1c, #dc2626)'; } }} onMouseLeave={(e) => { if (!isSubmitting) { e.target.style.transform = 'scale(1)'; e.target.style.background = 'linear-gradient(to right, #dc2626, #ef4444)'; } }}>
                {isSubmitting ? '⏳ Envoi en cours...' : '📧 Envoyer le message'}
              </button>
            </form>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ background: 'rgba(17, 24, 39, 0.5)', border: '1px solid #374151', borderRadius: '12px', padding: '30px', textAlign: 'center', backdropFilter: 'blur(12px)' }}>
              <button onClick={openInstagram} style={{ width: '100%', padding: '15px', background: 'linear-gradient(to right, #dc2626, #ef4444)', border: 'none', borderRadius: '8px', color: 'white', fontSize: '18px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }} onMouseEnter={(e) => { e.target.style.transform = 'scale(1.02)'; e.target.style.background = 'linear-gradient(to right, #b91c1c, #dc2626)'; }} onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.background = 'linear-gradient(to right, #dc2626, #ef4444)'; }}>
                📱 Suivez-nous sur Instagram
              </button>
              <p style={{ color: '#9ca3af', marginTop: '15px', fontSize: '16px' }}>@precycle22</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ background: 'rgba(17, 24, 39, 0.5
