import Image from "next/image";
import Link from "next/link";
import { Archivo_Black } from "next/font/google";

const display = Archivo_Black({ weight: "400", subsets: ["latin"] });

const HERO =
  "https://images.unsplash.com/photo-1557974466-f6cca7d9ea05?auto=format&fit=crop&w=2400&q=80";
const TERRITORY =
  "https://images.unsplash.com/photo-1591081658714-f576fb7ea3ed?auto=format&fit=crop&w=2400&q=80";
const PATH =
  "https://images.unsplash.com/photo-1494679493189-8d8c38804d39?auto=format&fit=crop&w=2400&q=80";

const TAGS = [
  "Ficção",
  "Documentário",
  "Publicidade",
  "Animação",
  "Videoclipe",
  "Podcast",
];

function SideLabel({ children }: { children: string }) {
  return (
    <p className="text-[13px] tracking-[0.22em] text-white/40 uppercase md:text-sm">{children}</p>
  );
}

function Photo({
  src,
  alt,
  className,
  priority = false,
  position = "center",
}: {
  src: string;
  alt: string;
  className: string;
  priority?: boolean;
  position?: string;
}) {
  return (
    <div className={`sobre-photo group relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
        style={{ objectPosition: position }}
      />
    </div>
  );
}

export function SobreStory() {
  return (
    <div className="bg-[#111111] text-white">
      <section className="relative">
        <Photo
          src={HERO}
          alt="Rio e floresta ao entardecer"
          className="h-[68vh] min-h-[460px] max-h-[720px]"
          priority
          position="center 40%"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/10" />
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-start px-6 pt-28 md:px-14 md:pt-36">
          <p className="text-[11px] tracking-[0.28em] text-white/80">SOBRE</p>
          <h1
            className={`${display.className} mt-5 text-[clamp(2.8rem,5.6vw,5.6rem)] leading-[0.88] tracking-[-0.03em] uppercase`}
          >
            Um território.
            <br />
            Uma linguagem.
          </h1>
          <p className="mt-7 text-[12px] font-semibold tracking-[0.16em]">TAO FILMES</p>
          <p className="mt-2 max-w-[26ch] text-[15px] leading-snug text-white/85">
            Uma produtora audiovisual nascida
            <br />
            no coração da Amazônia.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-6 py-20 md:grid-cols-12 md:gap-6 md:px-14 md:py-28">
        <div className="md:col-span-3 md:pt-1">
          <SideLabel>A Tao</SideLabel>
        </div>
        <div className="max-w-[540px] md:col-span-7 md:col-start-4">
          <p className="text-[15px] leading-[1.65] text-white/72 md:text-base">
            Criada em 2017, em Belém do Pará, a TAO FILMES atua há 9 anos no mercado
            audiovisual nacional e internacional.
          </p>
          <p className="mt-6 text-[15px] leading-[1.65] text-white/72 md:text-base">
            A produtora já desenvolveu cerca de 60 projetos e trabalhou com clientes
            do Distrito Federal, Rio de Janeiro, São Paulo, Espanha e Guiana Francesa.
          </p>
          <p
            className={`${display.className} mt-10 text-[clamp(1.55rem,2.3vw,2.15rem)] leading-[1.12] tracking-[-0.02em]`}
          >
            Produzir a partir da Amazônia
            <br />
            é também produzir a partir de
            <br />
            uma identidade.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-6 px-6 md:grid-cols-12 md:px-14">
        <div className="md:col-span-3">
          <SideLabel>Território</SideLabel>
        </div>
        <div className="relative md:col-span-9">
          <Photo
            src={TERRITORY}
            alt="Floresta e rio vistos de cima"
            className="h-[240px] md:h-[320px]"
            position="center"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/35" />
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <p
              className={`${display.className} text-[clamp(1.8rem,3.4vw,3.4rem)] leading-[0.9] tracking-[-0.03em] uppercase`}
            >
              Um território.
              <br />
              Uma linguagem.
            </p>
            <p className="mt-4 max-w-[36ch] text-[13px] leading-snug text-white/85 md:text-sm">
              Produzimos a partir de um território com forte
              <br className="hidden sm:block" /> identidade cultural, paisagística e humana.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-6 py-20 md:grid-cols-12 md:px-14 md:py-28">
        <div className="md:col-span-3 md:pt-4">
          <SideLabel>Números</SideLabel>
        </div>
        <div className="md:col-span-9">
          <div className="grid grid-cols-3 gap-4 md:max-w-[640px] md:gap-10">
            {[
              ["09", "Anos"],
              ["50+", "Projetos"],
              ["05+", "Mercados"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className={`${display.className} text-[clamp(2.4rem,4vw,4.2rem)] leading-none tracking-[-0.03em]`}>
                  {value}
                </p>
                <p className="mt-2 text-[11px] tracking-[0.18em] text-white/45 uppercase">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-[220px_1fr] md:items-start">
            <div className="text-[13px] tracking-[0.16em] text-white/80 uppercase">
              <p>
                Belém <span className="px-1 text-white/35">→</span>
              </p>
              <p className="mt-3">
                Brasil <span className="px-1 text-white/35">→</span> Mundo
              </p>
            </div>
            <p className="max-w-[360px] text-[14px] leading-[1.6] text-white/65">
              Produzimos um audiovisual mais livre e já realizamos direção cinematográfica
              nos EUA e na Espanha. Há 9 anos atuamos no audiovisual, trabalhando com
              marcas, direção, edição e campanhas em três países.
            </p>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-5 gap-y-2 text-[11px] tracking-[0.16em] text-white/40 uppercase">
            {TAGS.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 pb-8 md:px-14">
        <div className="md:grid md:grid-cols-12">
          <div className="md:col-span-9 md:col-start-4">
            <h2 className={`${display.className} text-[clamp(1.4rem,2vw,1.8rem)] tracking-[0.04em] uppercase`}>
              Trajetória
            </h2>
            <div className="mt-8 grid gap-10 sm:grid-cols-2">
              <div>
                <p className="text-[13px] font-semibold tracking-[0.14em] uppercase">Invisíveis</p>
                <p className="mt-3 text-[14px] leading-relaxed text-white/65">
                  15º Festival Iguassu de Cinema
                  <br />
                  Projeto premiado
                </p>
              </div>
              <div>
                <p className="text-[13px] font-semibold tracking-[0.14em] uppercase">Dandara</p>
                <p className="mt-3 text-[14px] leading-relaxed text-white/65">
                  Cineclube de Manaus — 2026
                  <br />
                  Prêmio FPAF, 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-6 px-6 pt-10 pb-24 md:grid-cols-12 md:px-14 md:pt-16 md:pb-28">
        <div className="md:col-span-3">
          <SideLabel>Trajetória</SideLabel>
        </div>
        <div className="relative md:col-span-9">
          <Photo
            src={PATH}
            alt="Caminho na floresta ao pôr do sol"
            className="h-[280px] md:h-[380px]"
            position="center 60%"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/15" />
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-6 md:p-10">
            <p
              className={`${display.className} text-[clamp(1.7rem,2.8vw,2.9rem)] leading-[0.9] tracking-[-0.03em] uppercase`}
            >
              Da Amazônia
              <br />
              para onde a história
              <br />
              precisar ir.
            </p>
            <Link
              href="/teste-2"
              className="group/link pointer-events-auto mt-6 inline-flex w-fit items-center gap-2 text-[12px] tracking-[0.16em] text-white/90 uppercase"
            >
              Conhecer os trabalhos
              <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
