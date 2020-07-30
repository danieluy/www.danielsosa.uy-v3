import React from 'react';
import PropTypes from 'prop-types';

function FullLogo({ className }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M27.4286 37.7143L27.4286 41.1429C27.4286 44.9299 30.4986 48 34.2857 48H41.1429C44.93 48 48 44.93 48 41.1429V34.2857C48 30.4986 44.93 27.4286 41.1429 27.4286L34.2857 27.4286V20.5714H41.1429V24L48 24L48 20.5714C48 16.7843 44.9299 13.7143 41.1429 13.7143H34.2857C30.4986 13.7143 27.4286 16.7843 27.4286 20.5714V27.4286C27.4286 31.2157 30.4986 34.2857 34.2857 34.2857L41.1429 34.2857V41.1429H34.2857V37.7143H27.4286Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M0 20.5714V41.1428C0 44.9299 3.07005 48 6.85714 48L13.7143 48C17.5014 48 20.5714 44.9299 20.5714 41.1429V0H13.7143V13.7143H6.85714C3.07005 13.7143 0 16.7843 0 20.5714ZM6.85714 41.1429V20.5714H13.7143V41.1429H6.85714Z" fill="currentColor" />
    </svg>
  );
}

FullLogo.propTypes = {
  className: PropTypes.string,
};

FullLogo.defaultProps = {
  className: '',
};

export default FullLogo;