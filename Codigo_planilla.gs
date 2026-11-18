// Recibe los registros de la app de conteo y los agrega a la planilla.
// Crea una pestaña por cada combinación "Puesto · Sentido" y descarta duplicados por id.

const CLAVE = 'CAMBIAR_ESTA_CLAVE';   // Poné una clave propia y cargala igual en la app
const HEAD = ['id', 'puesto', 'sentido', 'fecha', 'hora', 'tipo', 'latitud', 'longitud', 'precision_m', 'cantidad'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.k !== CLAVE) return out({ ok: false, error: 'clave incorrecta' });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const porPestana = {};
    body.rows.forEach(function (r) {
      const nombre = (r.p + ' · ' + r.s).replace(/[\[\]\*\?\:\\\/]/g, '-').slice(0, 99);
      (porPestana[nombre] = porPestana[nombre] || []).push(r);
    });

    const ids = [];
    Object.keys(porPestana).forEach(function (nombre) {
      let sh = ss.getSheetByName(nombre);
      if (!sh) {
        sh = ss.insertSheet(nombre);
        sh.getRange('A:A').setNumberFormat('@');
        sh.getRange('D:E').setNumberFormat('@');
        sh.appendRow(HEAD);
        sh.setFrozenRows(1);
      }
      const ultima = sh.getLastRow();
      const existentes = new Set(
        ultima > 1 ? sh.getRange(2, 1, ultima - 1, 1).getValues().flat().map(String) : []
      );
      const nuevas = porPestana[nombre].filter(function (r) { return !existentes.has(String(r.id)); });
      if (nuevas.length) {
        sh.getRange(ultima + 1, 1, nuevas.length, HEAD.length).setValues(
          nuevas.map(function (r) { return [r.id, r.p, r.s, r.fecha, r.hora, r.t, r.lat, r.lon, r.acc, r.q || 1]; })
        );
      }
      porPestana[nombre].forEach(function (r) { ids.push(r.id); });
    });
    return out({ ok: true, ids: ids });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
