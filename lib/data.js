import fs from 'fs';
import os from 'os';

const APP_DIR = os.homedir() + '/.memodoc'
export const DATA_PATH = APP_DIR + '/data.json'

try { 
    fs.mkdirSync(APP_DIR); 
} catch(e) { 
    if ( e.code != 'EEXIST' ) throw e;
}

// Init required json file if it's not
if (!(fs.existsSync(DATA_PATH))) {
    fs.writeFileSync(DATA_PATH, "{}");
}

export let DATA = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

export function create_book(name) {
    if (name in DATA) {
        return false
    }

    DATA[name] = {}
    fs.writeFileSync(DATA_PATH, JSON.stringify(DATA))
    return true
}