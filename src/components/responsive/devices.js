/* eslint-disable react/prop-types */
import React from 'react';
import Breakpoint from './breakpoint';

export const DesktopBreakpoint = ({ children }) => (
  <Breakpoint name="desktop">
    {children}
  </Breakpoint>
);

export const PhoneBreakpoint = ({ children }) => (
  <Breakpoint name="phone">
    {children}
  </Breakpoint>
);

export const PhoneLandscapeBreakpoint = ({ children }) => (
  <Breakpoint name="phoneLandscape">
    {children}
  </Breakpoint>
);

export const TabletBreakpoint = ({ children }) => (
  <Breakpoint name="tablet">
    {children}
  </Breakpoint>
);

export const TabletLandscapeBreakpoint = ({ children }) => (
  <Breakpoint name="tabletLandscape">
    {children}
  </Breakpoint>
);
