import fs from 'fs';

export const DATA_PATH = 'storage/data.json'

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