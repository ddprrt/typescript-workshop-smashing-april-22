const app = {
    get, post, all
};

// 1. Step: Start with basic types
// 2. Step: Subset!
// 3. Step: Introducing Generics
// 4. Step: Introduce Conditionals where applicable


type HTTPMethods = 
    "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS" |
    "HEAD" | "CONNECT" | "TRACE" | "PATCH";

type ServerRequest<Met extends HTTPMethods, Params extends string> = {
    method: Met,
    params: Record<Params, string>
}

//#region StatusCode
type StatusCode =
  | 100
  | 101
  | 102
  | 200
  | 201
  | 202
  | 203
  | 204
  | 205
  | 206
  | 207
  | 208
  | 226
  | 300
  | 301
  | 302
  | 303
  | 304
  | 305
  | 306
  | 307
  | 308
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 420
  | 422
  | 423
  | 424
  | 425
  | 426
  | 428
  | 429
  | 431
  | 444
  | 449
  | 450
  | 451
  | 499
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505
  | 506
  | 507
  | 508
  | 509
  | 510
  | 511
  | 598
  | 599;
//#endregion

type ServerResponse = {
    send(body?: any): void
    status(statusCode: StatusCode): ServerResponse
}

type CallbackFn<
    Met extends HTTPMethods, 
    Params extends string
> = (req: ServerRequest<Met, Params>, res: ServerResponse) => void

const path = "/user/:userId"



type ParseRouteParams<Route> =  
    Route extends `${string}/:${infer P}/${infer Rest}` ? P | ParseRouteParams<`/${Rest}`> :
    Route extends `${string}/:${infer P}` ? P : never 


//type ParseRouteParams2<"/user/:userID"> =  "userId"

type ValidParamsPath = `${string}/:${string}`

const test1: ValidParamsPath = "/user/:userid"
const test2: ValidParamsPath = "/:userid"

type Test1 = ParseRouteParams<"/user/:userid">

function whats_the_value<T extends string>(t: T): T {
    return t
}

function get<Path extends string>(path: Path, callback: CallbackFn<"GET", ParseRouteParams<Path>>) {
    //TBD
}

function post<Path extends string>(path: Path, callback: CallbackFn<"POST", ParseRouteParams<Path>>) {
    //TBD
}

function all<Path extends string>(path: Path, callback: CallbackFn<HTTPMethods, ParseRouteParams<Path>>) {
    //TBD
}

app.get("/user/:userId", function(req, res) {
    req.params.userId
})

app.get("/user/:userID/:orderID", function(req, res) {
    req.params.orderID
    req.params.userID
    res.status(418).send("OK")
})

app.get("/user/:userID/:orderID", function(req, res) {
    res.send("OK")
})

app.get("/user/:userID/:orderID", function(req, res) {
    if(req.method === "GET") {
        res.send(req.params.orderID)
    }
})

app.get("/:tenantId/:appId/:session/home/users/:userId/:orderId", (req, res) => {
    req.params.orderId
})

const callbackfn: CallbackFn<"GET" | "POST", string> = (req, res) => {
    req.method
}

const anothercallbackfn: CallbackFn<HTTPMethods, string> = (req, res) => {
    if(req.method === "GET") {

    }
}

app.get("/", anothercallbackfn)
app.post("/", anothercallbackfn)

export {}


function println(x: string, params: any) {

}

println("Hello {name}", { name: "World"})
