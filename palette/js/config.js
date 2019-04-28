// set of colors, that should by displayed in palette
const allowedColors = {
  green: {
    color: '#41F795',
    title: 'Green',
    order: 1
  },
  grey: {
    color: '#C4C4C4',
    title: 'Grey',
    order: 2
  },
  red: {
    color: '#F74141',
    title: 'Red',
    order: 3
  },
  blue: {
    color: '#41B6F7',
    title: 'Blue',
    order: 4
  }
};

// settings for palette toolbox
const paletteConfig = {
  tools: {
    color: [
      {
        title: 'Paint bucket',
        order: 1,
        icon: 'paint-bucket.svg',
        id: 'bucket'
      },
      {
        title: 'Choose color',
        order: 2,
        icon: 'color-picker.svg',
        id: 'picker'
      }
    ],
    transform: [
      {
        title: 'Move',
        order: 1,
        icon: 'move.svg',
        id: 'move'
      },
      {
        title: 'Transform',
        order: 2,
        icon: 'transform.svg',
        id: 'transform'
      }
    ]
  }
};

// default settings for canvas blocks
const canvasDefaults = {
  currentColor: 'green',
  prevColor: 'grey',
  currentMode: 'bucket',
  blocks: {
    1: {
      roundForm: false,
      color: 'grey',
      x: 0,
      y: 0
    },
    2: {
      roundForm: false,
      color: 'grey',
      x: 0,
      y: 0
    },
    3: {
      roundForm: false,
      color: 'grey',
      x: 0,
      y: 0
    },
    4: {
      roundForm: false,
      color: 'grey',
      x: 0,
      y: 0
    },
    5: {
      roundForm: false,
      color: 'grey',
      x: 0,
      y: 0
    },
    6: {
      roundForm: false,
      color: 'grey',
      x: 0,
      y: 0
    },
    7: {
      roundForm: false,
      color: 'grey',
      x: 0,
      y: 0
    },
    8: {
      roundForm: false,
      color: 'grey',
      x: 0,
      y: 0
    },
    9: {
      roundForm: false,
      color: 'grey',
      x: 0,
      y: 0
    }
  }
};

const buttonsBind = {
  '1': 'bucket',
  b: 'bucket',
  B: 'bucket',
  '2': 'picker',
  p: 'picker',
  P: 'picker',
  '3': 'move',
  m: 'move',
  M: 'move',
  '4': 'transform',
  t: 'transform',
  T: 'transform'
};

export { allowedColors, paletteConfig, canvasDefaults, buttonsBind };
