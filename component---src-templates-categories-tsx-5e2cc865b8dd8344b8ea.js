(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"Kxh+":function(e){e.exports=JSON.parse('{"data":{"site":{"siteMetadata":{"siteUrl":"https://ssuwani.github.io"}}}}')},jonn:function(e,t,a){"use strict";a.r(t),a.d(t,"pageQuery",(function(){return x}));a("pJf4"),a("v9g0");var n=a("q1tI"),r=a.n(n),o=a("vOnD"),i=a("V13v"),s=a("Vczs"),c=a("Kxh+"),l=a("Wbzz"),p=a("TJpk"),u=a.n(p),m=function(e){var t=e.categorySlug,a=e.categoryName;return r.a.createElement(l.StaticQuery,{query:g,render:function(e){var n=e.site.siteMetadata.siteUrl,o={"@context":"http://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,item:{"@id":n,name:"HOME"}},{"@type":"ListItem",position:2,item:{"@id":n+"/"+t,name:a}}]};return r.a.createElement(u.a,null,r.a.createElement("script",{type:"application/ld+json"},JSON.stringify(o)))},data:c})},g="546548518",d=a("soUV"),y=a("79D7"),f=a("j8Pq"),h=a("1Yd/");var E=o.d.h1.withConfig({displayName:"categories__Heading",componentId:"sc-1fs6fz3-0"})(["margin:0.5em 0 0.8em;font-size:32px;transition:all 0.3s ease-in-out 0s;color:var(--categoryHeader);font-weight:700;line-height:44px;letter-spacing:1px;"]),v=function(e){var t,a;function n(){return e.apply(this,arguments)||this}return a=e,(t=n).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a,n.prototype.render=function(){var e=this.props,t=e.data,a=e.pageContext,n=t.allMarkdownRemark.edges,o=this.props.location,s=a.category,c=t.site.siteMetadata.categories,l=c.find((function(e){return e.slug===s})),p=l?l.name:s;return r.a.createElement(d.a,{location:this.props.location,title:p},r.a.createElement(h.a,{title:p}),r.a.createElement(m,{categorySlug:s,categoryName:p}),r.a.createElement(y.a,{category:w({location:o,categories:c,categoryName:p}),posts:b({posts:n}),bio:r.a.createElement(i.a,null),tableOfContents:null}))},n}(r.a.Component),w=(t.default=v,function(e){var t=e.location,a=e.categories,n=e.categoryName;return r.a.createElement(r.a.Fragment,null,r.a.createElement(s.a,{location:t,categories:a}),r.a.createElement(E,null,n))}),b=function(e){return e.posts.map((function(e){var t=e.node;return r.a.createElement(f.a,{key:t.fields.slug,node:t})}))},x="100940896"}}]);
//# sourceMappingURL=component---src-templates-categories-tsx-5e2cc865b8dd8344b8ea.js.map