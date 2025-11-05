import React from 'react';

const Feedback = () => {
  return (
<section className="feedback-section">
  <div className="feedback-left">
    <h1>
      Give Us<br />
      Your<br />
      Precious<br />
      Feedback<br />
    </h1>
  </div>

  <div className="feedback-form">
    <form>
      <div className="form-row">
        <div className="form-group">
          <label>First Name</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Surname</label>
          <input type="text" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Contact No.</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Email Id</label>
          <input type="email" />
        </div>
      </div>

      <div className="form-full">
        <label>Feedback</label>
        <textarea rows="5"></textarea>
      </div>

      <div className="form-submit">
        <button type="submit" className='shop-button button'>Submit</button>
      </div>
    </form>
  </div>
</section>

  );
};

export default Feedback;
