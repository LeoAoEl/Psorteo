import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import { q as NOOP_MIDDLEWARE_HEADER, v as decodeKey } from './chunks/astro/server_D7O9w-tm.mjs';
import 'clsx';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || undefined,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : undefined,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Leone/OneDrive/Escritorio/Personal/trebolS/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"consulta/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/consulta","isIndex":false,"type":"page","pattern":"^\\/consulta\\/?$","segments":[[{"content":"consulta","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/consulta.astro","pathname":"/consulta","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"exito/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/exito","isIndex":false,"type":"page","pattern":"^\\/exito\\/?$","segments":[[{"content":"exito","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/exito.astro","pathname":"/exito","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"nosotros/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/nosotros","isIndex":false,"type":"page","pattern":"^\\/nosotros\\/?$","segments":[[{"content":"nosotros","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/nosotros.astro","pathname":"/nosotros","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"pago/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/pago","isIndex":false,"type":"page","pattern":"^\\/pago\\/?$","segments":[[{"content":"pago","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pago.astro","pathname":"/pago","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"sorteo/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/sorteo","isIndex":false,"type":"page","pattern":"^\\/sorteo\\/?$","segments":[[{"content":"sorteo","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sorteo.astro","pathname":"/sorteo","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Leone/OneDrive/Escritorio/Personal/trebolS/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Users/Leone/OneDrive/Escritorio/Personal/trebolS/src/components/shared/Link.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Leone/OneDrive/Escritorio/Personal/trebolS/src/components/shared/Navbar.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Leone/OneDrive/Escritorio/Personal/trebolS/src/layouts/Layout.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Leone/OneDrive/Escritorio/Personal/trebolS/src/pages/consulta.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/consulta@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/Users/Leone/OneDrive/Escritorio/Personal/trebolS/src/pages/exito.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/exito@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Leone/OneDrive/Escritorio/Personal/trebolS/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Leone/OneDrive/Escritorio/Personal/trebolS/src/pages/nosotros.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/nosotros@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Leone/OneDrive/Escritorio/Personal/trebolS/src/pages/pago.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/pago@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Leone/OneDrive/Escritorio/Personal/trebolS/src/pages/sorteo.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/sorteo@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/consulta@_@astro":"pages/consulta.astro.mjs","\u0000@astro-page:src/pages/exito@_@astro":"pages/exito.astro.mjs","\u0000@astro-page:src/pages/nosotros@_@astro":"pages/nosotros.astro.mjs","\u0000@astro-page:src/pages/pago@_@astro":"pages/pago.astro.mjs","\u0000@astro-page:src/pages/sorteo@_@astro":"pages/sorteo.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_y0C3uyhY.mjs","C:/Users/Leone/OneDrive/Escritorio/Personal/trebolS/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_C1Bl55m8.mjs","@components/shared/ScrollTop":"_astro/ScrollTop.CwF8UW5T.js","@components/Inicio/HeroSwipper":"_astro/HeroSwipper.Zux5SYWk.js","@components/exito/WinnerSwipperC":"_astro/WinnerSwipperC.CLNL6T8K.js","C:/Users/Leone/OneDrive/Escritorio/Personal/trebolS/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.rasoniT7.js","@components/sorteo/SorteoForm":"_astro/SorteoForm.CUn7Bpxp.js","@astrojs/react/client.js":"_astro/client.6jQTiC7s.js","@components/Inicio/Acordion":"_astro/Acordion.BOraLIGw.js","@components/consulta/ConsultaForm":"_astro/ConsultaForm.BCXiqM-x.js","C:/Users/Leone/OneDrive/Escritorio/Personal/trebolS/node_modules/@heroui/dom-animation/dist/index.mjs":"_astro/index.EzbrNgKr.js","@components/pago/CreditCard":"_astro/CreditCard.Bp_sqL3z.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/asw.C695kbqI.avif","/_astro/billetes.CH1fPkpU.avif","/_astro/volcanes.BVqLYnNh.avif","/_astro/loteria.DvBci0JO.avif","/_astro/consulta.Cvb9IM6Q.css","/_astro/index.BwXjGcf2.css","/_astro/sorteo.GNLSjkBZ.css","/volcanes.avif","/_astro/accelerated-values.BBI455Ot.js","/_astro/Acordion.BOraLIGw.js","/_astro/chunk-2QAN2V2R.BcQzZYid.js","/_astro/chunk-736YWA4T.DfjOWwyF.js","/_astro/chunk-GH5E4FQB.DuHbuRbg.js","/_astro/client.6jQTiC7s.js","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.rasoniT7.js","/_astro/ConsultaForm.BCXiqM-x.js","/_astro/CreditCard.Bp_sqL3z.js","/_astro/effect-target.UUWZkA3n.js","/_astro/exito.DKZNtZhE.css","/_astro/HeroSwipper.Zux5SYWk.js","/_astro/index.B-SYruCi.js","/_astro/index.CohwfS9c.js","/_astro/index.CtiLlARo.css","/_astro/index.EzbrNgKr.js","/_astro/index.xgRDjp2c.js","/_astro/jsx-runtime.CLpGMVip.js","/_astro/ScrollTop.CwF8UW5T.js","/_astro/SorteoForm.CUn7Bpxp.js","/_astro/WinnerSwipperC.CLNL6T8K.js","/404.html","/consulta/index.html","/exito/index.html","/nosotros/index.html","/pago/index.html","/sorteo/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"iO598tPvSADvjqjFNvvzsxwXNDb79z/4Gg4ESzcX1Xs="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
