"use client"

import { motion, useReducedMotion } from "motion/react"

export function TaptickitIllustration({ isCardHovered = false }) {
  const prefersReducedMotion = useReducedMotion()

  const pw = 70
  const ph = 130
  const cx = 200
  const cy = 150

  const cos30 = Math.cos(Math.PI / 6)
  const sin30 = 0.5

  const isoX = (ix, iy) => cx + (ix - pw / 2) * cos30 - (iy - ph / 2) * cos30
  const isoY = (ix, iy) => cy + (ix - pw / 2) * sin30 + (iy - ph / 2) * sin30

  const isoRect = (x, y, w, h) => {
    const tl = [isoX(x, y), isoY(x, y)]
    const tr = [isoX(x + w, y), isoY(x + w, y)]
    const br = [isoX(x + w, y + h), isoY(x + w, y + h)]
    const bl = [isoX(x, y + h), isoY(x, y + h)]
    return `M ${tl[0]} ${tl[1]} L ${tr[0]} ${tr[1]} L ${br[0]} ${br[1]} L ${bl[0]} ${bl[1]} Z`
  }

  const isoRoundRect = (x, y, w, h, r) => {
    const cr = Math.min(r, w / 2, h / 2)
    const tl = [isoX(x, y), isoY(x, y)]
    const tr = [isoX(x + w, y), isoY(x + w, y)]
    const br = [isoX(x + w, y + h), isoY(x + w, y + h)]
    const bl = [isoX(x, y + h), isoY(x, y + h)]
    const tlTop = [isoX(x + cr, y), isoY(x + cr, y)]
    const tlLeft = [isoX(x, y + cr), isoY(x, y + cr)]
    const trTop = [isoX(x + w - cr, y), isoY(x + w - cr, y)]
    const trRight = [isoX(x + w, y + cr), isoY(x + w, y + cr)]
    const brRight = [isoX(x + w, y + h - cr), isoY(x + w, y + h - cr)]
    const brBot = [isoX(x + w - cr, y + h), isoY(x + w - cr, y + h)]
    const blBot = [isoX(x + cr, y + h), isoY(x + cr, y + h)]
    const blLeft = [isoX(x, y + h - cr), isoY(x, y + h - cr)]
    return [
      `M ${tlTop[0]} ${tlTop[1]}`,
      `L ${trTop[0]} ${trTop[1]}`,
      `Q ${tr[0]} ${tr[1]} ${trRight[0]} ${trRight[1]}`,
      `L ${brRight[0]} ${brRight[1]}`,
      `Q ${br[0]} ${br[1]} ${brBot[0]} ${brBot[1]}`,
      `L ${blBot[0]} ${blBot[1]}`,
      `Q ${bl[0]} ${bl[1]} ${blLeft[0]} ${blLeft[1]}`,
      `L ${tlLeft[0]} ${tlLeft[1]}`,
      `Q ${tl[0]} ${tl[1]} ${tlTop[0]} ${tlTop[1]}`,
      "Z",
    ].join(" ")
  }

  // ── Table slab ──
  const tw = 130
  const th = 200
  const td = 7
  const tox = (pw - tw) / 2
  const toy = (ph - th) / 2

  const tableTop = isoRect(tox, toy, tw, th)

  const tbl = [isoX(tox, toy + th), isoY(tox, toy + th)]
  const tbr = [isoX(tox + tw, toy + th), isoY(tox + tw, toy + th)]
  const tblD = [tbl[0], tbl[1] + td]
  const tbrD = [tbr[0], tbr[1] + td]
  const tableFront = `M ${tbl[0]} ${tbl[1]} L ${tbr[0]} ${tbr[1]} L ${tbrD[0]} ${tbrD[1]} L ${tblD[0]} ${tblD[1]} Z`

  const ttr = [isoX(tox + tw, toy), isoY(tox + tw, toy)]
  const ttrD = [ttr[0], ttr[1] + td]
  const tableRight = `M ${ttr[0]} ${ttr[1]} L ${tbr[0]} ${tbr[1]} L ${tbrD[0]} ${tbrD[1]} L ${ttrD[0]} ${ttrD[1]} Z`

  // ── Phone ──
  const bezel = 2.5
  const bodyPath = isoRoundRect(0, 0, pw, ph, 11)
  const screenPath = isoRoundRect(bezel, bezel, pw - bezel * 2, ph - bezel * 2, 9)

  // Dynamic Island
  const diW = 24
  const diH = 7
  const diX = (pw - diW) / 2
  const diY = bezel + 4
  const diPath = isoRoundRect(diX, diY, diW, diH, 3.5)

  // Screen content edges
  const contentL = bezel + 4
  const contentR = pw - bezel - 4

  // ── Internal components layout (screen content) ──
  const margin = 5
  const screenL = bezel + margin
  const screenR = pw - bezel - margin
  const screenT = bezel + 14 // below dynamic island
  const screenB = ph - bezel - 8 // above home bar
  const screenW = screenR - screenL
  const screenH = screenB - screenT

  // Camera module — top left
  const camX = screenL
  const camY = screenT
  const camW = 16
  const camH = 16
  const camPath = isoRoundRect(camX, camY, camW, camH, 2)

  // Logic board / SoC — top right area
  const chipX = screenL + camW + 3
  const chipY = screenT
  const chipW = screenW - camW - 3
  const chipH = 20
  const chipPath = isoRoundRect(chipX, chipY, chipW, chipH, 1.5)
  // SoC die
  const socX = chipX + (chipW - 10) / 2
  const socY = chipY + (chipH - 10) / 2
  const socPath = isoRoundRect(socX, socY, 10, 10, 1)
  // Chip connector pins (small rects along edges)
  const chipPins = []
  for (let i = 0; i < 5; i++) {
    chipPins.push(isoRect(chipX + 2 + i * (chipW - 4) / 5, chipY + chipH - 2, 2.5, 1.5))
  }

  // Battery — large L-shape, fills most of the mid-bottom
  const batY = screenT + 22
  const batW = screenW
  const batH = screenH - 22 - 18 // leave room for taptic engine area
  const batPath = isoRoundRect(screenL, batY, batW, batH, 2.5)
  // Battery cells (two halves with a thin gap)
  const batCell1 = isoRoundRect(screenL + 1.5, batY + 1.5, batW / 2 - 2, batH - 3, 1.5)
  const batCell2 = isoRoundRect(screenL + batW / 2 + 0.5, batY + 1.5, batW / 2 - 2, batH - 3, 1.5)
  // Battery connector tab
  const batTabW = 6
  const batTabH = 3
  const batTabX = screenL + batW / 2 - batTabW / 2
  const batTabY = batY - batTabH + 0.5
  const batTabPath = isoRoundRect(batTabX, batTabY, batTabW, batTabH, 0.8)

  // Taptic engine — bottom area, rectangular module
  const tapticY = batY + batH + 3
  const tapticW = 26
  const tapticH = 10
  const tapticX = screenL + (screenW - tapticW) / 2
  const tapticPath = isoRoundRect(tapticX, tapticY, tapticW, tapticH, 2)
  const tapticInner = isoRoundRect(tapticX + 2, tapticY + 2, tapticW - 4, tapticH - 4, 1)
  // Taptic engine mass (the weight that oscillates)
  const tapticMassW = 8
  const tapticMassH = 4
  const tapticMassX = tapticX + (tapticW - tapticMassW) / 2
  const tapticMassY = tapticY + (tapticH - tapticMassH) / 2
  const tapticMassPath = isoRoundRect(tapticMassX, tapticMassY, tapticMassW, tapticMassH, 0.8)
  // Springs on either side of the mass
  const springL = { x1: isoX(tapticX + 3, tapticY + tapticH / 2), y1: isoY(tapticX + 3, tapticY + tapticH / 2), x2: isoX(tapticMassX, tapticY + tapticH / 2), y2: isoY(tapticMassX, tapticY + tapticH / 2) }
  const springR = { x1: isoX(tapticMassX + tapticMassW, tapticY + tapticH / 2), y1: isoY(tapticMassX + tapticMassW, tapticY + tapticH / 2), x2: isoX(tapticX + tapticW - 3, tapticY + tapticH / 2), y2: isoY(tapticX + tapticW - 3, tapticY + tapticH / 2) }

  // Speaker module — bottom right, small
  const spkW = 10
  const spkH = 8
  const spkX = screenR - spkW
  const spkY = tapticY + 1
  const spkPath = isoRoundRect(spkX, spkY, spkW, spkH, 1.5)
  // Speaker grills
  const spkGrills = []
  for (let i = 0; i < 3; i++) {
    spkGrills.push(isoRect(spkX + 2, spkY + 2 + i * 2.2, spkW - 4, 1))
  }

  // Ribbon cables connecting components
  const ribbon1 = {
    x1: isoX(camX + camW, camY + camH / 2), y1: isoY(camX + camW, camY + camH / 2),
    x2: isoX(chipX, chipY + chipH / 2), y2: isoY(chipX, chipY + chipH / 2),
  }
  const ribbon2 = {
    x1: isoX(screenL + screenW / 2, batY), y1: isoY(screenL + screenW / 2, batY),
    x2: isoX(screenL + screenW / 2, screenT + chipH), y2: isoY(screenL + screenW / 2, screenT + chipH),
  }
  const ribbon3 = {
    x1: isoX(tapticX + tapticW / 2, tapticY), y1: isoY(tapticX + tapticW / 2, tapticY),
    x2: isoX(screenL + screenW / 2, batY + batH), y2: isoY(screenL + screenW / 2, batY + batH),
  }

  // Taptic engine center for shake origin
  const tapticCenterX = isoX(tapticX + tapticW / 2, tapticY + tapticH / 2)
  const tapticCenterY = isoY(tapticX + tapticW / 2, tapticY + tapticH / 2)

  const homeBar = isoRoundRect((pw - 20) / 2, ph - bezel - 6, 20, 2, 1)

  // ── Phone thickness (3D depth) ──
  const pd = 4

  const pBotR = 11
  const pbl = [isoX(pBotR, ph), isoY(pBotR, ph)]
  const pbr = [isoX(pw - pBotR, ph), isoY(pw - pBotR, ph)]
  const pblC = [isoX(0, ph), isoY(0, ph)]
  const pblE = [isoX(0, ph - pBotR), isoY(0, ph - pBotR)]
  const pbrC = [isoX(pw, ph), isoY(pw, ph)]
  const pbrE = [isoX(pw, ph - pBotR), isoY(pw, ph - pBotR)]
  const phoneFront = [
    `M ${pblE[0]} ${pblE[1]}`,
    `Q ${pblC[0]} ${pblC[1]} ${pbl[0]} ${pbl[1]}`,
    `L ${pbr[0]} ${pbr[1]}`,
    `Q ${pbrC[0]} ${pbrC[1]} ${pbrE[0]} ${pbrE[1]}`,
    `L ${pbrE[0]} ${pbrE[1] + pd}`,
    `Q ${pbrC[0]} ${pbrC[1] + pd} ${pbr[0]} ${pbr[1] + pd}`,
    `L ${pbl[0]} ${pbl[1] + pd}`,
    `Q ${pblC[0]} ${pblC[1] + pd} ${pblE[0]} ${pblE[1] + pd}`,
    "Z",
  ].join(" ")

  const ptr = [isoX(pw, pBotR), isoY(pw, pBotR)]
  const ptrC = [isoX(pw, 0), isoY(pw, 0)]
  const ptrE = [isoX(pw - pBotR, 0), isoY(pw - pBotR, 0)]
  const phoneRight = [
    `M ${ptrE[0]} ${ptrE[1]}`,
    `Q ${ptrC[0]} ${ptrC[1]} ${ptr[0]} ${ptr[1]}`,
    `L ${pbrE[0]} ${pbrE[1]}`,
    `L ${pbrE[0]} ${pbrE[1] + pd}`,
    `L ${ptr[0]} ${ptr[1] + pd}`,
    `Q ${ptrC[0]} ${ptrC[1] + pd} ${ptrE[0]} ${ptrE[1] + pd}`,
    "Z",
  ].join(" ")

  const volBtn1Y = ph * 0.3
  const volBtn2Y = ph * 0.42
  const powerBtnY = ph * 0.35

  const phoneCx = isoX(pw / 2, ph / 2)
  const phoneCy = isoY(pw / 2, ph / 2)

  return (
    <div className="relative flex h-[200px] w-full min-w-0 max-w-full items-center justify-center overflow-hidden bg-zinc-100 dark:bg-black">
      <svg
        viewBox="60 50 280 220"
        className="h-full w-full"
        role="img"
        aria-label="iPhone internals illustration showing taptic engine"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="taptickit-table-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="[stop-color:#e8e5e0] dark:[stop-color:#1e1d1b]" />
            <stop offset="100%" className="[stop-color:#dbd7d0] dark:[stop-color:#151412]" />
          </linearGradient>
          <linearGradient id="taptickit-table-front" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className="[stop-color:#c5c1ba] dark:[stop-color:#141310]" />
            <stop offset="100%" className="[stop-color:#b5b0a8] dark:[stop-color:#0e0d0b]" />
          </linearGradient>
          <linearGradient id="taptickit-table-right" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className="[stop-color:#cec9c2] dark:[stop-color:#18170f]" />
            <stop offset="100%" className="[stop-color:#b8b3ab] dark:[stop-color:#0f0e0c]" />
          </linearGradient>
          <linearGradient id="taptickit-body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="[stop-color:#c8c8cd] dark:[stop-color:#404045]" />
            <stop offset="100%" className="[stop-color:#9d9da3] dark:[stop-color:#28282c]" />
          </linearGradient>
          <linearGradient id="taptickit-phone-front" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className="[stop-color:#a8a8ae] dark:[stop-color:#333338]" />
            <stop offset="100%" className="[stop-color:#8e8e95] dark:[stop-color:#222226]" />
          </linearGradient>
          <linearGradient id="taptickit-phone-right" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className="[stop-color:#b5b5bb] dark:[stop-color:#38383d]" />
            <stop offset="100%" className="[stop-color:#9a9aa1] dark:[stop-color:#28282c]" />
          </linearGradient>
          <linearGradient id="taptickit-screen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="[stop-color:#f0f0f2] dark:[stop-color:#111113]" />
            <stop offset="100%" className="[stop-color:#e8e8ea] dark:[stop-color:#0a0a0c]" />
          </linearGradient>
          <linearGradient id="taptickit-battery" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="[stop-color:#f0f0f2] dark:[stop-color:#111113]" />
            <stop offset="100%" className="[stop-color:#f0f0f2] dark:[stop-color:#111113]" />
          </linearGradient>
          <linearGradient id="taptickit-battery-cell" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="[stop-color:#f0f0f2] dark:[stop-color:#111113]" />
            <stop offset="100%" className="[stop-color:#f0f0f2] dark:[stop-color:#111113]" />
          </linearGradient>
          <linearGradient id="taptickit-chip" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="[stop-color:#4a4a52] dark:[stop-color:#2a2a30]" />
            <stop offset="100%" className="[stop-color:#38383e] dark:[stop-color:#1e1e24]" />
          </linearGradient>
          <linearGradient id="taptickit-camera" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="[stop-color:#3a3a42] dark:[stop-color:#252530]" />
            <stop offset="100%" className="[stop-color:#2e2e36] dark:[stop-color:#1a1a22]" />
          </linearGradient>
          <linearGradient id="taptickit-taptic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="[stop-color:#8e8e96] dark:[stop-color:#48484e]" />
            <stop offset="100%" className="[stop-color:#76767e] dark:[stop-color:#38383e]" />
          </linearGradient>
          <linearGradient id="taptickit-taptic-mass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="[stop-color:#b0b0b8] dark:[stop-color:#5a5a62]" />
            <stop offset="100%" className="[stop-color:#98989f] dark:[stop-color:#484850]" />
          </linearGradient>
        </defs>

        {/* ── Table slab ── */}
        <path d={tableTop} fill="url(#taptickit-table-top)" className="stroke-zinc-400/20 dark:stroke-zinc-600/15" strokeWidth={0.5} strokeLinejoin="round" />
        <path d={tableFront} fill="url(#taptickit-table-front)" className="stroke-zinc-400/20 dark:stroke-zinc-600/15" strokeWidth={0.5} strokeLinejoin="round" />
        <path d={tableRight} fill="url(#taptickit-table-right)" className="stroke-zinc-400/20 dark:stroke-zinc-600/15" strokeWidth={0.5} strokeLinejoin="round" />

        {/* ── Phone shadow on table ── */}
        <path d={bodyPath} className="fill-black/[0.06] dark:fill-black/[0.35]" style={{ filter: "blur(8px)", transform: "translate(4px, 5px)" }} />

        {/* ── Haptic vibration waves on table (on hover) ── */}
        {[28, 44, 60].map((r, i) => (
          <motion.ellipse
            key={`wave-${i}`}
            cx={phoneCx}
            cy={phoneCy}
            rx={r * cos30}
            ry={r * sin30}
            fill="none"
            className="stroke-zinc-500/30 dark:stroke-zinc-400/20"
            strokeWidth={0.8}
            strokeDasharray="4 3"
            style={{ transformOrigin: `${phoneCx}px ${phoneCy}px`, transform: "rotate(-30deg)" }}
            initial={false}
            animate={{
              opacity: isCardHovered ? [0, 0.5 - i * 0.12, 0] : 0,
              scale: isCardHovered ? [0.5, 1, 1.08] : 0.5,
            }}
            transition={
              prefersReducedMotion
                ? { duration: 0.15 }
                : {
                    duration: 1.3,
                    delay: i * 0.15,
                    repeat: isCardHovered ? Infinity : 0,
                    repeatDelay: 0.5,
                    ease: "easeOut",
                  }
            }
          />
        ))}

        {/* ── Phone — vibration shake group ── */}
        <motion.g
          initial={false}
          animate={
            isCardHovered && !prefersReducedMotion
              ? { x: [0, -2.5, 2.5, -2, 2, -1, 1, -0.5, 0.5, 0], y: [0, 0.5, -0.5, 0.4, -0.4, 0.2, -0.2, 0] }
              : { x: 0, y: 0 }
          }
          transition={
            isCardHovered && !prefersReducedMotion
              ? { duration: 0.35, repeat: Infinity, repeatDelay: 1.0, ease: "easeInOut" }
              : { duration: 0.3 }
          }
        >
          {/* Phone bottom face (front edge — 3D thickness) */}
          <path d={phoneFront} fill="url(#taptickit-phone-front)" className="stroke-zinc-500/20 dark:stroke-zinc-600/15" strokeWidth={0.5} />

          {/* Bottom edge details: speaker grills, USB-C, mic */}
          {(() => {
            const yOff = pd * 0.45
            const center = pw / 2
            const usbL = isoX(center - 4, ph)
            const usbLy = isoY(center - 4, ph) + yOff
            const usbR = isoX(center + 4, ph)
            const usbRy = isoY(center + 4, ph) + yOff
            const lSpeaker = [center - 14, center - 11, center - 8].map(sx => ({
              cx: isoX(sx, ph),
              cy: isoY(sx, ph) + yOff,
            }))
            const rSpeaker = [center + 8, center + 11, center + 14].map(sx => ({
              cx: isoX(sx, ph),
              cy: isoY(sx, ph) + yOff,
            }))
            const mic = {
              cx: isoX(center - 6, ph),
              cy: isoY(center - 6, ph) + yOff,
            }
            return (
              <>
                <line x1={usbL} y1={usbLy} x2={usbR} y2={usbRy} className="stroke-zinc-600/60 dark:stroke-zinc-800/70" strokeWidth={1.8} strokeLinecap="round" />
                {lSpeaker.map((s, i) => (
                  <circle key={`ls-${i}`} cx={s.cx} cy={s.cy} r="0.6" className="fill-zinc-600/50 dark:fill-zinc-800/60" />
                ))}
                {rSpeaker.map((s, i) => (
                  <circle key={`rs-${i}`} cx={s.cx} cy={s.cy} r="0.6" className="fill-zinc-600/50 dark:fill-zinc-800/60" />
                ))}
                <circle cx={mic.cx} cy={mic.cy} r="0.5" className="fill-zinc-700/50 dark:fill-zinc-900/60" />
              </>
            )
          })()}

          {/* Phone right face */}
          <path d={phoneRight} fill="url(#taptickit-phone-right)" className="stroke-zinc-500/20 dark:stroke-zinc-600/15" strokeWidth={0.5} />

          {/* Volume buttons */}
          {[volBtn1Y, volBtn2Y].map((by, i) => {
            const bx1 = isoX(0, by)
            const by1 = isoY(0, by)
            const bx2 = isoX(0, by + 8)
            const by2 = isoY(0, by + 8)
            return (
              <line key={`vol-${i}`} x1={bx1} y1={by1 + pd * 0.3} x2={bx2} y2={by2 + pd * 0.3} className="stroke-zinc-500/50 dark:stroke-zinc-500/40" strokeWidth={1.2} strokeLinecap="round" />
            )
          })}

          {/* Power button */}
          {(() => {
            const bx1 = isoX(pw, powerBtnY)
            const by1 = isoY(pw, powerBtnY)
            const bx2 = isoX(pw, powerBtnY + 14)
            const by2 = isoY(pw, powerBtnY + 14)
            return (
              <line x1={bx1} y1={by1 + pd * 0.3} x2={bx2} y2={by2 + pd * 0.3} className="stroke-zinc-400/50 dark:stroke-zinc-500/35" strokeWidth={1.2} strokeLinecap="round" />
            )
          })()}

          {/* Phone body */}
          <path d={bodyPath} fill="url(#taptickit-body)" className="stroke-zinc-400/70 dark:stroke-zinc-500/40" strokeWidth={1.2} />

          {/* Screen — x-ray / transparent look into internals */}
          <path d={screenPath} fill="url(#taptickit-screen)" />

          {/* Dynamic Island */}
          <path d={diPath} className="fill-zinc-800 dark:fill-black" />
          <circle cx={isoX(diX + diW * 0.73, diY + diH / 2)} cy={isoY(diX + diW * 0.73, diY + diH / 2)} r="1.5" className="fill-zinc-700/70 dark:fill-zinc-900" />
          <circle cx={isoX(diX + diW * 0.73, diY + diH / 2)} cy={isoY(diX + diW * 0.73, diY + diH / 2)} r="0.6" className="fill-zinc-500/40 dark:fill-zinc-600/50" />

          {/* ── Internal Components ── */}

          {/* Ribbon cables (behind components) */}
          <line x1={ribbon1.x1} y1={ribbon1.y1} x2={ribbon1.x2} y2={ribbon1.y2} className="stroke-zinc-400/40 dark:stroke-zinc-500/30" strokeWidth={1} strokeLinecap="round" />
          <line x1={ribbon2.x1} y1={ribbon2.y1} x2={ribbon2.x2} y2={ribbon2.y2} className="stroke-zinc-400/40 dark:stroke-zinc-500/30" strokeWidth={1} strokeLinecap="round" />
          <line x1={ribbon3.x1} y1={ribbon3.y1} x2={ribbon3.x2} y2={ribbon3.y2} className="stroke-zinc-400/40 dark:stroke-zinc-500/30" strokeWidth={0.8} strokeLinecap="round" />

          {/* Camera module */}
          <path d={camPath} fill="url(#taptickit-camera)" className="stroke-zinc-500/30 dark:stroke-zinc-600/20" strokeWidth={0.5} />

          {/* Logic board / SoC */}
          <path d={chipPath} fill="url(#taptickit-chip)" className="stroke-zinc-500/25 dark:stroke-zinc-600/15" strokeWidth={0.5} />
          {/* SoC die */}
          <path d={socPath} className="fill-zinc-600/80 dark:fill-zinc-500/40" />
          {/* "A17" label effect — tiny detail lines */}
          <path d={isoRect(socX + 2, socY + 3, 6, 0.8)} className="fill-zinc-400/40 dark:fill-zinc-400/20" />
          <path d={isoRect(socX + 2, socY + 5, 4, 0.8)} className="fill-zinc-400/30 dark:fill-zinc-400/15" />
          {/* Chip connector pins */}
          {chipPins.map((pin, i) => (
            <path key={`pin-${i}`} d={pin} className="fill-zinc-500/50 dark:fill-zinc-400/30" />
          ))}

          {/* Battery */}
          <path d={batPath} fill="url(#taptickit-battery)" className="stroke-zinc-500/30 dark:stroke-zinc-500/20" strokeWidth={0.5} />
          <path d={batCell1} fill="url(#taptickit-battery-cell)" className="stroke-zinc-500/20 dark:stroke-zinc-400/10" strokeWidth={0.3} />
          <path d={batCell2} fill="url(#taptickit-battery-cell)" className="stroke-zinc-500/20 dark:stroke-zinc-400/10" strokeWidth={0.3} />
          {/* Battery connector tab */}
          <path d={batTabPath} className="fill-zinc-500/60 dark:fill-zinccl-400/40 stroke-zinc-600/30 dark:stroke-zinc-500/20" strokeWidth={0.3} />
          {/* Battery label lines */}
          <path d={isoRect(screenL + 4, batY + batH / 2 - 2, 8, 0.6)} className="fill-emerald-800/30 dark:fill-zinc-300/15" />
          <path d={isoRect(screenL + 4, batY + batH / 2, 6, 0.6)} className="fill-emerald-800/20 dark:fill-zinc-300/10" />

          {/* Speaker module */}
          <path d={spkPath} className="fill-zinc-500/60 dark:fill-zinc-600/40 stroke-zinc-500/25 dark:stroke-zinc-600/15" strokeWidth={0.4} />
          {spkGrills.map((grill, i) => (
            <path key={`grill-${i}`} d={grill} className="fill-zinc-700/40 dark:fill-zinc-800/35" />
          ))}

          {/* ── Taptic Engine (shakes on hover) ── */}
          <motion.g
            initial={false}
            animate={
              isCardHovered && !prefersReducedMotion
                ? { x: [0, -2, 2, -1.5, 1.5, -1, 1, -0.5, 0.5, 0] }
                : { x: 0 }
            }
            transition={
              isCardHovered && !prefersReducedMotion
                ? { duration: 0.25, repeat: Infinity, repeatDelay: 0.9, ease: "easeInOut" }
                : { duration: 0.2 }
            }
          >
            {/* Taptic engine housing */}
            <path d={tapticPath} fill="url(#taptickit-taptic)" className="stroke-zinc-500/35 dark:stroke-zinc-500/20" strokeWidth={0.5} />
            {/* Inner cavity */}
            <path d={tapticInner} className="fill-zinc-600/30 dark:fill-zinc-700/25" />
            {/* Springs */}
            <line x1={springL.x1} y1={springL.y1} x2={springL.x2} y2={springL.y2} className="stroke-zinc-400/60 dark:stroke-zinc-500/40" strokeWidth={0.6} strokeDasharray="1 0.8" strokeLinecap="round" />
            <line x1={springR.x1} y1={springR.y1} x2={springR.x2} y2={springR.y2} className="stroke-zinc-400/60 dark:stroke-zinc-500/40" strokeWidth={0.6} strokeDasharray="1 0.8" strokeLinecap="round" />
            {/* Oscillating mass */}
            <motion.g
              initial={false}
              animate={
                isCardHovered && !prefersReducedMotion
                  ? { x: [0, -1.5, 1.5, -1, 1, -0.5, 0.5, 0] }
                  : { x: 0 }
              }
              transition={
                isCardHovered && !prefersReducedMotion
                  ? { duration: 0.2, repeat: Infinity, repeatDelay: 0.95, ease: "easeInOut" }
                  : { duration: 0.15 }
              }
            >
              <path d={tapticMassPath} fill="url(#taptickit-taptic-mass)" className="stroke-zinc-400/40 dark:stroke-zinc-500/25" strokeWidth={0.4} />
            </motion.g>
          </motion.g>

          {/* Subtle glow pulse from taptic engine on hover */}
          <motion.circle
            cx={tapticCenterX}
            cy={tapticCenterY}
            r={6}
            fill="none"
            className="stroke-zinc-400/30 dark:stroke-zinc-400/20"
            strokeWidth={0.5}
            initial={{ opacity: 0 }}
            animate={{
              opacity: isCardHovered ? [0, 0.6, 0] : 0,
              scale: isCardHovered ? [0.8, 1.3, 0.8] : 0.8,
            }}
            transition={
              prefersReducedMotion
                ? { duration: 0.15 }
                : {
                    duration: 1.0,
                    repeat: isCardHovered ? Infinity : 0,
                    repeatDelay: 0.3,
                    ease: "easeInOut",
                  }
            }
            style={{ transformOrigin: `${tapticCenterX}px ${tapticCenterY}px` }}
          />

          {/* Home indicator */}
          <path d={homeBar} className="fill-zinc-300/80 dark:fill-zinc-600/60" />
        </motion.g>
      </svg>
    </div>
  )
}
