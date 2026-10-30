function Box({
  x,
  y,
  w,
  h,
  label,
  sub,
  color = '#00ffa3',
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  color?: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill="#0b0f1a"
        stroke={color}
        strokeWidth={1.5}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 4 : y + h / 2 + 5}
        textAnchor="middle"
        fill="#e2e8f0"
        fontSize="13"
        fontFamily="var(--font-mono)"
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 14}
          textAnchor="middle"
          fill="#8b98b8"
          fontSize="10"
          fontFamily="var(--font-mono)"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, color = '#2dd4ff' }: { x1: number; y1: number; x2: number; y2: number; color?: string }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth={1.5}
      markerEnd="url(#arrowhead)"
    />
  );
}

function ArrowDefs() {
  return (
    <defs>
      <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#2dd4ff" />
      </marker>
    </defs>
  );
}

export function SukiLinkDiagram() {
  return (
    <svg viewBox="0 0 640 420" className="h-full w-full">
      <ArrowDefs />
      <Box x={40} y={30} w={160} h={60} label="Mobile App" sub="MVVM · Offline UI" />
      <Box x={40} y={150} w={160} h={60} label="Local Store" sub="On-device cache / queue" />
      <Arrow x1={120} y1={90} x2={120} y2={150} />

      <Box x={240} y={90} w={160} h={60} label="Sync Service" sub="Conflict resolution" />
      <Arrow x1={200} y1={180} x2={240} y2={125} />
      <Arrow x1={240} y1={125} x2={200} y2={60} color="#00ffa3" />

      <Box x={440} y={30} w={160} h={60} label="Cloud API" sub="Bookings · Customers" />
      <Arrow x1={400} y1={110} x2={440} y2={60} />
      <Arrow x1={440} y1={60} x2={400} y2={120} color="#00ffa3" />

      <Box x={440} y={150} w={160} h={60} label="Admin Dashboard" sub="Salon owner view" />
      <Arrow x1={520} y1={90} x2={520} y2={150} />

      <Box x={240} y={240} w={160} h={60} label="Retention Engine" sub="Rebooking · loyalty cues" />
      <Arrow x1={320} y1={150} x2={320} y2={240} color="#00ffa3" />

      <text x={320} y={340} textAnchor="middle" fill="#8b98b8" fontSize="12" fontFamily="var(--font-mono)">
        Writes land in Local Store first → app stays usable offline → Sync
      </text>
      <text x={320} y={360} textAnchor="middle" fill="#8b98b8" fontSize="12" fontFamily="var(--font-mono)">
        Service reconciles with Cloud API once connectivity returns.
      </text>
    </svg>
  );
}

export function EAlertoDiagram() {
  return (
    <svg viewBox="0 0 640 460" className="h-full w-full">
      <ArrowDefs />
      <Box x={40} y={30} w={160} h={60} label="Citizen App" sub="Crowdsourced reports" />
      <Box x={40} y={150} w={160} h={60} label="GIS / Geomapping" sub="Location + verification" />
      <Arrow x1={120} y1={90} x2={120} y2={150} />

      <Box x={240} y={90} w={170} h={60} label="Alert Dispatcher" sub="Centralized broadcast" />
      <Arrow x1={200} y1={180} x2={240} y2={125} />

      <Box x={450} y={20} w={150} h={50} label="SMS Gateway" />
      <Box x={450} y={90} w={150} h={50} label="PA System" />
      <Box x={450} y={160} w={150} h={50} label="Responder Dashboard" />
      <Arrow x1={410} y1={105} x2={450} y2={45} />
      <Arrow x1={410} y1={115} x2={450} y2={115} />
      <Arrow x1={410} y1={135} x2={450} y2={180} />

      <Box x={240} y={190} w={170} h={60} label="Digital Handshake" sub="Delivery acknowledgment" />
      <Arrow x1={325} y1={150} x2={325} y2={190} color="#00ffa3" />
      <Arrow x1={450} y1={205} x2={410} y2={220} color="#00ffa3" />

      <Box x={240} y={300} w={170} h={60} label="Disaster-level Engine" sub="Drives UI reconfiguration" />
      <Arrow x1={325} y1={250} x2={325} y2={300} />

      <text x={320} y={400} textAnchor="middle" fill="#8b98b8" fontSize="12" fontFamily="var(--font-mono)">
        As the declared disaster level rises, the Disaster-level Engine
      </text>
      <text x={320} y={420} textAnchor="middle" fill="#8b98b8" fontSize="12" fontFamily="var(--font-mono)">
        automatically reshapes the UI across every connected surface.
      </text>
    </svg>
  );
}
