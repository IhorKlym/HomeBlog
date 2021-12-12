import { css } from 'styled-components';

// helvetica // TODO: remove after redesign
import mediumWoff from 'static/fonts/helvetica/medium/HelveticaNeueLTPro-Md.woff';
import mediumWoff2 from 'static/fonts/helvetica/medium/HelveticaNeueLTPro-Md.woff2';
import lightWoff from 'static/fonts/helvetica/light/HelveticaNeueLTPro-Lt.woff';
import lightWoff2 from 'static/fonts/helvetica/light/HelveticaNeueLTPro-Lt.woff2';
import normalWoff from 'static/fonts/helvetica/normal/HelveticaNeueLTPro-Roman.woff';
import normalWoff2 from 'static/fonts/helvetica/normal/HelveticaNeueLTPro-Roman.woff2';

// self-modern
import selfModernRegularWoff from 'static/fonts/self-modern/regular/bretagne_self-modern_regular_web.woff';
import selfModernRegularWoff2 from 'static/fonts/self-modern/regular/bretagne_self-modern_regular_web.woff2';
import selfModernItalicWoff from 'static/fonts/self-modern/italic/bretagne_self_modern_italic_web.woff';
import selfModernItalicWoff2 from 'static/fonts/self-modern/italic/bretagne_self_modern_italic_web.woff2';

// la fabrique
import laFabriqueSemiboldWoff from 'static/fonts/lafabrique/semibold/LaFabrique-SemiBold.woff';
import laFabriqueSemiboldWoff2 from 'static/fonts/lafabrique/semibold/LaFabrique-SemiBold.woff2';

// Icons
import iconEot from 'static/fonts/icon/icomoon.eot';
import iconTtf from 'static/fonts/icon/icomoon.ttf';
import iconWoff from 'static/fonts/icon/icomoon.woff';
import iconSvg from 'static/fonts/icon/icomoon.svg';

import { font } from './mixins';

export default css`
  ${font({ woff: selfModernRegularWoff, woff2: selfModernRegularWoff2 }, 'SelfModernRegular', 300)}
  ${font({ woff: selfModernItalicWoff, woff2: selfModernItalicWoff2 }, 'SelfModernItalic', 300)}
  ${font({ woff: laFabriqueSemiboldWoff, woff2: laFabriqueSemiboldWoff2 }, 'LaFabriqueSemiBold', 600)}
  ${font({ woff: mediumWoff, woff2: mediumWoff2 }, 'HelveticaNeueLTPro', 500)}
  ${font({ woff: lightWoff, woff2: lightWoff2 }, 'HelveticaNeueLTPro', 300)}
  ${font({ woff: normalWoff, woff2: normalWoff2 }, 'HelveticaNeueLTPro', 400)}
  ${font({ woff: iconWoff, eot: iconEot, ttf: iconTtf, svg: iconSvg }, 'Icon Font')}
`;
