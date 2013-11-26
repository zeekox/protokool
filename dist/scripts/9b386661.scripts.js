var angularLocalStorage=angular.module("LocalStorageModule",[]);angularLocalStorage.constant("prefix","ls"),angularLocalStorage.constant("cookie",{expiry:30,path:"/"}),angularLocalStorage.service("localStorageService",["$rootScope","prefix","cookie",function($rootScope,prefix,cookie){"."!==prefix.substr(-1)&&(prefix=prefix?prefix+".":"");var browserSupportsLocalStorage=function(){try{return"localStorage"in window&&null!==window.localStorage}catch(a){return $rootScope.$broadcast("LocalStorageModule.notification.error",a.message),!1}},addToLocalStorage=function(a,b){if(!browserSupportsLocalStorage())return $rootScope.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),addToCookies(a,b);if(!b&&0!==b&&""!==b)return!1;try{localStorage.setItem(prefix+a,b)}catch(c){return $rootScope.$broadcast("LocalStorageModule.notification.error",c.message),addToCookies(a,b)}return!0},getFromLocalStorage=function(a){if(!browserSupportsLocalStorage())return $rootScope.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),getFromCookies(a);var b=localStorage.getItem(prefix+a);return b?b:null},removeFromLocalStorage=function(a){if(!browserSupportsLocalStorage())return $rootScope.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),removeFromCookies(a);try{localStorage.removeItem(prefix+a)}catch(b){return $rootScope.$broadcast("LocalStorageModule.notification.error",b.message),removeFromCookies(a)}return!0},clearAllFromLocalStorage=function(){if(!browserSupportsLocalStorage())return $rootScope.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),clearAllFromCookies();var a=prefix.length;for(var b in localStorage)if(b.substr(0,a)===prefix)try{removeFromLocalStorage(b.substr(a))}catch(c){return $rootScope.$broadcast("LocalStorageModule.notification.error",c.message),clearAllFromCookies()}return!0},browserSupportsCookies=function(){try{return navigator.cookieEnabled||"cookie"in document&&(document.cookie.length>0||(document.cookie="test").indexOf.call(document.cookie,"test")>-1)}catch(a){return $rootScope.$broadcast("LocalStorageModule.notification.error",a.message),!1}},addToCookies=function(a,b){if("undefined"==typeof b)return!1;if(!browserSupportsCookies())return $rootScope.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;try{var c="",d=new Date;null===b&&(cookie.expiry=-1,b=""),0!==cookie.expiry&&(d.setTime(d.getTime()+24*cookie.expiry*60*60*1e3),c=", expires="+d.toGMTString()),a&&(document.cookie=prefix+a+"="+encodeURIComponent(b)+c+", path="+cookie.path)}catch(e){return $rootScope.$broadcast("LocalStorageModule.notification.error",e.message),!1}return!0},getFromCookies=function(a){if(!browserSupportsCookies())return $rootScope.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;for(var b=document.cookie.split(","),c=0;c<b.length;c++){for(var d=b[c];" "==d.charAt(0);)d=d.substring(1,d.length);if(0===d.indexOf(prefix+a+"="))return decodeURIComponent(d.substring(prefix.length+a.length+1,d.length))}return null},removeFromCookies=function(a){addToCookies(a,null)},clearAllFromCookies=function(){for(var a=null,b=prefix.length,c=document.cookie.split(";"),d=0;d<c.length;d++){for(a=c[d];" "==a.charAt(0);)a=a.substring(1,a.length);key=a.substring(b,a.indexOf("=")),removeFromCookies(key)}},stringifyJson=function(a,b){if("string"==typeof a&&"{"!==a.charAt(0)&&!b)return a;if(a instanceof Object){var c="";if(a.constructor===Array){for(var d=0;d<a.length;c+=this.stringifyJson(a[d],!0)+",",d++);return"["+c.substr(0,c.length-1)+"]"}if(a.toString!==Object.prototype.toString)return'"'+a.toString().replace(/"/g,"\\$&")+'"';for(var e in a)c+='"'+e.replace(/"/g,"\\$&")+'":'+this.stringifyJson(a[e],!0)+",";return"{"+c.substr(0,c.length-1)+"}"}return"string"==typeof a?'"'+a.replace(/"/g,"\\$&")+'"':String(a)},parseJson=function(sJSON){return"{"!==sJSON.charAt(0)?sJSON:eval("("+sJSON+")")};return{isSupported:browserSupportsLocalStorage,add:addToLocalStorage,get:getFromLocalStorage,remove:removeFromLocalStorage,clearAll:clearAllFromLocalStorage,stringifyJson:stringifyJson,parseJson:parseJson,cookie:{add:addToCookies,get:getFromCookies,remove:removeFromCookies,clearAll:clearAllFromCookies}}}]),angular.module("LocalStorageModule").value("prefix","myPre"),angular.module("protoKoolApp",["ngSanitize","ngRoute","ngTouch","LocalStorageModule"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("protoKoolApp").controller("MainCtrl",["$scope","localStorageService",function(a,b){a.computerCount=12;var c=a.computers=[],d=a.computerCountChange=function(){for(var b=1;b<=a.computerCount;b++)c.push(b)};d();var e=a.entries=[],f=0;a.addEntry=function(c){a.selectedItem===c&&e.length>0?e[0].count+="X":(a.selectedItem=c,e.unshift({id:f++,name:c,date:new Date,count:""})),b.add("localStorageKey","Add this!")},a.export=function(){a.exportContent="";for(var b=0;b<e.length;b++){var c=e[b].date,d=c.getDate(),f=c.getMonth();f++;var g=c.getFullYear(),h=c.getHours(),i=c.getMinutes(),j=c.getSeconds();a.exportContent+=g+"-"+f+"-"+d+";",a.exportContent+=h+":"+i+":"+j+";",a.exportContent+=e[b].name+";"+e[b].count.length+";\n"}},a.others=["Telefon","Anderes","Papier","Missing"]}]);