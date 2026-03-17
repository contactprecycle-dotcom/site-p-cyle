import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

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
  const [submitStatus, setSubmitStatus] = useState(''); // 'success', 'error', ''
  const [statusMessage, setStatusMessage] = useState('');

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
      const response = await axios.post(`${API}/contact`, formData);
      
      if (response.data.success) {
        setSubmitStatus('success');
        setStatusMessage(response.data.message);
        setFormData({
          name: '',
          firstName: '',
          city: '',
          email: '',
          phone: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
      
      // Handle different error formats
      const detail = error.response?.data?.detail;
      if (detail) {
        // If detail is an array (Pydantic validation errors), extract messages
        if (Array.isArray(detail)) {
          const messages = detail.map(err => {
            if (typeof err === 'string') return err;
            if (err.msg) return err.msg;
            return 'Erreur de validation';
          });
          setStatusMessage(messages.join('. '));
        } else if (typeof detail === 'string') {
          setStatusMessage(detail);
        } else if (typeof detail === 'object' && detail.msg) {
          setStatusMessage(detail.msg);
        } else {
          setStatusMessage('Erreur lors de l\'envoi du message. Veuillez réessayer.');
        }
      } else {
        setStatusMessage('Erreur lors de l\'envoi du message. Veuillez réessayer.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const openInstagram = () => {
    window.open('https://www.instagram.com/precycle22/', '_blank');
  };

  return (
    <section id="contact" style={{
      padding: '80px 0',
      background: 'linear-gradient(to bottom, #111827, #000000)',
      color: 'white'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: '300',
            marginBottom: '20px',
            background: 'linear-gradient(to right, #ffffff, #ef4444)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Nous Contacter
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#d1d5db',
            maxWidth: '600px',
            margin: '0 auto 30px',
            lineHeight: '1.6'
          }}>
            Une question ? Un devis ? N'hésitez pas à nous contacter !
          </p>
          <div style={{
            width: '96px',
            height: '4px',
            background: 'linear-gradient(to right, #dc2626, #ef4444)',
            margin: '0 auto',
            borderRadius: '2px'
          }}></div>
        </div>

        {/* Main Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 1024 ? '1fr 1fr' : '1fr',
          gap: '60px'
        }}>
          {/* Contact Form */}
          <div style={{
            background: 'rgba(17, 24, 39, 0.5)',
            border: '1px solid #374151',
            borderRadius: '12px',
            padding: '40px',
            backdropFilter: 'blur(12px)'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '30px',
              color: 'white'
            }}>
              Envoyez-nous un message
            </h3>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div style={{
                padding: '15px',
                marginBottom: '20px',
                background: 'rgba(34, 197, 94, 0.2)',
                border: '1px solid rgba(34, 197, 94, 0.5)',
                borderRadius: '8px',
                color: '#22c55e'
              }}>
                ✅ {statusMessage}
              </div>
            )}

            {submitStatus === 'error' && (
              <div style={{
                padding: '15px',
                marginBottom: '20px',
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.5)',
                borderRadius: '8px',
                color: '#ef4444'
              }}>
                ❌ {statusMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Name and First Name */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '20px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: 'white'
                  }}>
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Votre nom"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(31, 41, 55, 0.5)',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#ef4444'}
                    onBlur={(e) => e.target.style.borderColor = '#374151'}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: 'white'
                  }}>
                    Prénom *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    placeholder="Votre prénom"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(31, 41, 55, 0.5)',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#ef4444'}
                    onBlur={(e) => e.target.style.borderColor = '#374151'}
                  />
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: 'white'
                }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="votre@email.com"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(31, 41, 55, 0.5)',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#ef4444'}
                  onBlur={(e) => e.target.style.borderColor = '#374151'}
                />
              </div>

              {/* Phone and City */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '20px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: 'white'
                  }}>
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="06 XX XX XX XX"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(31, 41, 55, 0.5)',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#ef4444'}
                    onBlur={(e) => e.target.style.borderColor = '#374151'}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: 'white'
                  }}>
                    Ville *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    placeholder="Votre ville"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(31, 41, 55, 0.5)',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#ef4444'}
                    onBlur={(e) => e.target.style.borderColor = '#374151'}
                  />
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: '30px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: 'white'
                }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  placeholder="Décrivez votre demande..."
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(31, 41, 55, 0.5)',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '16px',
                    outline: 'none',
                    resize: 'none',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#ef4444'}
                  onBlur={(e) => e.target.style.borderColor = '#374151'}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '15px',
                  background: isSubmitting ? '#6b7280' : 'linear-gradient(to right, #dc2626, #ef4444)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  transform: 'scale(1)',
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.target.style.transform = 'scale(1.02)';
                    e.target.style.background = 'linear-gradient(to right, #b91c1c, #dc2626)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.background = 'linear-gradient(to right, #dc2626, #ef4444)';
                  }
                }}
              >
                {isSubmitting ? '⏳ Envoi en cours...' : '📧 Envoyer le message'}
              </button>
            </form>
          </div>

          {/* Contact Info & Instagram */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {/* Instagram */}
            <div style={{
              background: 'rgba(17, 24, 39, 0.5)',
              border: '1px solid #374151',
              borderRadius: '12px',
              padding: '30px',
              textAlign: 'center',
              backdropFilter: 'blur(12px)'
            }}>
              <button
                onClick={openInstagram}
                style={{
                  width: '100%',
                  padding: '15px',
                  background: 'linear-gradient(to right, #dc2626, #ef4444)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.02)';
                  e.target.style.background = 'linear-gradient(to right, #b91c1c, #dc2626)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.background = 'linear-gradient(to right, #dc2626, #ef4444)';
                }}
              >
                📱 Suivez-nous sur Instagram
              </button>
              <p style={{ color: '#9ca3af', marginTop: '15px', fontSize: '16px' }}>
                @precycle22
              </p>
            </div>

            {/* Contact Info */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px'
            }}>
              {/* Address */}
              <div style={{
                background: 'rgba(17, 24, 39, 0.5)',
                border: '1px solid #374151',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                backdropFilter: 'blur(12px)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(to right, rgba(220, 38, 38, 0.2), rgba(239, 68, 68, 0.2))',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px',
                  fontSize: '20px'
                }}>
                  📍
                </div>
                <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>
                  Adresse
                </h4>
                <p style={{ color: '#d1d5db', fontSize: '12px' }}>
                  Trégueux, Côtes-d'Armor, Bretagne
                </p>
              </div>

              {/* Phone */}
              <div style={{
                background: 'rgba(17, 24, 39, 0.5)',
                border: '1px solid #374151',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                backdropFilter: 'blur(12px)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(to right, rgba(220, 38, 38, 0.2), rgba(239, 68, 68, 0.2))',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px',
                  fontSize: '20px'
                }}>
                  📞
                </div>
                <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>
                  Téléphone
                </h4>
                <a 
                  href="tel:0670944819"
                  style={{ 
                    color: '#d1d5db', 
                    fontSize: '12px', 
                    textDecoration: 'none',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#ef4444'}
                  onMouseLeave={(e) => e.target.style.color = '#d1d5db'}
                >
                  06 70 94 48 19
                </a>
              </div>

              {/* Email */}
              <div style={{
                background: 'rgba(17, 24, 39, 0.5)',
                border: '1px solid #374151',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                backdropFilter: 'blur(12px)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(to right, rgba(220, 38, 38, 0.2), rgba(239, 68, 68, 0.2))',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px',
                  fontSize: '20px'
                }}>
                  ✉️
                </div>
                <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>
                  Email
                </h4>
                <a 
                  href="mailto:contact.precycle@gmail.com"
                  style={{ 
                    color: '#d1d5db', 
                    fontSize: '12px', 
                    textDecoration: 'none',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#ef4444'}
                  onMouseLeave={(e) => e.target.style.color = '#d1d5db'}
                >
                  contact.precycle@gmail.com
                </a>
              </div>

              {/* Hours */}
              <div style={{
                background: 'rgba(17, 24, 39, 0.5)',
                border: '1px solid #374151',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                backdropFilter: 'blur(12px)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(to right, rgba(220, 38, 38, 0.2), rgba(239, 68, 68, 0.2))',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px',
                  fontSize: '20px'
                }}>
                  🕐
                </div>
                <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '12px', fontSize: '14px' }}>
                  Horaires
                </h4>
                <div style={{ fontSize: '11px', lineHeight: '1.4' }}>
                  <div style={{ color: '#d1d5db' }}>Lundi - Vendredi</div>
                  <div style={{ color: '#9ca3af' }}>9h00 - 18h00</div>
                  <div style={{ color: '#d1d5db', marginTop: '8px' }}>Samedi</div>
                  <div style={{ color: '#9ca3af' }}>9h00 - 17h00</div>
                  <div style={{ color: '#d1d5db', marginTop: '8px' }}>Dimanche</div>
                  <div style={{ color: '#9ca3af' }}>Fermé</div>
                </div>
              </div>
            </div>

            {/* Customer Reviews */}
            <div style={{
              background: 'rgba(17, 24, 39, 0.5)',
              border: '1px solid #374151',
              borderRadius: '12px',
              padding: '30px',
              backdropFilter: 'blur(12px)'
            }}>
              <h4 style={{ color: 'white', fontWeight: 'bold', fontSize: '20px', textAlign: 'center', marginBottom: '25px' }}>
                Avis clients
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ borderBottom: '1px solid #374151', paddingBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>Eric Wagner</span>
                    <div style={{ color: '#fbbf24', fontSize: '14px' }}>⭐⭐⭐⭐⭐</div>
                  </div>
                  <p style={{ color: '#d1d5db', fontSize: '13px', marginBottom: '8px', fontStyle: 'italic' }}>
                    "Super travail de Laurent. Il est venu en temps et en heure à notre maison de vacances pour réparer un pneu crevé. Le travail s'est fait en un rien de temps et il en a profité pour régler le dérailleur arrière du vélo et a gonflé les pneus du deuxième vélo. Tout est parfait. N'hésitez pas une seconde pour faire appel à Laurent - PRECYCLE."
                  </p>
                  <span style={{ color: '#6b7280', fontSize: '11px' }}>il y a 4 mois</span>
                </div>

                <div style={{ borderBottom: '1px solid #374151', paddingBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>edgard reux (Gared)</span>
                    <div style={{ color: '#fbbf24', fontSize: '14px' }}>⭐⭐⭐⭐⭐</div>
                  </div>
                  <p style={{ color: '#d1d5db', fontSize: '13px', marginBottom: '8px', fontStyle: 'italic' }}>
                    "Réparation de mon vélo à domicile sur Langueux. Réparation de qualité et énormément de conseils de sa part. Je recommande."
                  </p>
                  <span style={{ color: '#6b7280', fontSize: '11px' }}>il y a 8 mois</span>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>Sébastien EZANIC</span>
                    <div style={{ color: '#fbbf24', fontSize: '14px' }}>⭐⭐⭐⭐⭐</div>
                  </div>
                  <p style={{ color: '#d1d5db', fontSize: '13px', marginBottom: '8px', fontStyle: 'italic' }}>
                    "Grand professionnel, très pointu sur les vélos haut de gamme. Confiance absolue."
                  </p>
                  <span style={{ color: '#6b7280', fontSize: '11px' }}>il y a 4 mois</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};