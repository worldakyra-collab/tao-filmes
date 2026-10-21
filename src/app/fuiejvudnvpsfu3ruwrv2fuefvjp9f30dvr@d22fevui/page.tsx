"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Reorder } from "framer-motion";
import { MediaCover } from "@/components/ui/MediaCover";

type Work = {
  id: string;
  title: string;
  year: string;
  client: string;
  category: string;
  video: string;
};

type Estado = {
  version: number;
  limite: number;
  visitantes: number;
  inicio: Work[];
  obras: Work[];
};

type Step = "form" | "inicio" | "ordem" | "confirma" | "detalhe" | "pronto";

export default function PainelPage() {
  const [estado, setEstado] = useState<Estado | null>(null);
  const [step, setStep] = useState<Step>("form");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [client, setClient] = useState("");
  const [category, setCategory] = useState("");
  const [video, setVideo] = useState("");
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState("");
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const previewRef = useRef<HTMLVideoElement>(null);
  const [levarInicio, setLevarInicio] = useState(false);
  const [substituirIds, setSubstituirIds] = useState<string[]>([]);
  const [ordem, setOrdem] = useState<Work[]>([]);
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [senha, setSenha] = useState("");
  const [modo, setModo] = useState<"novo" | "editar">("novo");
  const [editando, setEditando] = useState<Work | null>(null);

  async function load() {
    const response = await fetch("/api/painel/estado");
    const data = (await response.json()) as Estado;
    setEstado(data);
  }

  useEffect(() => {
    void fetch("/api/painel/login")
      .then((response) => response.json())
      .then((data: { ok?: boolean }) => setAuthed(Boolean(data.ok)))
      .catch(() => setAuthed(false));
  }, []);

  useEffect(() => {
    if (authed) void load();
  }, [authed]);

  const novo = (videoUrl: string): Work => ({
    id: `novo-${Date.now()}`,
    title,
    year,
    client,
    category,
    video: videoUrl,
  });

  async function onForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem("video");
    const file = input instanceof HTMLInputElement ? input.files?.[0] : undefined;
    if (!file) return;
    setSending(true);
    setStatus("");
    const form = new FormData();
    form.set("video", file);
    const response = await fetch("/api/painel/estado", { method: "PUT", body: form });
    const data = (await response.json()) as { video?: string; error?: string };
    setSending(false);
    if (!response.ok || !data.video) {
      setStatus(data.error || "Não foi possível enviar o vídeo.");
      return;
    }
    setVideo(data.video);
    setFileName(file.name);
    setLevarInicio(false);
    setSubstituirIds([]);
    setStep("inicio");
  }

  function irParaOrdem() {
    if (!estado) return;
    if (estado.inicio.length >= estado.limite && levarInicio && substituirIds.length === 0) {
      setStatus("Escolha quais trabalhos saem da Início.");
      return;
    }
    const item = novo(video);
    setOrdem([...estado.obras, item]);
    setStatus("");
    setStep("ordem");
  }

  async function publicar() {
    const item = ordem.find((work) => work.video === video);
    if (!item) return;
    setSending(true);
    const response = await fetch("/api/painel/estado", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "publicar",
        work: item,
        obrasIds: ordem.map((work) => work.id),
        inicio: levarInicio,
        substituirIds,
      }),
    });
    setSending(false);
    if (!response.ok) {
      setStatus("Não foi possível guardar.");
      return;
    }
    await load();
    setStep("pronto");
  }

  async function atualizar() {
    setSending(true);
    await fetch("/api/painel/estado", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "atualizar" }),
    });
    setSending(false);
    setStatus("O site está atualizando para quem está online.");
    await load();
  }

  function abrirEdicao(work: Work) {
    setEditando(work);
    setTitle(work.title);
    setYear(work.year);
    setClient(work.client);
    setCategory(work.category);
    setStatus("");
  }

  async function salvarEdicao(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editando) return;
    setSending(true);
    setStatus("");
    const response = await fetch("/api/painel/estado", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "editar",
        id: editando.id,
        title,
        year,
        client,
        category,
      }),
    });
    setSending(false);
    if (!response.ok) {
      setStatus("Não foi possível guardar.");
      return;
    }
    setStatus("Página atualizada no site.");
    setEditando(null);
    await load();
  }

  async function entrar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");
    const response = await fetch("/api/painel/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senha }),
    });
    const data = (await response.json()) as { error?: string };
    setSending(false);
    if (!response.ok) {
      setStatus(data.error || "Não foi possível entrar.");
      return;
    }
    setSenha("");
    setAuthed(true);
  }

  if (authed !== true) {
    return (
      <main className="grid min-h-dvh place-items-center bg-black px-6 text-white">
        <form onSubmit={(event) => void entrar(event)} className="w-full max-w-sm">
          <p className="text-[11px] tracking-[0.32em] text-white/40 uppercase">Tao Filmes</p>
          <h1 className="mt-3 font-[family-name:var(--font-instrument-serif)] text-5xl">Painel</h1>
          <label className="mt-8 flex flex-col gap-2 text-[11px] tracking-[0.22em] text-white/50 uppercase">
            Senha
            <input
              required
              type="password"
              autoComplete="current-password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              className="border-b border-white/20 bg-transparent px-0 py-3 text-base tracking-normal text-white normal-case outline-none focus:border-white"
            />
          </label>
          <button type="submit" disabled={sending || authed === null} className="mt-8 rounded-full bg-white px-7 py-3 text-[11px] tracking-[0.22em] text-black uppercase disabled:opacity-50">
            {sending ? "Entrando..." : "Entrar"}
          </button>
          {status ? <p className="mt-6 text-sm text-white/70">{status}</p> : null}
        </form>
      </main>
    );
  }

  const paginas = estado
    ? [...estado.inicio, ...estado.obras].filter(
        (work, index, list) => list.findIndex((item) => item.id === work.id) === index,
      )
    : [];

  const vagas = estado ? estado.limite - estado.inicio.length : 0;
  const item = ordem.find((work) => work.video === video);
  const steps: { id: Step; label: string }[] = [
    { id: "form", label: "Filme" },
    { id: "inicio", label: "Início" },
    { id: "ordem", label: "Obras" },
    { id: "confirma", label: "Ordem" },
    { id: "detalhe", label: "Dados" },
    { id: "pronto", label: "No ar" },
  ];
  const stepIndex = steps.findIndex((entry) => entry.id === step);

  return (
    <main className="min-h-dvh bg-black px-6 py-10 text-white md:px-10 md:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <p className="text-[11px] tracking-[0.32em] text-white/40 uppercase">Tao Filmes</p>
            <h1 className="mt-3 font-[family-name:var(--font-instrument-serif)] text-5xl tracking-tight md:text-6xl">
              {modo === "editar" ? "Editar página" : "Novo trabalho"}
            </h1>
            <div className="mt-5 flex flex-wrap gap-2">
              <button type="button" onClick={() => { setModo("novo"); setEditando(null); }} className={`rounded-full px-4 py-2 text-[11px] tracking-[0.18em] uppercase ${modo === "novo" ? "bg-white text-black" : "text-white/50 ring-1 ring-white/20"}`}>
                Novo trabalho
              </button>
              <button type="button" onClick={() => { setModo("editar"); setEditando(null); }} className={`rounded-full px-4 py-2 text-[11px] tracking-[0.18em] uppercase ${modo === "editar" ? "bg-white text-black" : "text-white/50 ring-1 ring-white/20"}`}>
                Editar página
              </button>
            </div>
          </div>
          {estado ? (
            <p className="text-right text-[11px] tracking-[0.18em] text-white/45 uppercase">
              Início {estado.inicio.length}/{estado.limite}
            </p>
          ) : null}
        </div>
        {modo === "editar" ? (
          <section className="mt-10 max-w-xl">
            {editando ? (
              <form onSubmit={(event) => void salvarEdicao(event)} className="flex flex-col gap-6">
                <button type="button" onClick={() => setEditando(null)} className="w-fit text-[11px] tracking-[0.18em] text-white/50 uppercase">
                  Voltar às páginas
                </button>
                <Field label="Nome" value={title} onChange={setTitle} />
                <Field label="Ano" value={year} onChange={setYear} optional />
                <Field label="Cliente" value={client} onChange={setClient} optional />
                <Field label="Categoria" value={category} onChange={setCategory} optional />
                <button type="submit" disabled={sending} className="w-fit rounded-full bg-white px-7 py-3 text-[11px] tracking-[0.22em] text-black uppercase disabled:opacity-50">
                  {sending ? "Guardando..." : "Guardar"}
                </button>
              </form>
            ) : (
              <div className="flex flex-col gap-3">
                {paginas.map((work) => (
                  <button
                    key={work.id}
                    type="button"
                    onClick={() => abrirEdicao(work)}
                    className="flex items-center gap-4 rounded-2xl p-2 text-left hover:bg-white/5"
                  >
                    <span className="relative block h-16 w-28 shrink-0 overflow-hidden rounded-xl bg-black">
                      <WorkPreview video={work.video} />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-serif text-2xl">{work.title}</span>
                      <span className="mt-0.5 block text-xs tracking-[0.16em] text-white/45 uppercase">{work.category}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
            {status ? <p className="mt-6 text-sm text-white/70">{status}</p> : null}
          </section>
        ) : null}

        {modo === "novo" ? (
        <>
        <ol className="mt-6 flex flex-wrap gap-2">
          {steps.map((entry, index) => (
            <li
              key={entry.id}
              className={`rounded-full px-3 py-1 text-[10px] tracking-[0.18em] uppercase ${index === stepIndex ? "bg-white text-black" : index < stepIndex ? "text-white" : "text-white/35"}`}
            >
              {entry.label}
            </li>
          ))}
        </ol>
        {step === "form" ? (
          <form onSubmit={onForm} className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="flex flex-col gap-6">
            <Field label="Nome" value={title} onChange={setTitle} />
            <div className="grid grid-cols-2 gap-6">
              <Field label="Ano" value={year} onChange={setYear} />
              <Field label="Cliente" value={client} onChange={setClient} />
            </div>
            <Field label="Categoria" value={category} onChange={setCategory} />
            <div className="flex flex-col gap-3">
              <span className="text-[11px] tracking-[0.22em] text-white/50 uppercase">Vídeo</span>
              <label className="w-fit cursor-pointer rounded-full border border-white/70 px-7 py-3 text-[11px] tracking-[0.22em] text-white uppercase">
                {fileName || "Escolher vídeo"}
                <input
                  name="video"
                  type="file"
                  accept="video/*"
                  required
                  className="sr-only"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    setFileName(file?.name || "");
                    setPreview((current) => {
                      if (current) URL.revokeObjectURL(current);
                      return file ? URL.createObjectURL(file) : "";
                    });
                  }}
                />
              </label>
            </div>
            {preview ? (
              <div className="group relative overflow-hidden rounded-2xl bg-neutral-950">
                <video
                  ref={previewRef}
                  src={preview}
                  className="aspect-video w-full"
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onClick={() => {
                    const player = previewRef.current;
                    if (!player) return;
                    if (player.paused) void player.play();
                    else player.pause();
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black via-black/70 to-transparent px-4 pt-10 pb-4">
                  <button
                    type="button"
                    aria-label={playing ? "Pausar" : "Play"}
                    onClick={() => {
                      const player = previewRef.current;
                      if (!player) return;
                      if (player.paused) void player.play();
                      else player.pause();
                    }}
                    className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-black"
                  >
                    {playing ? (
                      <svg viewBox="0 0 12 12" className="size-3.5" aria-hidden>
                        <path d="M2 1h3v10H2V1Zm5 0h3v10H7V1Z" fill="currentColor" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 12 12" className="size-3.5 translate-x-px" aria-hidden>
                        <path d="M2.2 1.2v9.6L10.5 6 2.2 1.2Z" fill="currentColor" />
                      </svg>
                    )}
                  </button>
                  <label className="flex min-w-0 flex-1 items-center gap-3 text-white/80">
                    <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
                      <path d="M4 10v4h3.2L12 18.2V5.8L7.2 10H4Z" strokeLinejoin="round" />
                      {volume > 0 ? <path d="M15.5 9.2a3.2 3.2 0 0 1 0 5.6" strokeLinecap="round" /> : <path d="M16 10.2 20 14.2M20 10.2l-4 4" strokeLinecap="round" />}
                    </svg>
                    <input
                      aria-label="Volume"
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={volume}
                      onChange={(event) => {
                        const next = Number(event.target.value);
                        setVolume(next);
                        if (previewRef.current) previewRef.current.volume = next;
                      }}
                      className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/25 accent-white"
                    />
                  </label>
                </div>
              </div>
            ) : null}
            <button type="submit" disabled={sending} className="w-fit rounded-full bg-white px-7 py-3 text-[11px] tracking-[0.22em] text-black uppercase disabled:opacity-50">
              {sending ? "Enviando..." : "Continuar"}
            </button>
            </div>
          </form>
        ) : null}

        {step === "inicio" && estado ? (
          <section className="mt-16 max-w-xl">
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-4xl">Página Início</h2>
            {vagas > 0 ? (
              <>
                <p>Ainda há {vagas === 1 ? "uma vaga" : `${vagas} vagas`} na Início.</p>
                <p className="mt-2 text-sm text-white/60">Ele não entra lá sozinho. Marque só se quiser.</p>
                <button
                  type="button"
                  aria-pressed={levarInicio}
                  onClick={() => setLevarInicio((current) => !current)}
                  className={`mt-6 flex items-center gap-3 rounded-full px-4 py-2.5 text-sm ring-1 transition-colors ${levarInicio ? "bg-white text-black ring-white" : "text-white ring-white/25 hover:ring-white/50"}`}
                >
                  <span className={`grid h-4 w-4 place-items-center rounded-full border ${levarInicio ? "border-black" : "border-white/50"}`}>
                    {levarInicio ? <span className="h-2 w-2 rounded-full bg-black" /> : null}
                  </span>
                  Colocar na página Início
                </button>
              </>
            ) : (
              <>
                <p>Não há vaga na Início. Deseja substituir algum trabalho?</p>
                <button
                  type="button"
                  aria-pressed={levarInicio}
                  onClick={() => setLevarInicio((current) => !current)}
                  className={`mt-6 flex items-center gap-3 rounded-full px-4 py-2.5 text-sm ring-1 transition-colors ${levarInicio ? "bg-white text-black ring-white" : "text-white ring-white/25 hover:ring-white/50"}`}
                >
                  <span className={`grid h-4 w-4 place-items-center rounded-full border ${levarInicio ? "border-black" : "border-white/50"}`}>
                    {levarInicio ? <span className="h-2 w-2 rounded-full bg-black" /> : null}
                  </span>
                  Sim, substituir um
                </button>
                {levarInicio ? (
                  <div className="mt-6 flex flex-col gap-3">
                    {estado.inicio.map((work) => {
                      const selected = substituirIds.includes(work.id);
                      return (
                        <button
                          key={work.id}
                          type="button"
                          onClick={() =>
                            setSubstituirIds((current) =>
                              current.includes(work.id)
                                ? current.filter((id) => id !== work.id)
                                : [...current, work.id],
                            )
                          }
                          className={`flex items-center gap-4 rounded-2xl p-2 text-left ${selected ? "bg-white/10 ring-1 ring-white" : "hover:bg-white/5"}`}
                        >
                          <span className="relative block h-16 w-28 shrink-0 overflow-hidden rounded-xl bg-neutral-900">
                            <WorkPreview video={work.video} />
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate font-serif text-2xl">{work.title}</span>
                            <span className="mt-0.5 block text-xs tracking-[0.16em] text-white/45 uppercase">
                              {selected ? "Sai" : work.category}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </>
            )}
            <button type="button" onClick={irParaOrdem} className="mt-8 rounded-full bg-white px-7 py-3 text-[11px] tracking-[0.22em] text-black uppercase">
              Ordem nas obras
            </button>
          </section>
        ) : null}

        {step === "ordem" ? (
          <section className="mt-16 max-w-2xl">
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-4xl">Obras</h2>
            <p className="mt-3 text-sm text-white/60">
              O trabalho novo entra por último. Segure nele e arraste até a posição. Os outros abrem espaço.
            </p>
            <Reorder.Group axis="y" values={ordem} onReorder={setOrdem} className="mt-6 flex flex-col gap-3">
              {ordem.map((work, index) => {
                const novoItem = work.video === video;
                return (
                  <Reorder.Item
                    key={work.id}
                    value={work}
                    className={`flex cursor-grab items-center gap-4 rounded-2xl p-2 active:cursor-grabbing ${novoItem ? "bg-white/10 ring-1 ring-white" : "hover:bg-white/5"}`}
                  >
                    <span className="relative block h-16 w-28 shrink-0 overflow-hidden rounded-xl bg-neutral-900">
                      <WorkPreview video={work.video} />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-serif text-2xl">{work.title}</span>
                      <span className="mt-0.5 block text-xs tracking-[0.16em] text-white/45 uppercase">
                        {novoItem ? "Novo" : `${String(index + 1).padStart(2, "0")} · ${work.category}`}
                      </span>
                    </span>
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>
            <button type="button" onClick={() => setStep("confirma")} className="mt-8 rounded-full bg-white px-7 py-3 text-[11px] tracking-[0.22em] text-black uppercase">
              Confirmar
            </button>
          </section>
        ) : null}

        {step === "confirma" ? (
          <section className="mt-16 max-w-xl">
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-4xl">Confirmar esta ordem nas obras?</h2>
            <button type="button" onClick={() => setStep("detalhe")} className="mt-8 rounded-full bg-white px-7 py-3 text-[11px] tracking-[0.22em] text-black uppercase">
              Confirmar
            </button>
          </section>
        ) : null}

        {step === "detalhe" && item ? (
          <section className="mt-16 max-w-xl">
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-4xl">Deseja adicionar isto?</h2>
            <p className="mt-4 text-white/70">Nome: {item.title}</p>
            <p className="text-white/70">Ano: {item.year}</p>
            <p className="text-white/70">Cliente: {item.client}</p>
            <p className="text-white/70">Categoria: {item.category}</p>
            <p className="text-white/70">Arquivo: {fileName}</p>
            <p className="text-white/70">
              Posição nas obras: {ordem.findIndex((work) => work.id === item.id) + 1}
            </p>
            <p className="text-white/70">Início: {levarInicio ? "sim" : "não"}</p>
            <button type="button" disabled={sending} onClick={() => void publicar()} className="mt-8 rounded-full bg-white px-7 py-3 text-[11px] tracking-[0.22em] text-black uppercase disabled:opacity-50">
              {sending ? "Guardando..." : "Confirmar de novo"}
            </button>
          </section>
        ) : null}

        {step === "pronto" ? (
          <section className="mt-16 max-w-xl">
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-4xl">Pronto para ir ao ar.</h2>
            <p className="mt-4 text-sm text-white/60">Quando clicar, o site atualiza para todo mundo que está online, como um F5.</p>
            <button type="button" disabled={sending} onClick={() => void atualizar()} className="mt-8 rounded-full bg-white px-7 py-3 text-[11px] tracking-[0.22em] text-black uppercase disabled:opacity-50">
              Atualizar site
            </button>
          </section>
        ) : null}
        </>
        ) : null}

        {modo === "novo" && status ? <p className="mt-6 text-sm text-white/70">{status}</p> : null}
      </div>
    </main>
  );
}

function WorkPreview({ video }: { video: string }) {
  return <MediaCover src={video} quiet className="absolute inset-0 h-full w-full" />;
}

function Field({
  label,
  value,
  onChange,
  optional = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  optional?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2 text-[11px] tracking-[0.22em] text-white/50 uppercase">
      {label}
      <input
        required={!optional}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="border-b border-white/20 bg-transparent px-0 py-3 text-base tracking-normal text-white normal-case outline-none focus:border-white"
      />
    </label>
  );
}
