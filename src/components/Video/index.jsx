import React from 'react';
import PropTypes from 'prop-types';
import './VideoCard.css';

export default function VideoCard({ details }) {
  console.log(details.strYoutube && details.strYoutube.replace('watch?v=', 'embed/'));
  return (
    <div className="video-card">
      <h3>Video:</h3>
      <iframe
        data-testid="video"
        className="video"
        frameBorder="0"
        allowFullScreen="1"
        allow="accelerometer;
        autoplay; clipboard-write;
        encrypted-media; gyroscope;
        picture-in-picture"
        title="YouTube video player"
        width="640"
        height="360"
        src={ details.strYoutube && details.strYoutube.replace('watch?v=', 'embed/') }
        id="widget2"
      />
    </div>
  );
}

VideoCard.propTypes = {
  details: PropTypes.objectOf(PropTypes.any).isRequired,
};
