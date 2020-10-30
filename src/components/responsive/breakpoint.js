import React from 'react';
import MediaQuery from 'react-responsive';

const breakpoints = {
  desktop: '(min-width: 1025px)',
  tablet: '(min-width: 768px) and (max-width: 1024px) and (orientation: portrait)',
  tabletLandscape: '(min-width: 768px) and (max-width: 1024px) and (orientation: landscape)',
  phone: '(max-width: 767px) and (orientation: portrait)',
  phoneLandscape: '(max-width: 767px) and (orientation: landscape)',
};
export default function Breakpoint({ name, children, ...props }) {
  const breakpoint = breakpoints[name] || breakpoints.desktop;
  return (
    <MediaQuery {...props} query={breakpoint}>
      {children}
    </MediaQuery>
  );
}
