# ng-log2srv

Log2Srv is a simple library for logging events in angular (currently supports angular 9+). This library allows you to log messages of the dom events, http events and code events (we will see that in a moment) and also allows you to POST the log messages to a server.

Currently supported events: 

1. Code events (Logs the invoking function in a component or service or a class)

  * invocation
  * execution

2. Http events
  * error
  * request
  * response

3. DOM events
  * click
  * contextmenu
  * dblclick
  * mouseenter
  * mouseleave
  * beforeunload
  * copy
  * cut
  * paste
  * error
  * fullscreenchange
  * fullscreenerror
  * input
  * keydown
  * keypress
  * keyup
  * pagehide
  * pageshow
  * popstate
  * resize
  * reset
  * scroll
  * submit
  * select
  * storage
  * unload

All you need to do is to import the module in your `app.component`.

```ts
imports: [
    Log2SrvModule.forRoot({
      root: AppComponent,
      events: {
        click: { enabled: true }
      },
    }),
    ...    
]    
```

As you can see, you must provide a root component, in this example is the `AppComponent`. 

Once you do it, the app will start listening to the DOM events provided in the  `events` object by wrapping the `<app-root>` selector with an `<log2srv> directive`.

Each event can be configured, by default all the events are disabled, is up to you to manually enable each one of them.

Each single event can be configured by the following interface:

```ts
{
  enabled: boolean; // required
  parser?: new (...args: any[]) => ParserModel; // use your own parser
  server?: boolean; //logs to server? by default is true if endpoint is provided
  console?: boolean; //logs to console? by default is true if the event is enabled
}
```

For example, if you want to enable log messages for Request, Click and Keypressed events, and only want to POST the Request events you should do it this way:

```ts
imports: [
    Log2SrvModule.forRoot({
      root: AppComponent,
      events: {
        click: { enabled: true, server: false },
        request: { enabled: true, server: true },
        keypress: { enabled: true, server: false }
      },
      http: {
        endpoint: 'http://localhost:8080/api-logs'
      }
    }),
    ...    
]    
```

In the `http` object, you must provide an endpoint, if it is null, the library will not attempt to POST any message. You can provide the same configuration for a `HttpRequest`.

```ts
{
  endpoint: string; // required if http is used
  params?: HttpParams | { [param: string]: string | string[] };
  headers?:
    | HttpHeaders
    | {
        [key: string]: any;
      }; 
  responseType?: HttpResponseType;
  credentials?: boolean;
}
```

Or if you like, you could provide your own HttpRequest by extending the `HttpLogger` abstract class and then use it in the `Log2SrvConfig`.

```ts
export class MyOwnHttpRequest extends HttpLogger {
  sendLog(
    loggerModel: AbstractLoggerModel
  ): HttpRequest<AbstractLoggerModel>{
    //do aditional staff if you like
    //returns a new HttpRequest object
  }
}

//Use your class in the root config
imports: [
    Log2SrvModule.forRoot({
      ...
      httpLogger: MyOwnHttpRequest;
    }),
    ...    
]    
```

Some others configurations are the `timestamp` format that can use any Angular Date format and the `loggerConfig` that enables/disables console and http logs globally for all events.

```ts
imports: [
    Log2SrvModule.forRoot({
      ...
      timestamp: 'dd-MM-yyyy'
      loggerConfig: {console: false, server: true};
    }),
    ...    
]    
```

### Event Parsers

By default this library creates and object with all the necessary info for each event, but perhaps you would like to implement your own by removing or attaching additional info.

For example a click event provides the following information.

```ts
{
  "client": {
    "agent": "Mozilla/5.0..."
    "code": "Mozilla"
    "java": false
    "langs": (3) ["es-419", "es", "en"]
    "platform": "MacIntel"
    "plugins": (3) ["Chrome PDF Plugin", "Chrome PDF Viewer", "Native Client"]
  }
  "dom": {
    "description": ""
    "lifetime": 1787.9050000010466
    "target": "<img width="300" alt=\"Angular Logo\" src=\"data:image/svg+xml;base64,\">"
  }
  "event": {
    "name": "click"
    "type": "MouseEvent"
  }
  "location": "http://localhost:4200/"
  "message": "click on x:268, y:347"
  "timestamp": "01-01-2021 00:00:01"
  "uuid": "client-ip"
}
```

Customize the information provided by adding an event parser wich extends the `ParserModel` abstract class.


```ts
export class  MyCustomClickParser extends ParserModel<AbstractLoggerModel> {
  parse(
    loggerModel: AbstractLoggerModel,
    event:
      | Event
      | HttpRequest<any>
      | HttpResponse<any>
      | HttpErrorResponse
      | { descriptor: string, args: any }
  ): AbstractLoggerModel {
    console.log(loggerModel);
    //returns only the event object.
    return {
      event: {
        ...loggerModel.event
      }
    } as AbstractLoggerModel;
  }
}
```

Use your own Parser:
```ts
imports: [
    Log2SrvModule.forRoot({
      root: AppComponent,
      events: {
        click: { enabled: true, parser: MyCustomClickParser}
      },
    }),
    ...    
]    
```
### The @Log2Srv decorator

To log the invocation and execution of the methods used in a class, you must enable them in the `events` object and use the decorator on the classes that you want to log.

```ts
@Log2Srv()
@Component({
  selector: 'app-root',
  template: `...`,
  styles: [],
})
export class AppComponent implements OnInit {
  //this method will be logged
  ngOnInit(){
    console.log("On Init called")
  }
}
```
