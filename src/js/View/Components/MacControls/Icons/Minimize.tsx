import * as React from 'react';

interface IMinimizeIconProps
{
  className?: string;
};

class Minimize extends React.Component<IMinimizeIconProps, any>
{
  render()
  {
    return window
            && window.devicePixelRatio > 1.5
            ? (
                <svg x="0px"
                     y="0px"
                     width="10px"
                     height="10px"
                     viewBox="0 0 20 20"
                     className={this.props.className}>
                  <rect fill="#995700"
                        x="2.4"
                        y="9"
                        width="15.1"
                        height="2"/>
                </svg>
              )
            : (
                <svg x="0px"
                     y="0px"
                     width="10px"
                     height="10px"
                     viewBox="0 0 10 10"
                     className={this.props.className}>
                  <path fill="#995700"
                        d="M8.048,4.001c0.163,0.012 0.318,0.054 0.459,0.137c0.325,0.191 0.518,0.559 0.49,0.934c-0.007,0.097 -0.028,0.192 -0.062,0.283c-0.04,0.105 -0.098,0.204 -0.171,0.29c-0.083,0.098 -0.185,0.181 -0.299,0.24c-0.131,0.069 -0.271,0.103 -0.417,0.114c-2.031,0.049 -4.065,0.049 -6.096,0c-0.163,-0.012 -0.318,-0.054 -0.459,-0.137c-0.325,-0.191 -0.518,-0.559 -0.49,-0.934c0.007,-0.097 0.028,-0.192 0.062,-0.283c0.04,-0.105 0.098,-0.204 0.171,-0.29c0.083,-0.098 0.185,-0.181 0.299,-0.24c0.131,-0.069 0.271,-0.103 0.417,-0.114c2.031,-0.049 4.065,-0.049 6.096,0Z" />
                </svg>
              );
  }
};

export default Minimize;