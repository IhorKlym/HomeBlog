// @flow
import React, { useRef, useEffect } from 'react';
import { observer } from 'mobx-react';
import { getUserName } from 'helpers/methods';
import useWindowSize from 'hooks/windowSize';
import * as d3Selection from 'd3-selection';
import * as d3Transition from 'd3-transition';

import store from './store';
import * as S from './styles';

const d3 = { ...d3Selection, ...d3Transition };

const ANIMATION_DURATION = 1000;
const BULB_RADIUS = 40;
const PADDING = 50;
const LEVELS = [
  { radius: BULB_RADIUS * 6, angleDiff: 25, angleStart: 0, range: [0, 4] },
  { radius: BULB_RADIUS * 9, angleDiff: 17, angleStart: -2, range: [5, 11] },
  { radius: BULB_RADIUS * 12, angleDiff: 13, angleStart: -4, range: [12, 20] }
];

const NetworksScreen = () => {
  const { networks, setMainNetwork } = store;
  const windowSize = useWindowSize();
  let visualization: any = useRef<any>();

  const updateVisualization = () => {
    if (!visualization) return;
    const { width, height } = visualization.getBoundingClientRect();
    const wrapWidth = Math.min(width, 1000);
    const wrapHeight = Math.min(height, 600);

    const svg = d3.select(visualization);

    const backgrounds = svg.selectAll('.background').data(networks);

    backgrounds.exit()
      .transition().duration(ANIMATION_DURATION)
      .style('fill-opacity', 0)
      .remove();

    const background = backgrounds.enter()
      .append('g')
      .attr('class', 'background')
      .attr('transform-origin', 'center')
      .attr('opacity', '0');

    background.append('image')
      .attr('x', '-10%')
      .attr('y', '-10%')
      .attr('width', '120%')
      .attr('height', '120%')
      .attr('xlink:href', network => {
        const { cover } = network;
        return cover;
      })
      .attr('preserveAspectRatio', 'xMinYMin slice');

    background.append('rect')
      .attr('x', '-10%')
      .attr('y', '-10%')
      .attr('width', '120%')
      .attr('height', '120%')
      .attr('fill', '#000')
      .attr('opacity', '0.2');

    const mergedBackground = background.merge(backgrounds);
    mergedBackground.transition().duration(ANIMATION_DURATION)
      .attr('opacity', network => {
        const { type } = network;
        return type === 'MAIN' ? 1 : 0;
      })
      .attr('transform', network => {
        const { type } = network;
        switch (type) {
        case 'MAIN':
          return 'translate(-40, 40)';
        case 'PAST':
          return 'translate(-80, 80)';
        default:
          return 'translate(0, 0)';
        }
      });

    const bulbs = svg.selectAll('.bulb').data(networks);

    bulbs.exit()
      .transition().duration(ANIMATION_DURATION)
      .style('fill-opacity', 0)
      .remove();

    const bulb = bulbs.enter()
      .append('g')
      .attr('class', 'bulb')
      .attr('transform-origin', 'center')
      .on('click', network => {
        const { type } = network;
        if (type === 'ACTIVE') setMainNetwork(network);
      })
      .attr('transform', `translate(${0}, ${-(height / 2 + BULB_RADIUS)})`);

    bulb.append('defs')
      .append('pattern')
      .attr('id', network => {
        const { user } = network;
        return `avatar_${user.id}`;
      })
      .attr('x', '0%')
      .attr('y', '0%')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 512 512')
      .append('image')
      .attr('x', '0%')
      .attr('y', '0%')
      .attr('width', '512')
      .attr('height', '512')
      .attr('xlink:href', network => {
        const { user } = network;
        return user.avatarUrl;
      })
      .attr('preserveAspectRatio', 'xMinYMin slice');

    bulb.append('circle')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', network => {
        const { type } = network;
        return type === 'MAIN' ? BULB_RADIUS * 2 : BULB_RADIUS;
      })
      .attr('fill', network => {
        const { user } = network;
        return user.avatarUrl ? `url(#avatar_${user.id})` : '#ccc';
      })
      .attr('stroke', 'black');

    bulb.append('text')
      .attr('x', '50%')
      .attr('y', '50%')
      .attr('text-anchor', 'middle')
      .attr('dy', '.3em')
      .attr('font-size', '20px')
      .style('stroke-width', '2')
      .text(network => {
        const { user } = network;
        return !user.avatarUrl ? getUserName(user, true) : '';
      });

    const mergedBulb = bulb.merge(bulbs);

    mergedBulb.transition().duration(ANIMATION_DURATION)
      .attr('transform', network => {
        const { type } = network;
        const cx = -(wrapWidth / 2 - PADDING - BULB_RADIUS * 2);
        const cy = wrapHeight / 2 - PADDING - BULB_RADIUS * 2;
        if (type === 'MAIN') {
          return `translate(${cx}, ${cy})`;
        }
        if (type === 'ACTIVE') {
          const all = networks.filter(n => n.type === 'ACTIVE');
          const idx = all.indexOf(network);
          const level = LEVELS.find(l => idx >= l.range[0] && idx <= l.range[1]);
          const angle = level ? level.angleStart + (idx - level.range[0]) * (level ? level.angleDiff : 25) : idx * 25;
          const R = level ? level.radius : (BULB_RADIUS * 5);
          const x = cx + R * Math.cos(-angle * Math.PI / 180);
          const y = cy + R * Math.sin(-angle * Math.PI / 180);
          return `translate(${x}, ${y})`;
        }
        if (type === 'PAST') {
          return `translate(${-(wrapWidth / 2 + BULB_RADIUS)}, ${(wrapHeight / 2 + BULB_RADIUS)})`;
        }
        return `translate(${(wrapWidth / 2 + BULB_RADIUS)}, ${-(wrapHeight / 2 + BULB_RADIUS)})`;
      })
      .attr('opacity', network => {
        const { type } = network;
        return (type === 'MAIN' || type === 'ACTIVE') ? 1 : 0;
      });

    mergedBulb.select('circle').transition().duration(ANIMATION_DURATION)
      .attr('r', network => {
        const { type } = network;
        return type === 'MAIN' ? BULB_RADIUS * 2 : BULB_RADIUS;
      });
  };

  useEffect(() => {
    updateVisualization();
  }, [visualization, networks, windowSize]);

  return (
    <S.Wrap>
      <svg ref={el => { visualization = el; }} />
    </S.Wrap>
  );
};

export default observer(NetworksScreen);
