const COLOR_DEFAULT = {
    autoset: true,
    debug: false,
    first_tuesday: new Date(2025, 9 - 1, 9, 0, 0, 0, 0),
    first_index: 0,
    ascending: true,
    data: [  
        { i: 0, desc: 'Green',  web: '#00ff00' },
        { i: 1, desc: 'Blue',   web: '#0000ff' },
        { i: 2, desc: 'Yellow', web: '#ffff00' },
        { i: 3, desc: 'Orange', web: '#ff8800' },
        { i: 4, desc: 'Red',    web: '#ff0000' }
    ],
    color: 'Green'
};
const COLOR_ARRAY_DEFAULT = [ COLOR_DEFAULT ];

const parse_color = {};

parse_color.object = ( COLOR ) => {
    return Object.assign({}, COLOR_DEFAULT, COLOR);
};

parse_color.array = () => {
    return COLOR_ARRAY_DEFAULT;
};

export { parse_color };
