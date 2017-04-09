/**
 * Created by Chris H. 4/8/17
 */
import {Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import {Http,  Request, Response} from '@angular/http';
import {Hero} from "../../models/hero";
import 'rxjs/add/operator/map';  // we need to import this now
import {Observable} from 'rxjs/Observable';
// import request = require("request");
import 'rxjs/add/operator/catch';
@Component({
    selector: 'my-sandbox',
    templateUrl: './app/components/sandbox/sandbox.component.html'
})

export class SandboxComponent {
    @Input() hero: Hero;
    newHero = false;
    error: any;
    navigated = false; // true if navigated here

    private key = 'RGAPI-6ec47d55-1394-4e4c-b524-738fe84e6da1';

    constructor(
        private route: Router,
        private http:Http) { }

    ngOnInit() {
        this.hero = new Hero();
        this.hero.name = "name goes here";
        
    }

    getSummoner() {
        let url = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/'
                   + 'firebun'
                   + '?api_key=RGAPI-6ec47d55-1394-4e4c-b524-738fe84e6da1';
        let request = new Request({
            method: "GET",
            url: url
        });
        console.log(url);
        return this.http.request(request)
            .map(res => res.json())
            .subscribe( data => console.log(data),
                        err => console.log(err),
                        () => console.log('yay')
        );
        // request(url, function (error, response, body) {
        //     console.log('error:', error); // Print the error if one occurred 
        //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
        //     console.log('body:', body); // Print the HTML for the Google homepage. 
        // });

        //return summoner => this.summoner;
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
      }

    /////////////
    public getDataObservable(url:string) {
        console.log("making call");
        return this._http.get(url)
            .map(data => {
                data.toString();
                // the console.log(...) line prevents your code from working 
                // either remove it or add the line below (return ...)
                console.log("I CAN SEE DATA HERE: ", data.json());
                return data.json();
        });
    }

    /////////

    public getSummonerByNames(region:string, summonerNames:string, 
                                callback?:(error:Error, data:{[s:string]:summonerDto})=>void):void {
        var path = `/api/lol/${region}/v1.4/summoner/by-name/${encodeURIComponent(summonerNames)}`;
        var query = {};
        var reqUrl = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/'
                   + summonerNames
                   + '?api_key=RGAPI-6ec47d55-1394-4e4c-b524-738fe84e6da1';
        this.apiCall(reqUrl, 'GET', '', (error:Error, json:string, headers:Object) => {
            //callback(error, null);
            console.log(json);
            console.log(error);
            console.log(headers);
        });
    }

    private apiCall(reqUrl:string, method:string = 'GET', content?:string, callback?:(error:Error, data:string, headers:Object)=>void, useHttps:boolean = true) {
        var options:https.RequestOptions = {
            path: reqUrl,
            method: method,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Content-Length': content.length
            }
        };
        var req:http.ClientRequest;
        var handler = (res) => {
            var body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                callback(null, body, res.headers);
            })
        };

        req = http.request(options, handler);

        req.on('error', (e) => {
            callback(e, null, null);
        });
        req.write(content);
        req.end();
    }
    // private apiUrl(region:string, path:string, query:Object, tournaments:boolean = false):url.Url {
    //     var result = "";
    //     query["api_key"] = this.key;
    //     for (var key in query) {
    //         if (result != "") {
    //             result += "&";
    //         }
    //         result += key + "=" + encodeURIComponent(query[key]);
    //     }
    //     return {
    //         protocol: this.baseConfig.protocol,
    //         slashes: this.baseConfig.slashes,
    //         hostname: `${region}.api.pvp.net`,
    //         port: this.baseConfig.port,
    //         pathname: path,
    //         query: `?${result}`
    //     };
    // }

}


    export interface summonerDto {
        /**
         * Summoner ID.
         */
        id: number;
        /**
         * Summoner name.
         */
        name: string;
        /**
         * ID of the summoner icon associated with the summoner.
         */
        profileIconId: number;
        /**
         * Date summoner was last modified specified as epoch milliseconds. The following events will update this timestamp: profile icon change, playing the tutorial or advanced tutorial, finishing a game, summoner name change
         */
        revisionDate: number;
        /**
         * Summoner level associated with the summoner.
         */
        summonerLevel: number;
    }