import { ShieldCheck } from "lucide-react";

type Method = {
  name: string;
  bg: string;
  fg: string;
  label: React.ReactNode;
  ring?: string;
};

const METHODS: Method[] = [
  {
    name: "QRIS",
    bg: "#EB2027",
    fg: "#ffffff",
    label: <span className="font-black tracking-tight">QRIS</span>,
  },
  {
    name: "GoPay",
    bg: "#00AED6",
    fg: "#ffffff",
    label: (
      <span className="text-[13px] font-extrabold lowercase tracking-tight">
        gopay
      </span>
    ),
  },
  {
    name: "OVO",
    bg: "#4C3494",
    fg: "#ffffff",
    label: <span className="text-[13px] font-black tracking-wider">OVO</span>,
  },
  {
    name: "DANA",
    bg: "#118EEA",
    fg: "#ffffff",
    label: <span className="text-[13px] font-black tracking-tight">DANA</span>,
  },
  {
    name: "ShopeePay",
    bg: "#EE4D2D",
    fg: "#ffffff",
    label: (
      <span className="text-[11px] font-extrabold tracking-tight">
        Shopee<span className="opacity-90">Pay</span>
      </span>
    ),
  },
  {
    name: "BCA VA",
    bg: "#0060A9",
    fg: "#ffffff",
    label: <span className="text-[12px] font-black tracking-wider">BCA</span>,
  },
  {
    name: "Mandiri VA",
    bg: "#003D79",
    fg: "#FFD200",
    label: (
      <span className="text-[10px] font-black uppercase tracking-widest">
        mandiri
      </span>
    ),
  },
  {
    name: "BNI VA",
    bg: "#E85A0C",
    fg: "#ffffff",
    label: <span className="text-[12px] font-black tracking-wider">BNI</span>,
  },
  {
    name: "BRI VA",
    bg: "#00529C",
    fg: "#ffffff",
    label: <span className="text-[12px] font-black tracking-wider">BRI</span>,
  },
  {
    name: "Permata VA",
    bg: "#00713C",
    fg: "#ffffff",
    label: (
      <span className="text-[10px] font-black uppercase tracking-widest">
        permata
      </span>
    ),
  },
  {
    name: "Visa",
    bg: "#ffffff",
    fg: "#1A1F71",
    ring: "#e5e7eb",
    label: (
      <span className="text-[13px] font-black italic tracking-tight">VISA</span>
    ),
  },
  {
    name: "Mastercard",
    bg: "#ffffff",
    fg: "#111827",
    ring: "#e5e7eb",
    label: (
      <span className="relative flex items-center" aria-hidden="true">
        <span className="h-4 w-4 rounded-full bg-[#EB001B]" />
        <span className="-ml-1.5 h-4 w-4 rounded-full bg-[#F79E1B] mix-blend-multiply" />
      </span>
    ),
  },
];

export function PaymentMethods() {
  return (
    <section
      aria-labelledby="payment-methods-heading"
      className="mt-10 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elev)]/60 p-5 sm:p-6"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--text-faint)]">
            Payment Methods
          </div>
          <h3
            id="payment-methods-heading"
            className="mt-1 text-base font-bold text-[var(--text)]"
          >
            Bayar dengan cara favoritmu — semua dalam Rupiah
          </h3>
        </div>
        <div className="inline-flex items-center gap-1.5 self-start rounded-full border border-[var(--border-subtle)] bg-white px-2.5 py-1 text-[11px] font-semibold text-[var(--text-muted)] sm:self-auto">
          <ShieldCheck className="h-3.5 w-3.5 text-[var(--accent-strong)]" />
          Powered by Midtrans &amp; Xendit
        </div>
      </div>

      <ul
        role="list"
        aria-label="Accepted payment methods"
        className="mt-5 grid grid-cols-3 gap-2.5 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-12"
      >
        {METHODS.map((m) => (
          <li key={m.name}>
            <div
              title={m.name}
              className="grid h-11 w-full place-items-center rounded-lg bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-transform hover:-translate-y-0.5"
              style={{
                backgroundColor: m.bg,
                color: m.fg,
                boxShadow: m.ring
                  ? `inset 0 0 0 1px ${m.ring}, 0 1px 2px rgba(15,23,42,0.06)`
                  : undefined,
              }}
            >
              <span className="sr-only">{m.name}</span>
              {m.label}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
