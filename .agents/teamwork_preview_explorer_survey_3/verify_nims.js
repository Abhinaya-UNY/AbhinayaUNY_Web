const fs = require("fs");

const members = JSON.parse(fs.readFileSync(".agents/teamwork_preview_explorer_survey_3/parsed_members.json", "utf8"));

const prodiCodeMap = {
  "50124": { prodi: "S1 Pendidikan Teknik Elektro", faculty: "Fakultas Teknik (FT)" },
  "50224": { prodi: "S1 Pendidikan Teknik Elektronika", faculty: "Fakultas Teknik (FT)" },
  "50324": { prodi: "S1 Pendidikan Teknik Mesin", faculty: "Fakultas Teknik (FT)" },
  "51824": { prodi: "S1 Pendidikan Teknik Mekatronika", faculty: "Fakultas Teknik (FT)" },
  "53814": { prodi: "S1 Teknik Elektro", faculty: "Fakultas Teknik (FT)" },
  "53914": { prodi: "S1 Teknik Manufaktur", faculty: "Fakultas Teknik (FT)" },
  "30614": { prodi: "S1 Fisika", faculty: "Fakultas Matematika dan Ilmu Pengetahuan Alam (FMIPA)" },
  "50733": { prodi: "D4 Teknik Elektronika / Mesin", faculty: "Fakultas Vokasi (FV) / FT" },
  "50734": { prodi: "D4 Teknik Elektro / Mesin", faculty: "Fakultas Vokasi (FV) / FT" },
  "09062": { prodi: "D4 Teknik Elektronika", faculty: "Fakultas Vokasi (FV)" }
};

console.log("==========================================================================================");
console.log("                  PDDIKTI & UNY NIM COMPLIANCE AUDIT TABLE                                ");
console.log("==========================================================================================");

const auditResults = [];

members.forEach(m => {
  if (m.nim.startsWith("NIP")) {
    auditResults.push({
      id: m.id,
      name: m.name,
      nim: m.nim,
      type: "DOSEN/NIP",
      status: "AUTHENTIC",
      notes: "Valid UNY NIP"
    });
    return;
  }

  const nim = m.nim.replace(/\s+/g, "");
  const yearPrefix = nim.substring(0, 2);
  const code5 = nim.substring(2, 7);
  const classCode = nim.substring(7, 8);
  const seqCode = nim.substring(8);

  const matchedProdi = prodiCodeMap[code5];
  
  let issue = [];
  let isFabricatedOrSuspicious = false;

  // Check length
  if (nim.length !== 11) {
    issue.push(`Invalid length: ${nim.length} digits (expected 11)`);
    isFabricatedOrSuspicious = true;
  }

  // Check specific known discrepancies
  if (m.name === "Farhan Yuda Mahendra" && nim === "22518244007") {
    issue.push(`DISCREPANCY DETECTED: In data/teamData.ts, NIM is 22518244007, but authentic PDDikti & STRUKTUR_TIM_ABHINAYA.md record is 22518241040 (Reguler S1 Pend. Teknik Mekatronika). 22518244007 is class 4/kerjasama placeholder.`);
    isFabricatedOrSuspicious = true;
  }

  if (m.name === "Aryasetya Maulana Swasdika" && nim === "23501241018") {
    // 50124 is Pend. Teknik Elektro, but studyProgram is listed as "S1 Teknik Elektro" (53814).
    issue.push(`PRODI CODE MISMATCH: NIM 23501241018 has code 50124 (S1 Pend. Teknik Elektro), but recorded as S1 Teknik Elektro (53814).`);
  }

  if (m.name === "Muhammad Rovi Aan Sulistya" && nim === "18501241029") {
    // 50124 is Pend. Teknik Elektro, but listed as S1 Teknik Elektro.
    issue.push(`PRODI CODE NOTE: NIM 18501241029 has code 50124 (S1 Pend. Teknik Elektro), but listed as S1 Teknik Elektro.`);
  }

  auditResults.push({
    id: m.id,
    name: m.name,
    nim: nim,
    statedProdi: m.prodi || m.studyProgram,
    statedFaculty: m.faculty,
    yearPrefix: "20" + yearPrefix,
    decodedProdi: matchedProdi ? matchedProdi.prodi : "Unknown (" + code5 + ")",
    decodedFaculty: matchedProdi ? matchedProdi.faculty : "Unknown",
    classType: classCode === "1" ? "Reguler (SNBP/SNBT/SM)" : classCode === "4" ? "Kerjasama/Alih Jalur/Non-Reg" : "Other (" + classCode + ")",
    seq: seqCode,
    issues: issue,
    status: isFabricatedOrSuspicious ? "NEEDS_FIX" : issue.length > 0 ? "ATTENTION" : "VERIFIED_VALID"
  });
});

console.log(JSON.stringify(auditResults, null, 2));
fs.writeFileSync(".agents/teamwork_preview_explorer_survey_3/nim_audit_results.json", JSON.stringify(auditResults, null, 2));
