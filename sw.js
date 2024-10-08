const cacheName = "HexGL1";
const cachedResources = [
"index.html",
"css/BebasNeue-webfont.eot",
"css/BebasNeue-webfont.ttf",
"css/fonts.css",
"css/mobile-controls-2.jpg",
"css/mobile-over.jpg",
"css/BebasNeue-webfont.svg",
"css/BebasNeue-webfont.woff",
"css/mobile-controls-1.jpg",
"css/mobile.jpg",
"css/touchcontroller.css",
"libs/Three.dev.js",
"libs/ShaderExtras.js",
"libs/postprocessing/EffectComposer.js",
"libs/postprocessing/RenderPass.js",
"libs/postprocessing/BloomPass.js",
"libs/postprocessing/ShaderPass.js",
"libs/postprocessing/MaskPass.js",
"libs/Detector.js",
"libs/Stats.js",
"libs/DAT.GUI.min.js",
"bkcore.coffee/controllers/TouchController.js",
"bkcore.coffee/controllers/OrientationController.js",
"bkcore/Timer.js",
"bkcore/ImageData.js",
"bkcore/Utils.js",
"bkcore/threejs/RenderManager.js",
"bkcore/threejs/Shaders.js",
"bkcore/threejs/Particles.js",
"bkcore/threejs/Loader.js",
"bkcore/hexgl/HUD.js",
"bkcore/hexgl/RaceData.js",
"bkcore/hexgl/ShipControls.js",
"bkcore/hexgl/ShipEffects.js",
"bkcore/hexgl/CameraChase.js",
"bkcore/hexgl/Gameplay.js",
"bkcore/hexgl/tracks/Cityscape.js",
"bkcore/hexgl/HexGL.js",
"geometries/bonus/base/base.js",
"geometries/booster/booster.js",
"geometries/ships/feisar/feisar.js",
"geometries/tracks/cityscape/scrapers1.js  ",
"geometries/tracks/cityscape/scrapers2.js  ",
"geometries/tracks/cityscape/startbanner.js  ",
"geometries/tracks/cityscape/start.js  ",
"geometries/tracks/cityscape/track.js",
"geometries/tracks/cityscape/bonus/speed.js",
"textures/tracks/cityscape/collision.png",
"textures/tracks/cityscape/diffuse.jpg",
"textures/tracks/cityscape/height.png",
"textures/tracks/cityscape/start/diffuse.jpg",
"textures/tracks/cityscape/start/start.jpg",
"textures/tracks/cityscape/scrapers2/diffuse.jpg",
"textures/tracks/cityscape/scrapers1/diffuse.jpg",
"textures/skybox/dawnclouds/nx.jpg",
"textures/skybox/dawnclouds/ny.jpg",
"textures/skybox/dawnclouds/nz.jpg",
"textures/skybox/dawnclouds/px.jpg",
"textures/skybox/dawnclouds/pz.jpg",
"textures/skybox/dawnclouds/py.jpg",
"textures/ships/feisar/diffuse.jpg",
"textures/ships/feisar/booster/booster.png",
"textures/ships/feisar/booster/boostersprite.jpg",
"textures/bonus/base/diffuse.jpg",
"textures/particles/cloud.png",
"textures/particles/damage.png",
"textures/particles/spark.png",
"textures/hud/hud-bg.png",
"textures/hud/hex.jpg",
"textures/hud/hud-fg-speed.png",
"textures/hud/hud-fg-shield.png"
]

async function precache() {
  const cache = await caches.open(cacheName);
  return cache.addAll(cachedResources);
}

self.addEventListener("install", (event) => {
  event.waitUntil(precache());
});

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || Response.error();
  }
}

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.match(/^\/inbox/)) {
    event.respondWith(networkFirst(event.request));
  }
});
