import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertTriangle,
  AtSign,
  Camera,
  Check,
  ChevronDown,
  FileText,
  Globe,
  Hash,
  Home,
  Key,
  Landmark,
  Mail,
  MapPin,
  Phone,
  Save,
  Shield,
  ShieldCheck,
  Upload,
  User as UserIcon,
} from "lucide-react";
import { Sidebar, Topbar } from "./dashboard";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Profile — NodeKPT" },
      {
        name: "description",
        content:
          "Kelola informasi akun NodeKPT: foto profil, data pribadi, keamanan 2FA, dan identitas pajak.",
      },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-6xl space-y-6">
            <PageHeader />
            <ProfilePhotoCard />
            <AccountInfoCard />
            <SecurityCard />
            <TwoFactorCard />
            <TaxIdentityCard />
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------- Header ---------- */

function PageHeader() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          My Profile
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Kelola informasi akun, keamanan, dan identitas pajak kamu.
        </p>
      </div>
      <span className="text-sm text-slate-400">Manage your account information</span>
    </div>
  );
}

/* ---------- Card shell ---------- */

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-slate-200/70 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-8 ${className}`}
    >
      {children}
    </section>
  );
}

function SectionTitle({
  icon: Icon,
  title,
  description,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2.5">
        {Icon ? (
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-teal-50 text-teal-600">
            <Icon className="h-4.5 w-4.5" />
          </span>
        ) : null}
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      </div>
      {description ? (
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      ) : null}
    </div>
  );
}

/* ---------- Reusable inputs ---------- */

function FieldLabel({
  icon: Icon,
  children,
  required,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
      {Icon ? <Icon className="h-4 w-4 text-slate-400" /> : null}
      <span>{children}</span>
      {required ? <span className="text-rose-500">*</span> : null}
    </label>
  );
}

function TextField({
  icon,
  label,
  required,
  placeholder,
  defaultValue,
  type = "text",
  trailing,
  hint,
  readOnly,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  type?: string;
  trailing?: React.ReactNode;
  hint?: string;
  readOnly?: boolean;
}) {
  return (
    <div>
      <FieldLabel icon={icon} required={required}>
        {label}
      </FieldLabel>
      <div className="flex items-stretch gap-2">
        <input
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`h-11 flex-1 rounded-lg border border-slate-200 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/15 ${readOnly ? "bg-slate-50 text-slate-600" : ""}`}
        />
        {trailing}
      </div>
      {hint ? <p className="mt-1.5 text-xs text-slate-400">{hint}</p> : null}
    </div>
  );
}

function SelectField({
  icon,
  label,
  required,
  defaultValue,
  placeholder,
  options,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  options: string[];
}) {
  return (
    <div>
      <FieldLabel icon={icon} required={required}>
        {label}
      </FieldLabel>
      <div className="relative">
        <select
          defaultValue={defaultValue ?? ""}
          className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3.5 pr-10 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/15"
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  );
}

function TextareaField({
  label,
  placeholder,
  rows = 3,
}: {
  label: string;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <textarea
        rows={rows}
        placeholder={placeholder}
        className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/15"
      />
    </div>
  );
}

function PrimaryButton({
  children,
  icon: Icon,
}: {
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <button className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 active:bg-teal-800">
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
      {children}
    </button>
  );
}

/* ---------- Profile Photo ---------- */

function ProfilePhotoCard() {
  return (
    <Card>
      <h2 className="mb-5 text-lg font-bold text-slate-900">Profile Photo</h2>
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <div className="relative">
          <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-teal-50 to-slate-100 ring-1 ring-slate-200">
            <Camera className="h-8 w-8 text-slate-400" />
          </div>
          <span className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-teal-600 text-white shadow">
            <Camera className="h-3.5 w-3.5" />
          </span>
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-slate-900">Profile Photo</span>
            <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
              Recommended: 400×400 px
            </span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <PrimaryButton icon={Upload}>Upload</PrimaryButton>
            <button className="text-sm font-medium text-slate-500 transition hover:text-rose-600">
              Hapus
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Square image. JPG / PNG / WEBP, maksimum 2 MB.
          </p>
        </div>
      </div>
    </Card>
  );
}

/* ---------- Account Info ---------- */

function AccountInfoCard() {
  return (
    <Card>
      <SectionTitle
        title="Informasi Akun"
        description="Nomor HP dipakai untuk keamanan akun + notifikasi penting. Alamat opsional, dipakai untuk invoice."
      />
      <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
        <TextField icon={UserIcon} label="First Name" required defaultValue="Demo" />
        <TextField icon={Home} label="Address 1" placeholder="Jl. Contoh No. 123" />

        <TextField icon={UserIcon} label="Last Name" defaultValue="Buyer" />
        <TextField icon={Home} label="Address 2" placeholder="Apartemen / Unit (opsional)" />

        <TextField
          icon={Mail}
          label="Email Address"
          defaultValue="buyer@nodekpt.com"
          readOnly
          trailing={<SecondaryButton>Ubah</SecondaryButton>}
        />
        <TextField icon={Landmark} label="City" placeholder="Jakarta" />

        <SelectField
          icon={Globe}
          label="Country"
          defaultValue="Indonesia"
          options={["Indonesia", "Singapore", "Malaysia", "United States"]}
        />
        <SelectField
          icon={MapPin}
          label="State / Region"
          placeholder="Pilih provinsi..."
          options={["DKI Jakarta", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "Bali"]}
        />

        <TextField
          icon={Phone}
          label="Phone Number"
          required
          defaultValue="+6287778678031"
          hint="Format otomatis dinormalisasi ke +62..."
        />
        <TextField icon={Hash} label="Zip Code" placeholder="10110" />
      </div>

      <div className="mt-7">
        <PrimaryButton icon={Save}>Simpan Perubahan</PrimaryButton>
      </div>
    </Card>
  );
}

/* ---------- Security (password) ---------- */

function SecurityCard() {
  return (
    <Card>
      <SectionTitle
        icon={Shield}
        title="Keamanan"
        description="Perbarui password akun kamu secara berkala. Password minimal 8 karakter, kombinasi huruf dan angka."
      />
      <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
        <TextField
          icon={Key}
          label="Password"
          type="password"
          defaultValue="········"
          readOnly
          trailing={<SecondaryButton>Ubah</SecondaryButton>}
        />
        <TextField
          icon={AtSign}
          label="Recovery Email"
          type="email"
          placeholder="backup@email.com"
        />
      </div>
      <div className="mt-5 flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50/60 p-3.5 text-xs text-slate-500">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
        <span>
          Login terakhir: <b className="text-slate-700">2 jam lalu</b> dari Jakarta, Indonesia (IP 103.xx.xx.12).
        </span>
      </div>
    </Card>
  );
}

/* ---------- 2FA ---------- */

function TwoFactorCard() {
  const [enabled, setEnabled] = useState(false);
  return (
    <Card>
      <div className="mb-5 flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-teal-50 text-teal-600">
          <Shield className="h-4.5 w-4.5" />
        </span>
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Two-Factor Authentication (2FA)
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Lapisan keamanan tambahan — kode 6-digit dari Google Authenticator / Authy / 1Password.
          </p>
        </div>
      </div>

      {enabled ? (
        <div className="flex items-start gap-2 rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-800">
          <Check className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            2FA <b>aktif</b>. Akun kamu terlindungi lapisan tambahan.
          </span>
        </div>
      ) : (
        <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            2FA <b>belum aktif</b>. Akun kamu hanya dilindungi password.
          </span>
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          onClick={() => setEnabled((v) => !v)}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm transition ${
            enabled
              ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              : "bg-teal-600 text-white hover:bg-teal-700"
          }`}
        >
          <Shield className="h-4 w-4" />
          {enabled ? "Nonaktifkan 2FA" : "Aktifkan 2FA Sekarang"}
        </button>
        {enabled ? (
          <button className="text-sm font-medium text-slate-500 hover:text-slate-700">
            Lihat backup codes
          </button>
        ) : null}
      </div>
    </Card>
  );
}

/* ---------- Tax Identity ---------- */

function TaxIdentityCard() {
  return (
    <Card>
      <div className="mb-5 flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-sky-50 text-sky-600">
          <FileText className="h-4.5 w-4.5" />
        </span>
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Identitas Pajak <span className="text-slate-400 font-medium">(untuk invoice)</span>
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            NPWP buyer opsional. Diisi kalau kamu mau invoice atas nama perusahaan untuk klaim PPN.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <TextField
          label="NPWP (15 atau 16 digit)"
          placeholder="00.000.000.0-000.000  atau  0000 0000 0000 0000"
        />
        <TextField
          label="Nama Wajib Pajak (sesuai NPWP)"
          placeholder="PT Contoh Sejahtera / Nama Pribadi"
        />
        <TextareaField
          label="Alamat (untuk invoice)"
          placeholder="Jl. Sudirman No. 1, Jakarta Pusat 10110"
          rows={3}
        />
      </div>

      <div className="mt-6 flex justify-end">
        <PrimaryButton icon={Save}>Simpan</PrimaryButton>
      </div>
    </Card>
  );
}
