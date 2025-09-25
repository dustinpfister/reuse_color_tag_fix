import packageJSON from '../package.json' with { type: 'json' };
const VERSION = 'R' + packageJSON.version.split('.')[1];

const gen_banner = (type='autoset', color='Auto') => {
    return '\/\********** ********** **********\n' +
    '  color-tag-fix, ' + VERSION + '-' + type +', color-'+ color + '\n' +
    '  by: Dustin Pfister \n' +
    '  e-mail: dustin.pfister@fingerlakesreuse.org  \n' +
    '  github: https://github.com/dustinpfister/reuse_color_tag_fix \n' +
    '********** ********** ********\*\/';
};

export { gen_banner, VERSION }
