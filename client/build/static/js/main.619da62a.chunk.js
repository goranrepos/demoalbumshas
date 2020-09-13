(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{38:function(e,t,a){e.exports=a(68)},43:function(e,t,a){},44:function(e,t,a){},68:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(19),u=a.n(l),c=(a(43),a(44),a(4)),s=a(14),i=a(36),o=a(37),m=a(1),b={album:null,albums:[],hasMore:!1,error:{},artist:null,loading_albums:!0,loading_album:!0},p={loading_artists:!0,loading_artist:!0,artist:null,artists:[],hasMore:!1,error:{}},d=Object(s.combineReducers)({album:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"CLEAR_ALBUMS":return Object(m.a)(Object(m.a)({},e),{},{albums:[],loading_albums:!0,error:{}});case"GET_ALBUMS":return Object(m.a)(Object(m.a)({},e),{},{albums:n.results,loading_albums:!1,hasMore:!!n.next});case"ALBUM_ERROR":return Object(m.a)(Object(m.a)({},e),{},{error:n,loading_albums:!1,albums:[]});case"CLEAR_ALBUM":return Object(m.a)(Object(m.a)({},e),{},{album:null,loading_album:!0,error:{}});case"GET_ALBUM":return Object(m.a)(Object(m.a)({},e),{},{album:n,loading_album:!1});case"ALBUM_ERROR":return Object(m.a)(Object(m.a)({},e),{},{error:n,loading_album:!1,album:null});default:return e}},artist:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"CLEAR_ARTISTS":return Object(m.a)(Object(m.a)({},e),{},{artists:[],loading_artists:!0,error:{}});case"GET_ARTISTS":return Object(m.a)(Object(m.a)({},e),{},{artists:n.results,loading_artists:!1,hasMore:!!n.next});case"ARTIST_ERROR":return Object(m.a)(Object(m.a)({},e),{},{error:n,loading_artists:!1,artists:[]});case"CLEAR_ARTIST":return Object(m.a)(Object(m.a)({},e),{},{artist:null,loading_artist:!0,error:{}});case"GET_ARTIST":return Object(m.a)(Object(m.a)({},e),{},{artist:n,loading_artist:!1});case"ARTIST_ERROR":return Object(m.a)(Object(m.a)({},e),{},{error:n,loading_artist:!1,artist:null});default:return e}}}),E=[o.a],f=Object(s.createStore)(d,{},Object(i.composeWithDevTools)(s.applyMiddleware.apply(void 0,E)));f.subscribe((function(){}));var _=f,g=a(12),h=a(3),O=a(13),v=a(6),A=a.n(v),j=a(15),y=a(10),R=a.n(y),T=function(e,t,a,n){return function(){var r=Object(j.a)(A.a.mark((function r(l){var u;return A.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return l({type:"CLEAR_ALBUMS"}),l({type:"CLEAR_ALBUM"}),r.prev=2,r.next=5,R()({method:"GET",url:"/api/album",params:{page:e,limit:t,query:a},cancelToken:n});case 5:u=r.sent,l({type:"GET_ALBUMS",payload:u.data}),r.next=15;break;case 9:if(r.prev=9,r.t0=r.catch(2),console.log(r.t0.response),!R.a.isCancel(r.t0)){r.next=14;break}return r.abrupt("return");case 14:l({type:"ALBUM_ERROR",payload:{msg:r.t0.response.statusText,status:r.t0.response.status}});case 15:case"end":return r.stop()}}),r,null,[[2,9]])})));return function(e){return r.apply(this,arguments)}}()},S=function(e,t,a){var r=Object(c.c)();return Object(n.useEffect)((function(){var n,l=new R.a.CancelToken((function(e){return n=e}));return r(T(t,a,e,l)),function(){return n()}}),[t,a,e,r]),null},x=Object(c.b)((function(e){return{album:e.album,state_artist:e.artist}}),{getAlbums:T})((function(e){e.getAlbums;var t=e.pageNumber,a=e.pageLimit,l=e.resetPageNumber,u=Object(n.useState)(""),c=Object(O.a)(u,2),s=c[0],i=c[1];S(s,t,a);return r.a.createElement(n.Fragment,null,r.a.createElement("form",null,r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"query"},"Search"),r.a.createElement("input",{type:"text",placeholder:"Search Album",name:"query",value:s,onChange:function(e){l(),i(e.target.value)}}))))})),L=Object(c.b)((function(e){return{album:e.album,state_artist:e.artist}}),null)((function(e){var t=e.albums;e.loading_albums;return r.a.createElement(n.Fragment,null,t.length>0?r.a.createElement(n.Fragment,null,r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Album"),r.a.createElement("th",null,"Condition"),r.a.createElement("th",null,"Year"),r.a.createElement("th",null,"Artist"),r.a.createElement("th",null,"Action"))),r.a.createElement("tbody",null,t.map((function(e,t){return r.a.createElement("tr",{key:e._id},r.a.createElement("td",null,e.album_title),r.a.createElement("td",null,e.condition),r.a.createElement("td",null,e.year),r.a.createElement("td",null,e.artist.name),r.a.createElement("td",null,r.a.createElement(g.b,{to:"/edit-album/".concat(e._id)},"Edit Album Details")))}))))):r.a.createElement("h4",null,"No albums found..."))})),w=Object(c.b)((function(e){return{album:e.album,state_artist:e.artist}}),{getAlbums:T})((function(e){e.getAlbums;var t=e.album,a=t.albums,l=t.loading_albums,u=(t.error,t.hasMore),c=Object(n.useState)(1),s=Object(O.a)(c,2),i=s[0],o=s[1],m=Object(n.useState)(3),b=Object(O.a)(m,2),p=b[0];b[1];return r.a.createElement(n.Fragment,null,r.a.createElement(x,{pageNumber:i,pageLimit:p,resetPageNumber:function(){o(1)}}),l?r.a.createElement("p",null,"Loading albums..."):r.a.createElement(n.Fragment,null,a.length>0?r.a.createElement(n.Fragment,null,r.a.createElement("p",null,"Found ",a.length," result",a.length>1?"s":""),r.a.createElement(L,{albums:a,loading_albums:l}),i>1&&r.a.createElement("button",{onClick:function(e){o(i-1)}},"Show prev albums"),u&&r.a.createElement("button",{onClick:function(e){o(i+1)}},"Show next albums"),r.a.createElement("div",null,"PageNumber ",i)):r.a.createElement("h4",null,"No albums found..."),r.a.createElement("div",null,r.a.createElement(g.b,{to:"/edit-album/"},"Add new Album"),r.a.createElement(g.b,{to:"/edit-artist/"},"Update Artist Names"))))})),C=a(17),k=function(e,t){return function(){var a=Object(j.a)(A.a.mark((function a(n){var r;return A.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n({type:"CLEAR_ARTISTS"}),n({type:"CLEAR_ARTIST"}),a.prev=2,a.next=5,R()({method:"GET",url:"/api/artist",params:{page:e,limit:t}});case 5:r=a.sent,n({type:"GET_ARTISTS",payload:r.data}),a.next=15;break;case 9:if(a.prev=9,a.t0=a.catch(2),console.log(a.t0.response),!R.a.isCancel(a.t0)){a.next=14;break}return a.abrupt("return");case 14:n({type:"ARTIST_ERROR",payload:{msg:a.t0.response.statusText,status:a.t0.response.status}});case 15:case"end":return a.stop()}}),a,null,[[2,9]])})));return function(e){return a.apply(this,arguments)}}()},M={condition:"",album_title:"",year:"",artist_name:""},B=Object(c.b)((function(e){return{state_album:e.album,state_artist:e.artist}}),{getAlbumById:function(e){return function(){var t=Object(j.a)(A.a.mark((function t(a){var n;return A.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a({type:"CLEAR_ALBUM"}),t.prev=1,t.next=4,R()({method:"GET",url:"/api/album/".concat(e)});case 4:n=t.sent,a({type:"GET_ALBUM",payload:n.data}),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),a({type:"ALBUM_ERROR",payload:{msg:t.t0.response.statusText,status:t.t0.response.status}});case 11:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(e){return t.apply(this,arguments)}}()},updateAlbum:function(e,t,a){return function(){var n=Object(j.a)(A.a.mark((function n(r){var l;return A.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,R()({method:"put",url:"/api/album/".concat(e),data:Object(m.a)({},t)});case 3:l=n.sent,r({type:"GET_ALBUM",payload:l.data}),a.push("/"),n.next=12;break;case 8:n.prev=8,n.t0=n.catch(0),console.log(n.t0),r({type:"ALBUM_ERROR",payload:{msg:n.t0.response.statusText,status:n.t0.response.status}});case 12:case"end":return n.stop()}}),n,null,[[0,8]])})));return function(e){return n.apply(this,arguments)}}()},getArtists:k})((function(e){var t=e.getAlbumById,a=e.updateAlbum,l=e.getArtists,u=e.state_album,c=u.loading_album,s=u.album,i=e.state_artist,o=i.loading_artists,b=i.artists,p=e.match,d=e.history,E=Object(n.useState)(M),f=Object(O.a)(E,2),_=f[0],h=f[1],v=Object(n.useCallback)((function(){if(s||t(p.params.id),!c&&s&&s.artist&&s.artist.name){var e=Object(m.a)({},M);for(var a in s)a in e&&(e[a]=s[a]);h(Object(m.a)(Object(m.a)({},e),{},{artist_name:s.artist.name}))}}),[c,s,t,p.params.id]);Object(n.useEffect)((function(){p.params.id&&v()}),[p.params.id,v]);var A=Object(n.useCallback)((function(){l(1,100)}),[l]);Object(n.useEffect)((function(){A()}),[A]);var j=_.album_title,y=_.year,R=_.condition,T=_.artist_name,S=function(e){h(Object(m.a)(Object(m.a)({},_),{},Object(C.a)({},e.target.name,e.target.value)))};return r.a.createElement(n.Fragment,null,c&&o?r.a.createElement("p",null,"Loading edit album form..."):r.a.createElement(n.Fragment,null,r.a.createElement("h1",null,"Edit Album details"),r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),a(p.params.id,_,d,!!s)}},r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"album_title"},"Album Title"),r.a.createElement("input",{type:"text",placeholder:"Album Title",name:"album_title",value:j,onChange:S})),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"condition"},"Condition"),r.a.createElement("input",{type:"text",placeholder:"Condition",name:"condition",value:R,onChange:S})),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"year"},"Year"),r.a.createElement("input",{type:"text",placeholder:"Year",name:"year",value:y,onChange:S})),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"artist_name"},"Artist"),r.a.createElement("select",{id:"artist_name",name:"artist_name",value:T,onChange:S},b.map((function(e){return r.a.createElement("option",{key:e.name,value:e.name},e.name)})))),r.a.createElement("input",{type:"submit"})),r.a.createElement(g.b,{to:"/"},"Go Back to Albums")))})),F={artist_id:"",new_artist_name:""},I=Object(c.b)((function(e){return{state_artist:e.artist}}),{getArtists:k,updateArtist:function(e,t,a){return function(){var n=Object(j.a)(A.a.mark((function n(r){var l;return A.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,console.log("updateArtist",a),n.next=4,R()({method:"put",url:"/api/artist/".concat(e),data:{name:t.new_artist_name}});case 4:l=n.sent,r({type:"GET_ARTIST",payload:l.data}),a.push("/"),n.next=13;break;case 9:n.prev=9,n.t0=n.catch(0),console.log(n.t0),r({type:"ARTIST_ERROR",payload:{msg:n.t0.response.statusText,status:n.t0.response.status}});case 13:case"end":return n.stop()}}),n,null,[[0,9]])})));return function(e){return n.apply(this,arguments)}}()}})((function(e){var t=e.getArtists,a=e.updateArtist,l=e.state_artist,u=l.loading_artists,c=l.artists,s=e.history,i=Object(n.useState)(F),o=Object(O.a)(i,2),b=o[0],p=o[1],d=b.artist_id,E=b.new_artist_name;Object(n.useEffect)((function(){!u&&c.length>0&&d!==c[0]._id&&p(Object(m.a)(Object(m.a)({},b),{},{artist_id:c[0]._id}))}),[u,c,d,b]),Object(n.useEffect)((function(){t(1,100)}),[t]);var f=function(e){p((function(){return Object(m.a)(Object(m.a)({},b),{},Object(C.a)({},e.target.name,e.target.value))}))};return r.a.createElement(n.Fragment,null,u&&c.length>0?r.a.createElement("p",null,"Loading edit artist form..."):r.a.createElement(n.Fragment,null,r.a.createElement("h1",null,"Edit Artists"),r.a.createElement("h2",null,"Select Artist Name and update with new one"),r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),a(d,E,s,!0)}},r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"artist_id"},"Current Artist Name"),r.a.createElement("select",{id:"artist_id",name:"artist_id",value:d,onChange:f,required:!0},c.map((function(e){return r.a.createElement("option",{key:e.name,value:e._id},e.name)})))),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"new_artist_name"},"New Artist Name"),r.a.createElement("input",{type:"text",placeholder:"new_artist_name",name:"new_artist_name",value:E,onChange:f,required:!0})),r.a.createElement("input",{type:"submit"})),r.a.createElement(g.b,{to:"/"},"Go Back to Albums")))})),U=function(){return Object(n.useEffect)((function(){_.dispatch({type:"CLEAR_ARTISTS"})}),[]),r.a.createElement(c.a,{store:_},r.a.createElement(g.a,null,r.a.createElement(h.c,null,r.a.createElement(h.a,{exact:!0,path:"/edit-album/:id",component:B}),r.a.createElement(h.a,{exact:!0,path:"/edit-album/",component:B}),r.a.createElement(h.a,{exact:!0,path:"/edit-artist/",component:I}),r.a.createElement(h.a,{exact:!0,path:"/",component:w}))))};u.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(U,null)),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.619da62a.chunk.js.map