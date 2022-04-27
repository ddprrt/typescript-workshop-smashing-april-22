// copy a file function

const defaultOptions = {
    src: "./src",
    dest: "./dest",
    overwrite: true,
}

type Options = typeof defaultOptions

function copy(options: Partial<Options>) {
    const real_options = { ...options, ...defaultOptions };
}

copy({ dest: "./dist" })

export class COptions {
    options: typeof defaultOptionsForAClass
    
    constructor(params: Partial<COptions["options"]>) {
        this.options = { ...params, ...defaultOptions }
    }
}

const defaultOptionsForAClass = {
    src: "./src",
    dest: "./dest",
    overwrite: true,
}

new COptions({ dest: "./" })

export default {}