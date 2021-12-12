// @flow

export const
  fontDefault        = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontHeading        = 'SelfModernRegular',
  fontText           = 'SelfModernRegular',
  fontLink           = 'LaFabriqueSemiBold',
  fontIcon           = 'Icon Font',

  defaultFontSize    = '16px',
  defaultFontSizeSm  = '14px',

  textSizes = {
    xs:              defaultFontSize,
    sm:              defaultFontSize,
    md:              defaultFontSize,
    lg:              defaultFontSize,
    xl:              defaultFontSize
  },

  zindexs = {
    dropdown:         1000,
    sticky:           1020,
    fixed:            1030,
    modalBackdrop:    1040,
    modal:            1050,
    popover:          1060,
    tooltip:          1070,
    toaster:          1080
  },

  gridBreakpoints = {
    xs:               0,
    sm:              540,
    md:              720,
    lg:              960,
    xl:              1210,
    xxl:             1360
  },

  containerMaxWidths = {
    sm:              540,
    md:              720,
    lg:              960,
    xl:              1200,
    xxl:             1360
  },

  headerMaxWidth = {
    sm:              540,
    md:              720,
    lg:              960,
    xl:              1240,
    xxl:             1380
  },

  breakpoints = {
    sm:               576,
    md:               768,
    lg:               992,
    xl:               1260,
    xxl:              1440
  },

  boxShadow                 = '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
  customGutterSize          = 20,
  baseTransition            = '.35s',
  tabNavsHeight             = 49,
  topBarHeight              = 10,
  navigationHeightMobile    = 50,
  navigationHeightDesktop   = 80,
  searchBarHeightMobile     = 90,
  searchBarHeightDesktop    = 120;
