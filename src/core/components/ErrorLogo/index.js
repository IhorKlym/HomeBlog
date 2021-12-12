// @flow

import React from 'react';
import ErrorImg from './styles';

const ErrorLogo = () => (
  <ErrorImg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="280"
      height="280"
      viewBox="0 0 280 280"
    >
      <g>
        <g>
          <path
            d="M840.055,331.308C894,285.228,936.33,339.5,1017.77,314.391c23.65-7.293,38.67,12.112,46.24,31.448s7.93,35.905,6.14,58.423c6.36,50.757,28.66,48.119,16.09,80.517S1014.46,516.5,984.842,537c-42.47,29.4-101.852,21.559-125.957-2.261-33.183-32.789-22.723-78.541-30.148-110.31S803.926,362.167,840.055,331.308Z"
            transform="translate(-818 -311.656)"
            fillOpacity="0.1"
          />
        </g>

        <g>
          <path
            d="M866.31,340.366c50.074-31.806,78.714,18.113,149.07,6.9,20.43-3.255,30.58,14.579,34.57,31.48s2.33,30.662-1.8,49.1c-0.71,42.775,18.06,43.215,3.84,68.562s-63.142,17.815-90.066,31.3c-38.609,19.344-86.832,5.866-103.977-16.693-23.6-31.054-9.56-67.7-11.966-94.883S832.777,361.666,866.31,340.366Z"
            transform="translate(-818 -311.656)"
            fillOpacity="0.2"
          />
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="360 136 122"
            to="0 136 122"
            dur="13s"
            additive="sum"
            repeatCount="indefinite" />
        </g>

        <g>
          <path
            d="M992.452,319.522c51.368,29.671,20.368,78.161,62.868,135.345,12.34,16.607,1.22,33.853-11.91,45.211s-26.11,16.256-44.36,21.123c-38.247,19.167-29.952,36.009-59,35.135s-45.014-47.732-69.431-65.357c-35.014-25.275-45.382-74.261-33.318-99.9,16.606-35.293,55.6-39.806,78.575-54.515S958.052,299.652,992.452,319.522Z"
            transform="translate(-818 -311.656)"
            fillOpacity="0.3"
          />
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="-360 136 122"
            to="0 136 122"
            dur="10s"
            additive="sum"
            repeatCount="indefinite" />
        </g>

        <path
          d="M896.806,328.261c56.212-18.951,72.127,36.356,143.124,42.244,20.62,1.71,26.22,21.448,26.07,38.813s-5.05,30.333-13.45,47.251c-10.89,41.373,7.23,46.275-12.62,67.5S974.363,526.319,945,533c-42.107,9.581-85.727-15-97-41-15.518-35.785,6.857-68.033,11-95S859.162,340.953,896.806,328.261Z"
          transform="translate(-818 -311.656)"
        />
      </g>

      <image
        id="ghost"
        x="81"
        y="71.344"
        width="103"
        height="103"
        xlinkHref="data:img/png;base64,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"
      />
    </svg>
  </ErrorImg>
);

export default ErrorLogo;
