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
      order: 1
    },
    2: {
      roundForm: false,
      color: 'grey',
      order: 2
    },
    3: {
      roundForm: false,
      color: 'grey',
      order: 3
    },
    4: {
      roundForm: false,
      color: 'grey',
      order: 4
    },
    5: {
      roundForm: false,
      color: 'grey',
      order: 5
    },
    6: {
      roundForm: false,
      color: 'grey',
      order: 6
    },
    7: {
      roundForm: false,
      color: 'grey',
      order: 7
    },
    8: {
      roundForm: false,
      color: 'grey',
      order: 8
    },
    9: {
      roundForm: false,
      color: 'grey',
      order: 9
    }
  }
};

export { allowedColors, paletteConfig, canvasDefaults };
