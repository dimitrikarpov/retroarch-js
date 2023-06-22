# Holy Retroarch

A thing for playing retro games

For starting retro game we need a **Rom** file and **Emulator**. Emulator in this case is a libretro Core.
Rom is a some binary file (grab one [here](https://www.romhacking.net/homebrew/)), Core is _wasm_ compiled libretro core with _js_ wrapper.

## Quick overview

1. Add `canvas` element with id="canvas"

```html
<!-- index.html -->
<canvas id="canvas"></canvas>
```

2. Load and convert Rom to Uint8Array

```html
<!-- index.html -->
<input type="file" name="rom" id="rom" />
```

```js
const romInput = document.getElementById("rom")
romInput.addEventListener("change", async function () {
  const buff = await this.files[0].arrayBuffer()
  rom = new Uint8Array(buff)
})
```

3. Create Retroarch

```js
const retroarch = await createRetroarch({
  canvas: document.getElementById("canvas"),
  coreUrl: `https://somePublicPath/${core}.js`,
  romBinary: rom,
})
```

4. Start It!

```js
retroarch.start()
```

That is it. Full example can be found in `/examples` folder

## API

### createRetroarch

Async function that gets some options and return `retroarch` instance

#### options

- `canvas` - reference to canvas element (required)
- `coreUrl` - string, url of core's js file (required)
- `wasmUrl` - string, url of core's wasm file
- `optionsUrl` - string, url of [core's options](CORE-OPTIONS.md) file
- `config` - simply it is [retroach.cfg](createRetroarch) file in js object format
- `romBinary` - Uint8Array blob of Rom
- `beforeLoad` - callback function that fires before loading core
- `onReady` - callback function that fires then core has been download and compiled. retroarch instance is created
- `onStart` - callback function that fires after Retroarch has been started, i.e. created and starting **mainLoop**
- `onDestroy` - callback that calls after retroarch instance has been succefully destroyed. and You can create new one

### Retroarch

#### methods

- start - starts the retroarch. the final step. all preparations as `copyRom`, `copyConfig`, `copySave` or any other `copyFile` should be called before start
- copyFile - copy some file to wasm virtual fs
- copyRom - copy Rom file
- copyConfig - copy settings object as `retroarch.cfg`
- copySave - copy Uint8Array as 'rom.state'
- pause - pauses mainLoop
- resume - resume mainLoop
- setCanvasSize - update retroarch width and height
- destroy - abort retroarch mainLoop and clean up

#### properties

- module - libretro Module object. the Core
- status - current retroarch instance status ("idle" | "started" | "destroyed")

#### listening Retroarch status changes

Holy Retroarch provides custom event called `retroarch-status` for emulator lifecycle changes. To handle them just subscribe on canvas element or any other canvas parent

```js
/**
 * listening status changes
 */
function subscribeToRetroarchStatusChange() {
  document
    .getElementById("canvas")
    .addEventListener("retroarch-status", (e) => {
      console.log("[HOLY-STATUS]", e.detail)
    })
}
```

Statuses:

- `idle` - core dowloaded, and compiled. at this point you can copy custom retroarch config or rom
- `started` - core started his main loop, rom started
- `destroyed` - core stopped main loop and remove all event listeners. new core can be loaded

## Where I can get cores

### Option 1: Repo CDN

You can get cores directly from this repo through **jsdelivr** CDN network. Drawback is not many cores are presented here. Check `/cores` folder to see what cores has compiled and get their URL's like this

```js
const core = "fceumm_libretro"

const coreUrl = `https://cdn.jsdelivr.net/gh/dimitrikarpov/retroarch-js/packages/retroarch-core/cores/${core}.js`
const wasmUrl = `https://cdn.jsdelivr.net/gh/dimitrikarpov/retroarch-js/packages/retroarch-core/cores/${core}.wasm`
```

### Option 2: Self hosted compiled cores

The option You probably want. Self hosting is faster and You not dependant from third-party services.
Just copy cores from `/cores` directory to your application's `public` folder. Need more cores - compile them yourself. It's easy.

## How to compile cores

Unfortunately retroarch's [buildbot](https://buildbot.libretro.com/nightly/emscripten/) does not provide ES module web only versions of builded cores. But we can download build to see wich cores are available for web version of Retroarch and get theirs git repositories from libretro core's list (example [fceumm core](https://docs.libretro.com/library/fceumm/#external-links)).

Info about compiling cores can be found in official [compiling guide](https://github.com/libretro/RetroArch/blob/master/pkg/emscripten/README.md)

For simplicity we will use official Emscripten SDK [docker continer](https://hub.docker.com/r/emscripten/emsdk)

The main steps to compile core:

- clone retroarch repo
- patching make script with additional arguments
- clone needed libretro core repo
- compile core to bitcode `.bc` file
- link core's `.bc` with retroarch frontend and compile them to `.js` and `.wasm`

### prepare working folder and clone retroarch repo

```sh
mkdir ~/retroarch
cd ~/retroarch
git clone --depth 1 https://github.com/libretro/RetroArch.git ~/retroarch/RetroArch
```

and apply one of the patches from `/cores` folder. For example, let's patch for "web-only" environment

```bash
cd Retroarch
git apply ~/Documents/dev/holy-retroarch/cores/Retroarch-esmodule-webonly.patch
cd ..
```

### compile core: Snes9x

```sh
git clone --depth 1 https://github.com/libretro/snes9x

docker run --rm -v $(pwd):/src -u $(id -u):$(id -g) \
-w /src/snes9x/libretro \
emscripten/emsdk \
emmake make -f /src/snes9x/libretro/Makefile platform=emscripten

cp ~/retroarch/snes9x/libretro/snes9x_libretro_emscripten.bc ~/retroarch/RetroArch/dist-scripts/snes9x_libretro_emscripten.bc
```

### compile core: Fceumm

```sh
git clone --depth 1 https://github.com/libretro/libretro-fceumm.git

docker run --rm -v $(pwd):/src -u $(id -u):$(id -g) \
-w /src/libretro-fceumm \
emscripten/emsdk \
emmake make -f /src/libretro-fceumm/Makefile.libretro platform=emscripten

cp ~/retroarch/libretro-fceumm/fceumm_libretro_emscripten.bc ~/retroarch/RetroArch/dist-scripts/fceumm_libretro_emscripten.bc
```

### compile core: Genesis Plus GX

```sh
git clone https://github.com/libretro/Genesis-Plus-GX

cd Genesis-Plus-GX && git checkout 492b4c6 && cd ..

docker run --rm -v $(pwd):/src -u $(id -u):$(id -g) \
-w /src/Genesis-Plus-GX \
emscripten/emsdk \
emmake make -f /src/Genesis-Plus-GX/Makefile.libretro platform=emscripten

cp ~/retroarch/Genesis-Plus-GX/genesis_plus_gx_libretro_emscripten.bc ~/retroarch/RetroArch/dist-scripts/genesis_plus_gx_libretro_emscripten.bc
```

### add retroarch to all compiled cores and build wasm files

```sh
docker run --rm -v $(pwd):/src -u $(id -u):$(id -g) \
-w /src/RetroArch/dist-scripts \
emscripten/emsdk \
emmake ./dist-cores.sh emscripten
```

All compiled `.js` and `.wasm` files now in `~/retroarch/RetroArch/pkg/emscripten` folder
