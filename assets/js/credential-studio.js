(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const params = new URLSearchParams(location.search);
  const fields = ["credName", "credType", "credField", "credDate", "credProject", "credNote"];
  const lang = (document.documentElement.lang || "en").toLowerCase().split("-")[0];
  const copy = {
    en: {
      presented: "THIS PERSONAL RECORD IS PRESENTED TO",
      declaration: "This personal record commemorates a learning activity and work described by the named individual.",
      basis: "Its contents are based solely on information entered by the individual; SMC has not assessed, awarded, authenticated or verified them.",
      rationale: "It is created for personal reflection and portfolio display, and does not attest to institutional enrolment, academic credit, a qualification or an award.",
      field: "FIELD OF STUDY / PRACTICE", date: "DATE DECLARED", work: "WORK / PROJECT",
      signature: "PRINCIPAL · SIGNATURE SPECIMEN", specimen: "PERSONAL SPECIMEN · NOT ISSUED · NOT VERIFIED",
      footer: "A self-prepared personal record · Not an institutional credential",
      type: "PERSONAL LEARNING RECORD"
    },
    zh: {
      presented: "兹呈予",
      declaration: "本个人记录用于纪念持有人自行陈述的学习活动、研究过程与实践成果。",
      basis: "本记录内容完全依据填写者自行提供的信息；SMC 未对其学习经历、课程完成情况、学分、作品或身份进行评审、授予、认证或核验。",
      rationale: "本记录仅供个人学习回顾与作品集展示，不构成机构注册证明、学分证明、学历、学位、职业资格或任何正式荣誉授予。",
      field: "研习领域 / 实践方向", date: "自述完成日期", work: "作品 / 项目",
      signature: "院长签名 · 签名样式展示", specimen: "个人自制样张 · 非机构签发 · 未经核验",
      footer: "个人自行制作的学习记录 · 非机构学术凭证",
      type: "个人学习成果记录"
    },
    pl: {
      presented: "NINIEJSZY OSOBISTY ZAPIS PRZEDSTAWIA SIĘ",
      declaration: "Niniejszy zapis upamiętnia aktywność edukacyjną i pracę opisaną przez wskazaną osobę.",
      basis: "Treść opiera się wyłącznie na informacjach podanych przez tę osobę; SMC nie oceniało, nie przyznawało ani nie weryfikowało tych danych.",
      rationale: "Dokument służy wyłącznie osobistej refleksji i prezentacji portfolio; nie potwierdza przyjęcia do instytucji, punktów ECTS, kwalifikacji ani nagrody.",
      field: "OBSZAR NAUKI / PRAKTYKI", date: "DATA ZADEKLAROWANA", work: "PRACA / PROJEKT",
      signature: "REKTOR · WZÓR PODPISU", specimen: "PRYWATNY WZÓR · NIE WYDANO · NIEZWERYFIKOWANO",
      footer: "Osobisty zapis przygotowany przez użytkownika · Nie jest dokumentem instytucjonalnym",
      type: "OSOBISTY ZAPIS EDUKACYJNY"
    },
    es: {
      presented: "SE PRESENTA ESTE REGISTRO PERSONAL A",
      declaration: "Este registro personal conmemora una actividad de aprendizaje y un trabajo descritos por la persona indicada.",
      basis: "Su contenido se basa exclusivamente en la información facilitada por esa persona; SMC no la ha evaluado, concedido, autenticado ni verificado.",
      rationale: "Se crea únicamente para reflexión personal y presentación de portafolio; no acredita matrícula institucional, créditos, titulación ni concesión de un premio.",
      field: "ÁREA DE ESTUDIO / PRÁCTICA", date: "FECHA DECLARADA", work: "TRABAJO / PROYECTO",
      signature: "RECTOR · MUESTRA DE FIRMA", specimen: "MUESTRA PERSONAL · NO EMITIDO · NO VERIFICADO",
      footer: "Registro personal preparado por el usuario · No es una credencial institucional",
      type: "REGISTRO PERSONAL DE APRENDIZAJE"
    },
    fr: {
      presented: "LE PRÉSENT DOSSIER PERSONNEL EST PRÉSENTÉ À",
      declaration: "Ce dossier personnel commémore une activité d’apprentissage et un travail décrits par la personne nommée.",
      basis: "Son contenu repose uniquement sur les informations fournies par cette personne ; SMC ne les a ni évaluées, ni attribuées, ni authentifiées, ni vérifiées.",
      rationale: "Il est destiné à la réflexion personnelle et à la présentation d’un portfolio ; il n’atteste ni inscription institutionnelle, ni crédits, ni diplôme, ni distinction.",
      field: "DOMAINE D’ÉTUDE / PRATIQUE", date: "DATE DÉCLARÉE", work: "TRAVAIL / PROJET",
      signature: "RECTEUR · SPÉCIMEN DE SIGNATURE", specimen: "SPÉCIMEN PERSONNEL · NON ÉMIS · NON VÉRIFIÉ",
      footer: "Dossier personnel préparé par l’utilisateur · Pas un titre institutionnel",
      type: "DOSSIER PERSONNEL D’APPRENTISSAGE"
    },
    de: {
      presented: "DIESER PERSÖNLICHE NACHWEIS WIRD VORGELEGT FÜR",
      declaration: "Dieser persönliche Nachweis erinnert an eine von der genannten Person beschriebene Lernaktivität und Arbeit.",
      basis: "Der Inhalt beruht ausschließlich auf Angaben der Person; SMC hat diese weder bewertet noch verliehen, authentifiziert oder überprüft.",
      rationale: "Er dient ausschließlich der persönlichen Reflexion und Portfolio-Präsentation; er bestätigt weder institutionelle Einschreibung noch Leistungspunkte, Qualifikation oder Auszeichnung.",
      field: "STUDIEN- / PRAXISBEREICH", date: "ANGEGEBENES DATUM", work: "ARBEIT / PROJEKT",
      signature: "REKTOR · UNTERSCHRIFTSMUSTER", specimen: "PERSÖNLICHES MUSTER · NICHT AUSGESTELLT · NICHT GEPRÜFT",
      footer: "Vom Nutzer erstellter persönlicher Nachweis · Kein institutioneller Abschlussnachweis",
      type: "PERSÖNLICHER LERNNACHWEIS"
    },
    it: {
      presented: "IL PRESENTE REGISTRO PERSONALE È PRESENTATO A",
      declaration: "Questo registro personale commemora un’attività di apprendimento e un lavoro descritti dalla persona indicata.",
      basis: "Il contenuto si basa esclusivamente sulle informazioni fornite dalla persona; SMC non le ha valutate, conferite, autenticate o verificate.",
      rationale: "È destinato esclusivamente alla riflessione personale e alla presentazione del portfolio; non attesta iscrizione istituzionale, crediti, qualifiche o riconoscimenti.",
      field: "AMBITO DI STUDIO / PRATICA", date: "DATA DICHIARATA", work: "LAVORO / PROGETTO",
      signature: "RETTORE · ESEMPLARE DI FIRMA", specimen: "ESEMPLARE PERSONALE · NON EMESSO · NON VERIFICATO",
      footer: "Registro personale preparato dall’utente · Non è una credenziale istituzionale",
      type: "REGISTRO PERSONALE DI APPRENDIMENTO"
    },
    ru: {
      presented: "НАСТОЯЩАЯ ЛИЧНАЯ ЗАПИСЬ ПРЕДСТАВЛЯЕТСЯ",
      declaration: "Эта личная запись отмечает учебную деятельность и работу, описанные указанным лицом.",
      basis: "Содержание основано исключительно на сведениях, предоставленных этим лицом; SMC не оценивал, не присваивал, не удостоверял и не проверял их.",
      rationale: "Запись предназначена только для личной рефлексии и портфолио; она не подтверждает зачисление, академические кредиты, квалификацию или награду.",
      field: "ОБЛАСТЬ ОБУЧЕНИЯ / ПРАКТИКИ", date: "ЗАЯВЛЕННАЯ ДАТА", work: "РАБОТА / ПРОЕКТ",
      signature: "РЕКТОР · ОБРАЗЕЦ ПОДПИСИ", specimen: "ЛИЧНЫЙ ОБРАЗЕЦ · НЕ ВЫДАНО · НЕ ПРОВЕРЕНО",
      footer: "Личная запись, созданная пользователем · Не является документом учреждения",
      type: "ЛИЧНАЯ ЗАПИСЬ ОБ ОБУЧЕНИИ"
    },
    ja: {
      presented: "本パーソナル記録を次の者に呈する",
      declaration: "本記録は、記載された本人が申告した学習活動および制作・研究成果を記念するものです。",
      basis: "内容は本人が入力した情報のみに基づきます。SMCは学習履歴、単位、作品または本人確認について審査・授与・認証・検証を行っていません。",
      rationale: "個人の振り返りおよびポートフォリオ表示のみを目的とし、機関への在籍、単位、資格、学位または表彰を証明するものではありません。",
      field: "学習・実践分野", date: "本人申告の完了日", work: "作品・プロジェクト",
      signature: "学長 · 署名見本", specimen: "個人作成見本 · 未発行 · 未検証",
      footer: "利用者が作成した個人記録 · 機関発行の証明書ではありません",
      type: "個人学習記録"
    },
    ko: {
      presented: "본 개인 학습 기록을 다음 사람에게 제시합니다",
      declaration: "본 기록은 기재된 개인이 설명한 학습 활동과 작업을 기념하기 위한 것입니다.",
      basis: "내용은 해당 개인이 직접 입력한 정보에만 근거하며, SMC는 이를 평가·수여·인증 또는 검증하지 않았습니다.",
      rationale: "개인적 성찰과 포트폴리오 전시만을 위한 기록이며, 기관 등록, 학점, 자격 또는 수상을 증명하지 않습니다.",
      field: "학습 / 실천 분야", date: "본인 기재 완료일", work: "작업 / 프로젝트",
      signature: "총장 · 서명 견본", specimen: "개인 제작 견본 · 미발급 · 미검증",
      footer: "사용자가 직접 작성한 개인 기록 · 기관 발행 자격증명이 아닙니다",
      type: "개인 학습 기록"
    },
    th: {
      presented: "บันทึกส่วนบุคคลฉบับนี้จัดทำขึ้นสำหรับ",
      declaration: "บันทึกส่วนบุคคลนี้จัดทำขึ้นเพื่อระลึกถึงกิจกรรมการเรียนรู้และผลงานที่บุคคลดังกล่าวระบุไว้",
      basis: "เนื้อหาอ้างอิงจากข้อมูลที่บุคคลกรอกด้วยตนเองเท่านั้น SMC มิได้ประเมิน มอบให้ รับรอง หรือยืนยันข้อมูลดังกล่าว",
      rationale: "จัดทำเพื่อการทบทวนตนเองและแสดงผลงานส่วนบุคคลเท่านั้น ไม่ใช่หลักฐานการลงทะเบียน หน่วยกิต คุณวุฒิ หรือรางวัลจากสถาบัน",
      field: "สาขาการศึกษา / การปฏิบัติ", date: "วันที่ที่ผู้ใช้ระบุ", work: "ผลงาน / โครงการ",
      signature: "อธิการบดี · ตัวอย่างลายมือชื่อ", specimen: "ตัวอย่างส่วนบุคคล · ไม่ได้ออกโดยสถาบัน · ไม่ได้รับการตรวจสอบ",
      footer: "บันทึกส่วนบุคคลที่ผู้ใช้จัดทำ · ไม่ใช่เอกสารรับรองจากสถาบัน",
      type: "บันทึกการเรียนรู้ส่วนบุคคล"
    },
    vi: {
      presented: "HỒ SƠ CÁ NHÂN NÀY ĐƯỢC TRÌNH TẶNG",
      declaration: "Hồ sơ cá nhân này ghi nhận hoạt động học tập và công việc do người được nêu tự mô tả.",
      basis: "Nội dung chỉ dựa trên thông tin do cá nhân cung cấp; SMC không đánh giá, cấp, xác thực hoặc kiểm chứng các thông tin đó.",
      rationale: "Hồ sơ chỉ phục vụ việc tự nhìn nhận và trưng bày danh mục cá nhân; không xác nhận việc nhập học, tín chỉ, bằng cấp hay giải thưởng của tổ chức.",
      field: "LĨNH VỰC HỌC TẬP / THỰC HÀNH", date: "NGÀY TỰ KHAI", work: "CÔNG TRÌNH / DỰ ÁN",
      signature: "HIỆU TRƯỞNG · MẪU CHỮ KÝ", specimen: "MẪU CÁ NHÂN · CHƯA ĐƯỢC CẤP · CHƯA XÁC MINH",
      footer: "Hồ sơ cá nhân do người dùng tự tạo · Không phải chứng nhận của tổ chức",
      type: "HỒ SƠ HỌC TẬP CÁ NHÂN"
    }
  };
  const c = copy[lang] || copy.en;
  let crestData = "", signatureData = "";
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"}[ch]));
  const dataUri = (s) => "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s);
  async function loadAsset(path) {
    const r = await fetch(path, {cache:"force-cache"});
    if (!r.ok) throw new Error("Unable to load " + path);
    const b = await r.blob();
    return await new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result);
      fr.onerror = reject;
      fr.readAsDataURL(b);
    });
  }
  function wrap(text, max, maxLines) {
    const chars = Array.from(String(text || ""));
    const lines = [];
    while (chars.length && lines.length < maxLines) lines.push(chars.splice(0, max).join(""));
    if (chars.length && lines.length) lines[lines.length - 1] = lines[lines.length - 1].slice(0, -1) + "…";
    return lines;
  }
  function textLines(text, x, y, max, lineHeight, klass, maxLines) {
    return wrap(text, max, maxLines).map((line, i) => `<text class="${klass}" text-anchor="middle" x="${x}" y="${y+i*lineHeight}">${esc(line)}</text>`).join("");
  }
  function svgArtwork() {
    const name = $("credName").value.trim() || "Your Name";
    const type = $("credType").value;
    const field = $("credField").value.trim() || "—";
    const date = $("credDate").value || "—";
    const project = $("credProject").value.trim();
    const note = $("credNote").value.trim();
    const safeProject = (() => { try { const u = new URL(project); return ["http:","https:"].includes(u.protocol) ? u.href : ""; } catch(e) { return ""; } })();
    const nameSize = Array.from(name).length > 32 ? 42 : 54;
    const noteText = note ? textLines(note, 800, 850, 74, 27, "note", 2) : "";
    const projectText = safeProject ? textLines(safeProject, 800, 895, 86, 23, "project", 1) : "";
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1600" height="1130" viewBox="0 0 1600 1130">
      <defs>
        <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffefa"/><stop offset=".52" stop-color="#f8f5ec"/><stop offset="1" stop-color="#fffdf7"/></linearGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8e682c"/><stop offset=".25" stop-color="#e4c77e"/><stop offset=".5" stop-color="#a77c37"/><stop offset=".78" stop-color="#f1d99b"/><stop offset="1" stop-color="#886127"/></linearGradient>
        <radialGradient id="seal" cx=".35" cy=".28" r=".8"><stop offset="0" stop-color="#f7e8b5"/><stop offset=".45" stop-color="#c49a4f"/><stop offset="1" stop-color="#8c642c"/></radialGradient>
        <pattern id="guilloche" width="22" height="22" patternUnits="userSpaceOnUse"><path d="M0 11 Q5 -1 11 11 T22 11 M0 11 Q5 23 11 11 T22 11" fill="none" stroke="#b9975d" stroke-width=".45" opacity=".34"/></pattern>
      </defs>
      <rect width="1600" height="1130" fill="url(#paper)"/>
      <rect x="22" y="22" width="1556" height="1086" rx="3" fill="none" stroke="#8e6c39" stroke-width="5"/>
      <rect x="35" y="35" width="1530" height="1060" fill="none" stroke="url(#gold)" stroke-width="2"/>
      <rect x="49" y="49" width="1502" height="1032" fill="none" stroke="#b99a62" stroke-width="1"/>
      <rect x="62" y="62" width="1476" height="1006" fill="url(#guilloche)" opacity=".36"/>
      <rect x="76" y="76" width="1448" height="978" fill="none" stroke="#9d7b46" stroke-width="1.2"/>
      ${[["95","95","1","1"],["1505","95","-1","1"],["95","1035","1","-1"],["1505","1035","-1","-1"]].map(a=>`<g transform="translate(${a[0]} ${a[1]}) scale(${a[2]} ${a[3]})" fill="none" stroke="url(#gold)" stroke-width="2"><path d="M0 85 V18 Q0 0 18 0 H85 M9 65 V22 Q9 9 22 9 H65 M18 48 C38 48 48 38 48 18 M30 0 C30 23 23 30 0 30"/><circle cx="18" cy="18" r="5"/></g>`).join("")}
      <text x="800" y="112" text-anchor="middle" class="institution">SOVEREIGN MODERN COLLEGE</text>
      <text x="800" y="143" text-anchor="middle" class="latin">COLLEGIUM SUI IURIS MODERNUM · SM C</text>
      <image x="760" y="166" width="80" height="92" preserveAspectRatio="xMidYMid meet" href="${crestData}"/>
      <path d="M470 280 H1130" stroke="url(#gold)" stroke-width="1.6"/>
      <path d="M500 280 l18 -8 l18 8 l-18 8z M1100 280 l18 -8 l18 8 l-18 8z" fill="#b18b4e"/>
      <text x="800" y="322" text-anchor="middle" class="recordtype">${esc(c.type)}</text>
      <text x="800" y="383" text-anchor="middle" class="title">${esc(type)}</text>
      <text x="800" y="440" text-anchor="middle" class="presented">${esc(c.presented)}</text>
      <text x="800" y="520" text-anchor="middle" class="name" font-size="${nameSize}">${esc(name)}</text>
      <path d="M365 543 H1235" stroke="#b18b4e" stroke-width="1.5"/>
      <text x="800" y="586" text-anchor="middle" class="label">${esc(c.field)}</text>
      <text x="800" y="627" text-anchor="middle" class="field">${esc(field.slice(0,90))}</text>
      <text x="800" y="681" text-anchor="middle" class="declaration">${esc(c.declaration)}</text>
      ${textLines(c.basis,800,721,104,25,"body",2)}
      ${textLines(c.rationale,800,777,104,25,"body",2)}
      ${noteText}
      ${projectText ? `<text x="800" y="930" text-anchor="middle" class="label">${esc(c.work)}</text>${projectText}` : ""}
      <g transform="translate(800 986)"><path d="M-220 0 H-92 M92 0 H220" stroke="#b18b4e" stroke-width="1"/><text x="0" y="-8" text-anchor="middle" class="label">${esc(c.date)}</text><text x="0" y="25" text-anchor="middle" class="date">${esc(date)}</text></g>
      <g transform="translate(300 930)">
        <image x="-125" y="-76" width="250" height="62" preserveAspectRatio="xMidYMid meet" href="${signatureData}"/>
        <path d="M-130 -5 H130" stroke="#7c6a4b" stroke-width="1"/>
        <text x="0" y="20" text-anchor="middle" class="siglabel">${esc(c.signature)}</text>
      </g>
      <g transform="translate(1315 910)">
        <path d="M0 -100 L18 -72 L52 -78 L60 -44 L91 -30 L78 3 L91 34 L60 50 L52 84 L18 78 L0 108 L-18 78 L-52 84 L-60 50 L-91 34 L-78 3 L-91 -30 L-60 -44 L-52 -78 L-18 -72Z" fill="url(#gold)" stroke="#795523" stroke-width="3"/>
        <circle r="76" fill="url(#seal)" stroke="#f4e2ad" stroke-width="3"/>
        <circle r="64" fill="none" stroke="#f6e7bd" stroke-width="1.5" stroke-dasharray="2 4"/>
        <circle r="51" fill="none" stroke="#795523" stroke-width="1.2"/>
        <text y="-12" text-anchor="middle" class="sealbig">SMC</text>
        <text y="13" text-anchor="middle" class="sealsmall">SUI IURIS</text>
        <text y="34" text-anchor="middle" class="sealsmall">PERSONAL RECORD</text>
      </g>
      <text x="800" y="1050" text-anchor="middle" class="warning">${esc(c.specimen)}</text>
      <text x="800" y="1080" text-anchor="middle" class="footer">${esc(c.footer)} · smc.edu.pl</text>
      <text x="800" y="640" text-anchor="middle" class="watermark" transform="rotate(-17 800 640)">SPECIMEN · NOT ISSUED</text>
      <style>
        .institution{font:700 25px Georgia,serif;letter-spacing:7px;fill:#122b46}
        .latin{font:12px Georgia,serif;letter-spacing:4px;fill:#8b7047}
        .recordtype{font:13px Arial,sans-serif;letter-spacing:4px;fill:#9a7844}
        .title{font:44px Georgia,serif;fill:#132d4a}
        .presented{font:16px Georgia,serif;letter-spacing:2px;fill:#78613d}
        .name{font:52px Georgia,serif;fill:#152d46}
        .label{font:11px Arial,sans-serif;letter-spacing:2px;fill:#987744}
        .field{font:22px Georgia,serif;fill:#243b52}
        .declaration{font:16px Georgia,serif;fill:#34475a}
        .body{font:14px Georgia,serif;fill:#4d5964}
        .note{font:14px Georgia,serif;fill:#465464}
        .project{font:12px Arial,sans-serif;fill:#566477}
        .date{font:17px Georgia,serif;fill:#233950}
        .siglabel{font:10px Arial,sans-serif;letter-spacing:1px;fill:#7e6848}
        .sealbig{font:700 29px Georgia,serif;fill:#fff6dc;letter-spacing:2px}
        .sealsmall{font:8px Arial,sans-serif;fill:#fff5d9;letter-spacing:1px}
        .warning{font:700 15px Arial,sans-serif;letter-spacing:3px;fill:#8e3c35}
        .footer{font:11px Arial,sans-serif;letter-spacing:1px;fill:#8a795d}
        .watermark{font:700 94px Arial,sans-serif;letter-spacing:9px;fill:#a34a43;opacity:.075}
      </style>
    </svg>`;
  }
  let currentSvg = "";
  async function update() {
    if (!crestData || !signatureData) return;
    const svg = svgArtwork();
    currentSvg = svg;
    $("credentialArtwork").src = dataUri(svg);
    $("credentialArtwork").alt = "SMC personal learning record specimen";
  }
  async function init() {
    try {
      [crestData, signatureData] = await Promise.all([
        loadAsset("/assets-smc-crest-blue.svg"),
        loadAsset("/assets/images/signature-of-principal.svg")
      ]);
      fields.forEach(id => { if (params.has(id)) $(id).value = params.get(id); });
      fields.forEach(id => $(id).addEventListener("input", update));
      $("updateCredential").addEventListener("click", update);
      $("printCredential").addEventListener("click", async () => { await update(); window.print(); });
      $("downloadCard").addEventListener("click", async () => {
        await update();
        const svgBlob = new Blob([currentSvg], {type:"image/svg+xml;charset=utf-8"});
        const objectUrl = URL.createObjectURL(svgBlob);
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = 2400; canvas.height = 1695;
          const ctx = canvas.getContext("2d");
          ctx.fillStyle = "#fffefa"; ctx.fillRect(0,0,canvas.width,canvas.height);
          ctx.drawImage(img,0,0,canvas.width,canvas.height);
          URL.revokeObjectURL(objectUrl);
          const a = document.createElement("a");
          a.download = "smc-personal-learning-record.png";
          a.href = canvas.toDataURL("image/png");
          a.click();
        };
        img.onerror = () => { URL.revokeObjectURL(objectUrl); alert("PNG export failed. Please use Print / Save as PDF."); };
        img.src = objectUrl;
      });
      $("shareCredential").addEventListener("click", async () => {
        const q = new URLSearchParams();
        fields.forEach(id => { if ($(id).value) q.set(id,$(id).value); });
        const url = location.origin + location.pathname + "?" + q.toString();
        try { await navigator.clipboard.writeText(url); $("shareCredential").textContent = "Copied"; }
        catch(e) { prompt("Copy this share link",url); }
      });
      await update();
    } catch (e) {
      console.error(e);
      $("credentialArtwork").alt = "Certificate artwork could not be loaded. Check that the site assets are deployed.";
    }
  }
  init();
})();