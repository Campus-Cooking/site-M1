// ContactForm.jsx
import React from 'react';

const ContactForm = () => {
  const enquiryTypes = [
    'Advertising',
    'Partnership',
    'General Inquiry',
    'Technical Support',
    'Feedback',
  ];

  return (
    <div className="contact-container">
      <h1>Contact us</h1>

      <div className="contact-content">
        <div className="image-section">
          <img
            src="/landing-img/chefthumbsup.png"
            alt="Chef"
            className="chef-image"
          />
        </div>

        <form className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label>NAME</label>
              <input type="text" name="name" placeholder="Enter your name..." />
            </div>

            <div className="form-group">
              <label>EMAIL ADDRESS</label>
              <input
                type="email"
                name="email"
                placeholder="Your email address..."
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>SUBJECT</label>
              <input
                type="text"
                name="subject"
                placeholder="Enter subject..."
              />
            </div>

            <div className="form-group">
              <label>ENQUIRY TYPE</label>
              <select name="enquiryType" className="enquiry-select">
                {enquiryTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label>MESSAGES</label>
            <textarea
              name="message"
              placeholder="Enter your messages..."
              rows={6}
            />
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
