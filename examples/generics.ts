type VideoFormatURLs = {
    format360p: URL,
    format480p: URL,
    format720p: URL,
    format1080p: URL,
    format4k: URL,
    format120p: URL
}

type SubtitleURLs = {
    en: URL,
    de: URL,
    fr: URL,
    pt: URL
}

type UrlList = {
    [k: string]: URL
}

function identity<T>(a: T): T {
    return a;
}

const test_1 = identity<string>("Hello, Smashing folks!");
const test_2 = identity("Hello, Smashing folks!") // Generic binding
let test_3 = identity("What about let?");

// T ... type parameter
// type predicate
function isAvailable<T>(list: T, format: string | number | symbol): format is keyof T {
    return format in list // true | false 
}

type VideoFormatKeys = keyof VideoFormatURLs
type VideoFormatTypes = VideoFormatURLs[VideoFormatKeys]

function createLoadedObject<T>(obj: T) {
    const result: Record<string, boolean> = {};

    Object.keys(obj).map(el => {
        result[el] = false;
    })

    return result as { [K in keyof T]: boolean };
}

// generic bound -- or -- generic constraint
function loadUrl<T extends UrlList>(list: T, format: keyof T): { [K in keyof T]: boolean } {
    const result = createLoadedObject(list);

    if(isAvailable(list, format)) {
        result[format] = true;
    }
    return result;
}


declare const videos: VideoFormatURLs;
declare const subtitles: SubtitleURLs;

const z: UrlList = videos;
const y: UrlList = subtitles;
const x = {
    blog: new URL("https://fettblog.eu"),
    twitter: new URL("https://twitter.com/ddprrt")
}

loadUrl(videos, "format120p")
loadUrl(subtitles, "en")
loadUrl(x, "twitter")
//loadUrl("Stefan", "toString")

isAvailable(videos, "format120p");

declare const subtitleFormat: string

if(isAvailable(subtitles, subtitleFormat)) {
    subtitles[subtitleFormat]
} else {
    //subtitles[subtitleFormat]
}


interface List<T> {
    head: MyNode<T>
}

interface MyNode<T> {
    element: T,
    next?: MyNode<T>
}

declare const string_list: List<string>
declare const number_list: List<number>
declare const person_list: List<Person>



function selectDeep<T, Key extends keyof T, Key2 extends keyof T[Key]>(obj: T, key1: Key, key2: Key2) {
    return obj[key1][key2]
}

const obj = {
    person: {
        name: "Stefan",
        age: 40,
    },
    address: {
        street: "Smashing Avenue",
        doorNo: 42,
        city: "SmashingVille",
        funToLiveAt: true,
    }
};

const list = {
    entries: {
        obj
    }
}

declare const personAttr: "name" | "age";

let zz = selectDeep(obj, "person", personAttr)
let yy = selectDeep(obj, "address", "doorNo")


let stefans_name = selectDeep({
    person: {
        name: "Stefan",
        age: 40
    }
}, "person", "name") // string