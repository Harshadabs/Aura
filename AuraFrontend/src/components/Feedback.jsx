import React from 'react';

const Feedback = () => {
  return (
<section class="feedback-section">
  <div class="feedback-left">
    <h1>
      Give Us<br />
      Your<br />
      Precious<br />
      Feedback
    </h1>
  </div>

  <div class="feedback-form">
    <form>
      <div class="form-row">
        <div class="form-group">
          <label>First Name</label>
          <input type="text" />
        </div>
        <div class="form-group">
          <label>Surname</label>
          <input type="text" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Contact No.</label>
          <input type="text" />
        </div>
        <div class="form-group">
          <label>Email Id</label>
          <input type="email" />
        </div>
      </div>

      <div class="form-full">
        <label>Feedback</label>
        <textarea rows="5"></textarea>
      </div>

      <div class="form-submit">
        <button type="submit" className='shop-button button'>Submit</button>
      </div>
    </form>
  </div>
</section>

  );
};

export default Feedback;
