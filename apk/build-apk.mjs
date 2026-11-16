// Compila el APK de Musinotas.   Uso (desde la carpeta apk/):  npm run build
//
// Requisitos: Node 20+, JDK 21 y el SDK de Android (Android Studio).
// Resultado:  apk/dist/musinotas.apk
//
// Si existe signing/keystore.properties se firma como versión final (release);
// si no, se genera un APK de depuración (sirve para probar, pero no para
// actualizar una instalación firmada con otra llave).
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here    = dirname(fileURLToPath(import.meta.url));
const android = join(here, 'android');
const isWin   = process.platform === 'win32';

const env = { ...process.env };
if (!env.ANDROID_HOME && !env.ANDROID_SDK_ROOT) {
  const guess = isWin
    ? join(env.LOCALAPPDATA || '', 'Android', 'Sdk')
    : join(env.HOME || '', 'Android', 'Sdk');
  if (existsSync(guess)) env.ANDROID_HOME = guess;
  else throw new Error('No encuentro el SDK de Android. Define la variable ANDROID_HOME.');
}

const run = (cmd, args, cwd) =>
  execFileSync(cmd, args, { cwd, env, stdio: 'inherit', shell: isWin });

// 1. Copia la configuración (capacitor.config.json, www/) al proyecto Android
run('npx', ['cap', 'sync', 'android'], here);

// 2. Compila
const propsFile = join(here, 'signing', 'keystore.properties');
const gradle    = isWin ? '.\\gradlew.bat' : './gradlew';
let output;

if (existsSync(propsFile)) {
  const props = Object.fromEntries(
    readFileSync(propsFile, 'utf8').split(/\r?\n/).filter(l => l.includes('='))
      .map(l => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()])
  );
  const store = resolve(here, 'signing', props.storeFile);
  run(gradle, [
    'assembleRelease',
    `"-Pandroid.injected.signing.store.file=${store}"`,
    `-Pandroid.injected.signing.store.password=${props.storePassword}`,
    `-Pandroid.injected.signing.key.alias=${props.keyAlias}`,
    `-Pandroid.injected.signing.key.password=${props.keyPassword}`,
  ], android);
  output = join(android, 'app', 'build', 'outputs', 'apk', 'release', 'app-release.apk');
} else {
  console.warn('\n⚠ Sin signing/keystore.properties: se genera un APK de depuración.\n');
  run(gradle, ['assembleDebug'], android);
  output = join(android, 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');
}

// 3. Deja el APK en apk/dist/
mkdirSync(join(here, 'dist'), { recursive: true });
const dest = join(here, 'dist', 'musinotas.apk');
copyFileSync(output, dest);
console.log(`\n✅ APK listo: ${dest}`);
