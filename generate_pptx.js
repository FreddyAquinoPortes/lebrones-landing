const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// === ICON RENDERING ===
const { FaShieldAlt, FaBug, FaBroom, FaSnowflake, FaBolt, FaLeaf, FaUsers, FaPhone, FaEnvelope, FaBullseye, FaEye, FaStar, FaHandshake, FaCheckCircle, FaClock, FaFileContract, FaChartLine } = require("react-icons/fa");

function renderIconSvg(IconComponent, color = "#000000", size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}

async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

// === IMAGE LOADING ===
const IMG_DIR = path.join(__dirname, "09 - DIRECCION CREATIVA Y GRAFICA", "Assets", "generated");

function imgToBase64(filename) {
  const filePath = path.join(IMG_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.warn("Image not found:", filePath);
    return null;
  }
  const buf = fs.readFileSync(filePath);
  return "image/jpeg;base64," + buf.toString("base64");
}

// === COLOR PALETTE ===
const NAVY = "0F1B2D";
const NAVY_LIGHT = "1A2A42";
const TEAL = "0D7377";
const TEAL_LIGHT = "0F8C91";
const GOLD = "C8953C";
const GOLD_LIGHT = "D4A855";
const SILVER = "8B95A5";
const WHITE = "FFFFFF";
const OFF_WHITE = "F5F6F8";
const DARK_TEXT = "1A1A2E";
const LIGHT_TEXT = "D6DDE8";  // FIXED: brighter for better contrast on dark bg
const SUB_TEXT = "BCC5D4";    // For subtitles on dark bg — high contrast

// === SHADOW FACTORY (avoid reuse bug) ===
const mkShadow = () => ({ type: "outer", color: "000000", blur: 8, offset: 3, angle: 135, opacity: 0.18 });
const mkSoftShadow = () => ({ type: "outer", color: "000000", blur: 4, offset: 2, angle: 135, opacity: 0.10 });

// === FOOTER HELPER ===
function addFooter(slide, pres) {
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.25, w: 10, h: 0.375, fill: { color: NAVY_LIGHT } });
  slide.addText("LEBRONES SERVICES", { x: 0.5, y: 5.27, w: 3, h: 0.33, fontSize: 8, fontFace: "Arial", color: GOLD, bold: true, charSpacing: 2, margin: 0 });
  slide.addText("www.lebronesservices.com", { x: 6.5, y: 5.27, w: 3, h: 0.33, fontSize: 8, fontFace: "Calibri", color: SUB_TEXT, align: "right", margin: 0 });
}

// === MAIN ===
async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "LEBRONES SERVICES";
  pres.title = "LEBRONES SOLUTION SERVICE, SRL - Presentacion Corporativa";

  // Preload images
  const img = {
    equipo: imgToBase64("01_equipo_gemini.jpg"),
    limpieza: imgToBase64("02_limpieza_gemini.jpg"),
    fumigacion: imgToBase64("03_fumigacion_gemini.jpg"),
    ac: imgToBase64("04_ac_gemini.jpg"),
    electricas: imgToBase64("05_electricas_gemini.jpg"),
    jardineria: imgToBase64("06_jardineria_gemini.jpg"),
    outsourcing: imgToBase64("07_outsourcing_gemini.jpg"),
    uEstandar: imgToBase64("u_estandar_gemini.jpg"),
    uTecnico: imgToBase64("u_tecnico_gemini.jpg"),
    uFumigacion: imgToBase64("u_fumigacion_gemini.jpg"),
    uJardineria: imgToBase64("u_jardineria_gemini.jpg"),
    uSupervisor: imgToBase64("u_supervisor_gemini.jpg"),
  };

  // Preload icons
  const icons = {};
  icons.shield = await iconToBase64Png(FaShieldAlt, "#C8953C", 256);
  icons.bug = await iconToBase64Png(FaBug, "#FFFFFF", 256);
  icons.broom = await iconToBase64Png(FaBroom, "#FFFFFF", 256);
  icons.snow = await iconToBase64Png(FaSnowflake, "#FFFFFF", 256);
  icons.bolt = await iconToBase64Png(FaBolt, "#FFFFFF", 256);
  icons.leaf = await iconToBase64Png(FaLeaf, "#FFFFFF", 256);
  icons.users = await iconToBase64Png(FaUsers, "#FFFFFF", 256);
  icons.phone = await iconToBase64Png(FaPhone, "#C8953C", 256);
  icons.envelope = await iconToBase64Png(FaEnvelope, "#C8953C", 256);
  icons.bullseye = await iconToBase64Png(FaBullseye, "#0D7377", 256);
  icons.eye = await iconToBase64Png(FaEye, "#0D7377", 256);
  icons.star = await iconToBase64Png(FaStar, "#C8953C", 256);
  icons.handshake = await iconToBase64Png(FaHandshake, "#C8953C", 256);
  icons.check = await iconToBase64Png(FaCheckCircle, "#0D7377", 256);
  icons.clock = await iconToBase64Png(FaClock, "#FFFFFF", 256);  // FIXED: white for better visibility inside gold circle
  icons.clockGold = await iconToBase64Png(FaClock, "#C8953C", 256);
  icons.contract = await iconToBase64Png(FaFileContract, "#FFFFFF", 256);  // FIXED: white for icon inside teal circle
  icons.contractGold = await iconToBase64Png(FaFileContract, "#C8953C", 256);
  icons.chart = await iconToBase64Png(FaChartLine, "#0D7377", 256);
  icons.chartWhite = await iconToBase64Png(FaChartLine, "#FFFFFF", 256);
  icons.checkGold = await iconToBase64Png(FaCheckCircle, "#C8953C", 256);
  icons.usersGold = await iconToBase64Png(FaUsers, "#C8953C", 256);
  icons.shieldTeal = await iconToBase64Png(FaShieldAlt, "#0D7377", 256);
  icons.shieldWhite = await iconToBase64Png(FaShieldAlt, "#FFFFFF", 256);
  icons.starWhite = await iconToBase64Png(FaStar, "#FFFFFF", 256);

  // =========================================================================
  // SLIDE 1 — TITLE / COVER
  // =========================================================================
  let s1 = pres.addSlide();
  s1.background = { color: NAVY };

  // Gold accent line at top
  s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: GOLD } });

  // Team image on right half with cover sizing
  if (img.equipo) {
    s1.addImage({ data: img.equipo, x: 5.0, y: 0.06, w: 5.0, h: 5.19, sizing: { type: "cover", w: 5.0, h: 5.19 } });
    // Dark overlay on image for blending
    s1.addShape(pres.shapes.RECTANGLE, { x: 5.0, y: 0.06, w: 5.0, h: 5.19, fill: { color: NAVY, transparency: 40 } });
  }

  // Left content area — tighter spacing
  s1.addText("LEBRONES", {
    x: 0.7, y: 1.2, w: 4.2, h: 0.7,
    fontSize: 44, fontFace: "Arial Black", color: WHITE, bold: true, margin: 0
  });
  s1.addText("SERVICES", {
    x: 0.7, y: 1.85, w: 4.2, h: 0.6,
    fontSize: 40, fontFace: "Arial Black", color: GOLD, bold: true, margin: 0
  });
  // Gold underline — wider
  s1.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 2.45, w: 3.8, h: 0.06, fill: { color: GOLD } });

  s1.addText("SOLUTION SERVICE, SRL", {
    x: 0.7, y: 2.65, w: 4.2, h: 0.35,
    fontSize: 13, fontFace: "Arial", color: SUB_TEXT, charSpacing: 4, margin: 0
  });

  s1.addText("La tranquilidad de su operación,\nen manos expertas.", {
    x: 0.7, y: 3.15, w: 4.2, h: 0.8,
    fontSize: 16, fontFace: "Calibri", color: LIGHT_TEXT, italic: true, margin: 0
  });

  // Credentials bar at bottom
  s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.85, w: 10, h: 0.775, fill: { color: NAVY_LIGHT } });
  const creds = [
    { icon: icons.contractGold, label: "Ley 522-06" },
    { icon: icons.clockGold, label: "Sustitución 24/7" },
    { icon: icons.shield, label: "100% transparencia" },
    { icon: icons.chart, label: "+500 servicios" },
  ];
  creds.forEach((c, i) => {
    const cx = 0.3 + i * 2.45;
    s1.addImage({ data: c.icon, x: cx, y: 4.98, w: 0.35, h: 0.35 });
    s1.addText(c.label, { x: cx + 0.45, y: 4.97, w: 1.85, h: 0.38, fontSize: 12, fontFace: "Calibri", bold: true, color: LIGHT_TEXT, margin: 0, valign: "middle" });
  });

  // =========================================================================
  // SLIDE 2 — QUIENES SOMOS
  // =========================================================================
  let s2 = pres.addSlide();
  s2.background = { color: OFF_WHITE };

  // Teal header bar
  s2.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: TEAL } });
  s2.addText("QUIÉNES SOMOS", {
    x: 0.7, y: 0.25, w: 8, h: 0.6,
    fontSize: 32, fontFace: "Arial Black", color: WHITE, margin: 0
  });

  // Left: description text
  s2.addText([
    { text: "LEBRONES SOLUTION SERVICE, SRL", options: { bold: true, fontSize: 15, color: NAVY, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "Somos una empresa dominicana especializada en servicios corporativos integrales. Nos enfocamos en garantizar la continuidad operativa de su negocio a través de soluciones profesionales de mantenimiento, limpieza, fumigación, jardinería y gestión de personal.", options: { fontSize: 13, color: DARK_TEXT, lineSpacingMultiple: 1.3 } }
  ], { x: 0.7, y: 1.3, w: 5.0, h: 2.8, valign: "top" });

  // Right: team image
  if (img.equipo) {
    s2.addShape(pres.shapes.RECTANGLE, { x: 6.2, y: 1.3, w: 3.3, h: 2.8, fill: { color: WHITE }, shadow: mkShadow() });
    s2.addImage({ data: img.equipo, x: 6.3, y: 1.4, w: 3.1, h: 2.6, sizing: { type: "cover", w: 3.1, h: 2.6 } });
  }

  // Director info card — moved up to reduce gap
  s2.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.3, w: 9.0, h: 0.8, fill: { color: WHITE }, shadow: mkSoftShadow() });
  s2.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.3, w: 0.08, h: 0.8, fill: { color: GOLD } });
  s2.addText([
    { text: "Directora general  ", options: { fontSize: 10, color: SILVER } },
    { text: "Carmen Tanyelina Lebrón", options: { fontSize: 15, bold: true, color: NAVY } }
  ], { x: 0.9, y: 4.35, w: 4.5, h: 0.7, valign: "middle", margin: 0 });

  s2.addText("\"Nuestro compromiso es brindar un servicio que supere las expectativas, con estándares de calidad y cumplimiento legal.\"", {
    x: 5.5, y: 4.35, w: 3.8, h: 0.7, fontSize: 10.5, fontFace: "Calibri", italic: true, color: TEAL, valign: "middle", margin: 0
  });

  addFooter(s2, pres);

  // =========================================================================
  // SLIDE 3 — NUESTROS SERVICIOS (overview grid)
  // =========================================================================
  let s3 = pres.addSlide();
  s3.background = { color: NAVY };

  s3.addText("NUESTROS SERVICIOS", {
    x: 0.7, y: 0.25, w: 8, h: 0.6,
    fontSize: 32, fontFace: "Arial Black", color: WHITE, margin: 0
  });
  // FIXED: wider gold underline
  s3.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 0.88, w: 3.5, h: 0.05, fill: { color: GOLD } });

  s3.addText("Soluciones integrales para la operación de su empresa", {
    x: 0.7, y: 1.0, w: 8, h: 0.35, fontSize: 13, fontFace: "Calibri", color: SUB_TEXT, margin: 0
  });

  const services = [
    { icon: icons.bug, label: "Fumigación", desc: "Control integral de plagas con certificación", img: img.fumigacion },
    { icon: icons.broom, label: "Limpieza empresarial", desc: "Limpieza profesional de instalaciones", img: img.limpieza },
    { icon: icons.snow, label: "Aires acondicionados", desc: "Mantenimiento y reparación HVAC", img: img.ac },
    { icon: icons.bolt, label: "Plantas eléctricas", desc: "Servicio y mantenimiento de generadores", img: img.electricas },
    { icon: icons.leaf, label: "Jardinería corporativa", desc: "Diseño y cuidado de áreas verdes", img: img.jardineria },
    { icon: icons.users, label: "Outsourcing", desc: "Gestión profesional de personal", img: img.outsourcing },
  ];

  // 3x2 grid of service cards — adjusted for better margins
  services.forEach((svc, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const cx = 0.5 + col * 3.1;
    const cy = 1.55 + row * 1.8;

    // Card background
    s3.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: 2.9, h: 1.55, fill: { color: NAVY_LIGHT }, shadow: mkSoftShadow() });

    // Teal accent bar top
    s3.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: 2.9, h: 0.05, fill: { color: TEAL } });

    // Icon in circle
    s3.addShape(pres.shapes.OVAL, { x: cx + 0.15, y: cy + 0.18, w: 0.5, h: 0.5, fill: { color: TEAL } });
    s3.addImage({ data: svc.icon, x: cx + 0.25, y: cy + 0.28, w: 0.3, h: 0.3 });

    // Service name
    s3.addText(svc.label, {
      x: cx + 0.8, y: cy + 0.18, w: 1.95, h: 0.3,
      fontSize: 13, fontFace: "Calibri", bold: true, color: WHITE, margin: 0
    });
    // Description — FIXED: brighter color
    s3.addText(svc.desc, {
      x: cx + 0.8, y: cy + 0.48, w: 1.95, h: 0.35,
      fontSize: 9.5, fontFace: "Calibri", color: LIGHT_TEXT, margin: 0
    });

    // Small image thumbnail
    if (svc.img) {
      s3.addImage({ data: svc.img, x: cx + 0.15, y: cy + 0.88, w: 2.6, h: 0.52, sizing: { type: "cover", w: 2.6, h: 0.52 } });
    }
  });

  addFooter(s3, pres);

  // =========================================================================
  // SLIDE 4 — FUMIGACION (detail)
  // =========================================================================
  let s4 = pres.addSlide();
  s4.background = { color: OFF_WHITE };

  // Full-bleed image on left
  if (img.fumigacion) {
    s4.addImage({ data: img.fumigacion, x: 0, y: 0, w: 4.5, h: 5.625, sizing: { type: "cover", w: 4.5, h: 5.625 } });
    s4.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 0, w: 1.0, h: 5.625, fill: { color: OFF_WHITE, transparency: 20 } });
  }

  // Service label
  s4.addShape(pres.shapes.RECTANGLE, { x: 5.0, y: 0.5, w: 0.08, h: 0.8, fill: { color: TEAL } });
  s4.addText("FUMIGACIÓN", {
    x: 5.3, y: 0.45, w: 4.2, h: 0.45,
    fontSize: 28, fontFace: "Arial Black", color: NAVY, margin: 0
  });
  s4.addText("Control integral de plagas", {
    x: 5.3, y: 0.9, w: 4.2, h: 0.35,
    fontSize: 14, fontFace: "Calibri", color: TEAL, italic: true, margin: 0
  });

  const fumItems = [
    "Fumigación contra insectos rastreros y voladores",
    "Tratamiento contra roedores y termitas",
    "Nebulización y desinfección de espacios",
    "Productos aprobados por Salud Pública",
    "Certificación post-servicio"
  ];
  fumItems.forEach((item, i) => {
    s4.addImage({ data: icons.checkGold, x: 5.3, y: 1.55 + i * 0.5, w: 0.25, h: 0.25 });
    s4.addText(item, {
      x: 5.7, y: 1.53 + i * 0.5, w: 3.8, h: 0.3,
      fontSize: 12, fontFace: "Calibri", color: DARK_TEXT, margin: 0
    });
  });

  // Stats — moved up slightly, better margin
  s4.addShape(pres.shapes.RECTANGLE, { x: 5.0, y: 4.0, w: 4.5, h: 1.0, fill: { color: WHITE }, shadow: mkSoftShadow() });
  s4.addShape(pres.shapes.RECTANGLE, { x: 5.0, y: 4.0, w: 4.5, h: 0.05, fill: { color: TEAL } });
  s4.addText("+500", { x: 5.3, y: 4.1, w: 1.8, h: 0.45, fontSize: 28, fontFace: "Arial Black", color: TEAL, margin: 0 });
  s4.addText("servicios realizados", { x: 5.3, y: 4.5, w: 1.8, h: 0.3, fontSize: 9, fontFace: "Calibri", color: SILVER, margin: 0 });
  s4.addText("24/7", { x: 7.5, y: 4.1, w: 1.8, h: 0.45, fontSize: 28, fontFace: "Arial Black", color: GOLD, margin: 0 });
  s4.addText("disponibilidad", { x: 7.5, y: 4.5, w: 1.8, h: 0.3, fontSize: 9, fontFace: "Calibri", color: SILVER, margin: 0 });

  addFooter(s4, pres);

  // =========================================================================
  // SLIDE 5 — LIMPIEZA EMPRESARIAL (detail)
  // =========================================================================
  let s5 = pres.addSlide();
  s5.background = { color: NAVY };

  // Image on right
  if (img.limpieza) {
    s5.addImage({ data: img.limpieza, x: 5.5, y: 0, w: 4.5, h: 5.625, sizing: { type: "cover", w: 4.5, h: 5.625 } });
    s5.addShape(pres.shapes.RECTANGLE, { x: 5.5, y: 0, w: 1.0, h: 5.625, fill: { color: NAVY, transparency: 30 } });
  }

  // FIXED: taller accent bar to cover both lines
  s5.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 0.45, w: 0.08, h: 0.9, fill: { color: GOLD } });
  s5.addText("LIMPIEZA", { x: 1.0, y: 0.45, w: 4, h: 0.4, fontSize: 28, fontFace: "Arial Black", color: WHITE, margin: 0 });
  s5.addText("EMPRESARIAL", { x: 1.0, y: 0.85, w: 4, h: 0.4, fontSize: 28, fontFace: "Arial Black", color: GOLD, margin: 0 });

  const limpItems = [
    "Limpieza profunda de oficinas y áreas comunes",
    "Cristalización y pulido de pisos",
    "Limpieza de alfombras y tapizado",
    "Desinfección de baños y cocinas",
    "Personal uniformado e identificado"
  ];
  limpItems.forEach((item, i) => {
    s5.addImage({ data: icons.checkGold, x: 1.0, y: 1.6 + i * 0.5, w: 0.25, h: 0.25 });
    s5.addText(item, { x: 1.4, y: 1.58 + i * 0.5, w: 3.8, h: 0.3, fontSize: 12, fontFace: "Calibri", color: LIGHT_TEXT, margin: 0 });
  });

  // Bottom stat bar — adjusted upward
  s5.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.35, w: 5.5, h: 0.9, fill: { color: TEAL } });
  s5.addText("Personal capacitado y con seguro\nde responsabilidad civil", {
    x: 0.7, y: 4.4, w: 4.5, h: 0.8, fontSize: 14, fontFace: "Calibri", color: WHITE, bold: true, margin: 0, valign: "middle"
  });

  addFooter(s5, pres);

  // =========================================================================
  // SLIDE 6 — AIRES + ELECTRICAS (split) — FIXED: added title
  // =========================================================================
  let s6 = pres.addSlide();
  s6.background = { color: OFF_WHITE };

  // FIXED: Add slide title
  s6.addText("MANTENIMIENTO TÉCNICO", { x: 0.5, y: 0.15, w: 9, h: 0.4, fontSize: 20, fontFace: "Arial Black", color: NAVY, margin: 0 });
  s6.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.55, w: 2.5, h: 0.04, fill: { color: GOLD } });

  // Left half — Aires
  s6.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 0.8, w: 4.55, h: 4.45, fill: { color: WHITE }, shadow: mkShadow() });
  s6.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 0.8, w: 4.55, h: 0.06, fill: { color: TEAL } });
  if (img.ac) {
    s6.addImage({ data: img.ac, x: 0.5, y: 1.1, w: 4.15, h: 1.8, sizing: { type: "cover", w: 4.15, h: 1.8 } });
  }
  s6.addText("AIRES ACONDICIONADOS", { x: 0.5, y: 3.05, w: 4.15, h: 0.35, fontSize: 15, fontFace: "Arial Black", color: NAVY, margin: 0 });
  const acItems = ["Mantenimiento preventivo y correctivo", "Instalación de equipos split e industriales", "Limpieza de ductos y filtros", "Recarga de gas refrigerante"];
  acItems.forEach((item, i) => {
    s6.addImage({ data: icons.check, x: 0.6, y: 3.55 + i * 0.38, w: 0.2, h: 0.2 });
    s6.addText(item, { x: 0.9, y: 3.53 + i * 0.38, w: 3.6, h: 0.25, fontSize: 10.5, fontFace: "Calibri", color: DARK_TEXT, margin: 0 });
  });

  // Right half — Electricas
  s6.addShape(pres.shapes.RECTANGLE, { x: 5.15, y: 0.8, w: 4.55, h: 4.45, fill: { color: WHITE }, shadow: mkShadow() });
  s6.addShape(pres.shapes.RECTANGLE, { x: 5.15, y: 0.8, w: 4.55, h: 0.06, fill: { color: GOLD } });
  if (img.electricas) {
    s6.addImage({ data: img.electricas, x: 5.35, y: 1.1, w: 4.15, h: 1.8, sizing: { type: "cover", w: 4.15, h: 1.8 } });
  }
  s6.addText("PLANTAS ELÉCTRICAS", { x: 5.35, y: 3.05, w: 4.15, h: 0.35, fontSize: 15, fontFace: "Arial Black", color: NAVY, margin: 0 });
  const elecItems = ["Mantenimiento de generadores diésel y gas", "Pruebas de carga y transferencia", "Servicio de emergencia 24/7", "Monitoreo y diagnóstico"];
  elecItems.forEach((item, i) => {
    s6.addImage({ data: icons.check, x: 5.45, y: 3.55 + i * 0.38, w: 0.2, h: 0.2 });
    s6.addText(item, { x: 5.75, y: 3.53 + i * 0.38, w: 3.6, h: 0.25, fontSize: 10.5, fontFace: "Calibri", color: DARK_TEXT, margin: 0 });
  });

  addFooter(s6, pres);

  // =========================================================================
  // SLIDE 7 — JARDINERIA + OUTSOURCING (split)
  // =========================================================================
  let s7 = pres.addSlide();
  s7.background = { color: NAVY };

  // FIXED: Added slide title
  s7.addText("SERVICIOS ESPECIALIZADOS", { x: 0.5, y: 0.0, w: 9, h: 0.35, fontSize: 11, fontFace: "Arial", color: SUB_TEXT, charSpacing: 3, margin: 0 });

  // Left — Jardineria
  if (img.jardineria) {
    s7.addImage({ data: img.jardineria, x: 0.3, y: 0.4, w: 4.55, h: 2.6, sizing: { type: "cover", w: 4.55, h: 2.6 } });
  }
  s7.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 3.0, w: 4.55, h: 1.9, fill: { color: NAVY_LIGHT } });
  s7.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 3.0, w: 4.55, h: 0.05, fill: { color: TEAL } });
  // FIXED: matching icon circle treatment
  s7.addShape(pres.shapes.OVAL, { x: 0.5, y: 3.2, w: 0.45, h: 0.45, fill: { color: TEAL } });
  s7.addImage({ data: icons.leaf, x: 0.58, y: 3.28, w: 0.3, h: 0.3 });
  s7.addText("JARDINERÍA CORPORATIVA", { x: 1.1, y: 3.22, w: 3.5, h: 0.35, fontSize: 14, fontFace: "Arial Black", color: WHITE, margin: 0 });
  const jardItems = ["Diseño y mantenimiento de áreas verdes", "Poda ornamental y control fitosanitario", "Instalación de sistemas de riego"];
  jardItems.forEach((item, i) => {
    s7.addImage({ data: icons.checkGold, x: 0.7, y: 3.8 + i * 0.38, w: 0.2, h: 0.2 });
    s7.addText(item, { x: 1.0, y: 3.78 + i * 0.38, w: 3.6, h: 0.28, fontSize: 10.5, fontFace: "Calibri", color: LIGHT_TEXT, margin: 0 });
  });

  // Right — Outsourcing
  if (img.outsourcing) {
    s7.addImage({ data: img.outsourcing, x: 5.15, y: 0.4, w: 4.55, h: 2.6, sizing: { type: "cover", w: 4.55, h: 2.6 } });
  }
  s7.addShape(pres.shapes.RECTANGLE, { x: 5.15, y: 3.0, w: 4.55, h: 1.9, fill: { color: NAVY_LIGHT } });
  s7.addShape(pres.shapes.RECTANGLE, { x: 5.15, y: 3.0, w: 4.55, h: 0.05, fill: { color: GOLD } });
  // FIXED: matching icon circle treatment
  s7.addShape(pres.shapes.OVAL, { x: 5.35, y: 3.2, w: 0.45, h: 0.45, fill: { color: GOLD } });
  s7.addImage({ data: icons.users, x: 5.43, y: 3.28, w: 0.3, h: 0.3 });
  s7.addText("OUTSOURCING DE PERSONAL", { x: 5.95, y: 3.22, w: 3.5, h: 0.35, fontSize: 14, fontFace: "Arial Black", color: WHITE, margin: 0 });
  const outItems = ["Selección y contratación de personal operativo", "Gestión de nómina y beneficios", "Sustitución inmediata garantizada"];
  outItems.forEach((item, i) => {
    s7.addImage({ data: icons.checkGold, x: 5.55, y: 3.8 + i * 0.38, w: 0.2, h: 0.2 });
    s7.addText(item, { x: 5.85, y: 3.78 + i * 0.38, w: 3.6, h: 0.28, fontSize: 10.5, fontFace: "Calibri", color: LIGHT_TEXT, margin: 0 });
  });

  addFooter(s7, pres);

  // =========================================================================
  // SLIDE 8 — UNIFORMES
  // =========================================================================
  let s8 = pres.addSlide();
  s8.background = { color: OFF_WHITE };

  s8.addText("IMAGEN CORPORATIVA", { x: 0.7, y: 0.25, w: 8, h: 0.45, fontSize: 28, fontFace: "Arial Black", color: NAVY, margin: 0 });
  s8.addText("Uniformes diseñados para cada área de servicio", { x: 0.7, y: 0.7, w: 8, h: 0.3, fontSize: 13, fontFace: "Calibri", color: SILVER, margin: 0 });
  // FIXED: wider gold underline
  s8.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.02, w: 3.0, h: 0.05, fill: { color: GOLD } });

  const uniforms = [
    { img: img.uEstandar, label: "Estándar", desc: "Personal de limpieza" },
    { img: img.uTecnico, label: "Técnico", desc: "Mantenimiento AC/Eléctrico" },
    { img: img.uFumigacion, label: "Fumigación", desc: "Control de plagas" },
    { img: img.uJardineria, label: "Jardinería", desc: "Áreas verdes" },
    { img: img.uSupervisor, label: "Supervisor", desc: "Coordinación SST" },
  ];

  uniforms.forEach((u, i) => {
    const cx = 0.35 + i * 1.9;
    // Card — adjusted height for better bottom margin
    s8.addShape(pres.shapes.RECTANGLE, { x: cx, y: 1.25, w: 1.7, h: 3.6, fill: { color: WHITE }, shadow: mkSoftShadow() });
    // Image
    if (u.img) {
      s8.addImage({ data: u.img, x: cx + 0.1, y: 1.35, w: 1.5, h: 2.4, sizing: { type: "cover", w: 1.5, h: 2.4 } });
    }
    // Navy label area
    s8.addShape(pres.shapes.RECTANGLE, { x: cx, y: 3.85, w: 1.7, h: 1.0, fill: { color: NAVY } });
    s8.addText(u.label, { x: cx, y: 3.9, w: 1.7, h: 0.4, fontSize: 12, fontFace: "Calibri", bold: true, color: WHITE, align: "center", margin: 0 });
    s8.addText(u.desc, { x: cx, y: 4.28, w: 1.7, h: 0.4, fontSize: 9.5, fontFace: "Calibri", color: SUB_TEXT, align: "center", margin: 0 });
  });

  addFooter(s8, pres);

  // =========================================================================
  // SLIDE 9 — POR QUE ELEGIRNOS (differentiators)
  // =========================================================================
  let s9 = pres.addSlide();
  s9.background = { color: NAVY };
  s9.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: GOLD } });

  s9.addText("¿POR QUÉ ELEGIR", { x: 0.7, y: 0.3, w: 8, h: 0.5, fontSize: 30, fontFace: "Arial Black", color: WHITE, margin: 0 });
  s9.addText("LEBRONES SERVICES?", { x: 0.7, y: 0.8, w: 8, h: 0.5, fontSize: 30, fontFace: "Arial Black", color: GOLD, margin: 0 });

  const diffs = [
    { icon: icons.contract, title: "Cumplimiento legal", desc: "Operamos bajo la Ley 522-06 de Seguridad Social. Todo nuestro personal cuenta con TSS, seguro de riesgos laborales y beneficios de ley.", bgColor: TEAL },
    { icon: icons.clock, title: "Sustitución inmediata 24/7", desc: "Si un colaborador no puede presentarse, lo reemplazamos en menos de 2 horas. Su operación nunca se detiene.", bgColor: GOLD },
    { icon: icons.shieldWhite, title: "Transparencia 100%", desc: "Acceso a reportes en tiempo real, auditorías internas y comunicación directa con nuestro equipo de supervisión.", bgColor: TEAL },
    { icon: icons.chartWhite, title: "+500 servicios realizados", desc: "Una trayectoria respaldada por resultados. Empresas líderes confían en nosotros para sus operaciones críticas.", bgColor: GOLD },
  ];

  diffs.forEach((d, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cx = 0.5 + col * 4.7;
    const cy = 1.5 + row * 1.75;

    s9.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: 4.4, h: 1.55, fill: { color: NAVY_LIGHT }, shadow: mkSoftShadow() });
    s9.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: 0.07, h: 1.55, fill: { color: d.bgColor } });

    // FIXED: all icons white on colored circle
    s9.addShape(pres.shapes.OVAL, { x: cx + 0.25, y: cy + 0.25, w: 0.55, h: 0.55, fill: { color: d.bgColor } });
    s9.addImage({ data: d.icon, x: cx + 0.37, y: cy + 0.37, w: 0.3, h: 0.3 });

    s9.addText(d.title, { x: cx + 1.0, y: cy + 0.2, w: 3.1, h: 0.35, fontSize: 14, fontFace: "Calibri", bold: true, color: WHITE, margin: 0 });
    // FIXED: brighter description text
    s9.addText(d.desc, { x: cx + 1.0, y: cy + 0.55, w: 3.1, h: 0.8, fontSize: 10.5, fontFace: "Calibri", color: LIGHT_TEXT, margin: 0, lineSpacingMultiple: 1.2 });
  });

  addFooter(s9, pres);

  // =========================================================================
  // SLIDE 10 — MISION / VISION / VALORES
  // =========================================================================
  let s10 = pres.addSlide();
  s10.background = { color: OFF_WHITE };

  s10.addText("MISIÓN, VISIÓN Y VALORES", { x: 0.7, y: 0.25, w: 8, h: 0.45, fontSize: 28, fontFace: "Arial Black", color: NAVY, margin: 0 });
  // FIXED: wider gold underline
  s10.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 0.75, w: 3.5, h: 0.05, fill: { color: GOLD } });

  // Mission card — equal width with Vision
  s10.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.05, w: 4.35, h: 2.0, fill: { color: WHITE }, shadow: mkSoftShadow() });
  s10.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.05, w: 4.35, h: 0.06, fill: { color: TEAL } });
  s10.addImage({ data: icons.bullseye, x: 0.8, y: 1.3, w: 0.4, h: 0.4 });
  s10.addText("Misión", { x: 1.35, y: 1.3, w: 3, h: 0.4, fontSize: 18, fontFace: "Arial Black", color: NAVY, margin: 0 });
  s10.addText("Proveer servicios corporativos integrales que garanticen la continuidad operativa, cumpliendo con los más altos estándares de calidad y las normativas legales vigentes.", {
    x: 0.8, y: 1.85, w: 3.8, h: 1.0, fontSize: 10.5, fontFace: "Calibri", color: DARK_TEXT, margin: 0, lineSpacingMultiple: 1.3
  });

  // Vision card — equal width
  s10.addShape(pres.shapes.RECTANGLE, { x: 5.15, y: 1.05, w: 4.35, h: 2.0, fill: { color: WHITE }, shadow: mkSoftShadow() });
  s10.addShape(pres.shapes.RECTANGLE, { x: 5.15, y: 1.05, w: 4.35, h: 0.06, fill: { color: GOLD } });
  s10.addImage({ data: icons.eye, x: 5.45, y: 1.3, w: 0.4, h: 0.4 });
  s10.addText("Visión", { x: 6.0, y: 1.3, w: 3, h: 0.4, fontSize: 18, fontFace: "Arial Black", color: NAVY, margin: 0 });
  s10.addText("Ser la empresa de referencia en servicios corporativos en la República Dominicana, reconocida por nuestra excelencia operativa y compromiso con el bienestar de nuestros colaboradores.", {
    x: 5.45, y: 1.85, w: 3.8, h: 1.0, fontSize: 10.5, fontFace: "Calibri", color: DARK_TEXT, margin: 0, lineSpacingMultiple: 1.3
  });

  // Values — 4 cards — FIXED: better contrast icon circles
  const valores = [
    { icon: icons.shieldTeal, title: "Tolerancia cero", desc: "al incumplimiento" },
    { icon: icons.check, title: "Calidad", desc: "y mejora continua" },
    { icon: icons.handshake, title: "Transparencia", desc: "y comunicación" },
    { icon: icons.usersGold, title: "Integridad", desc: "del capital humano" },
  ];

  valores.forEach((v, i) => {
    const cx = 0.5 + i * 2.35;
    s10.addShape(pres.shapes.RECTANGLE, { x: cx, y: 3.35, w: 2.1, h: 1.55, fill: { color: NAVY }, shadow: mkSoftShadow() });
    // FIXED: higher contrast circle background
    s10.addShape(pres.shapes.OVAL, { x: cx + 0.75, y: 3.5, w: 0.6, h: 0.6, fill: { color: "2A3E5C" } });
    s10.addImage({ data: v.icon, x: cx + 0.87, y: 3.62, w: 0.35, h: 0.35 });
    s10.addText(v.title, { x: cx, y: 4.2, w: 2.1, h: 0.3, fontSize: 12, fontFace: "Calibri", bold: true, color: WHITE, align: "center", margin: 0 });
    // FIXED: brighter description
    s10.addText(v.desc, { x: cx, y: 4.48, w: 2.1, h: 0.3, fontSize: 10, fontFace: "Calibri", color: SUB_TEXT, align: "center", margin: 0 });
  });

  addFooter(s10, pres);

  // =========================================================================
  // SLIDE 11 — CONTACTO / CIERRE
  // =========================================================================
  let s11 = pres.addSlide();
  s11.background = { color: NAVY };

  s11.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: GOLD } });

  s11.addText("CONTÁCTENOS", { x: 0.7, y: 0.6, w: 8, h: 0.6, fontSize: 36, fontFace: "Arial Black", color: WHITE, margin: 0 });
  // FIXED: brighter subtitle
  s11.addText("Solicite una cotización sin compromiso", { x: 0.7, y: 1.2, w: 8, h: 0.4, fontSize: 15, fontFace: "Calibri", color: SUB_TEXT, italic: true, margin: 0 });

  // Contact card — centered
  s11.addShape(pres.shapes.RECTANGLE, { x: 2.0, y: 1.9, w: 6.0, h: 2.4, fill: { color: NAVY_LIGHT }, shadow: mkShadow() });
  s11.addShape(pres.shapes.RECTANGLE, { x: 2.0, y: 1.9, w: 6.0, h: 0.06, fill: { color: GOLD } });

  // Phone
  s11.addShape(pres.shapes.OVAL, { x: 2.5, y: 2.25, w: 0.65, h: 0.65, fill: { color: TEAL } });
  s11.addImage({ data: icons.phone, x: 2.63, y: 2.38, w: 0.4, h: 0.4 });
  s11.addText("Teléfono", { x: 3.4, y: 2.25, w: 3, h: 0.3, fontSize: 11, fontFace: "Calibri", color: SUB_TEXT, margin: 0 });
  s11.addText("(849) 255-2077", { x: 3.4, y: 2.52, w: 3, h: 0.4, fontSize: 20, fontFace: "Calibri", bold: true, color: WHITE, margin: 0 });

  // Email
  s11.addShape(pres.shapes.OVAL, { x: 2.5, y: 3.2, w: 0.65, h: 0.65, fill: { color: GOLD } });
  s11.addImage({ data: icons.envelope, x: 2.63, y: 3.33, w: 0.4, h: 0.4 });
  s11.addText("Correo electrónico", { x: 3.4, y: 3.2, w: 3, h: 0.3, fontSize: 11, fontFace: "Calibri", color: SUB_TEXT, margin: 0 });
  s11.addText("t.lebron@jomlia.com", { x: 3.4, y: 3.47, w: 4, h: 0.4, fontSize: 20, fontFace: "Calibri", bold: true, color: GOLD, margin: 0 });

  // Tagline footer
  s11.addText("La tranquilidad de su operación, en manos expertas.", {
    x: 0.7, y: 4.5, w: 8.6, h: 0.5, fontSize: 16, fontFace: "Calibri", color: GOLD, italic: true, align: "center", margin: 0
  });

  // Gold bottom line
  s11.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.25, w: 10, h: 0.375, fill: { color: NAVY_LIGHT } });
  s11.addText("LEBRONES SOLUTION SERVICE, SRL", { x: 0.5, y: 5.27, w: 5, h: 0.33, fontSize: 8, fontFace: "Arial", color: GOLD, bold: true, charSpacing: 2, margin: 0 });
  s11.addText("(849) 255-2077  |  t.lebron@jomlia.com", { x: 4.5, y: 5.27, w: 5, h: 0.33, fontSize: 8, fontFace: "Calibri", color: SUB_TEXT, align: "right", margin: 0 });

  // =========================================================================
  // WRITE FILE
  // =========================================================================
  const outPath = path.join(__dirname, "09 - DIRECCION CREATIVA Y GRAFICA", "Presentacion_LEBRONES_SERVICES.pptx");
  await pres.writeFile({ fileName: outPath });
  console.log("Presentation saved to:", outPath);
}

main().catch(err => { console.error(err); process.exit(1); });
