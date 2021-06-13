//tealium universal tag - utag.116 ut4.0.202105051347, Copyright 2021 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader){var u={};utag.o[loader].sender[id]=u;if(utag===undefined){utag={};}if(utag.ut===undefined){utag.ut={};}if(utag.ut.loader===undefined){u.loader=function(o){var a,b,c,l;a=document;if(o.type==="iframe"){b=a.createElement("iframe");b.setAttribute("height","1");b.setAttribute("width","1");b.setAttribute("style","display:none");b.setAttribute("src",o.src);}else if(o.type==="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";b.src=o.src;}if(o.id){b.id=o.id;}if(typeof o.cb==="function"){if(b.addEventListener){b.addEventListener("load",function(){o.cb();},false);}else{b.onreadystatechange=function(){if(this.readyState==="complete"||this.readyState==="loaded"){this.onreadystatechange=null;o.cb();}};}}l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l==="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}};}else{u.loader=utag.ut.loader;}
u.ev={'view':1};u.initialized=false;u.map={};u.extend=[];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){var c,d,e,f,i;u.data={};for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.data[e[f]]=b[d];}}}
function isProductionEnvironment(){if(window.location.hostname.toLowerCase().indexOf("www.sony")>-1){return true;}else{return false;}}
function triggerBVBuyEvent(){if(typeof utag_data!=="undefined"){var pageCountry=utag_data.tagsCountry||"";var pageLanguage=utag_data.tagsLanguage||"";var cDataBuy={clientID:'sony-global',environment:(isProductionEnvironment()?"prod":"staging"),bvProduct:'RatingsAndReviews',dc:pageLanguage.toLowerCase()+"_"+pageCountry.toUpperCase(),host:window.location.hostname,city:'',country:pageCountry.toUpperCase(),label:'ButtonClick',value:'1',type:'Buy'};if(typeof BV!=="undefined"&&typeof BV.pixel!=="undefined")
BV.pixel.trackConversion(cDataBuy);}}
function loadBVApiTriggerBuyEvent(){if(typeof utag_data.tagsPreviousPageTemplate!=="undefined"&&utag_data.tagsPreviousPageTemplate==="pdp"){var country=utag_data.tagsCountry||"";var lang=utag_data.tagsLanguage||"";var siteID=country=="VN"?"asia_pacific_for_trial":"main_site";var scriptUrl='//apps.bazaarvoice.com/deployments/sony-global'+siteID+'/'+(isProductionEnvironment()?"production":"staging")+'/'+lang.toLowerCase()+"_"+country.toUpperCase()+'/bv.js';u.loader({"type":"script","src":scriptUrl,"cb":triggerBVBuyEvent,"loc":"script","id":'utag_116'});}}
function whenAvailable(name,callback){var interval=500;window.setTimeout(function(){if(window[name]){callback(window[name]);}else{window.setTimeout(arguments.callee,interval);}},interval);}
if(typeof jQuery!=="undefined"){jQuery(".price-content a.btn, .mlp-inner a.btn").on("click",function(){if(jQuery(this).attr("class").toLowerCase().indexOf("disabled")===-1){if(typeof BV!=="undefined"&&typeof BV.pixel!=="undefined"){triggerBVBuyEvent();}else{whenAvailable("utag_data",loadBVApiTriggerBuyEvent);}}});}
}};utag.o[loader].loader.LOAD(id);})("116","sony-marketing.sea");}catch(error){utag.DB(error);}
