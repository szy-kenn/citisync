if(!self.define){let e,a={};const s=(s,n)=>(s=new URL(s+".js",n).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(a[c])return;let t={};const r=e=>s(e,c),o={module:{uri:c},exports:t,require:r};a[c]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/203.2b4c1ee4fbe3a7cf.js",revision:"2b4c1ee4fbe3a7cf"},{url:"/_next/static/chunks/218.57a830a2c55ba802.js",revision:"57a830a2c55ba802"},{url:"/_next/static/chunks/447-1ce6069192e17cc0.js",revision:"eteIBweaWJmnakaqBhQW_"},{url:"/_next/static/chunks/455-dbca226592e38560.js",revision:"eteIBweaWJmnakaqBhQW_"},{url:"/_next/static/chunks/4bd1b696-e9ddef4b0b8fc3b9.js",revision:"eteIBweaWJmnakaqBhQW_"},{url:"/_next/static/chunks/565-7ad06649b98b39bf.js",revision:"eteIBweaWJmnakaqBhQW_"},{url:"/_next/static/chunks/624-3127a0f6a4fbb97f.js",revision:"eteIBweaWJmnakaqBhQW_"},{url:"/_next/static/chunks/app/_not-found/page-1298f082074e79ca.js",revision:"eteIBweaWJmnakaqBhQW_"},{url:"/_next/static/chunks/app/auth/login/page-80ae0a0d001a8324.js",revision:"eteIBweaWJmnakaqBhQW_"},{url:"/_next/static/chunks/app/gemini/page-20bcd348a444c8f4.js",revision:"eteIBweaWJmnakaqBhQW_"},{url:"/_next/static/chunks/app/layout-d3c1107394f9b636.js",revision:"eteIBweaWJmnakaqBhQW_"},{url:"/_next/static/chunks/app/page-a094c60af83b3950.js",revision:"eteIBweaWJmnakaqBhQW_"},{url:"/_next/static/chunks/b316c0d4-81a67b9c6e3e270b.js",revision:"eteIBweaWJmnakaqBhQW_"},{url:"/_next/static/chunks/framework-6b27c2b7aa38af2d.js",revision:"eteIBweaWJmnakaqBhQW_"},{url:"/_next/static/chunks/main-67bbd39961e2da75.js",revision:"eteIBweaWJmnakaqBhQW_"},{url:"/_next/static/chunks/main-app-0d42e216b5b8130d.js",revision:"eteIBweaWJmnakaqBhQW_"},{url:"/_next/static/chunks/pages/_app-430fec730128923e.js",revision:"eteIBweaWJmnakaqBhQW_"},{url:"/_next/static/chunks/pages/_error-2d7241423c4a35ba.js",revision:"eteIBweaWJmnakaqBhQW_"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-2fdd60e345297184.js",revision:"eteIBweaWJmnakaqBhQW_"},{url:"/_next/static/css/871b2e0e1edc07f7.css",revision:"871b2e0e1edc07f7"},{url:"/_next/static/eteIBweaWJmnakaqBhQW_/_buildManifest.js",revision:"d542bd5fc79eb67b82a0b28ea5abf70e"},{url:"/_next/static/eteIBweaWJmnakaqBhQW_/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/569ce4b8f30dc480-s.p.woff2",revision:"ef6cefb32024deac234e82f932a95cbd"},{url:"/_next/static/media/747892c23ea88013-s.woff2",revision:"a0761690ccf4441ace5cec893b82d4ab"},{url:"/_next/static/media/93f479601ee12b01-s.p.woff2",revision:"da83d5f06d825c5ae65b7cca706cb312"},{url:"/_next/static/media/ba015fad6dcf6784-s.woff2",revision:"8ea4f719af3312a055caf09f34c89a77"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/images/icons/icon-128x128.png",revision:"6d9a288a4cf8b58c8f2a64c83be5b754"},{url:"/images/icons/icon-144x144.png",revision:"762c6592a2f8ad10db4e5c1569d66d16"},{url:"/images/icons/icon-152x152.png",revision:"13b5294d022973819666f137aecd3680"},{url:"/images/icons/icon-192x192.png",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/images/icons/icon-384x384.png",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/images/icons/icon-512x512.png",revision:"d49828ecce3eb7cd09ec558c66631305"},{url:"/images/icons/icon-72x72.png",revision:"b8821ed24a45b77f5e56ff77061912c5"},{url:"/images/icons/icon-96x96.png",revision:"eb8f6a6697dd2d20b2e327e43b87f24a"},{url:"/images/screenshots/1.png",revision:"b22929e3bbf6ece52741523bffc285a9"},{url:"/images/screenshots/2.png",revision:"509426f7f2b9225c74a16ccfd87a3805"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:function(e){return _ref.apply(this,arguments)}}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var a=e.sameOrigin,s=e.url.pathname;return!(!a||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var a=e.request,s=e.url.pathname,n=e.sameOrigin;return"1"===a.headers.get("RSC")&&"1"===a.headers.get("Next-Router-Prefetch")&&n&&!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var a=e.request,s=e.url.pathname,n=e.sameOrigin;return"1"===a.headers.get("RSC")&&n&&!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var a=e.url.pathname;return e.sameOrigin&&!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){return!e.sameOrigin}),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
