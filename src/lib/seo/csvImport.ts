import * as XLSX from "xlsx";

export type ParsedRow = Record<string, string | number>;

export async function parseSheet(file: File): Promise<ParsedRow[]> {
  const buf = await file.arrayBuffer();
  const wb = XLSX.read(buf, { type: "array" });
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  return XLSX.utils.sheet_to_json<ParsedRow>(ws, { defval: "" });
}

// Normalize Search Console column names (PT and EN variants).
const KEYS = {
  query: ["query", "consulta", "consultas principais", "top queries"],
  page: ["page", "página", "pagina", "url", "principais páginas"],
  clicks: ["clicks", "cliques"],
  impressions: ["impressions", "impressões", "impressoes"],
  ctr: ["ctr"],
  position: ["position", "posição", "posicao", "posição média", "average position"],
  date: ["date", "data"],
};

function pick(row: ParsedRow, keys: string[]): string | number | undefined {
  const lk = Object.keys(row).reduce<Record<string, string>>((acc, k) => {
    acc[k.toLowerCase().trim()] = k;
    return acc;
  }, {});
  for (const k of keys) {
    const real = lk[k];
    if (real !== undefined && row[real] !== "" && row[real] !== undefined) return row[real];
  }
  return undefined;
}

function num(v: string | number | undefined): number {
  if (typeof v === "number") return v;
  if (!v) return 0;
  const s = String(v).replace(/[%\s]/g, "").replace(",", ".");
  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
}

export interface NormalizedRow {
  query?: string;
  page?: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  date?: string;
}

export function normalize(rows: ParsedRow[]): NormalizedRow[] {
  return rows.map((r) => {
    let ctr = num(pick(r, KEYS.ctr));
    if (ctr > 1) ctr = ctr / 100;
    return {
      query: pick(r, KEYS.query) ? String(pick(r, KEYS.query)) : undefined,
      page: pick(r, KEYS.page) ? String(pick(r, KEYS.page)) : undefined,
      clicks: num(pick(r, KEYS.clicks)),
      impressions: num(pick(r, KEYS.impressions)),
      ctr,
      position: num(pick(r, KEYS.position)),
      date: pick(r, KEYS.date) ? String(pick(r, KEYS.date)) : undefined,
    };
  });
}
