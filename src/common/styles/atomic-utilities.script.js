const paddingBase = 6;
const paddings = {
  ...Array.from({length: 11}).reduce((obj, v, index) => {
    const value = index * paddingBase;
    return {
      ...obj,
      [`pa_${index}`]: {
        padding: value,
      },
      [`pt_${index}`]: {
        paddingTop: value,
      },
      [`pb_${index}`]: {
        paddingBottom: value,
      },
      [`pl_${index}`]: {
        paddingLeft: value,
      },
      [`pr_${index}`]: {
        paddingRight: value,
      },
      [`px_${index}`]: {
        paddingHorizontal: value,
      },
      [`py_${index}`]: {
        paddingVertical: value,
      },
    };
  }, {}),
};

const marginBase = 8;
const margins = {
  ...Array.from({length: 11}).reduce((obj, v, index) => {
    const value = index * marginBase;
    return {
      ...obj,
      [`ma_${index}`]: {
        margin: value,
      },
      [`mt_${index}`]: {
        marginTop: value,
      },
      [`mb_${index}`]: {
        marginBottom: value,
      },
      [`ml_${index}`]: {
        marginLeft: value,
      },
      [`mr_${index}`]: {
        marginRight: value,
      },
      [`mx_${index}`]: {
        marginHorizontal: value,
      },
      [`my_${index}`]: {
        marginVertical: value,
      },
    };
  }, {}),
};

const radiusBase = 2;
const borderRadiuses = {
  ...Array.from({length: 6}).reduce((obj, v, index) => {
    const value = index * radiusBase;
    return {
      ...obj,
      [`br_${index}`]: {
        borderRadius: value,
      },
      [`btlr_${index}`]: {
        borderTopLeftRadius: value,
      },
      [`btrr_${index}`]: {
        borderTopRightRadius: value,
      },
      [`bblr_${index}`]: {
        borderBottomLeftRadius: value,
      },
      [`bbrr_${index}`]: {
        borderBottomRightRadius: value,
      },
    };
  }, {}),
};

const borderWidthBase = 1;
const borderWidths = {
  ...Array.from({length: 6}).reduce((obj, v, index) => {
    const value = index * borderWidthBase;
    return {
      ...obj,
      [`ba_${index}`]: {
        borderWidth: value,
      },
      [`btw_${index}`]: {
        borderTopWidth: value,
      },
      [`bbw_${index}`]: {
        borderBottomWidth: value,
      },
      [`brw_${index}`]: {
        borderRightWidth: value,
      },
      [`blw_${index}`]: {
        borderLeftWidth: value,
      },
    };
  }, {}),
};

const percentages = {
  0: '0%',
  10: '10%',
  25: '25%',
  50: '50%',
  75: '75%',
  100: '100%',
  33: '33.3333%',
  66: '66.6667%',
  12: '12.5%',
  20: '20%',
  30: '30%',
  40: '40%',
  60: '60%',
  70: '70%',
  80: '80%',
  90: '90%',
};
const fixedWH = Object.entries(percentages).reduce(
  (obj, [key, value]) => ({
    ...obj,
    [`w_${key}`]: {width: value, maxWidth: value},
    [`h_${key}`]: {height: value, maxHeight: value},
  }),
  {},
);

const opacities = Array.from({length: 10}).reduce(
  (obj, v, idx) => ({...obj, [`op_${idx}`]: {opacity: idx / 10}}),
  {},
);

const atomicUtils = {
  // position
  r: {
    position: 'relative',
  },
  abs: {
    position: 'absolute',
  },
  top: {
    top: 0,
  },
  bottom: {
    bottom: 0,
  },
  right: {
    right: 0,
  },
  left: {
    left: 0,
  },
  //font size
  fs_12: {
    fontSize: 12,
  },
  fs_13: {
    fontSize: 13,
  },
  fs_14: {
    fontSize: 14,
  },
  fs_15: {
    fontSize: 15,
  },
  fs_16: {
    fontSize: 16,
  },
  fs_17: {
    fontSize: 17,
  },
  fs_18: {
    fontSize: 18,
  },
  fs_19: {
    fontSize: 19,
  },
  fs_20: {
    fontSize: 20,
  },
  fs_21: {
    fontSize: 21,
  },
  fs_22: {
    fontSize: 22,
  },
  fs_23: {
    fontSize: 23,
  },
  fs_24: {
    fontSize: 24,
  },

  // font weight
  fw_100: {
    fontWeight: '100',
  },
  fw_200: {
    fontWeight: '200',
  },
  fw_300: {
    fontWeight: '300',
  },
  fw_400: {
    fontWeight: '400',
  },
  fw_500: {
    fontWeight: '500',
  },
  fw_600: {
    fontWeight: '600',
  },
  fw_700: {
    fontWeight: '700',
  },
  fw_800: {
    fontWeight: '800',
  },
  fw_900: {
    fontWeight: '900',
  },
  fwBold: {
    fontWeight: 'bold',
  },
  fwNormal: {
    fontWeight: 'normal',
  },

  // font style
  i: {
    fontStyle: 'italic',
  },

  // Text align
  taRight: {
    textAlign: 'right',
  },
  taCenter: {
    textAlign: 'center',
  },
  taLeft: {
    textAlign: 'left',
  },

  ...paddings,
  ...margins,
  ...borderRadiuses,
  ...borderWidths,
  ...fixedWH,
  ...opacities,

  transparent: {
    backgroundColor: 'transparent',
    color: 'transparent',
    borderWidth: 0,
  },
  hidden: {
    display: 'none',
  },

  // overflow
  overflowHidden: {
    overflow: 'hidden',
  },
  overflowScroll: {
    overflow: 'scroll',
  },
};

export default atomicUtils;
