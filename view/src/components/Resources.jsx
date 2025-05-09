import React, { useState } from 'react';
import Navbar from './Navbar';

const MentalHealthResources = () => {
  // State variables to control visibility of additional content
  const [showSelfCare, setShowSelfCare] = useState(false);
  const [showCoping, setShowCoping] = useState(false);
  const [showLifestyle, setShowLifestyle] = useState(false);

  return (
    <div className="mental-health-resources">
      <Navbar />
      <h1>Mental Health Resources</h1>

      {/* Emergency Helplines Section */}
      <section className="emergency-helplines">
        <h2>Emergency Helplines</h2>
        <p>If you're experiencing a mental health crisis, please call one of these helplines:</p>
        <div className="helpline-grid">
          <div className="helpline-card">
            <h3>Vent by Mindspace</h3>
            <p>Phone: <a href="tel:+8809678678778">+8809678678778</a></p>
            <button className="btn btn-primary" onClick={() => window.location.href = 'tel:+8809678678778'}>Call Now</button>
          </div>
          <div className="helpline-card">
            <h3>Kaan Pete Roi</h3>
            <p>Phone: <a href="tel:+8801779554391">+8801779554391</a></p>
            <button className="btn btn-primary" onClick={() => window.location.href = 'tel:+8801779554391'}>Call Now</button>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="articles">
        <h2>Articles on Self-Care, Coping Mechanisms, and Lifestyle Tips</h2>
        <div className="article-grid">
          <div className="article-card">
            <h3>Self-Care Strategies</h3>
            <p>Learn how to prioritize self-care for better mental health...</p>
            <button className="btn btn-secondary" onClick={() => setShowSelfCare(!showSelfCare)}>
              {showSelfCare ? 'Read Less' : 'Read More'}
            </button>
            {showSelfCare && (
              <div className="more-content">
                <h4>Self-Care Strategies</h4>
                <p>Self-care is essential for maintaining mental health. Here are some strategies to try:</p>
                <ul>
                  <li><strong>Get regular exercise:</strong> Aim for at least 30 minutes of walking each day to boost your mood and overall health.</li>
                  <li><strong>Eat healthy, regular meals:</strong> Maintain a balanced diet and stay hydrated to improve energy and focus.</li>
                  <li><strong>Make sleep a priority:</strong> Stick to a sleep schedule and reduce blue light exposure before bedtime.</li>
                  <li><strong>Try a relaxing activity:</strong> Explore meditation, muscle relaxation, or breathing exercises to reduce stress.</li>
                  <li><strong>Set goals and priorities:</strong> Decide what needs to be done and learn to say "no" to new tasks.</li>
                  <li><strong>Practice gratitude:</strong> Remind yourself daily of things you're grateful for.</li>
                  <li><strong>Focus on positivity:</strong> Challenge negative thoughts and focus on the positive.</li>
                  <li><strong>Stay connected:</strong> Reach out to friends or family for support.</li>
                  <li><strong>Learn more about healthy practices:</strong> Visit resources like the <a href="https://www.nih.gov/health-information/your-healthiest-self-wellness-toolkits">NIH Wellness Toolkits</a> for more information.</li>
                </ul>
              </div>
            )}
          </div>
          <div className="article-card">
            <h3>Coping with Stress</h3>
            <p>Discover effective coping mechanisms for managing stress...</p>
            <button className="btn btn-secondary" onClick={() => setShowCoping(!showCoping)}>
              {showCoping ? 'Read Less' : 'Read More'}
            </button>
            {showCoping && (
              <div className="more-content">
                <h4>Coping Mechanisms for Stress</h4>
                <p>Stress is a common challenge, but these healthy coping mechanisms can help:</p>
                <ul>
                  <li><strong>Meditation:</strong> Spend a few minutes each day meditating to calm your mind.</li>
                  <li><strong>Deep Breathing:</strong> Practice techniques like box breathing to reduce stress.</li>
                  <li><strong>Exercise:</strong> Engage in physical activities like walking, dancing, or hiking.</li>
                  <li><strong>Get Outside:</strong> Spend time in nature to refresh your mind.</li>
                  <li><strong>Snuggle with a Pet:</strong> Interact with pets to lower stress levels.</li>
                  <li><strong>Write in a Journal:</strong> Express your thoughts and feelings through writing.</li>
                  <li><strong>Immerse in Art:</strong> Enjoy music, art, or literature to distract and relax.</li>
                  <li><strong>Talk with a Friend:</strong> Share your stresses with someone you trust.</li>
                  <li><strong>Think Positive Thoughts:</strong> Use positive self-talk and affirmations.</li>
                  <li><strong>Volunteer:</strong> Help others to feel a sense of purpose and reduce your own stress.</li>
                  <li><strong>Get Laughing:</strong> Watch a comedy or spend time with someone who makes you laugh.</li>
                  <li><strong>Try Aromatherapy:</strong> Use calming scents like lavender to relax.</li>
                  <li><strong>Engage Your Senses:</strong> Take a warm shower or wear comfortable clothes to feel better.</li>
                  <li><strong>Unplug from Technology:</strong> Take breaks from screens and social media.</li>
                </ul>
              </div>
            )}
          </div>
          <div className="article-card">
            <h3>Lifestyle Tips for Mental Wellbeing</h3>
            <p>Explore lifestyle changes that can improve your mental health...</p>
            <button className="btn btn-secondary" onClick={() => setShowLifestyle(!showLifestyle)}>
              {showLifestyle ? 'Read Less' : 'Read More'}
            </button>
            {showLifestyle && (
              <div className="more-content">
                <h4>Lifestyle Tips for Mental Wellbeing</h4>
                <p>Adopting these lifestyle changes can enhance your mental wellbeing:</p>
                <ul>
                  <li><strong>Connect with other people:</strong> Build relationships by spending time with family and friends, volunteering, or using technology to stay in touch.</li>
                  <li><strong>Be physically active:</strong> Find enjoyable physical activities to boost your mood and self-esteem.</li>
                  <li><strong>Learn new skills:</strong> Take up a new hobby or course to build confidence and purpose.</li>
                  <li><strong>Give to others:</strong> Help others through small acts of kindness or volunteering to feel a sense of reward and connection.</li>
                  <li><strong>Pay attention to the present moment (mindfulness):</strong> Practice mindfulness to enjoy life more and understand yourself better.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="videos">
        <h2>Videos on Mental Health</h2>
        <div className="video-grid">
          <div className="video-card">
            <div className="video-wrapper">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/8Su5VtKeXU8?si=aX3Jxul4PBz87mA_&start=4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
            <h3>Video Title 1</h3>
          </div>
          <div className="video-card">
            <div className="video-wrapper">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/WWloIAQpMcQ?si=j19mY-HAfNgHOEmi&start=4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
            <h3>Video Title 2</h3>
          </div>
        </div>
      </section>

      {/* Lifestyle Tips Section */}
      <section className="lifestyle-tips">
        <h2>Lifestyle Tips</h2>
        <div className="tip-grid">
          <div className="tip-card">
            <h3>Tip 1: Exercise Regularly</h3>
            <p>Regular physical activity can help reduce symptoms of depression and anxiety...</p>
          </div>
          <div className="tip-card">
            <h3>Tip 2: Maintain a Healthy Diet</h3>
            <p>Eating a balanced diet can positively impact your mood and energy levels...</p>
          </div>
          <div className="tip-card">
            <h3>Tip 3: Get Enough Sleep</h3>
            <p>Adequate sleep is crucial for mental health and overall well-being...</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MentalHealthResources;